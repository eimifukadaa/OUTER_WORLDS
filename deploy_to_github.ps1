# Deploy to GitHub Automation Script
Write-Host "🚀 Starting Deployment Process..." -ForegroundColor Cyan

# 1. Initialize Git if not already done
if (-not (Test-Path ".git")) {
    Write-Host "Initializing Git repository..."
    git init
}

# 2. Add all files
Write-Host "Adding files to stage..."
git add .

# 3. Commit
Write-Host "Committing changes..."
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
git commit -m "Automated deployment update: $timestamp"

# 4. Rename branch to main
git branch -M main

# 5. Add/Update Remote
# Check if remote exists
$remote = git remote get-url origin 2>$null
if ($remote) {
    Write-Host "Remote 'origin' already exists. Updating URL..."
    git remote set-url origin https://github.com/eimifukadaa/OUTER_WORLDS.git
} else {
    Write-Host "Adding remote 'origin'..."
    git remote add origin https://github.com/eimifukadaa/OUTER_WORLDS.git
}

# 6. Push
Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
git push -u origin main

if ($?) {
    Write-Host "✅ Successfully pushed to GitHub!" -ForegroundColor Green
    Write-Host "Now go to your Railway Project -> New -> GitHub Repo -> Select 'OUTER_WORLDS'" -ForegroundColor Cyan
} else {
    Write-Host "❌ Push failed. Please check your GitHub credentials." -ForegroundColor Red
}
