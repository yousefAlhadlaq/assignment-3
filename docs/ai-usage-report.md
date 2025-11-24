# How I Used AI for Assignment 3

## Overview

This document explains how I used AI while working on this assignment. I want to be transparent about what AI helped with and what I did myself.

**AI Tool**: Claude Code and chate gbt


---

## Project Setup

**What I needed**: Get the project organized with all the folders and files

**What I asked AI**:
> "Help me set up the project structure for Assignment 3. I need folders for CSS, JS, images, and documentation."

**What AI gave me**:
- Created the folder structure (css/, js/, assets/, docs/)
- Made a .gitignore file
- Helped set up git

**What I changed**:
Nothing really, the structure made sense so I kept it.

**What I learned**:
How to organize a web project properly. Before this I just put everything in one folder which got messy.

---

## HTML Structure

**What I needed**: Build the main HTML page with all the sections

**What I asked AI**:
> "Create the HTML for my portfolio. I need a hero section, about section, projects section with filters, GitHub section, and a contact form."

**What AI gave me**:
Complete HTML with semantic tags like `<header>`, `<nav>`, `<section>`, etc. It included:
- Navigation bar
- Hero section with greeting
- About section
- Projects with filter dropdowns
- GitHub repos section
- Contact form with validation
- Footer

**What I changed**:
- Changed the text to be about me (name, bio, etc.)
- Adjusted some section titles
- Added my GitHub username
- Modified some of the structure to match what I wanted

**What I learned**:
- Why semantic HTML matters (helps with accessibility and SEO)
- How to structure forms properly with labels
- What ARIA labels are and why they help screen readers

---

## CSS Styling

**What I needed**: Make the site look good and responsive

**What I asked AI**:
> "Write CSS for the portfolio. Use CSS variables for theming, make it responsive, and add a dark mode."

**What AI gave me**:
A lot of CSS with:
- CSS custom properties (variables) for colors and spacing
- Dark mode support with data-theme attribute
- Flexbox and Grid layouts
- Animations and transitions
- Responsive breakpoints for mobile

**What I changed**:
- Changed the color scheme to colors I liked better
- Adjusted spacing values because some looked too cramped
- Made animation speeds different (some were too fast)
- Changed some hover effects on the project cards
- Tweaked the mobile breakpoints

**What I learned**:
- CSS variables make theming way easier
- Dark mode is just changing color variables
- Grid is really powerful for layouts
- Mobile-first design makes more sense
- The prefers-reduced-motion thing for accessibility

---

## State Management

**What I needed**: Save user preferences so they persist

**What I asked AI**:
> "Create a state management system using localStorage. Need to save theme, user preferences, visit count, and form drafts."

**What AI gave me**:
```javascript
const appState = {
  theme: localStorage.getItem('theme') || 'light',
  userLevel: localStorage.getItem('userLevel') || 'all',
  visitStartTime: Date.now(),
  visitCount: parseInt(localStorage.getItem('visitCount') || '0') + 1,
  projects: [],
  githubRepos: [],
  formDraft: JSON.parse(localStorage.getItem('formDraft') || '{}')
};
```

**What I changed**:
- Added try-catch for JSON.parse in case the data gets corrupted
- Added console.log statements for debugging
- Made a function to reset state during testing

**What I learned**:
- localStorage is synchronous so don't put huge amounts of data there
- Always validate data from localStorage because users can mess with it
- Centralizing state makes code cleaner
- Now I get why frameworks have state management

---

## Visit Timer

**What I needed**: Show how long someone's been on the site

**What I asked AI**:
> "Make a timer that starts when the page loads, updates every second, and shows time in MM:SS format. Also show a welcome message for returning visitors."

**What AI gave me**:
```javascript
let visitSeconds = 0;

function updateVisitTimer() {
  visitSeconds++;
  const minutes = Math.floor(visitSeconds / 60);
  const seconds = visitSeconds % 60;
  const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  document.getElementById('visitTimer').textContent = `Time on site: ${timeString}`;
}

setInterval(updateVisitTimer, 1000);
```

**What I changed**:
- Thought about adding pause/resume but decided I didn't need it
- Added the welcome back message logic

**What I learned**:
- How setInterval works
- padStart() for formatting numbers with leading zeros
- Basic time calculations

---

## GitHub API Integration

**What I needed**: Fetch my repos from GitHub and display them

**What I asked AI**:
> "Connect to GitHub API to get my repositories. Show the 6 most recent ones with stars, forks, and language. Handle errors if the API fails."

**What AI gave me**:
```javascript
async function fetchGitHubRepos() {
  const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;

  try {
    const response = await fetch(`${GITHUB_API_URL}?sort=updated&per_page=6`);
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    const repos = await response.json();
    // rendering code...
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    // show error message
  }
}
```

**What I changed**:
- Added loading state while fetching
- Made error messages more user-friendly
- Added relative time formatting ("2 days ago" instead of full date)
- Tried to add caching but it got complicated so I kept it simple

**What I learned**:
- How async/await works (way cleaner than promises)
- fetch() API basics
- Error handling is important for APIs
- GitHub has rate limits (60 requests/hour)
- How to parse JSON data
- API requests can fail for many reasons (network, server errors, etc.)

---

## Project Filtering and Sorting

**What I needed**: Filter projects by category and level, plus sort them

**What I asked AI**:
> "Create a filtering system for projects. Filter by category and difficulty level. Also add sorting by date and name. Everything should work together."

**What AI gave me**:
```javascript
function applyFiltersAndSort() {
  let filteredProjects = [...appState.projects];

  // Apply category filter
  if (selectedCategory !== 'all') {
    filteredProjects = filteredProjects.filter(p => p.category === selectedCategory);
  }

  // Apply level filter
  if (appState.userLevel !== 'all') {
    filteredProjects = filteredProjects.filter(p => p.level === appState.userLevel);
  }

  // Apply sorting
  filteredProjects.sort((a, b) => {
    // sorting logic
  });

  renderProjects(filteredProjects);
}
```

**What I changed**:
- Added animations when projects update
- Added a "no results" message
- Made it only update the DOM when needed (better performance)

**What I learned**:
- Array methods: filter(), sort(), map()
- How to chain multiple filters
- The spread operator (...) for copying arrays
- Immutability (not modifying the original array)
- localeCompare() for sorting strings

---

## Form Validation

**What I needed**: Validate the contact form as users type

**What I asked AI**:
> "Create form validation that checks everything in real-time. Show checkmarks or X marks, validate email format, count characters, and save drafts automatically."

**What AI gave me**:
A complete validation system with:
- Validation rules for each field
- Real-time checking as you type
- Visual feedback (✓ or ✗ icons)
- Error messages
- Auto-save with debouncing (waits 1 second after you stop typing)
- Character counter for the message field

**What I changed**:
- Made the email regex better
- Made error messages friendlier
- Added a subject field (wasn't in original requirements)
- Added draft recovery when you reload the page

**What I learned**:
- Regular expressions (regex) for pattern matching
- Event listeners: input, blur, submit
- Debouncing to reduce function calls (better performance)
- Good form UX means immediate feedback
- localStorage for drafts prevents data loss

---

## Performance Stuff

**What I needed**: Make the site load and run faster

**What I asked AI**:
> "Add performance optimizations. Use Intersection Observer for lazy loading sections."

**What AI gave me**:
```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});
```

**What I changed**:
- Adjusted when sections fade in (changed threshold)
- Added loading="lazy" to images
- Did some testing with performance.now() to see improvements

**What I learned**:
- Intersection Observer is way better than scroll listeners
- will-change in CSS tells the browser to optimize animations
- Lazy loading helps initial load time
- prefers-reduced-motion for accessibility

---

## Documentation

**What I needed**: Write README and docs

**What I asked AI**:
> "Help me write documentation for the project. Need a README with features, installation, and usage. Also need technical docs."

**What AI gave me**:
- Complete README with sections
- Feature descriptions
- Installation steps
- Usage guide
- Code references with line numbers

**What I changed**:
- Made it more personal (less formal)
- Updated my info
- Added my own thoughts on future improvements
- Simplified some explanations

**What I learned**:
- Good docs are really important
- README is what people see first
- Code examples help a lot

---

## Summary

### What AI Helped With

**Benefits**:
- **Speed**: Finished way faster than doing everything from scratch
- **Learning**: Learned modern practices I didn't know
- **Debugging**: AI caught errors I would've spent hours debugging
- **Best Practices**: AI suggested patterns I hadn't seen before

**Challenges**:
- Had to understand everything AI wrote (took time to research concepts)
- Some code was too complex for what I needed (over-engineered)
- Had to customize everything to fit my project
- Still had to debug when AI code didn't work
- Had to decide which suggestions to use

### My Process

1. Ask AI for specific functionality
2. Read all the code carefully
3. Look up anything I didn't understand
4. Test it in the browser
5. Modify to fit my needs
6. Write down what I learned

### Important

Even though AI wrote initial code, I:
- Reviewed every single line
- Made sure I understood how it works
- Changed it to fit what I needed
- Debugged issues myself
- Can explain any part of the code
- Actually learned from it

I used AI as a **learning tool**, not a replacement for learning.

---

## What I Learned Overall

### Technical Skills
- JavaScript ES6+ (async/await, arrow functions, etc.)
- Working with APIs
- localStorage and state management
- CSS Grid and Flexbox
- Responsive design
- Performance optimization
- Accessibility basics

### Other Skills
- Reading and understanding code
- Debugging strategies
- Writing documentation
- Breaking down problems
- Version control with Git

### Best Practices
- Clean code organization
- Good variable names
- Error handling
- User experience
- Mobile-first design

---

## Final Thoughts

AI was super helpful for this project. It sped things up and taught me a lot. But it wasn't magic - I still had to understand everything, test everything, and fix things when they broke.

The key is using AI to learn, not to avoid learning. Every suggestion was a chance to learn something new.

For anyone else using AI:
1. Ask specific questions
2. Read everything carefully
3. Learn from the code
4. Customize for your needs
5. Test thoroughly
6. Be honest about what AI helped with

---

**Written by**: Yousef Alhadlaq
**Course**: SWE363 - Web Engineering
**Assignment**: Assignment 3
**Date**: November 2024

**Honest statement**: This report accurately shows how I used AI. I reviewed and understood all code. I can explain and modify any part of this project.
