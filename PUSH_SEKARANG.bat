@echo off
title Unggah RoadTo600 ke GitHub
color 0b
echo ======================================================================
echo    SEDANG MENGUNGGAH APLIKASI ROADTO600 KE GITHUB rigariyan-beep
echo ======================================================================
echo.
cd /d "d:\antigravity"
git push -u origin main --force
echo.
if %errorlevel% equ 0 (
    color 0a
    echo ======================================================================
    echo    BERHASIL! Aplikasi RoadTo600 sudah terunggah ke GitHub!
    echo ======================================================================
) else (
    color 0c
    echo ======================================================================
    echo    GAGAL atau jendela login ditutup. Silakan coba lagi.
    echo ======================================================================
)
echo.
pause
