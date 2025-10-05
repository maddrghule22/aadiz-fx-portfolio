#!/bin/bash

# Bash script to deploy Aadiz.FX portfolio website

echo -e "\033[0;32m🚀 Starting Aadiz.FX Deployment Process\033[0m"

# Check if required tools are installed
echo -e "\033[1;33m🔍 Checking prerequisites...\033[0m"

# Check Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "\033[0;32m✅ Node.js $NODE_VERSION found\033[0m"
else
    echo -e "\033[0;31m❌ Node.js not found. Please install Node.js v18 or higher.\033[0m"
    exit 1
fi

# Check MongoDB
if command -v mongod &> /dev/null; then
    echo -e "\033[0;32m✅ MongoDB found\033[0m"
else
    echo -e "\033[1;33m⚠️  MongoDB not found. You'll need to install MongoDB or use MongoDB Atlas.\033[0m"
fi

# Build backend
echo -e "\033[1;33m🏗️  Building backend...\033[0m"
cd backend
npm run build
if [ $? -eq 0 ]; then
    echo -e "\033[0;32m✅ Backend built successfully\033[0m"
else
    echo -e "\033[0;31m❌ Backend build failed\033[0m"
    exit 1
fi

# Build frontend
echo -e "\033[1;33m🏗️  Building frontend...\033[0m"
cd ../project-lensflare
npm run build
if [ $? -eq 0 ]; then
    echo -e "\033[0;32m✅ Frontend built successfully\033[0m"
else
    echo -e "\033[0;31m❌ Frontend build failed\033[0m"
    exit 1
fi

# Return to root directory
cd ..

# Summary
echo -e "\n\033[0;32m✅ Deployment preparation completed successfully!\033[0m"
echo -e "\033[1;33mNext steps:\033[0m"
echo -e "\033[1;33m1. Configure your environment variables in backend/.env and project-lensflare/.env.local\033[0m"
echo -e "\033[1;33m2. Start MongoDB (if using local installation)\033[0m"
echo -e "\033[1;33m3. Run the backend: cd backend && npm start\033[0m"
echo -e "\033[1;33m4. Run the frontend: cd project-lensflare && npm start\033[0m"
echo -e "\033[1;33m5. For production deployment, follow DEPLOYMENT_CHECKLIST.md\033[0m"