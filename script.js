// State Management
let currentSection = 1;
let selectedTeam = null;
const totalSections = 6;

// Initialize from localStorage
function initFromStorage() {
    const savedSection = localStorage.getItem('christmasUnwrap_section');
    const savedTeam = localStorage.getItem('christmasUnwrap_team');
    
    if (savedSection) {
        currentSection = parseInt(savedSection, 10);
        if (currentSection < 1 || currentSection > totalSections) {
            currentSection = 1;
        }
    }
    
    if (savedTeam) {
        selectedTeam = savedTeam;
        updateTeamSelection(savedTeam);
    }
    
    showSection(currentSection);
}

// Show specific section
function showSection(sectionNum) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(`section${sectionNum}`);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Update section 5 if team is selected
    if (sectionNum === 5 && selectedTeam) {
        updateSection5Content(selectedTeam);
    }
}

// Advance to next section with unwrap animation
function advanceSection() {
    if (currentSection >= totalSections) {
        return;
    }
    
    // Trigger unwrap animation
    triggerUnwrapAnimation(() => {
        currentSection++;
        localStorage.setItem('christmasUnwrap_section', currentSection.toString());
        showSection(currentSection);
    });
}

// Unwrap animation
function triggerUnwrapAnimation(callback) {
    const overlay = document.getElementById('unwrapOverlay');
    overlay.classList.add('active');
    
    setTimeout(() => {
        overlay.classList.remove('active');
        if (callback) {
            callback();
        }
    }, 1200);
}

// Team selection
function selectTeam(team) {
    if (selectedTeam) {
        return; // Already selected
    }
    
    selectedTeam = team;
    localStorage.setItem('christmasUnwrap_team', team);
    
    // Update UI
    updateTeamSelection(team);
    
    // Show celebration
    showCelebration();
    
    // Show reveal button
    const teamSelected = document.getElementById('teamSelected');
    teamSelected.classList.remove('hidden');
}

// Update team selection UI
function updateTeamSelection(team) {
    const slothCard = document.getElementById('teamSloth');
    const capybaraCard = document.getElementById('teamCapybara');
    
    if (team === 'sloth') {
        slothCard.classList.add('selected');
        capybaraCard.disabled = true;
        capybaraCard.style.opacity = '0.5';
    } else if (team === 'capybara') {
        capybaraCard.classList.add('selected');
        slothCard.disabled = true;
        slothCard.style.opacity = '0.5';
    }
}

// Show celebration animation
function showCelebration() {
    createConfetti();
    
    // Bounce animation is handled by CSS
    const celebrationText = document.querySelector('.celebration-text');
    if (celebrationText) {
        celebrationText.style.animation = 'bounceIn 0.6s ease-out';
    }
}

// Create confetti
function createConfetti() {
    const container = document.getElementById('confettiContainer');
    const colors = ['#B85C5C', '#C97D7D', '#D4A574', '#8B7355'];
    
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
        }, 3000);
    }
}

// Update section 5 content based on team
function updateSection5Content(team) {
    const adoptionText = document.getElementById('adoptionText');
    const adoptionBullet = document.getElementById('adoptionBullet');
    
    if (team === 'sloth') {
        if (adoptionText) {
            adoptionText.textContent = 'And we're adopting a sloth with an adoption pack.';
        }
        if (adoptionBullet) {
            adoptionBullet.textContent = 'Choose Team Sloth adoption pack';
        }
    } else if (team === 'capybara') {
        if (adoptionText) {
            adoptionText.textContent = 'And we're adopting a capybara with an adoption pack.';
        }
        if (adoptionBullet) {
            adoptionBullet.textContent = 'Choose Team Capybara adoption pack';
        }
    }
}

// Submit ring size
function submitRingSize() {
    const input = document.getElementById('ringSize');
    const message = document.getElementById('ringSizeMessage');
    
    if (!input || !message) {
        return;
    }
    
    const ringSize = input.value.trim();
    
    if (ringSize === '') {
        message.textContent = 'Come on, enter something! 😏';
        message.classList.remove('hidden');
        return;
    }
    
    // Save to localStorage (for fun)
    localStorage.setItem('christmasUnwrap_ringSize', ringSize);
    
    // Show cheeky message
    message.textContent = 'Noted… definitely not suspicious at all.';
    message.classList.remove('hidden');
    
    // Disable input
    input.disabled = true;
    const submitBtn = document.querySelector('.ring-submit-btn');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitted ✓';
    }
}

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Allow Enter key to submit ring size
    if (e.key === 'Enter' && currentSection === 6) {
        const input = document.getElementById('ringSize');
        if (input && document.activeElement === input) {
            submitRingSize();
        }
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initFromStorage();
});

