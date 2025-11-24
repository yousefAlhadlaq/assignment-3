# Technical Documentation

This document explains how things work in my portfolio website. It's mostly for reference if I need to remember how I built something.

## Table of Contents
1. [How Everything Fits Together](#how-everything-fits-together)
2. [State Management](#state-management)
3. [GitHub API](#github-api)
4. [Filtering and Sorting](#filtering-and-sorting)
5. [Form Validation](#form-validation)
6. [Performance](#performance)
7. [Browser Support](#browser-support)
8. [Known Issues](#known-issues)

---

## How Everything Fits Together

The website has 3 main layers:

**HTML** - The structure
- Semantic tags for better accessibility
- Forms with proper labels
- ARIA labels for screen readers

**CSS** - The styling
- CSS variables for theming
- Grid and Flexbox for layouts
- Responsive breakpoints for mobile
- Animations and transitions

**JavaScript** - The functionality
- State management with localStorage
- API calls to GitHub
- Event listeners for user interactions
- Form validation

**Data Storage**:
- localStorage for saving settings
- GitHub API for repository data
- In-memory arrays for projects

---

## State Management

### The appState Object

I keep all the important data in one object:

```javascript
const appState = {
  theme: 'light' or 'dark',
  userLevel: 'all', 'beginner', 'intermediate', or 'advanced',
  visitStartTime: timestamp when page loaded,
  visitCount: number of times visited,
  projects: array of all projects,
  githubRepos: array from GitHub API,
  formDraft: saved form data
};
```

### How I Save Data

Using localStorage to keep things between visits:

```javascript
// Saving
localStorage.setItem('theme', appState.theme);
localStorage.setItem('formDraft', JSON.stringify(appState.formDraft));

// Loading
const theme = localStorage.getItem('theme') || 'light';
const formDraft = JSON.parse(localStorage.getItem('formDraft') || '{}');
```

localStorage can hold about 5-10MB but I'm only using like 10KB max.

### What Gets Saved
- Theme preference (light/dark)
- User level choice
- Visit count
- Form drafts

---

## GitHub API

### How It Works

I'm using GitHub's REST API to get my repositories.

**URL**: `https://api.github.com/users/yousefalhadlaq/repos`

**No authentication** = 60 requests per hour limit

### The Flow

1. Page loads
2. Call fetchGitHubRepos()
3. fetch() makes the request
4. If successful: parse JSON and display repos
5. If failed: show error message

### Error Handling

I check for different types of errors:
- Network down (no internet)
- HTTP errors (404, 500, rate limit)
- Invalid JSON
- Missing data

```javascript
try {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  const repos = await response.json();
  // do stuff with repos
} catch (error) {
  console.error('Failed:', error);
  // show user-friendly error
}
```

### Date Formatting

I convert GitHub's timestamps to friendly text:

- "today" if same day
- "yesterday" if 1 day ago
- "3 days ago" for recent
- "2 weeks ago" for longer
- "3 months ago" for even longer

---

## Filtering and Sorting

### How Filtering Works

1. Start with all projects
2. Apply category filter if selected
3. Apply difficulty level filter if selected
4. Sort the results
5. Display on page

```javascript
function applyFiltersAndSort() {
  let filtered = [...appState.projects];  // copy array

  // Category filter
  if (selectedCategory !== 'all') {
    filtered = filtered.filter(p => p.category === selectedCategory);
  }

  // Level filter
  if (appState.userLevel !== 'all') {
    filtered = filtered.filter(p => p.level === appState.userLevel);
  }

  // Sort
  filtered.sort((a, b) => {
    // sorting logic here
  });

  renderProjects(filtered);
}
```

### Performance

Using the spread operator `...` to copy the array so I don't mess up the original. The filters run in order so if the first filter removes 5 projects, the second filter has less work to do.

---

## Form Validation

### Validation Rules

Each field has its own rules:

**Name**:
- Required
- 2-50 characters
- Only letters and spaces

**Email**:
- Required
- Must match email pattern

**Subject**:
- Required
- At least 5 characters

**Message**:
- Required
- 10-1000 characters

### Real-Time Validation

As you type, it checks if the field is valid:
- Shows ✓ if good
- Shows ✗ if bad
- Displays error message
- Updates character count for message

### Auto-Save with Debouncing

**Problem**: Saving on every keystroke is wasteful

**Solution**: Wait 1 second after user stops typing

```javascript
let timer = null;

function scheduleAutoSave() {
  clearTimeout(timer);  // cancel previous timer

  timer = setTimeout(() => {
    saveDraft();  // save after 1 second
  }, 1000);
}
```

This way I'm not hitting localStorage 50 times per second.

### Email Validation

Using regex to check email format:

```javascript
/^[^\s@]+@[^\s@]+\.[^\s@]+$/
```

Basically checks for: something@something.something

---

## Performance

### Intersection Observer

Instead of checking scroll position constantly, I use Intersection Observer to know when sections come into view:

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // section is visible, add animation
      entry.target.classList.add('fade-in');
    }
  });
});

// Watch all sections
document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});
```

This is way more efficient than scroll listeners.

### CSS Performance

**GPU Acceleration**:
```css
.project-card {
  will-change: transform;
}
```

Tells browser to optimize these elements for animations.

**CSS Variables**:
Makes theme switching fast because I only change a few variables instead of hundreds of properties.

### Image Loading

Using native lazy loading:
```html
<img src="image.jpg" loading="lazy">
```

Images only load when they're about to appear on screen.

### DOM Updates

Instead of updating DOM multiple times:
```javascript
// Bad - multiple updates
repos.forEach(repo => {
  container.appendChild(createCard(repo));
});

// Good - single update
container.innerHTML = repos.map(createHTML).join('');
```

Single update = one reflow instead of many.

---

## Browser Support

### What Works

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | Works |
| Firefox | 88+ | Works |
| Safari | 14+ | Works |
| Edge | 90+ | Works |

### What I'm Using

**JavaScript**:
- ES6+ (arrow functions, template literals, etc.)
- async/await
- fetch API
- localStorage
- Intersection Observer

**CSS**:
- Grid and Flexbox
- CSS variables
- Animations
- Media queries

No polyfills needed for modern browsers.

---

## Known Issues

### GitHub API Rate Limit
- **Problem**: Only 60 requests per hour
- **Effect**: If you refresh too much, it stops working temporarily
- **Solution**: Could add authentication to get 5000 req/hr but didn't do it yet

### Contact Form
- **Problem**: Doesn't actually send emails
- **Effect**: Just shows success message
- **Why**: Would need a backend server (PHP, Node.js, etc.)

### localStorage in Private Mode
- **Problem**: Some browsers block localStorage in private/incognito mode
- **Effect**: Settings don't save
- **Solution**: Could add a check and show a message

### Image Placeholders
- **Problem**: Using placeholder images
- **Solution**: Need to add real project screenshots

---

## File Organization

### HTML (index.html)
- One file with all sections
- Semantic tags throughout
- Forms with proper validation attributes

### CSS (css/styles.css)
Organized by sections:
- Variables (lines 1-50)
- Resets (51-80)
- Navigation (81-150)
- Hero section (151-220)
- Content sections (221-600)
- Forms (601-750)
- Footer (751-800)
- Animations (801-850)
- Responsive styles (851-920)

### JavaScript (js/script.js)
Organized by feature:
- State management (lines 1-20)
- Visit timer (21-50)
- Theme toggle (51-75)
- User preferences (76-130)
- Projects data (131-250)
- Filtering/sorting (251-380)
- GitHub API (381-520)
- Form validation (521-780)
- Performance (781-862)

---

## Testing

### What I Tested
- Theme toggle saves and loads
- Timer counts up correctly
- Visit counter increments
- GitHub API fetches repos
- Filters work together
- Sorting maintains filters
- Form validation catches errors
- Auto-save works
- Mobile responsive

### Browsers Tested
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Mobile Safari (iPhone)

### Screen Sizes Tested
- Desktop (1920x1080)
- Laptop (1366x768)
- Tablet (768x1024)
- Mobile (375x667)

---

## Future Improvements

### Short Term
- Add real project images
- Backend for contact form
- Better error handling
- Search functionality

### Long Term
- Make it a PWA (Progressive Web App)
- Add service worker for offline mode
- More API integrations
- Blog section
- Admin panel to manage projects

---

## Code Conventions

### Naming
- **Variables**: camelCase (projectsData, userName)
- **Constants**: UPPER_SNAKE_CASE (GITHUB_API_URL)
- **CSS classes**: kebab-case (project-card, nav-links)
- **Functions**: verbFirst (fetchGitHubRepos, updateTimer)

### Comments
- Comment complex logic
- Explain "why" not "what"
- Section headers for organization

---

**Last Updated**: November 2024
**Author**: Yousef Alhadlaq
**Course**: SWE363 - Assignment 3

---

*Note: This documentation might not be perfect but it covers the main technical stuff. If I come back to this project later, this should help me remember how everything works.*
