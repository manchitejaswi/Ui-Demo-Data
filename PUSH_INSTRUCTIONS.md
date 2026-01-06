# Deployment Instructions for vulnerability-dashboard Branch

## Option 1: Push from GitHub Web Interface (Easiest)

Since the code is already on `copilot/create-security-vulnerability-dashboard` branch:

1. Go to: https://github.com/manchitejaswi/Ui-Demo-Data
2. Click on "Pull requests" tab
3. Create a new pull request from `copilot/create-security-vulnerability-dashboard` to `vulnerability-dashboard`
4. Review and merge the pull request

## Option 2: Push via Command Line

If you have the repository cloned locally with proper credentials:

```bash
cd /path/to/Ui-Demo-Data

# Fetch latest changes
git fetch origin

# Checkout the implementation branch
git checkout copilot/create-security-vulnerability-dashboard
git pull origin copilot/create-security-vulnerability-dashboard

# Create or switch to vulnerability-dashboard branch
git checkout -b vulnerability-dashboard origin/vulnerability-dashboard || git checkout vulnerability-dashboard

# Merge the implementation
git merge copilot/create-security-vulnerability-dashboard --no-ff -m "Merge Security Vulnerability Dashboard implementation"

# Push to remote
git push origin vulnerability-dashboard
```

## Option 3: Direct Branch Rename (Alternative)

If you want to rename the current branch:

```bash
git checkout copilot/create-security-vulnerability-dashboard
git branch -m vulnerability-dashboard
git push origin vulnerability-dashboard -f
```

⚠️ **Note**: Option 3 will overwrite any existing vulnerability-dashboard branch.

## Verification After Push

Once pushed, verify the branch contains:

```
security-dashboard/
├── public/
│   └── ui_demo.json (370+ MB)
├── src/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── types/
│   └── utils/
├── package.json
├── README.md
└── ... (other files)
```

## Running the Application

After the branch is pushed and cloned:

```bash
# Clone the repository
git clone https://github.com/manchitejaswi/Ui-Demo-Data.git
cd Ui-Demo-Data

# Checkout the vulnerability-dashboard branch
git checkout vulnerability-dashboard

# Navigate to the project
cd security-dashboard

# Install dependencies
npm install

# Run development server
npm run dev
```

The application will be available at `http://localhost:5173` or another port.

## Opening in VS Code

```bash
cd security-dashboard
code .
```

---

**Current Status**: All code is committed and pushed to `copilot/create-security-vulnerability-dashboard` branch. Follow any of the options above to deploy to `vulnerability-dashboard` branch.

