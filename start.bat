@echo off
start cmd /K "npx json-server --watch db.json --port 5000"
start cmd /K "npm start"