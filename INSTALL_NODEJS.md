# How to Install Node.js on Windows

## Step-by-Step Installation Guide

### Step 1: Download Node.js

1. Open your web browser
2. Go to: **https://nodejs.org/**
3. You'll see two download options:
   - **LTS (Long Term Support)** - Recommended for most users
   - **Current** - Latest features
4. Click on the **LTS version** to download

### Step 2: Run the Installer

1. Once downloaded, locate the file (usually in your Downloads folder)
2. Double-click the `.msi` file to run the installer
3. Click **Next** on the welcome screen

### Step 3: Accept License Agreement

1. Read the license agreement
2. Check "I accept the terms in the License Agreement"
3. Click **Next**

### Step 4: Choose Installation Location

1. Keep the default installation path (usually `C:\Program Files\nodejs\`)
2. Click **Next**

### Step 5: Custom Setup

1. Keep all default features selected:
   - Node.js runtime
   - npm package manager
   - Online documentation shortcuts
   - Add to PATH
2. Click **Next**

### Step 6: Tools for Native Modules (Optional)

1. You can check the box to "Automatically install the necessary tools"
2. This is optional but recommended
3. Click **Next**

### Step 7: Install

1. Click **Install**
2. Wait for the installation to complete (may take a few minutes)
3. Click **Finish**

### Step 8: Verify Installation

1. **Close any open terminals/command prompts**
2. Open a **new** PowerShell or Command Prompt
3. Type the following commands:

```bash
node --version
```
You should see something like: `v20.x.x`

```bash
npm --version
```
You should see something like: `10.x.x`

### Step 9: You're Ready!

Now you can run the hostel finder application:

```bash
cd D:\hostello
npm install
npm run seed
npm start
```

## Troubleshooting

### "node is not recognized" error after installation

1. **Restart your computer** - This ensures PATH is updated
2. Open a **new** terminal window
3. Try the commands again

### Still not working?

1. Search for "Environment Variables" in Windows
2. Click "Edit the system environment variables"
3. Click "Environment Variables" button
4. Under "System variables", find "Path"
5. Click "Edit"
6. Make sure these paths exist:
   - `C:\Program Files\nodejs\`
   - `C:\Users\[YourUsername]\AppData\Roaming\npm`
7. Click OK on all windows
8. Restart your terminal

## Alternative: Use Chocolatey (Advanced)

If you have Chocolatey package manager installed:

```bash
choco install nodejs
```

## Alternative: Use Winget (Windows 11)

If you have Windows 11 with winget:

```bash
winget install OpenJS.NodeJS.LTS
```

---

After installation, come back and run:
```bash
npm install
npm run seed
npm start
```
