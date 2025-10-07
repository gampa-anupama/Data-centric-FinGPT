@echo off
echo Fixing Expo development server issues...

echo.
echo Step 1: Clearing npm cache...
npm cache clean --force

echo.
echo Step 2: Removing node_modules and package-lock.json...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json

echo.
echo Step 3: Reinstalling dependencies...
npm install

echo.
echo Step 4: Starting Expo with cleared cache...
npx expo start --clear

echo.
echo Done! The app should now start properly.
pause