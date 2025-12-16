@echo off
REM ============================================================================
REM MCP Services Auto-Start Script for Windows
REM AI-Trader Bench - Starts all required MCP tool services
REM ============================================================================

echo.
echo  ╔══════════════════════════════════════════════════════════════╗
echo  ║           AI-Trader Bench - MCP Services Launcher            ║
echo  ║          Starting all required MCP tool services...          ║
echo  ╚══════════════════════════════════════════════════════════════╝
echo.

REM Change to project root directory
cd /d "%~dp0.."

REM Check if Python is available
where python >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Python not found! Please install Python 3.8+
    pause
    exit /b 1
)

REM Check if virtual environment exists
if exist ".venv\Scripts\activate.bat" (
    echo [INFO] Activating virtual environment...
    call .venv\Scripts\activate.bat
) else if exist "venv\Scripts\activate.bat" (
    echo [INFO] Activating virtual environment...
    call venv\Scripts\activate.bat
) else (
    echo [WARN] No virtual environment found, using system Python
)

REM Install requirements if needed
if exist "requirements.txt" (
    echo [INFO] Ensuring dependencies are installed...
    pip install -q -r requirements.txt 2>nul
)

echo.
echo [INFO] Starting MCP Services...
echo.

REM Set default ports (can be overridden by environment variables)
if not defined MATH_HTTP_PORT set MATH_HTTP_PORT=8000
if not defined SEARCH_HTTP_PORT set SEARCH_HTTP_PORT=8001
if not defined TRADE_HTTP_PORT set TRADE_HTTP_PORT=8002
if not defined GETPRICE_HTTP_PORT set GETPRICE_HTTP_PORT=8003

REM Start Math Tool Service
echo [1/4] Starting Math Tool on port %MATH_HTTP_PORT%...
start "MCP-Math" cmd /c "python agent_tools\tool_math.py"
timeout /t 2 /nobreak >nul

REM Start Search Tool Service (Jina)
echo [2/4] Starting Search Tool on port %SEARCH_HTTP_PORT%...
start "MCP-Search" cmd /c "python agent_tools\tool_jina_search.py"
timeout /t 2 /nobreak >nul

REM Start Trade Tool Service
echo [3/4] Starting Trade Tool on port %TRADE_HTTP_PORT%...
start "MCP-Trade" cmd /c "python agent_tools\tool_trade.py"
timeout /t 2 /nobreak >nul

REM Start Price Tool Service
echo [4/4] Starting Price Tool on port %GETPRICE_HTTP_PORT%...
start "MCP-Price" cmd /c "python agent_tools\tool_get_price_local.py"
timeout /t 2 /nobreak >nul

echo.
echo  ╔══════════════════════════════════════════════════════════════╗
echo  ║              All MCP Services Started!                       ║
echo  ╠══════════════════════════════════════════════════════════════╣
echo  ║  Math Tool:   http://localhost:%MATH_HTTP_PORT%/mcp                    ║
echo  ║  Search Tool: http://localhost:%SEARCH_HTTP_PORT%/mcp                    ║
echo  ║  Trade Tool:  http://localhost:%TRADE_HTTP_PORT%/mcp                    ║
echo  ║  Price Tool:  http://localhost:%GETPRICE_HTTP_PORT%/mcp                    ║
echo  ╚══════════════════════════════════════════════════════════════╝
echo.
echo [INFO] Services are running in separate windows.
echo [INFO] Close those windows to stop the services.
echo.
echo [TIP] You can now:
echo       1. Run the dashboard: npm run dev
echo       2. Run a simulation: python main.py
echo.

REM Keep this window open for reference
pause
