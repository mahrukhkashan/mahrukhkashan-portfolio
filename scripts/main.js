// Mobile menu toggle
document.querySelector('.hamburger')?.addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Form submission with validation
document.querySelector('.contact-form')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const spinner = document.createElement('div');
    spinner.className = 'spinner';
    
    // Validate form
    let isValid = true;
    form.querySelectorAll('[required]').forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            const errorEl = input.nextElementSibling || input.parentNode.nextElementSibling;
            if (errorEl && errorEl.classList.contains('form-error')) {
                errorEl.style.display = 'block';
                errorEl.textContent = 'This field is required';
            }
        }
    });
    
    if (!isValid) return;
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.insertAdjacentElement('afterend', spinner);
    spinner.style.display = 'block';
    
    try {
        // Simulate form submission (replace with actual fetch request)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success message
        const successMsg = document.createElement('div');
        successMsg.className = 'form-submission';
        successMsg.innerHTML = `
            <i class="fas fa-check-circle" style="font-size: 2rem; margin-bottom: 10px;"></i>
            <h3>Thank you for your message!</h3>
            <p>I will get back to you soon.</p>
        `;
        form.parentNode.insertBefore(successMsg, form.nextSibling);
        
        // Hide form
        form.style.display = 'none';
        
        // Reset form
        form.reset();
    } catch (error) {
        alert('There was an error submitting your message. Please try again.');
    } finally {
        submitBtn.disabled = false;
        spinner.remove();
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            document.querySelector('.nav-links').classList.remove('active');
        }
    });
});

// Project filter functionality
const filterButtons = document.querySelectorAll('.project-filter');
if (filterButtons.length) {
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter projects
            const filterValue = this.getAttribute('data-filter');
            const projects = document.querySelectorAll('.project-card');
            
            projects.forEach(project => {
                if (filterValue === 'all' || project.getAttribute('data-category') === filterValue) {
                    project.style.display = 'block';
                } else {
                    project.style.display = 'none';
                }
            });
        });
    });
}