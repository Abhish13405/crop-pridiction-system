@echo off
title FasalMitra - Full Stack Launcher
color 0A

echo ========================================================
echo        FasalMitra - Full Stack (Django + React)
echo ========================================================
echo.

cd /d "%~dp0"

echo [1/2] Starting Django REST Backend on http://127.0.0.1:8000 ...
start "FasalMitra Backend (Django)" cmd /k "cd /d %~dp0 && .\venv\Scripts\python.exe backend/manage.py runserver 127.0.0.1:8000"

echo [2/2] Starting React Vite Frontend on http://localhost:5173 ...
start "FasalMitra Frontend (React)" cmd /k "cd /d %~dp0\frontend && npm run dev"

echo.
echo ========================================================
echo   Both Servers Launched in dedicated terminal windows!
echo   Frontend : http://localhost:5173
echo   Backend  : http://127.0.0.1:8000
echo ========================================================
echo.
timeout /t 3 >nul
start http://localhost:5173
