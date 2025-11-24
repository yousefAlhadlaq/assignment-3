# Portfolio Website - Assignment 3

This is my portfolio website for SWE363 Assignment 3. It's basically a personal website where I show my projects and connect it to GitHub API to pull my repos automatically.

## What's This About

For this assignment I had to make a portfolio website with some advanced features. It builds on what I did in assignment 2 but adds more stuff like:

- Connecting to GitHub API to show my repositories
- Filtering projects by category and difficulty
- Saving user preferences so they stay even after refreshing
- Form validation with autosave

## Main Features

### GitHub API
The website connects to GitHub and pulls my actual repositories. It shows:
- How many repos I have
- Total stars and forks
- My 6 most recent repos
- When they were last updated (like "2 days ago")

If the API doesn't work it just shows an error message instead of breaking.

### Project Filtering
You can filter the projects section by:
- Category (cybersecurity, data science, machine learning, web dev)
- Difficulty level (beginner, intermediate, advanced)
- Sort them by date or name

All the filters work together and update instantly without reloading the page.

### Form with Validation
The contact form checks if you're filling it correctly:
- Shows checkmarks or X marks as you type
- Email has to be a valid format
- Message can't be more than 1000 characters
- It saves your draft automatically so you don't lose it

### Saving User Settings
Whatever you choose gets saved in your browser:
- Light/dark theme preference
- Which difficulty level you selected
- Your form draft
- How many times you visited

Everything stays there even if you close the browser and come back.

### Visit Timer
There's a timer at the top that shows how long you've been on the site. It also tracks how many times you've visited and says "Welcome back!" if you're returning.

### Time-Based Greeting
The greeting in the hero section changes depending on what time of day it is. So it says good morning, good afternoon, etc.

## What I Used

- HTML for the structure
- CSS for styling (used Grid and Flexbox for layouts)
- JavaScript for all the interactive stuff
- GitHub API to fetch repository data
- localStorage to save settings
- Git for version control

## Files Structure

```
assignment-3/
├── index.html              # Main page
├── css/
│   └── styles.css         # All the styling
├── js/
│   └── script.js          # All the JavaScript code
├── assets/
│   └── images/            # Images for projects
├── docs/
│   ├── ai-usage-report.md        # How I used AI
│   └── technical-documentation.md # Technical details
└── README.md              # This file
```

## How to Run It

Just download the files and open index.html in your browser. That's it.

If you want to edit it:
1. Clone or download the repo
2. Open index.html in a browser
3. Or use VS Code Live Server if you have it

To change the GitHub username to yours:
- Open js/script.js
- Find the line with `GITHUB_USERNAME` (around line 420)
- Change it to your GitHub username

## How to Use

- Click the moon icon to switch between light and dark mode
- In the About section, pick a difficulty level to filter projects
- Use the dropdowns in Projects to filter by category or sort them
- Fill out the contact form - it validates as you type and saves drafts
- Scroll down to see your GitHub repos automatically loaded

## AI Usage

I used Claude AI to help with this project. Mainly for:
- Helping me write code faster
- Debugging when things didn't work
- Suggesting better ways to do things
- Writing parts of the documentation

Everything AI generated I reviewed and changed to fit what I needed. I understand all the code and can explain how it works. Check [docs/ai-usage-report.md](docs/ai-usage-report.md) for details.

## What I Learned

This assignment taught me a lot:

- How to use APIs (specifically the GitHub one)
- How fetch() works and dealing with async code
- localStorage for saving data
- How to build complex filters that work together
- Form validation and giving users feedback
- Making websites perform better

## Issues

- GitHub API only allows 60 requests per hour without logging in, so if you refresh too much it might stop working temporarily
- The contact form doesn't actually send emails (would need a backend for that)
- Some project images are placeholders for now

## Future Improvements

Things I might add later:
- Real project screenshots
- Backend to actually send the contact form
- Search bar for projects
- More animations
