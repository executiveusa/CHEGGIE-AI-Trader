#!/usr/bin/env python3
"""
Deployment Verification Script
Checks that all components are ready for Railway deployment
"""

import os
import json
import sys
from pathlib import Path


def check_file_exists(filepath: str, description: str) -> bool:
    """Check if a required file exists."""
    exists = os.path.exists(filepath)
    status = "✅" if exists else "❌"
    print(f"{status} {description}: {filepath}")
    return exists


def validate_json_file(filepath: str, description: str) -> bool:
    """Validate that a JSON file is properly formatted."""
    try:
        with open(filepath, 'r') as f:
            json.load(f)
        print(f"✅ {description} is valid JSON")
        return True
    except Exception as e:
        print(f"❌ {description} is invalid: {e}")
        return False


def check_stub_config() -> bool:
    """Test stub configuration system."""
    try:
        sys.path.insert(0, str(Path(__file__).parent))
        from stubs.stub_config import get_stub_status, is_stub_mode
        
        status = get_stub_status()
        print(f"✅ Stub configuration system working")
        print(f"   Mode: {'Demo/Stub' if status['stub_mode'] else 'Production'}")
        return True
    except Exception as e:
        print(f"❌ Stub configuration system failed: {e}")
        return False


def check_gitignore() -> bool:
    """Verify that sensitive files are in .gitignore."""
    try:
        with open('.gitignore', 'r') as f:
            content = f.read()
        
        required_patterns = [
            'master.secrets.json',
            '.env',
            '*.key'
        ]
        
        all_found = True
        for pattern in required_patterns:
            if pattern in content:
                print(f"✅ .gitignore includes: {pattern}")
            else:
                print(f"❌ .gitignore missing: {pattern}")
                all_found = False
        
        return all_found
    except Exception as e:
        print(f"❌ Error checking .gitignore: {e}")
        return False


def main():
    """Run all deployment verification checks."""
    print("=" * 70)
    print("🔍 RAILWAY DEPLOYMENT VERIFICATION")
    print("=" * 70)
    print()
    
    checks = []
    
    # Check required files
    print("📋 Checking Required Files...")
    checks.append(check_file_exists('.agents', 'Secret specifications'))
    checks.append(check_file_exists('railway.toml', 'Railway configuration'))
    checks.append(check_file_exists('maintenance.html', 'Maintenance page'))
    checks.append(check_file_exists('RAILWAY_DEPLOYMENT.md', 'Deployment guide'))
    checks.append(check_file_exists('COOLIFY_MIGRATION.md', 'Migration guide'))
    checks.append(check_file_exists('deploy_railway.sh', 'Deployment script'))
    checks.append(check_file_exists('stubs/stub_config.py', 'Stub configuration'))
    print()
    
    # Validate JSON files
    print("📄 Validating JSON Configuration...")
    checks.append(validate_json_file('.agents', '.agents file'))
    checks.append(validate_json_file('master.secrets.json', 'master.secrets.json'))
    checks.append(validate_json_file('configs/default_config.json', 'default_config.json'))
    print()
    
    # Check stub configuration
    print("🔧 Testing Stub Configuration System...")
    checks.append(check_stub_config())
    print()
    
    # Check .gitignore
    print("🔒 Verifying Security (gitignore)...")
    checks.append(check_gitignore())
    print()
    
    # Check railway.toml
    print("🚂 Validating Railway Configuration...")
    try:
        with open('railway.toml', 'r') as f:
            content = f.read()
        
        if 'memory = "512Mi"' in content:
            print("✅ Resource limits configured (512Mi memory)")
            checks.append(True)
        else:
            print("❌ Resource limits not properly set")
            checks.append(False)
        
        if 'RAILWAY_COST_PROTECTION_ENABLED' in content:
            print("✅ Cost protection enabled")
            checks.append(True)
        else:
            print("⚠️  Cost protection not explicitly enabled")
            checks.append(True)  # Not critical
    except Exception as e:
        print(f"❌ Error reading railway.toml: {e}")
        checks.append(False)
    print()
    
    # Check documentation
    print("📚 Checking Documentation...")
    docs = [
        'RAILWAY_DEPLOYMENT.md',
        'COOLIFY_SUPPORT.md',
        'COOLIFY_MIGRATION.md',
        'ZERO_SECRETS_README.md'
    ]
    for doc in docs:
        if os.path.exists(doc) and os.path.getsize(doc) > 1000:
            print(f"✅ {doc} exists and has content")
            checks.append(True)
        else:
            print(f"❌ {doc} missing or too small")
            checks.append(False)
    print()
    
    # Summary
    print("=" * 70)
    passed = sum(checks)
    total = len(checks)
    percentage = (passed / total * 100) if total > 0 else 0
    
    print(f"📊 RESULTS: {passed}/{total} checks passed ({percentage:.1f}%)")
    print()
    
    if passed == total:
        print("✅ ✅ ✅ ALL CHECKS PASSED! ✅ ✅ ✅")
        print()
        print("🚀 Ready for Railway deployment!")
        print()
        print("Next steps:")
        print("  1. Review RAILWAY_DEPLOYMENT.md")
        print("  2. Run: ./deploy_railway.sh")
        print("  3. Or click: https://railway.app/new/template")
        return 0
    else:
        print("❌ Some checks failed. Please fix issues before deploying.")
        return 1


if __name__ == "__main__":
    sys.exit(main())
