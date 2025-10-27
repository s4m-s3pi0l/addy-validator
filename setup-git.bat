@echo off
echo Setting up Git repository for Solana Address Validator...
echo.

REM Initialize git repository
"C:\Program Files\Git\bin\git.exe" init

REM Add all files
"C:\Program Files\Git\bin\git.exe" add .

REM Create initial commit
"C:\Program Files\Git\bin\git.exe" commit -m "Initial commit: Solana wallet address validator

- Clean, modern UI inspired by Solscan.io
- Base58 validation for Solana addresses
- Manual validation with button click
- Copy to clipboard functionality
- Responsive design for all devices
- Professional styling with gradients and shadows"

echo.
echo Git repository initialized successfully!
echo.
echo Next steps:
echo 1. Create a repository on GitHub
echo 2. Add remote origin: git remote add origin YOUR_REPO_URL
echo 3. Push to GitHub: git push -u origin main
echo.
pause
