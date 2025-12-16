
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

// Get the button and the mobile menu element
function toggleMenu() {
            const menu = document.getElementById('mobile-menu');
            if (menu.classList.contains('hidden')) {
                menu.classList.remove('hidden');
            } else {
                menu.classList.add('hidden');
            }
        }

const mobileMenuButton = document.getElementById('mobile-menu-button');
const closeMenuButton = document.getElementById('close-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

// Function to toggle the menu's visibility
function toggleMobileMenu() {
    // Toggles the 'hidden' Tailwind class on the mobile menu
    mobileMenu.classList.toggle('hidden');
}

// Event listeners
mobileMenuButton.addEventListener('click', toggleMobileMenu);
closeMenuButton.addEventListener('click', toggleMobileMenu);

// OPTIONAL: Close the menu if a link is clicked (in a Single-Page App setup)
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Only hide if the menu is visible
        if (!mobileMenu.classList.contains('hidden')) {
            toggleMobileMenu();
        }
    });
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
    
        //donation 3//
        // REPLACE THIS WITH YOUR ACTUAL PUBLIC TEST/LIVE KEY from Paystack, Flutterwave, etc.
        const PAYSTACK_PUBLIC_KEY = 'pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxx'; 
        
        // --- UI Logic ---
        document.addEventListener('DOMContentLoaded', () => {
            const amountButtons = document.querySelectorAll('.amount-btn');
            const freqButtons = document.querySelectorAll('.freq-btn');
            const customAmountInput = document.getElementById('custom-amount');
            const finalAmountInput = document.getElementById('final-amount-input');
            const displayAmount = document.getElementById('display-amount');
            const frequencyInput = document.getElementById('frequency-input');

            // Initial setup for buttons
            finalAmountInput.value = customAmountInput.value;
            displayAmount.textContent = '$' + formatNumber(customAmountInput.value);

            // Helper to format currency (adds commas)
            function formatNumber(num) {
                return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }

            // Function to update button styling
            const updateActiveButton = (buttons, activeBtn, activeClass, inactiveClass) => {
                buttons.forEach(btn => {
                    btn.classList.remove(activeClass);
                    btn.classList.add(inactiveClass);
                });
                activeBtn.classList.remove(inactiveClass);
                activeBtn.classList.add(activeClass);
            };

            // 1. Handle Amount Button Clicks
            amountButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const amount = button.getAttribute('data-amount');
                    
                    // Set custom input and final hidden input value
                    customAmountInput.value = amount; 
                    finalAmountInput.value = amount;
                    displayAmount.textContent = '$' + formatNumber(amount);

                    // Update button styles
                    updateActiveButton(amountButtons, button, 'bg-accent', 'bg-gray-200');
                    updateActiveButton(amountButtons, button, 'text-white', 'text-gray-700');
                });
            });

            // 2. Handle Custom Input Changes
            customAmountInput.addEventListener('input', () => {
                let amount = customAmountInput.value;
                if (amount < 100) amount = 100; // Minimum donation
                
                finalAmountInput.value = amount;
                displayAmount.textContent = '$' + formatNumber(amount);

                // De-select preset buttons
                amountButtons.forEach(btn => {
                    btn.classList.remove('bg-accent', 'text-white');
                    btn.classList.add('bg-gray-200', 'text-gray-700');
                });
            });

            // 3. Handle Frequency Button Clicks
            freqButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const frequency = button.getAttribute('data-frequency');
                    frequencyInput.value = frequency;
                    
                    // Update button styles
                    updateActiveButton(freqButtons, button, 'bg-primary', 'bg-gray-200');
                    updateActiveButton(freqButtons, button, 'text-white', 'text-gray-700');
                });
            });
            
            // --- Payment Integration Logic (Paystack) ---
            const donationForm = document.getElementById('donation-form');
            donationForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const amount = parseInt(finalAmountInput.value, 10);
                const email = document.getElementById('donor-email').value;
                const name = document.getElementById('donor-name').value;
                const frequency = frequencyInput.value;
                
                if (!amount || !email || !name || amount < 100) {
                    alert('Please ensure all required fields are filled and the donation amount is at least ₦100.');
                    return;
                }

                // Paystack uses Kobo (cents/lowest denomination)
                const amountInKobo = amount * 100; 

                // Paystack Handler
                const handler = Paystack.newTransaction({
                    key: PAYSTACK_PUBLIC_KEY, // Replace with your public key
                    email: email,
                    amount: amountInKobo, 
                    currency: 'USD',
                    ref: '' + Math.floor((Math.random() * 1000000000) + 1), // unique reference

                    // Metadata is optional, but useful for tracking
                    metadata: {
                        custom_fields: [
                            {
                                display_name: "Donor Name",
                                variable_name: "name",
                                value: name
                            },
                            {
                                display_name: "Frequency",
                                variable_name: "frequency",
                                value: frequency
                            }
                        ]
                    },

                    // Callback functions
                    callback: function(response){
                        // Payment successful
                        alert('Donation successful! Thank you for your support. Reference: ' + response.reference);
                        // Redirect to a thank you page or update the UI
                        window.location.href = 'thank-you.html?ref=' + response.reference; 
                    },
                    onClose: function(){
                        // Payment modal closed by user
                        alert('Donation process interrupted. You can try again anytime.');
                    }
                });
                
                // For recurring payments (Monthly), you would need to initialize a recurring plan on your backend server.
                if (frequency === 'monthly') {
                    alert('Recurring payments require server-side integration. You will be redirected to the secure page to set up your subscription.');
                    // In a live scenario, you would redirect the user to a server-generated subscription page
                    // or use the payment gateway's subscription API.
                    handler.openIframe(); 
                } else {
                    handler.openIframe();
                }
            });
        });
        
        // Mobile Menu Toggle (reused from previous step)
        function toggleMenu() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
        }
    

        //Apply Form//
     let currentStep = 1;
        const form = document.getElementById('volunteer-form');
        const successMessage = document.getElementById('success-message');
        const steps = [
            document.getElementById('step-1'),
            document.getElementById('step-2'),
            document.getElementById('step-3')
        ];
        const indicators = [
            document.getElementById('step-1-indicator'),
            document.getElementById('step-2-indicator'),
            document.getElementById('step-3-indicator')
        ];
        const progressBar = document.getElementById('progress-line');

        // Function to update the visibility and progress bar
        function updateSteps(step) {
            currentStep = step;

            // 1. Update Step Visibility
            steps.forEach((s, index) => {
                s.classList.toggle('hidden', index + 1 !== currentStep);
            });

            // 2. Update Indicators
            indicators.forEach((indicator, index) => {
                const stepNumber = index + 1;
                if (stepNumber === currentStep) {
                    indicator.classList.add('bg-secondary', 'text-white', 'shadow-lg');
                    indicator.classList.remove('border-gray-300', 'text-gray-700', 'bg-white');
                } else if (stepNumber < currentStep) {
                    indicator.classList.add('bg-secondary', 'text-white', 'shadow-lg');
                    indicator.classList.remove('border-gray-300', 'text-gray-700', 'bg-white');
                } else {
                    indicator.classList.add('border-gray-300', 'text-gray-700', 'bg-white');
                    indicator.classList.remove('bg-secondary', 'text-white', 'shadow-lg');
                }
            });

            // 3. Update Progress Line
            let progressPercentage = 0;
            if (currentStep === 2) {
                progressPercentage = 50;
            } else if (currentStep === 3) {
                progressPercentage = 100;
                updateReviewSummary(); // Populate summary when moving to Step 3
            }
            // Subtract space for the dot diameter (approx 20px on each side of the line)
            progressBar.style.width = `calc(${progressPercentage}% - ${progressPercentage === 100 ? 0 : 20}px)`;

             // Ensure the line width is zero for step 1
            if (currentStep === 1) {
                progressBar.style.width = '0%';
            }
        }
        
        // Function to validate fields in the current step
        function validateStep(step) {
            let isValid = true;
            const currentStepElement = steps[step - 1];
            
            // Check all required inputs/selects/textareas
            currentStepElement.querySelectorAll('[required]').forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('border-red-500', 'ring-red-500'); // Highlight error
                } else {
                    input.classList.remove('border-red-500', 'ring-red-500');
                }
            });

            return isValid;
        }

        // Navigation Functions
        function nextStep(next) {
            if (validateStep(currentStep)) {
                updateSteps(next);
            } else {
                alert('Please fill out all required fields.');
            }
        }

        function prevStep(prev) {
            updateSteps(prev);
        }

        // Function to update the summary in Step 3
        function updateReviewSummary() {
            // Step 1 Data
            document.getElementById('summary-name').innerHTML = `<span class="font-semibold">Name:</span> ${document.getElementById('full-name').value}`;
            document.getElementById('summary-email').innerHTML = `<span class="font-semibold">Email:</span> ${document.getElementById('email-address').value}`;
            const locationText = document.getElementById('current-location').options[document.getElementById('current-location').selectedIndex].text;
            document.getElementById('summary-location').innerHTML = `<span class="font-semibold">Location:</span> ${locationText}`;
            
            // Step 2 Data
            const selectedInterests = Array.from(document.querySelectorAll('input[name="interest"]:checked'))
                                         .map(checkbox => checkbox.value)
                                         .join(', ');
            document.getElementById('summary-interests').innerHTML = `<span class="font-semibold">Interests:</span> ${selectedInterests || 'None Selected'}`;
            document.getElementById('summary-skills').innerHTML = `<span class="font-semibold">Skills/Experience:</span> ${document.getElementById('skills').value || 'Not provided'}`;
        }


        // Form Submission Handler
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!validateStep(3)) {
                alert('Please agree to the Terms and Conditions.');
                return;
            }

            // Simulate Submission Process
            const submitButton = document.querySelector('#step-3 .btn-success');
            submitButton.textContent = 'Submitting...';
            submitButton.disabled = true;

            // Hide the form and show the success message after a delay
            setTimeout(() => {
                form.classList.add('hidden');
                successMessage.classList.remove('hidden');
            }, 1500);
        });

        // Initialize the first step on page load
        document.addEventListener('DOMContentLoaded', () => {
            updateSteps(1);
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