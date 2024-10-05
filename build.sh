#!/bin/bash
# install the front and back dependencies
npm install
cd webServer
bun install
cd ..
cd LlmEngine
./build.sh

