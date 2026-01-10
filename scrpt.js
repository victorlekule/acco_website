
     tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                    },
                    colors: {
                        brand: {
                            blue: '#1e3a8a',   /* Trust */
                            orange: '#ea580c', /* Action */
                            green: '#15803d',  /* Growth */
                        }
                    }
                }
            }
        }


//MOBILE MENU TOGGLE SCRIPT//
document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('menu-toggle-btn');
    const menu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('menu-overlay');
    const openIcon = document.getElementById('icon-open');
    const closeIcon = document.getElementById('icon-close');

    if (btn && menu) {
        btn.onclick = function() {
            const isOpening = menu.classList.contains('hidden');

            if (isOpening) {
                // Show Menu and Blur
                menu.classList.remove('hidden');
                overlay.classList.remove('hidden');
                openIcon.classList.add('hidden');
                closeIcon.classList.remove('hidden');
                document.body.style.overflow = 'hidden'; // Lock scroll
            } else {
                // Hide Menu and Blur
                menu.classList.add('hidden');
                overlay.classList.add('hidden');
                openIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
                document.body.style.overflow = ''; // Restore scroll
            }
        };

        // Close when clicking the blurred area
        overlay.onclick = function() {
            menu.classList.add('hidden');
            overlay.classList.add('hidden');
            openIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
            document.body.style.overflow = '';
        };
    }
});


//HOME PAGE SCRIPT//
// --- 2. Animated Counter for Impact Section ---
        const finalValues = {
            stat1: 5200, // Children Reached
            stat2: 450,  // Education Grants
            stat3: 8900, // Healthcare Provided
            stat4: 12500 // Volunteer Hours
        };

        function animateCounter(id, finalValue) {
            const element = document.getElementById(id);
            if (!element) return;

            const duration = 2000; // 2 seconds
            const startTime = performance.now();
            const startValue = 0;

            function updateCounter(timestamp) {
                const elapsed = timestamp - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const currentValue = Math.floor(progress * finalValue);
                
                // Format with comma separators
                element.textContent = currentValue.toLocaleString();

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = finalValue.toLocaleString() + '+'; // Add plus sign at the end
                }
            }
            requestAnimationFrame(updateCounter);
        }
        
        // Intersection Observer to start animation when visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    for (const id in finalValues) {
                        animateCounter(id, finalValues[id]);
                    }
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, { threshold: 0.5 }); // Trigger when 50% of section is visible

        const impactSection = document.getElementById('impact');
        if (impactSection) {
             observer.observe(impactSection);
        }


        //PROJECT PAGE SCRIPT//
        // --- 1. Mobile Menu Toggle ---
        function toggleMenu() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
        }

        // --- 2. Project Filtering Logic ---
        function filterProjects(category) {
            const cards = document.querySelectorAll('.project-card');
            const filterButtons = document.querySelectorAll('.filter-btn');

            // Update button styles (active state)
            filterButtons.forEach(btn => {
                if (btn.getAttribute('data-filter') === category) {
                    btn.classList.remove('bg-gray-200', 'text-gray-700', 'hover:bg-accent', 'hover:text-white');
                    btn.classList.add('bg-primary', 'text-white');
                } else {
                    btn.classList.remove('bg-primary', 'text-white');
                    btn.classList.add('bg-gray-200', 'text-gray-700', 'hover:bg-accent', 'hover:text-white');
                }
            });

            // Filter cards
            cards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || cardCategory === category) {
                    card.classList.remove('hidden');
                    card.classList.add('animate-fadeIn'); // Simple fade in animation
                } else {
                    card.classList.add('hidden');
                    card.classList.remove('animate-fadeIn');
                }
            });
        }

        // Initialize the page by showing all projects
        window.onload = function() {
            filterProjects('all');
        }

        ///PROJECT 2//

        document.addEventListener('DOMContentLoaded', function() {
        // --- Configuration for a single card example ---
        const loaderId = 'project-loader-1';
        
        // Find the element containing the percentage (where we added the data-attribute)
        const percentElement = document.querySelector('[data-funding-percent]');
        
        if (percentElement) {
            const fundingPercent = percentElement.getAttribute('data-funding-percent');
            const loaderBar = document.getElementById(loaderId);

            if (loaderBar && fundingPercent) {
                // Apply the final width using the arbitrary value utility
                // We use a setTimeout with 0 delay to ensure this executes AFTER the initial w-0 has been rendered.
                setTimeout(() => {
                    loaderBar.style.width = `${fundingPercent}%`;
                }, 10);
                
            } else {
                console.error("Could not find the loader bar or percentage element.");
            }
        }
        // ---------------------------------------------------------------------

        // NOTE: For multiple project cards, you would use a loop:
        /*
        document.querySelectorAll('.project-card').forEach((card, index) => {
             const percent = card.querySelector('[data-funding-percent]').getAttribute('data-funding-percent');
             const loader = card.querySelector('#project-loader-X'); // Use a unique selector for each loader
             
             if (loader && percent) {
                setTimeout(() => {
                    loader.style.width = `${percent}%`;
                }, 10);
             }
        });
        */
    });


        //gallery scrpt//
        // Mobile Menu Toggle (Reused)
        function toggleMenu() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
        }

        // --- Gallery Filtering Logic ---
        const filterButtons = document.querySelectorAll('.filter-btn');
        const galleryItems = document.querySelectorAll('.gallery-item');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filterValue = button.getAttribute('data-filter');
                
                // Update active button style
                filterButtons.forEach(btn => btn.classList.remove('active-filter', 'bg-black', 'text-white'));
                button.classList.add('active-filter', 'bg-blue', 'text-white');
                
                // Reset other buttons' styles
                filterButtons.forEach(btn => {
                    if (!btn.classList.contains('active-filter')) {
                        btn.classList.remove('bg-blue', 'bg-black', 'bg-green');
                        btn.classList.add('bg-white', 'text-gray-700', 'border', 'border-gray-300');
                    }
                });


                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.classList.add('show');
                        item.classList.remove('hidden');
                    } else {
                        item.classList.remove('show');
                        item.classList.add('hidden');
                    }
                });
            });
        });
        
        // --- Lightbox Logic ---
        const lightbox = document.getElementById('lightbox');
        const lightboxImage = document.getElementById('lightbox-image');
        const lightboxCaption = document.getElementById('lightbox-caption');

        function openLightbox(src, caption) {
            lightboxImage.src = src;
            lightboxCaption.textContent = caption;
            lightbox.classList.remove('hidden');
            lightbox.classList.add('flex');
            document.body.style.overflow = 'hidden'; // Prevent scrolling background
        }

        function closeLightbox() {
            lightbox.classList.add('hidden');
            lightbox.classList.remove('flex');
            document.body.style.overflow = ''; // Restore scrolling
        }

        //go back when i view an image //
// Remove these declarations if they exist higher up in your script:
/*
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');
*/

// If the variables are already declared, you can proceed directly with the functions:

function openLightbox(src, caption) {
    // You MUST ensure 'lightbox', 'lightboxImage', and 'lightboxCaption' 
    // are declared (with const) ONCE at the top of the entire script block.
    
    lightboxImage.src = src;
    lightboxCaption.textContent = caption;
    lightbox.classList.remove('hidden');
    lightbox.classList.add('flex');
    document.body.style.overflow = 'hidden'; // Prevent scrolling background
}

function closeLightbox() {
    lightbox.classList.add('hidden');
    lightbox.classList.remove('flex');
    document.body.style.overflow = ''; // Restore scrolling
}

// Add event listener to close the lightbox when the Escape key is pressed
document.addEventListener('keydown', (event) => {
    // Check if the lightbox is currently visible (not hidden)
    // This function assumes 'lightbox' is a global or already defined const
    if (event.key === 'Escape' && !lightbox.classList.contains('hidden')) {
        closeLightbox();
    }
});

//contact US//
// Mobile Menu Toggle
        function toggleMenu() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
        }

        // Basic form validation/submission placeholder (No actual server-side logic here)
        document.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real application, you would use fetch() here to send data to a server.
            
            alert('Thank you for your message! We will get back to you shortly.');
            this.reset(); // Clear the form after simulated submission
        });

        //involve 1//
        // Mobile Menu Toggle (Ensures navigation works on small screens)
        function toggleMenu() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
        }

        // Accordion Toggle Logic (For the FAQ Section, if you included it above the Volunteer form)
        document.addEventListener('DOMContentLoaded', () => {
            const faqToggles = document.querySelectorAll('.faq-toggle');

            faqToggles.forEach(toggle => {
                toggle.addEventListener('click', () => {
                    const targetId = toggle.getAttribute('data-target');
                    const targetContent = document.getElementById(targetId);
                    const arrowIcon = document.querySelector(`[data-arrow="${targetId}"]`);
                    
                    // Toggle visibility of the content
                    const isHidden = targetContent.classList.toggle('hidden');
                    toggle.setAttribute('aria-expanded', isHidden ? 'false' : 'true');

                    // Rotate the arrow icon
                    if (isHidden) {
                        arrowIcon.classList.remove('rotate-180');
                    } else {
                        arrowIcon.classList.add('rotate-180');
                    }

                    // Optional: Close all other open sections for cleaner display
                    faqToggles.forEach(otherToggle => {
                        const otherTargetId = otherToggle.getAttribute('data-target');
                        if (otherTargetId !== targetId) {
                            const otherContent = document.getElementById(otherTargetId);
                            const otherArrow = document.querySelector(`[data-arrow="${otherTargetId}"]`);
                            
                            otherContent.classList.add('hidden');
                            otherToggle.setAttribute('aria-expanded', 'false');
                            otherArrow.classList.remove('rotate-180');
                        }
                    });

                });
            });
        });


        //involve 2//
        // Mobile Menu Toggle
        function toggleMenu() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
        }

        // Accordion Toggle Logic (FAQ Section)
        document.addEventListener('DOMContentLoaded', () => {
            const faqToggles = document.querySelectorAll('.faq-toggle');

            faqToggles.forEach(toggle => {
                toggle.addEventListener('click', () => {
                    const targetId = toggle.getAttribute('data-target');
                    const targetContent = document.getElementById(targetId);
                    const arrowIcon = document.querySelector(`[data-arrow="${targetId}"]`);
                    
                    // Toggle visibility of the content
                    const isHidden = targetContent.classList.toggle('hidden');
                    toggle.setAttribute('aria-expanded', isHidden ? 'false' : 'true');

                    // Rotate the arrow icon
                    if (isHidden) {
                        arrowIcon.classList.remove('rotate-180');
                    } else {
                        arrowIcon.classList.add('rotate-180');
                    }

                    // Optional: Close all other open sections
                    faqToggles.forEach(otherToggle => {
                        const otherTargetId = otherToggle.getAttribute('data-target');
                        if (otherTargetId !== targetId) {
                            const otherContent = document.getElementById(otherTargetId);
                            const otherArrow = document.querySelector(`[data-arrow="${otherTargetId}"]`);
                            
                            otherContent.classList.add('hidden');
                            otherToggle.setAttribute('aria-expanded', 'false');
                            otherArrow.classList.remove('rotate-180');
                        }
                    });

                });
            });
        });

        //involve 3//
        // Mobile Menu Toggle (Ensures navigation works on small screens)
        function toggleMenu() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
        }

        // Accordion Toggle Logic (For the FAQ Section, if you included it above the Volunteer form)
        document.addEventListener('DOMContentLoaded', () => {
            const faqToggles = document.querySelectorAll('.faq-toggle');

            faqToggles.forEach(toggle => {
                toggle.addEventListener('click', () => {
                    const targetId = toggle.getAttribute('data-target');
                    const targetContent = document.getElementById(targetId);
                    const arrowIcon = document.querySelector(`[data-arrow="${targetId}"]`);
                    
                    // Toggle visibility of the content
                    const isHidden = targetContent.classList.toggle('hidden');
                    toggle.setAttribute('aria-expanded', isHidden ? 'false' : 'true');

                    // Rotate the arrow icon
                    if (isHidden) {
                        arrowIcon.classList.remove('rotate-180');
                    } else {
                        arrowIcon.classList.add('rotate-180');
                    }

                    // Optional: Close all other open sections for cleaner display
                    faqToggles.forEach(otherToggle => {
                        const otherTargetId = otherToggle.getAttribute('data-target');
                        if (otherTargetId !== targetId) {
                            const otherContent = document.getElementById(otherTargetId);
                            const otherArrow = document.querySelector(`[data-arrow="${otherTargetId}"]`);
                            
                            otherContent.classList.add('hidden');
                            otherToggle.setAttribute('aria-expanded', 'false');
                            otherArrow.classList.remove('rotate-180');
                        }
                    });

                });
            });
        });


        //donate scrpt//
    
document.addEventListener('DOMContentLoaded', () => {
    // 1. MODAL CONTROLS
    const modal = document.getElementById('donate-modal');
    const openBtn = document.getElementById('open-donate');
    const closeBtn = document.getElementById('close-modal');

    if (openBtn) openBtn.onclick = () => modal.classList.replace('hidden', 'flex');
    if (closeBtn) closeBtn.onclick = () => modal.classList.replace('flex', 'hidden');

    // 2. CARD NUMBER: STRICT 16 DIGITS, NO SPACES
    const cardNumInput = document.getElementById('card-num');
    cardNumInput.addEventListener('input', (e) => {
        let v = e.target.value.replace(/\D/g, ''); // Keep only numbers
        if (v.length > 16) v = v.slice(0, 16);    // Strict 16 limit
        e.target.value = v;                       // No spaces added here
        document.getElementById('card-error').classList.add('hidden');
    });

    // 3. EXPIRY DATE: AUTO-SLASH & VALIDATION
    const expiryInput = document.getElementById('card-expiry');
    expiryInput.addEventListener('input', (e) => {
        let v = e.target.value.replace(/\D/g, '');
        if (v.length > 4) v = v.slice(0, 4);
        if (v.length > 2) {
            e.target.value = v.slice(0, 2) + '/' + v.slice(2, 4);
        } else {
            e.target.value = v;
        }
        document.getElementById('expiry-error').classList.add('hidden');
    });

    // 4. AMOUNT SELECTION LOGIC
    const amountBtns = document.querySelectorAll('.amount-btn');
    const customWrapper = document.getElementById('custom-amount-wrapper');
    const donorAmount = document.getElementById('donor-amount');
    const badge = document.getElementById('amount-badge');

    amountBtns.forEach(btn => {
        btn.onclick = () => {
            amountBtns.forEach(b => b.classList.remove('border-indigo-600', 'bg-indigo-50', 'text-indigo-600'));
            btn.classList.add('border-indigo-600', 'bg-indigo-50', 'text-indigo-600');
            const val = btn.dataset.val;
            if (val === 'other') {
                customWrapper.classList.remove('hidden');
                badge.classList.add('hidden');
                donorAmount.value = '';
                donorAmount.focus();
            } else {
                customWrapper.classList.add('hidden');
                badge.classList.remove('hidden');
                document.getElementById('display-selected-val').innerText = val;
                donorAmount.value = val;
            }
        };
    });

    // 5. FORM SUBMISSION
    document.getElementById('donation-form').onsubmit = (e) => {
        e.preventDefault();

        // Validate 16 Digits
        if (cardNumInput.value.length !== 16) {
            document.getElementById('card-error').classList.remove('hidden');
            cardNumInput.focus();
            return;
        }

        // Validate Future Date
        const [month, year] = expiryInput.value.split('/').map(num => parseInt(num));
        const now = new Date();
        const curMonth = now.getMonth() + 1;
        const curYear = parseInt(now.getFullYear().toString().slice(-2));

        if (!month || !year || month < 1 || month > 12 || (year < curYear) || (year === curYear && month < curMonth)) {
            document.getElementById('expiry-error').classList.remove('hidden');
            expiryInput.focus();
            return;
        }

        // Display Success Screen with Single Combined Message
        const firstName = document.getElementById('first-name').value;
        const amount = donorAmount.value || "0";
        const method = document.querySelector('input[name="card-type"]:checked').value;

        document.getElementById('combined-success-message').innerText = 
            `Thank you, ${firstName}! Your donation of USD ${amount} was successful using ${method}. A receipt has been sent to your email.`;
        
        document.getElementById('success-screen').classList.remove('hidden');
        document.getElementById('form-content').classList.add('invisible');
        document.getElementById('success-screen').scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    // Payment method indicator
    document.querySelectorAll('input[name="card-type"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            const label = document.getElementById('selected-method-name');
            label.innerText = "Selected: " + e.target.value;
            label.classList.remove('hidden');
        });
    });
});


// voluntier form //
document.addEventListener('DOMContentLoaded', () => {
    const vModal = document.getElementById('volunteer-modal');
    const openVBtn = document.getElementById('open-volunteer');
    const closeVBtn = document.getElementById('close-volunteer');
    const vForm = document.getElementById('volunteer-form');
    const vSuccess = document.getElementById('volunteer-success');

    // Open Volunteer Modal
    if(openVBtn) {
        openVBtn.onclick = () => {
            vModal.classList.remove('hidden');
            vModal.classList.add('flex');
            document.body.style.overflow = 'hidden'; // Stop background scrolling
        };
    }

    // Close Volunteer Modal
    if(closeVBtn) {
        closeVBtn.onclick = () => {
            vModal.classList.add('hidden');
            vModal.classList.remove('flex');
            document.body.style.overflow = '';
        };
    }

    // Form Submission Logic
    if(vForm) {
        vForm.onsubmit = (e) => {
            e.preventDefault();
            
            // Here you would normally send data to your server
            // For now, we show the success animation
            vSuccess.classList.remove('hidden');
            
            // Optional: Auto-scroll to top of modal for the success message
            vSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        };
    }
});

// partnreship form //
document.addEventListener('DOMContentLoaded', () => {
    const pModal = document.getElementById('partner-modal');
    const openPBtn = document.getElementById('open-partner');
    const closePBtn = document.getElementById('close-partner');
    const pForm = document.getElementById('partner-form');
    const pSuccess = document.getElementById('partner-success');

    // 1. OPEN/CLOSE MODAL
    if(openPBtn) {
        openPBtn.onclick = () => {
            pModal.classList.replace('hidden', 'flex');
            document.body.style.overflow = 'hidden';
        };
    }
    if(closePBtn) {
        closePBtn.onclick = () => {
            pModal.classList.replace('flex', 'hidden');
            document.body.style.overflow = '';
        };
    }

    // 2. DYNAMIC FILENAME DISPLAY
    const updateFileLabel = (inputId, displayId) => {
        const input = document.getElementById(inputId);
        const display = document.getElementById(displayId);
        input.addEventListener('change', () => {
            if(input.files.length > 0) {
                display.innerText = "✓ " + input.files[0].name.substring(0, 15) + "...";
                display.classList.replace('text-gray-500', 'text-yellow-600');
                input.parentElement.classList.replace('border-gray-300', 'border-yellow-500');
            }
        });
    };

    updateFileLabel('p-passport', 'p-passport-name');
    updateFileLabel('p-cv', 'p-cv-name');

    // 3. FORM SUBMISSION
    if(pForm) {
        pForm.onsubmit = (e) => {
            e.preventDefault();
            
            const company = document.getElementById('p-company').value;
            const firstName = document.getElementById('p-first-name').value;

            document.getElementById('p-success-msg').innerText = 
                `Thank you, ${firstName}. We have received the partnership inquiry and documents for ${company}. Our corporate relations team will review your profile and contact you shortly.`;
            
            pSuccess.classList.remove('hidden');
        };
    }
});

        //lern more script//
        
        document.addEventListener('DOMContentLoaded', function() {
            const loaderBar = document.getElementById('project-loader-digital');
            const percentElement = document.querySelector('[data-funding-percent]');
            
            if (loaderBar && percentElement) {
                const fundingPercent = percentElement.getAttribute('data-funding-percent');
                
                // Use setTimeout to ensure the browser registers the initial state (w-0 or w-[75%]) 
                // before the transition is triggered.
                setTimeout(() => {
                    // Overwrite the w-[75%] class with the inline style, activating the CSS transition
                    loaderBar.style.width = `${fundingPercent}%`;
                }, 10);
            }
        }); 

        //impacts scrpt//

    document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.5 // Start animation when 50% of section is visible
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stats = entry.target.querySelectorAll('.stat-number');
                
                stats.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    const suffix = stat.getAttribute('data-suffix');
                    const duration = 2000; // 2 seconds to finish
                    const frameDuration = 1000 / 60; // 60fps
                    const totalFrames = Math.round(duration / frameDuration);
                    let frame = 0;

                    const countUp = setInterval(() => {
                        frame++;
                        // Ease-out formula: Makes it slow down as it reaches the end
                        const progress = frame / totalFrames;
                        const currentCount = Math.round(target * progress);

                        if (frame === totalFrames) {
                            stat.innerText = target.toLocaleString() + suffix;
                            clearInterval(countUp);
                        } else {
                            stat.innerText = currentCount.toLocaleString();
                        }
                    }, frameDuration);
                });
                
                observer.unobserve(entry.target); // Stop observing after animation
            }
        });
    }, observerOptions);

    const impactSection = document.querySelector('#impact');
    if (impactSection) counterObserver.observe(impactSection);
});
