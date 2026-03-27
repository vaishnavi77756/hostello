# Setup Instructions for Hostel Finder

## Issue: Node.js is not installed

Your system doesn't have Node.js installed, which is required to run the backend server.

## Option 1: Install Node.js (Recommended for Full Backend)

1. **Download Node.js:**
   - Go to: https://nodejs.org/
   - Download the LTS (Long Term Support) version for Windows
   - Run the installer and follow the installation steps
   - Make sure to check "Add to PATH" during installation

2. **Verify Installation:**
   Open a new terminal and run:
   ```bash
   node --version
   npm --version
   ```

3. **Install Dependencies:**
   ```bash
   npm install
   ```

4. **Make sure MongoDB is running:**
   - Open MongoDB Compass
   - It should be connected to localhost:27017

5. **Seed the Database:**
   ```bash
   npm run seed
   ```

6. **Start the Server:**
   ```bash
   npm start
   ```

7. **Open in Browser:**
   ```
   http://localhost:3000
   ```

## Option 2: Use Without Backend (Quick Start)

If you want to test the website immediately without installing Node.js, I can modify the code to work with just the browser (using localStorage instead of MongoDB).

The website will work but data won't persist after closing the browser.

**To use this option:**
- Just open `index.html` directly in your browser
- All features will work but data is stored locally in browser

## Option 3: Use Online MongoDB (No Local MongoDB Required)

If you install Node.js but don't want to use local MongoDB:

1. Create a free account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get your connection string
4. Update the `.env` file with your MongoDB Atlas connection string

## Recommended: Option 1

For the full experience with persistent database storage, install Node.js and use MongoDB Compass (which you already have).

## Need Help?

Let me know which option you'd like to proceed with:
1. Install Node.js (I can guide you)
2. Use browser-only version (I'll modify the code)
3. Use MongoDB Atlas (I'll help you set it up)
