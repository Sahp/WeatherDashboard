#!/bin/bash
echo "Deploying to GitHub..."
git add .
git commit -m "Update Weather Dashboard - $(date)"
git push origin main
echo "Deployed successfully!"