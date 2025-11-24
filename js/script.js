// ============================================================================
// STATE MANAGEMENT
// ============================================================================

// Application state object - centralized state management
const appState = {
  theme: localStorage.getItem('theme') || 'light',
  userLevel: localStorage.getItem('userLevel') || 'all',
  visitStartTime: Date.now(),
  visitCount: parseInt(localStorage.getItem('visitCount') || '0') + 1,
  projects: [],
  githubRepos: [],
  formDraft: JSON.parse(localStorage.getItem('formDraft') || '{}')
};

// Save visit count
localStorage.setItem('visitCount', appState.visitCount);

// Apply saved theme on page load
if (appState.theme === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
}

console.log('Portfolio loaded - Visit #' + appState.visitCount);

// ============================================================================
// VISIT TIMER / COUNTER
// ============================================================================

let visitSeconds = 0;

function updateVisitTimer() {
  visitSeconds++;
  const minutes = Math.floor(visitSeconds / 60);
  const seconds = visitSeconds % 60;
  const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const timerElement = document.getElementById('visitTimer');
  if (timerElement) {
    timerElement.textContent = `Time on site: ${timeString}`;
  }
}

// Update timer every second
setInterval(updateVisitTimer, 1000);

// Display welcome back message for returning visitors
function displayWelcomeMessage() {
  const welcomeElement = document.getElementById('welcomeBack');
  if (welcomeElement && appState.visitCount > 1) {
    welcomeElement.textContent = `Welcome back! Visit #${appState.visitCount}`;
    welcomeElement.style.display = 'inline-block';
  }
}

displayWelcomeMessage();

// ============================================================================
// DYNAMIC GREETING BASED ON TIME
// ============================================================================

function displayTimeBasedGreeting() {
  const greetingElement = document.getElementById('dynamicGreeting');
  if (!greetingElement) return;

  const hour = new Date().getHours();
  let greeting = '';

  if (hour >= 5 && hour < 12) {
    greeting = 'Good morning! Ready to explore cybersecurity and data science?';
  } else if (hour >= 12 && hour < 17) {
    greeting = 'Good afternoon! Let\'s dive into some projects.';
  } else if (hour >= 17 && hour < 22) {
    greeting = 'Good evening! Thanks for stopping by.';
  } else {
    greeting = 'Burning the midnight oil? Me too! 🌙';
  }

  greetingElement.textContent = greeting;
}

displayTimeBasedGreeting();

// ============================================================================
// THEME TOGGLE (STATE MANAGEMENT)
// ============================================================================

const themeToggle = document.getElementById('themeToggle');

themeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  // Update DOM
  if (newTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }

  // Update state and localStorage
  appState.theme = newTheme;
  localStorage.setItem('theme', newTheme);

  console.log('Theme changed to:', newTheme);
});

// ============================================================================
// USER LEVEL PREFERENCE (STATE MANAGEMENT)
// ============================================================================

const preferenceButtons = document.querySelectorAll('.pref-btn');
const preferenceMessage = document.getElementById('preferenceMessage');

preferenceButtons.forEach(btn => {
  // Highlight saved preference
  if (btn.dataset.level === appState.userLevel) {
    btn.classList.add('active');
  }

  btn.addEventListener('click', () => {
    const level = btn.dataset.level;

    // Update UI
    preferenceButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Update state and localStorage
    appState.userLevel = level;
    localStorage.setItem('userLevel', level);

    // Show message based on selection
    let message = '';
    switch(level) {
      case 'beginner':
        message = 'Great! I\'ll show you beginner-friendly projects to get started.';
        break;
      case 'intermediate':
        message = 'Perfect! You\'ll see intermediate-level projects with moderate complexity.';
        break;
      case 'advanced':
        message = 'Excellent! Showing advanced projects with complex implementations.';
        break;
      default:
        message = 'Viewing all projects across all difficulty levels.';
    }

    preferenceMessage.textContent = message;
    preferenceMessage.style.display = 'block';

    // Filter projects based on user level
    filterProjectsByUserLevel();
  });
});

// Display saved preference message on load
if (appState.userLevel !== 'all') {
  const activeBtn = document.querySelector(`.pref-btn[data-level="${appState.userLevel}"]`);
  if (activeBtn) {
    activeBtn.click();
  }
}

// ============================================================================
// PROJECTS DATA (Complex Logic Example)
// ============================================================================

const projectsData = [
  {
    id: 1,
    name: 'Cybersecurity Network Protection',
    category: 'cybersecurity',
    level: 'advanced',
    date: '2024-11',
    description: 'Built a machine learning-based intrusion detection system that identifies malicious network traffic patterns using supervised learning algorithms.',
    technologies: ['Python', 'Scikit-learn', 'Wireshark', 'Pandas'],
    image: 'assets/images/cybersecurity.jpg'
  },
  {
    id: 2,
    name: 'Data Science Analytics',
    category: 'data-science',
    level: 'intermediate',
    date: '2024-10',
    description: 'Created an interactive dashboard for visualizing and predicting trends in large datasets using statistical models and data visualization techniques.',
    technologies: ['Python', 'Pandas', 'Plotly', 'NumPy'],
    image: 'assets/images/Data Science.png'
  },
  {
    id: 3,
    name: 'Cybersecurity Tools',
    category: 'cybersecurity',
    level: 'beginner',
    date: '2024-09',
    description: 'A web-based tool that analyzes password strength and provides recommendations for creating secure passwords.',
    technologies: ['JavaScript', 'HTML', 'CSS', 'Regex'],
    image: 'assets/images/cybersecurity.jpg'
  },
  {
    id: 4,
    name: 'Machine Learning Prediction',
    category: 'machine-learning',
    level: 'advanced',
    date: '2024-08',
    description: 'Developed a predictive model to identify customers likely to churn using ensemble learning methods and feature engineering.',
    technologies: ['Python', 'TensorFlow', 'XGBoost', 'Matplotlib'],
    image: 'assets/images/machinelearning1.jpg'
  },
  {
    id: 5,
    name: 'Data Science Pipeline',
    category: 'data-science',
    level: 'beginner',
    date: '2024-07',
    description: 'Automated pipeline for cleaning and preprocessing messy datasets, handling missing values, and preparing data for analysis.',
    technologies: ['Python', 'Pandas', 'NumPy'],
    image: 'assets/images/Data Science.png'
  },
  {
    id: 6,
    name: 'Machine Learning Analysis',
    category: 'machine-learning',
    level: 'intermediate',
    date: '2024-06',
    description: 'Natural language processing tool that analyzes sentiment in text data using BERT and transformer models.',
    technologies: ['Python', 'NLTK', 'Transformers', 'PyTorch'],
    image: 'assets/images/machinelearning1.jpg'
  },
  {
    id: 7,
    name: 'Web Development Portfolio',
    category: 'web-dev',
    level: 'intermediate',
    date: '2024-05',
    description: 'Personal portfolio website with advanced features including API integration, state management, and dynamic content.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'GitHub API'],
    image: 'assets/images/web development.jpeg'
  },
  {
    id: 8,
    name: 'Cybersecurity Assessment',
    category: 'cybersecurity',
    level: 'intermediate',
    date: '2024-04',
    description: 'Educational tool demonstrating SQL injection vulnerabilities and best practices for secure database queries.',
    technologies: ['Python', 'SQLite', 'Flask'],
    image: 'assets/images/cybersecurity.jpg'
  }
];

// Store projects in state
appState.projects = [...projectsData];

// ============================================================================
// PROJECT FILTERING AND SORTING (Complex Logic)
// ============================================================================

function renderProjects(projects) {
  const projectsGrid = document.getElementById('projectsGrid');
  const noProjectsMsg = document.getElementById('noProjects');

  if (projects.length === 0) {
    projectsGrid.innerHTML = '';
    noProjectsMsg.style.display = 'block';
    return;
  }

  noProjectsMsg.style.display = 'none';

  projectsGrid.innerHTML = projects.map(project => `
    <article class="project-card" data-category="${project.category}" data-level="${project.level}">
      <div class="project-image">
        <img src="${project.image}" alt="${project.name}" loading="lazy">
        <div class="project-overlay">
          <span class="project-level">${project.level}</span>
        </div>
      </div>
      <div class="project-content">
        <h3 class="project-title">${project.name}</h3>
        <p class="project-category">${project.category.replace('-', ' ').toUpperCase()}</p>
        <p class="project-description">${project.description}</p>
        <div class="project-tech">
          ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
        <div class="project-date">
          <small>📅 ${formatDate(project.date)}</small>
        </div>
      </div>
    </article>
  `).join('');
}

function formatDate(dateStr) {
  const [year, month] = dateStr.split('-');
  const date = new Date(year, month - 1);
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

// Category Filter
const categoryFilter = document.getElementById('categoryFilter');
categoryFilter.addEventListener('change', applyFiltersAndSort);

// Sort
const sortSelect = document.getElementById('sortProjects');
sortSelect.addEventListener('change', applyFiltersAndSort);

function applyFiltersAndSort() {
  let filteredProjects = [...appState.projects];

  // Apply category filter
  const selectedCategory = categoryFilter.value;
  if (selectedCategory !== 'all') {
    filteredProjects = filteredProjects.filter(p => p.category === selectedCategory);
  }

  // Apply user level filter if set
  if (appState.userLevel !== 'all') {
    filteredProjects = filteredProjects.filter(p => p.level === appState.userLevel);
  }

  // Apply sorting
  const sortValue = sortSelect.value;
  filteredProjects.sort((a, b) => {
    switch(sortValue) {
      case 'date-desc':
        return b.date.localeCompare(a.date);
      case 'date-asc':
        return a.date.localeCompare(b.date);
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  renderProjects(filteredProjects);
}

function filterProjectsByUserLevel() {
  applyFiltersAndSort();
}

// Initial render
renderProjects(appState.projects);

// ============================================================================
// GITHUB API INTEGRATION
// ============================================================================

const GITHUB_USERNAME = 'yousefalhadlaq'; // Replace with your GitHub username
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;

async function fetchGitHubRepos() {
  const reposContainer = document.getElementById('githubRepos');
  const apiError = document.getElementById('apiError');
  const statsElements = {
    repoCount: document.getElementById('repoCount'),
    totalStars: document.getElementById('totalStars'),
    totalForks: document.getElementById('totalForks')
  };

  try {
    // Fetch repositories
    const response = await fetch(`${GITHUB_API_URL}?sort=updated&per_page=6`);

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos = await response.json();
    appState.githubRepos = repos;

    // Calculate stats
    const stats = repos.reduce((acc, repo) => ({
      stars: acc.stars + (repo.stargazers_count || 0),
      forks: acc.forks + (repo.forks_count || 0)
    }), { stars: 0, forks: 0 });

    // Update stats display
    statsElements.repoCount.textContent = repos.length;
    statsElements.totalStars.textContent = stats.stars;
    statsElements.totalForks.textContent = stats.forks;

    // Render repositories
    if (repos.length === 0) {
      reposContainer.innerHTML = '<p class="no-repos">No public repositories found.</p>';
      return;
    }

    reposContainer.innerHTML = repos.map(repo => `
      <div class="repo-card">
        <div class="repo-header">
          <h3 class="repo-name">
            <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
              ${repo.name}
            </a>
          </h3>
          ${repo.language ? `<span class="repo-language">${repo.language}</span>` : ''}
        </div>
        <p class="repo-description">
          ${repo.description || 'No description available'}
        </p>
        <div class="repo-stats">
          <span class="repo-stat">⭐ ${repo.stargazers_count || 0}</span>
          <span class="repo-stat">🔱 ${repo.forks_count || 0}</span>
          <span class="repo-stat">📅 Updated ${formatRepoDate(repo.updated_at)}</span>
        </div>
      </div>
    `).join('');

    apiError.style.display = 'none';

  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    reposContainer.innerHTML = '';
    apiError.style.display = 'block';

    // Set error stats
    statsElements.repoCount.textContent = 'N/A';
    statsElements.totalStars.textContent = 'N/A';
    statsElements.totalForks.textContent = 'N/A';
  }
}

function formatRepoDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'today';
  if (diffDays === 1) return 'yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

// Fetch GitHub repos on page load
fetchGitHubRepos();

// ============================================================================
// CONTACT FORM WITH ADVANCED VALIDATION
// ============================================================================

const contactForm = document.getElementById('contactForm');
const formFields = {
  name: document.getElementById('name'),
  email: document.getElementById('email'),
  subject: document.getElementById('subject'),
  message: document.getElementById('message')
};

const validationIcons = {
  name: document.getElementById('nameValidation'),
  email: document.getElementById('emailValidation'),
  subject: document.getElementById('subjectValidation'),
  message: document.getElementById('messageValidation')
};

const errorMessages = {
  name: document.getElementById('nameError'),
  email: document.getElementById('emailError'),
  subject: document.getElementById('subjectError'),
  message: document.getElementById('messageError')
};

const charCounter = document.getElementById('charCounter');
const draftIndicator = document.getElementById('draftIndicator');
const submitBtn = document.getElementById('submitBtn');
const successMessage = document.getElementById('successMessage');
const sendAnotherBtn = document.getElementById('sendAnotherBtn');

// Auto-save timer
let autoSaveTimer = null;

// Validation rules
const validationRules = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s]+$/,
    message: 'Name must be 2-50 characters and contain only letters'
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address'
  },
  subject: {
    required: true,
    minLength: 5,
    maxLength: 100,
    message: 'Subject must be 5-100 characters'
  },
  message: {
    required: true,
    minLength: 10,
    maxLength: 1000,
    message: 'Message must be 10-1000 characters'
  }
};

// Validate individual field
function validateField(fieldName) {
  const field = formFields[fieldName];
  const rules = validationRules[fieldName];
  const value = field.value.trim();

  let isValid = true;
  let errorMsg = '';

  // Required check
  if (rules.required && !value) {
    isValid = false;
    errorMsg = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
  }

  // Length check
  if (isValid && rules.minLength && value.length < rules.minLength) {
    isValid = false;
    errorMsg = rules.message;
  }

  if (isValid && rules.maxLength && value.length > rules.maxLength) {
    isValid = false;
    errorMsg = rules.message;
  }

  // Pattern check
  if (isValid && rules.pattern && !rules.pattern.test(value)) {
    isValid = false;
    errorMsg = rules.message;
  }

  // Update UI
  if (value) {
    if (isValid) {
      validationIcons[fieldName].textContent = '✓';
      validationIcons[fieldName].className = 'validation-icon valid';
      errorMessages[fieldName].textContent = '';
      field.classList.remove('invalid');
      field.classList.add('valid');
    } else {
      validationIcons[fieldName].textContent = '✗';
      validationIcons[fieldName].className = 'validation-icon invalid';
      errorMessages[fieldName].textContent = errorMsg;
      field.classList.remove('valid');
      field.classList.add('invalid');
    }
  } else {
    validationIcons[fieldName].textContent = '';
    validationIcons[fieldName].className = 'validation-icon';
    errorMessages[fieldName].textContent = '';
    field.classList.remove('valid', 'invalid');
  }

  return isValid;
}

// Character counter for message
formFields.message.addEventListener('input', () => {
  const length = formFields.message.value.length;
  charCounter.textContent = `${length} / 1000`;

  if (length > 1000) {
    charCounter.classList.add('over-limit');
  } else {
    charCounter.classList.remove('over-limit');
  }
});

// Real-time validation for all fields
Object.keys(formFields).forEach(fieldName => {
  formFields[fieldName].addEventListener('input', () => {
    validateField(fieldName);
    scheduleAutoSave();
  });

  formFields[fieldName].addEventListener('blur', () => {
    validateField(fieldName);
  });
});

// Auto-save draft
function scheduleAutoSave() {
  clearTimeout(autoSaveTimer);

  draftIndicator.textContent = 'Saving...';
  draftIndicator.className = 'draft-indicator saving';

  autoSaveTimer = setTimeout(() => {
    saveDraft();
  }, 1000);
}

function saveDraft() {
  const draft = {
    name: formFields.name.value,
    email: formFields.email.value,
    subject: formFields.subject.value,
    message: formFields.message.value,
    timestamp: Date.now()
  };

  localStorage.setItem('formDraft', JSON.stringify(draft));
  appState.formDraft = draft;

  draftIndicator.textContent = 'Draft saved ✓';
  draftIndicator.className = 'draft-indicator saved';

  setTimeout(() => {
    draftIndicator.textContent = '';
    draftIndicator.className = 'draft-indicator';
  }, 2000);
}

// Load saved draft
function loadDraft() {
  if (appState.formDraft.name) {
    formFields.name.value = appState.formDraft.name || '';
    formFields.email.value = appState.formDraft.email || '';
    formFields.subject.value = appState.formDraft.subject || '';
    formFields.message.value = appState.formDraft.message || '';

    // Update character counter
    const length = formFields.message.value.length;
    charCounter.textContent = `${length} / 1000`;

    // Validate loaded fields
    Object.keys(formFields).forEach(fieldName => {
      if (formFields[fieldName].value) {
        validateField(fieldName);
      }
    });
  }
}

loadDraft();

// Form submission
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Validate all fields
  let isFormValid = true;
  Object.keys(formFields).forEach(fieldName => {
    if (!validateField(fieldName)) {
      isFormValid = false;
    }
  });

  if (!isFormValid) {
    // Scroll to first error
    const firstError = contactForm.querySelector('.invalid');
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      firstError.focus();
    }
    return;
  }

  // Simulate form submission
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  setTimeout(() => {
    // Clear form and draft
    contactForm.reset();
    localStorage.removeItem('formDraft');
    appState.formDraft = {};

    // Reset validation UI
    Object.keys(validationIcons).forEach(key => {
      validationIcons[key].textContent = '';
      validationIcons[key].className = 'validation-icon';
      errorMessages[key].textContent = '';
      formFields[key].classList.remove('valid', 'invalid');
    });

    charCounter.textContent = '0 / 1000';

    // Show success message
    contactForm.style.display = 'none';
    successMessage.style.display = 'block';

    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Message';
  }, 1500);
});

// Send another message
sendAnotherBtn.addEventListener('click', () => {
  successMessage.style.display = 'none';
  contactForm.style.display = 'block';
  formFields.name.focus();
});

// ============================================================================
// SMOOTH SCROLLING
// ============================================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ============================================================================
// PERFORMANCE: Intersection Observer for Lazy Loading
// ============================================================================

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});

console.log('All features loaded successfully!');
