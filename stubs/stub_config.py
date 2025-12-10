"""
Stub configuration and helpers for zero-secrets deployment.
Provides fallback behavior when external API integrations are not configured.
"""

import os
from typing import Optional, Dict, Any


def is_stub_mode() -> bool:
    """
    Check if application is running in stub mode (no API keys configured).
    
    Returns:
        bool: True if running in stub mode, False otherwise
    """
    openai_key = os.environ.get("OPENAI_API_KEY", "")
    jina_key = os.environ.get("JINA_API_KEY", "")
    alpha_key = os.environ.get("ALPHAADVANTAGE_API_KEY", "")
    
    # Check if any key looks like a placeholder or is empty
    stub_indicators = [
        "DISABLED",
        "PLACEHOLDER",
        "your-key-here",
        "sk-...",
        ""
    ]
    
    openai_stub = any(indicator in openai_key.upper() for indicator in stub_indicators) or len(openai_key) < 10
    jina_stub = any(indicator in jina_key.upper() for indicator in stub_indicators) or len(jina_key) < 10
    alpha_stub = any(indicator in alpha_key.upper() for indicator in stub_indicators) or len(alpha_key) < 10
    
    return openai_stub or jina_stub or alpha_stub


def get_stub_status() -> Dict[str, Any]:
    """
    Get detailed stub status for all integrations.
    
    Returns:
        dict: Status of each integration
    """
    openai_key = os.environ.get("OPENAI_API_KEY", "")
    jina_key = os.environ.get("JINA_API_KEY", "")
    alpha_key = os.environ.get("ALPHAADVANTAGE_API_KEY", "")
    
    def is_configured(key: str) -> bool:
        """Check if a key is properly configured."""
        if not key:
            return False
        stub_indicators = ["DISABLED", "PLACEHOLDER", "your-key-here", "sk-...", "jina_..."]
        return not any(indicator in key.upper() for indicator in stub_indicators) and len(key) >= 10
    
    return {
        "stub_mode": is_stub_mode(),
        "integrations": {
            "openai": {
                "configured": is_configured(openai_key),
                "status": "active" if is_configured(openai_key) else "stubbed",
                "fallback": "mock AI responses"
            },
            "jina_search": {
                "configured": is_configured(jina_key),
                "status": "active" if is_configured(jina_key) else "stubbed",
                "fallback": "mock news data"
            },
            "alpha_vantage": {
                "configured": is_configured(alpha_key),
                "status": "active" if is_configured(alpha_key) else "stubbed",
                "fallback": "local historical data only"
            }
        },
        "deployment_mode": "demo" if is_stub_mode() else "production"
    }


def print_stub_status():
    """Print current stub status to console."""
    status = get_stub_status()
    
    print("=" * 60)
    print("🔧 APPLICATION CONFIGURATION STATUS")
    print("=" * 60)
    
    if status["stub_mode"]:
        print("⚠️  Running in DEMO/STUB MODE")
        print("   No API keys configured - using fallback behaviors")
    else:
        print("✅ Running in PRODUCTION MODE")
        print("   All API keys configured")
    
    print("\n📊 Integration Status:")
    for service, info in status["integrations"].items():
        icon = "✅" if info["configured"] else "⚠️"
        print(f"   {icon} {service.upper()}: {info['status']}")
        if not info["configured"]:
            print(f"      → Fallback: {info['fallback']}")
    
    print("\n💡 To enable full functionality:")
    print("   Set environment variables in Railway dashboard:")
    print("   - OPENAI_API_KEY")
    print("   - JINA_API_KEY")
    print("   - ALPHAADVANTAGE_API_KEY")
    print("=" * 60)


def get_mock_ai_response(prompt: str) -> str:
    """
    Generate a mock AI response for stub mode.
    
    Args:
        prompt: The prompt that would be sent to AI
        
    Returns:
        str: Mock response
    """
    return (
        "This is a mock AI response (stub mode active). "
        "To enable real AI trading decisions, configure OPENAI_API_KEY "
        "in your Railway dashboard environment variables."
    )


def get_mock_search_results(query: str) -> list:
    """
    Generate mock search results for stub mode.
    
    Args:
        query: Search query
        
    Returns:
        list: Mock search results
    """
    return [
        {
            "url": "https://example.com/mock-news-1",
            "title": f"Mock News: {query}",
            "description": "This is a mock news article (stub mode active).",
            "content": "Mock content. Configure JINA_API_KEY for real search results.",
            "publish_time": "2025-01-01 00:00:00"
        }
    ]


def should_use_local_data_only() -> bool:
    """
    Check if application should use local data only (no external API calls).
    
    Returns:
        bool: True if should use local data only
    """
    alpha_key = os.environ.get("ALPHAADVANTAGE_API_KEY", "")
    stub_indicators = ["DISABLED", "PLACEHOLDER", "your-key-here", ""]
    return any(indicator in alpha_key.upper() for indicator in stub_indicators) or len(alpha_key) < 10


# Maintenance mode helpers

def is_maintenance_mode() -> bool:
    """
    Check if application is in maintenance mode.
    
    Returns:
        bool: True if in maintenance mode
    """
    return os.environ.get("MAINTENANCE_MODE", "false").lower() == "true"


def activate_maintenance_mode():
    """Set maintenance mode flag."""
    os.environ["MAINTENANCE_MODE"] = "true"
    print("⚠️  MAINTENANCE MODE ACTIVATED")
    print("   Application will serve maintenance.html")
    print("   See COOLIFY_MIGRATION.md for migration steps")


def deactivate_maintenance_mode():
    """Clear maintenance mode flag."""
    os.environ["MAINTENANCE_MODE"] = "false"
    print("✅ MAINTENANCE MODE DEACTIVATED")


# Cost protection helpers

def get_cost_protection_status() -> Dict[str, Any]:
    """
    Get cost protection system status.
    
    Returns:
        dict: Cost protection status
    """
    return {
        "enabled": os.environ.get("RAILWAY_COST_PROTECTION_ENABLED", "true").lower() == "true",
        "free_tier_limit_mb": int(os.environ.get("RAILWAY_FREE_TIER_LIMIT_MB", "512")),
        "auto_shutdown_enabled": os.environ.get("RAILWAY_AUTO_SHUTDOWN_ENABLED", "true").lower() == "true",
        "maintenance_mode": is_maintenance_mode()
    }


def check_resource_usage() -> Dict[str, Any]:
    """
    Check current resource usage (placeholder).
    
    In a real implementation, this would query Railway API or system metrics.
    
    Returns:
        dict: Resource usage information
    """
    # Placeholder implementation
    # In production, this would query actual metrics
    return {
        "memory_mb": 0,  # Would query actual memory usage
        "cpu_percent": 0,  # Would query actual CPU usage
        "within_limits": True,
        "warning": False
    }


def should_trigger_shutdown() -> bool:
    """
    Determine if application should shutdown due to cost protection.
    
    Returns:
        bool: True if should shutdown
    """
    protection = get_cost_protection_status()
    if not protection["enabled"]:
        return False
    
    usage = check_resource_usage()
    
    # Check if approaching limits
    if usage["memory_mb"] > protection["free_tier_limit_mb"] * 0.9:
        print("⚠️  WARNING: Approaching free tier memory limit")
        return protection["auto_shutdown_enabled"]
    
    return False


if __name__ == "__main__":
    # Test stub configuration
    print_stub_status()
    print("\n" + "=" * 60)
    print("📊 Cost Protection Status:")
    import json
    print(json.dumps(get_cost_protection_status(), indent=2))
