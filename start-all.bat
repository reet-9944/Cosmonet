@echo off
echo ========================================
echo   COSMONET - Starting All Services
echo ========================================
echo.

echo [1/2] Starting GraphQL Server...
start "Cosmonet Server" cmd /k "npm run server"
timeout /t 3 /nobreak > nul

echo [2/2] Starting React App...
start "Cosmonet App" cmd /k "npm run dev"

echo.
echo ========================================
echo   All services started!
echo ========================================
echo.
echo Server: http://localhost:4000/graphql
echo App: http://localhost:5173
echo.
echo Press any key to exit this window...
pause > nul
