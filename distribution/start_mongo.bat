@echo off

REM First terminal

cd "C:\Program Files\MongoDB\Server\7.0\bin" 
start mongod --port 27217 --dbpath "C:\Program Files\MongoDB\Server\7.0\data\eurobankReplicaSet\rs0" --replSet myReplicaSet1

REM Second terminal
start mongod --port 27218 --dbpath "C:\Program Files\MongoDB\Server\7.0\data\eurobankReplicaSet\rs1" --replSet myReplicaSet1

REM Third terminal
start mongod --port 27219 --dbpath "C:\Program Files\MongoDB\Server\7.0\data\eurobankReplicaSet\rs2" --replSet myReplicaSet1

set "batch_dir=%~dp0"

cd "%batch_dir%/back-end"

start server-win.exe

cd "%batch_dir%/front-end"

start front-end-server-win.exe

"C:\Program Files\MongoDB\Server\7.0\data\eurobankReplicaSet\rs0" 