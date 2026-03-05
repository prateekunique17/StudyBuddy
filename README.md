# StudyBuddy - Your Personal AI Academic Companion

Welcome to **StudyBuddy**! This is a complete, real-time AI study platform built for students. It offers tools like an AI Study Planner, Lecture2Notes (summarizes transcripts), ExamVision (solves image problems step-by-step), Career Roadmaps, and Smart Notes formatting.

This guide is written specifically for beginners. If you cloned this repository and want to run it on your own computer, just follow these simple steps!

---

## 🚀 1. What You Need Installed First

Before you start typing commands, you need to make sure your computer has the main engine installed:
*   **Node.js**: This is what runs the code. Go to [nodejs.org](https://nodejs.org/) and download the "LTS" (Long Term Support) version. Install it like any normal program.

## 📥 2. How to Start the Project

### Step A: Open your Terminal
Open your computer's terminal:
*   **Windows**: Press the Windows Key, type `cmd` or `powershell`, and hit Enter.
*   **Mac**: Press Command + Space, type `Terminal`, and hit Enter.

### Step B: Clone the Repository
If you haven't already downloaded the code, run this command to copy it to your computer:
```bash
git clone https://github.com/prateekunique17/StudyBuddy.git
cd StudyBuddy
```

### Step C: Install the Project Files
Now that you are inside the `StudyBuddy` folder, you need to download all the bits and pieces (dependencies) that make the app work. Run this command:

```bash
cd frontend
npm install
```
*(Wait a minute or two for this to finish loading. It's downloading all the toolkits!)*

---

## 🔑 3. Setting Up Your Secret Keys (Environment Variables)

This app uses AI (Google Gemini) and a Database (Supabase). You need your own keys for these to work.

1. **Inside the `frontend` folder**, create a brand new file named exactly `.env.local`
2. Open that file in Notepad or your code editor, and paste this inside:

```text
VITE_SUPABASE_URL="your-supabase-url-here"
VITE_SUPABASE_ANON_KEY="your-supabase-anon-key-here"
```

3. **In the same `frontend` folder**, find or create another file named exactly `.env` and put your Gemini API key inside it:

```text
VITE_GEMINI_API_KEY="your-google-gemini-key-here"
```
*(Make sure there are no spaces around the `=` sign!)*

### How to get a Gemini API Key (Free):
1. Go to Google AI Studio: https://aistudio.google.com/
2. Sign in with your Google account.
3. Click "Get API key" on the left menu.
4. Click "Create API key" and copy the long string of letters and numbers!

### How to get Supabase Keys (Free):
1. Go to https://supabase.com/ and create a new project.
2. Go to Project Settings -> API.
3. Copy the "Project URL" into `VITE_SUPABASE_URL`.
4. Copy the "anon public" key into `VITE_SUPABASE_ANON_KEY`.

---

## ⚡ 4. Start the Application!

You are finally ready. Make sure your terminal is still inside the `frontend` folder, and type:

```bash
npm run dev
```

You will see a message that says `Local: http://localhost:5173/`. 
**Hold the `Ctrl` key (Windows) or `Cmd` key (Mac) and click that link**, or copy and paste it into your Chrome browser. 

Congratulations, StudyBuddy is now running on your machine! 🎉

---

## 🛑 5. Help! My Gemini API Key is Finished / Not Working!

Since Gemini gives you a free tier, you might occasionally run out of requests if you use it heavily (Error 429), or your key might expire.

**If the AI is failing to generate responses, do this:**
1. You just need a new Key. Go back to [Google AI Studio](https://aistudio.google.com/) using a different Google account (or create a new free API key in your current account if allowed).
2. Copy the new API Key.
3. Open your `.env` file inside the `frontend` folder.
4. Delete your old key and paste the new one: `VITE_GEMINI_API_KEY="AIzaSy...YourNewKey"`
5. Save the file.
6. Go to your terminal running `npm run dev`, click inside it, and press `Ctrl + C` to stop the server.
7. Type `npm run dev` and press Enter to start it back up with the fresh key!

---

### Folder Structure (For Developers)

*   `frontend/` - Contains everything you see on the screen (React, Tailwind CSS, TypeScript).
*   `frontend/components/` - The reusable UI blocks (GlassCards, Sidebar).
*   `frontend/modules/` - The main screens (Study Planner, ExamVision, etc.).
*   `frontend/services/` - The files that talk to the AI (`aiService.ts`) and Database (`supabaseClient.ts`).
