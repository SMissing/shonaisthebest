// State management
let currentSection = 0;
const totalSections = 6;

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    // Create snowflakes
    createSnowflakes();
    
    // Load saved progress
    const savedSection = localStorage.getItem('christmasSection');
    const savedTeam = localStorage.getItem('selectedTeam');
    
    if (savedSection !== null) {
        currentSection = parseInt(savedSection, 10);
    }
    
    // Restore team selection if applicable
    if (savedTeam && currentSection >= 3) {
        selectTeam(savedTeam, true);
    }
    
    // Show current section
    showSection(currentSection);
    
    // Update section 5 with team name if team is selected
    if (savedTeam && currentSection >= 4) {
        updateTeamName(savedTeam);
    }
});

// Create snowflakes
function createSnowflakes() {
    const snowContainer = document.querySelector('.snow-container');
    if (!snowContainer) return;
    
    const snowflakeSymbols = ['❄', '❅', '❆'];
    const numSnowflakes = 50;
    
    for (let i = 0; i < numSnowflakes; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.textContent = snowflakeSymbols[Math.floor(Math.random() * snowflakeSymbols.length)];
        
        // Random starting position
        snowflake.style.left = Math.random() * 100 + '%';
        
        // Random animation duration (5-15 seconds)
        const duration = 5 + Math.random() * 10;
        snowflake.style.animationDuration = duration + 's';
        
        // Random delay
        snowflake.style.animationDelay = Math.random() * 2 + 's';
        
        // Random size
        const size = 0.8 + Math.random() * 0.7;
        snowflake.style.fontSize = (size * 1.5) + 'em';
        snowflake.style.opacity = 0.6 + Math.random() * 0.4;
        
        snowContainer.appendChild(snowflake);
    }
}

// Show specific section
function showSection(index, animate = false) {
    const sections = document.querySelectorAll('.section');
    const currentSectionEl = sections[currentSection];
    const nextSectionEl = sections[index];
    
    if (animate && currentSectionEl && nextSectionEl && index !== currentSection) {
        // Add swiping-out class to current section
        currentSectionEl.classList.add('swiping-out');
        currentSectionEl.classList.remove('active');
        
        // Prepare next section for swiping in
        nextSectionEl.classList.add('swiping-in');
        nextSectionEl.style.display = 'block';
        
        // Trigger animation
        setTimeout(() => {
            nextSectionEl.classList.add('active');
            nextSectionEl.classList.remove('swiping-in');
        }, 50);
        
        // Clean up after animation
        setTimeout(() => {
            currentSectionEl.classList.remove('swiping-out');
            currentSectionEl.style.display = 'none';
        }, 600);
    } else {
        // Simple show/hide without animation
        sections.forEach((section, i) => {
            if (i === index) {
                section.classList.add('active');
                section.style.display = 'block';
            } else {
                section.classList.remove('active', 'swiping-out', 'swiping-in');
                section.style.display = 'none';
            }
        });
    }
    
    // Save progress
    localStorage.setItem('christmasSection', index.toString());
}

// Next section with swipe-up animation
function nextSection() {
    if (currentSection < totalSections - 1) {
        const nextIndex = currentSection + 1;
        showSection(nextIndex, true);
        currentSection = nextIndex;
    }
}

// Team selection
function selectTeam(team, silent = false) {
    // Remove previous selection
    document.querySelectorAll('.team-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Select new team
    const selectedCard = document.querySelector(`[data-team="${team}"]`);
    if (selectedCard) {
        selectedCard.classList.add('selected');
        
        // Save selection
        localStorage.setItem('selectedTeam', team);
        
        // Show confetti if not silent (user interaction)
        if (!silent) {
            createConfetti();
            // Automatically move to next section after a short delay
            setTimeout(() => {
                nextSection();
            }, 1500); // Wait 1.5 seconds to show confetti and selection animation
        }
    }
    
    // Update team name in section 5
    updateTeamName(team);
}

// Update team name in section 5
function updateTeamName(team) {
    const teamNameSpan = document.getElementById('team-name');
    const adoptionText = document.getElementById('adoption-text');
    
    if (teamNameSpan) {
        const teamName = team === 'sloth' ? 'Team Sloth' : 'Team Capybara';
        teamNameSpan.textContent = teamName;
    }
    
    if (adoptionText) {
        const animalName = team === 'sloth' ? 'sloth' : 'capybara';
        adoptionText.textContent = `And we're adopting your chosen ${animalName} with an adoption pack.`;
    }
}

// Create confetti effect
function createConfetti() {
    const container = document.getElementById('confetti');
    const colors = ['#c41e3a', '#8b1538', '#1b5e20', '#0d3e1a', '#d4af37', '#f4d03f', '#ffffff'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confetti.style.width = (Math.random() * 10 + 5) + 'px';
        confetti.style.height = (Math.random() * 10 + 5) + 'px';
        
        container.appendChild(confetti);
        
        // Remove after animation
        setTimeout(() => {
            confetti.remove();
        }, 3500);
    }
}

// Submit ring size
function submitRingSize() {
    const input = document.getElementById('ring-size');
    const message = document.getElementById('cheeky-msg');
    const value = input.value.trim();
    
    if (value) {
        // Save ring size (just for fun, not used elsewhere)
        localStorage.setItem('ringSize', value);
        
        // Show cheeky message
        message.classList.remove('hidden');
        
        // Clear input
        input.value = '';
        
        // Scroll to message
        message.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
        // Focus input if empty
        input.focus();
    }
}

// Allow Enter key to submit ring size
document.addEventListener('DOMContentLoaded', () => {
    const ringSizeInput = document.getElementById('ring-size');
    if (ringSizeInput) {
        ringSizeInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                submitRingSize();
            }
        });
    }
});

// Restart experience from the beginning
function restartExperience() {
    // Reset state
    const oldSection = currentSection;
    currentSection = 0;
    
    // Clear saved progress
    localStorage.removeItem('christmasSection');
    localStorage.removeItem('selectedTeam');
    
    // Reset team selection UI
    document.querySelectorAll('.team-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Reset team name placeholders
    const teamNameSpan = document.getElementById('team-name');
    const adoptionText = document.getElementById('adoption-text');
    if (teamNameSpan) {
        teamNameSpan.textContent = 'Team Sloth or Team Capybara';
    }
    if (adoptionText) {
        adoptionText.textContent = 'And we\'re adopting your chosen animal with an adoption pack.';
    }
    
    // Reset ring size form
    const ringInput = document.getElementById('ring-size');
    const cheekyMsg = document.getElementById('cheeky-msg');
    if (ringInput) {
        ringInput.value = '';
    }
    if (cheekyMsg) {
        cheekyMsg.classList.add('hidden');
    }
    
    // Show first section with animation if not already there
    if (oldSection !== 0) {
        showSection(0, true);
    } else {
        showSection(0, false);
    }
    
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

