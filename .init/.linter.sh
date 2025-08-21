#!/bin/bash
cd /home/kavia/workspace/code-generation/animal-content-explorer-128380-128389/animals_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

