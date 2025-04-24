        // Debounce function to limit scroll event frequency
        window.onload = function() {
            setTimeout(() => {
                document.body.classList.add('loaded');
            }, 2000); // Total 2s: 0.5s fade-in + 1s display + 0.5s fade-out
        };
        
        function debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }

        // Hamburger menu toggle
        const hamburger = document.querySelector('.hamburger');
        const sidebar = document.querySelector('.sidebar');
        const closeBtn = document.querySelector('.close-btn');
        const container = document.querySelector('.container');

        hamburger.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            container.classList.toggle('sidebar-open');
        });

        closeBtn.addEventListener('click', () => {
            sidebar.classList.remove('active');
            container.classList.remove('sidebar-open');
        });

        // Smooth scrolling for nav links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                // Remove active class from all links
                document.querySelectorAll('.sidebar nav ul li a').forEach(link => {
                    link.classList.remove('active');
                });
                // Add active class to clicked link
                anchor.classList.add('active');
                // Scroll to section
                document.querySelector(anchor.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
                // Close navbar on mobile
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('active');
                    container.classList.remove('sidebar-open');
                }
            });
        });

        // Highlight active section on scroll
        const highlightActiveSection = debounce(() => {
            const sections = document.querySelectorAll('.section');
            const navLinks = document.querySelectorAll('.sidebar nav ul li a');
            let currentSection = '';

            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= window.innerHeight / 3 && rect.bottom >= window.innerHeight / 3) {
                    currentSection = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        }, 100);

        // Attach scroll event listener
        window.addEventListener('scroll', highlightActiveSection);

        // Run on page load to set initial active section
        highlightActiveSection();