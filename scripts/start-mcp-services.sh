#!/bin/bash
# ============================================================================
# MCP Services Auto-Start Script for Unix/macOS/Linux
# AI-Trader Bench - Starts all required MCP tool services
# ============================================================================

set -e

echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║           AI-Trader Bench - MCP Services Launcher            ║"
echo "║          Starting all required MCP tool services...          ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# Change to project root directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR/.."

# Check if Python is available
if ! command -v python3 &> /dev/null; then
    if ! command -v python &> /dev/null; then
        echo "[ERROR] Python not found! Please install Python 3.8+"
        exit 1
    fi
    PYTHON_CMD="python"
else
    PYTHON_CMD="python3"
fi

# Check if virtual environment exists
if [ -f ".venv/bin/activate" ]; then
    echo "[INFO] Activating virtual environment (.venv)..."
    source .venv/bin/activate
elif [ -f "venv/bin/activate" ]; then
    echo "[INFO] Activating virtual environment (venv)..."
    source venv/bin/activate
else
    echo "[WARN] No virtual environment found, using system Python"
fi

# Install requirements if needed
if [ -f "requirements.txt" ]; then
    echo "[INFO] Ensuring dependencies are installed..."
    pip install -q -r requirements.txt 2>/dev/null || true
fi

echo ""
echo "[INFO] Starting MCP Services..."
echo ""

# Set default ports (can be overridden by environment variables)
MATH_HTTP_PORT=${MATH_HTTP_PORT:-8000}
SEARCH_HTTP_PORT=${SEARCH_HTTP_PORT:-8001}
TRADE_HTTP_PORT=${TRADE_HTTP_PORT:-8002}
GETPRICE_HTTP_PORT=${GETPRICE_HTTP_PORT:-8003}

# Cleanup function
cleanup() {
    echo ""
    echo "[INFO] Stopping all MCP services..."
    pkill -f "tool_math.py" 2>/dev/null || true
    pkill -f "tool_jina_search.py" 2>/dev/null || true
    pkill -f "tool_trade.py" 2>/dev/null || true
    pkill -f "tool_get_price_local.py" 2>/dev/null || true
    echo "[INFO] All services stopped."
    exit 0
}

# Trap SIGINT and SIGTERM
trap cleanup SIGINT SIGTERM

# Start Math Tool Service
echo "[1/4] Starting Math Tool on port $MATH_HTTP_PORT..."
MATH_HTTP_PORT=$MATH_HTTP_PORT $PYTHON_CMD agent_tools/tool_math.py &
MATH_PID=$!
sleep 1

# Start Search Tool Service (Jina)
echo "[2/4] Starting Search Tool on port $SEARCH_HTTP_PORT..."
SEARCH_HTTP_PORT=$SEARCH_HTTP_PORT $PYTHON_CMD agent_tools/tool_jina_search.py &
SEARCH_PID=$!
sleep 1

# Start Trade Tool Service
echo "[3/4] Starting Trade Tool on port $TRADE_HTTP_PORT..."
TRADE_HTTP_PORT=$TRADE_HTTP_PORT $PYTHON_CMD agent_tools/tool_trade.py &
TRADE_PID=$!
sleep 1

# Start Price Tool Service
echo "[4/4] Starting Price Tool on port $GETPRICE_HTTP_PORT..."
GETPRICE_HTTP_PORT=$GETPRICE_HTTP_PORT $PYTHON_CMD agent_tools/tool_get_price_local.py &
PRICE_PID=$!
sleep 1

echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║              All MCP Services Started!                       ║"
echo "╠══════════════════════════════════════════════════════════════╣"
echo "║  Math Tool:   http://localhost:$MATH_HTTP_PORT/mcp                    ║"
echo "║  Search Tool: http://localhost:$SEARCH_HTTP_PORT/mcp                    ║"
echo "║  Trade Tool:  http://localhost:$TRADE_HTTP_PORT/mcp                    ║"
echo "║  Price Tool:  http://localhost:$GETPRICE_HTTP_PORT/mcp                    ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""
echo "[INFO] PIDs: Math=$MATH_PID, Search=$SEARCH_PID, Trade=$TRADE_PID, Price=$PRICE_PID"
echo "[INFO] Press Ctrl+C to stop all services."
echo ""
echo "[TIP] You can now:"
echo "      1. Run the dashboard: npm run dev"
echo "      2. Run a simulation: python main.py"
echo ""

# Wait for all background processes
wait
