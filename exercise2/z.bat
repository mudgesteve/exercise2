ECHO OFF

cls
:: Skip over with this
GOTO PROMPT_ME


:: This batch file details
TITLE My System info
ECHO Plesae Wait....
:: Sec 1
ECHO ========================
ECHO Windows info
ECHO ========================
systeminfo | findstr /c:"OS Name"
systeminfo | findstr /c:"Version"
systeminfo | findstr /c:"System Type"

:: Sec 2
ECHO ========================
ECHO Hardware info
ECHO ========================
systeminfo | findstr /c:"Total Physical Memory"
wmic cpu get name
wmic path win32_videocontroller get name
wmic path win34_videocontroller get name

:: Sec 2
ECHO ========================
ECHO Network info
ECHO ========================
ipconfig | findstr IPv4
ipconfig | findstr IPv6

:PROMPT_ME

:MENU
ECHO ...............................................
ECHO Enter the mode for this run
ECHO ...............................................
ECHO 1. config
ECHO 2. data
ECHO 3. handlers
ECHO 4. helpers
ECHO 5. server
ECHO 6. workers
ECHO 7. http
echo.

set /p web=Type option:
if "%web%"=="1" goto CONFIG
if "%web%"=="2" goto DATA
if "%web%"=="3" goto HANDLERS
if "%web%"=="4" goto HELPERS
if "%web%"=="5" goto SERVER
if "%web%"=="6" goto WORKERS
if "%web%"=="7" goto HTTP

GOTO END

:CONFIG 
SET NODE_DEBUG=config
echo config

GOTO END

:DATA 
SET NODE_DEBUG=data
GOTO END

:HANDLERS 
SET NODE_DEBUG=handlers
GOTO END

:HELPERS 
SET NODE_DEBUG=helpers
GOTO END

:SERVER 
SET NODE_DEBUG=server
GOTO END

:WORKERS 
SET NODE_DEBUG=workers
GOTO END

:HTTP 
SET NODE_DEBUG=http
GOTO END

::note use : end at bottom at times
:END 


SET NODE_ENV=staging
SET HTTP_PORT=3000
SET HTTPS_PORT=3001
SET HTTP_PORT_PROD=5000
SET HTTPS_PORT_PORT=5001

ECHO All Done....
node index.js
