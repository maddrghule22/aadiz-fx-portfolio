#!/bin/bash

# Health check script for Aditya Shinde backend

# Check if backend is running
curl -f http://localhost:5000/health || exit 1

# Check if MongoDB is accessible
# Uncomment the following lines if you want to check MongoDB connectivity
# mongo --eval "db.stats()" aadizfx >/dev/null 2>&1 || exit 1

echo "Health check passed"
exit 0