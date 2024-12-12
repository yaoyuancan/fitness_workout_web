document.addEventListener('DOMContentLoaded', function() {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const plan = urlParams.get('plan') || 'beginner';  // Default to beginner if no plan specified
    const price = urlParams.get('price') || '49.99';   // Default price for beginner plan

    // Plan details mapping
    const planDetails = {
        beginner: {
            name: "Beginner Basics",
            duration: "8 Weeks",
            features: [
                "Workout plans",
                "Nutrition basics",
                "Email support",
                "Progress tracking"
            ]
        },
        muscle: {
            name: "Muscle Builder Pro",
            duration: "16 Weeks",
            features: [
                "Strength training focus",
                "Supplement guides",
                "Form check videos",
                "Premium support"
            ]
        },
        elite: {
            name: "Elite Performance",
            duration: "24 Weeks",
            features: [
                "Custom workout plans",
                "1-on-1 coaching",
                "Nutrition consultation",
                "VIP support"
            ]
        }
    };

    // Get the selected plan details
    const selectedPlan = planDetails[plan];

    // Update the selected plan section if it exists
    const selectedPlanElement = document.getElementById('selected-plan');
    if (selectedPlanElement) {
        const orderSummaryHtml = `
            <div class="selected-plan">
                <h3>${selectedPlan.name}</h3>
                <p class="plan-duration">${selectedPlan.duration} Program</p>
                <ul class="plan-features">
                    ${selectedPlan.features.map(feature => 
                        `<li><i class="fas fa-check"></i> ${feature}</li>`
                    ).join('')}
                </ul>
                <div class="plan-price">
                    <span class="price">$${price}</span>
                    <span class="period">/month</span>
                </div>
            </div>
        `;
        selectedPlanElement.innerHTML = orderSummaryHtml;
    }

    // Form validation functions
    function validateName(name) {
        return /^[A-Za-z\s]+$/.test(name);
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validateCardNumber(cardNumber) {
        // Remove spaces and check if it's 16 digits
        const cleanNumber = cardNumber.replace(/\s/g, '');
        return /^\d{16}$/.test(cleanNumber);
    }

    function validateExpiry(expiry) {
        // Check MM/YY format
        if (!/^\d{2}\/\d{2}$/.test(expiry)) return false;
        
        const [month, year] = expiry.split('/');
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100; // Get last 2 digits
        const currentMonth = currentDate.getMonth() + 1; // Months are 0-based
        
        // Convert to numbers
        const monthNum = parseInt(month);
        const yearNum = parseInt(year);
        
        // Check if month is valid (1-12)
        if (monthNum < 1 || monthNum > 12) return false;
        
        // Check if the date is in the future
        if (yearNum < currentYear || (yearNum === currentYear && monthNum < currentMonth)) {
            return false;
        }
        
        return true;
    }

    function validateCVV(cvv) {
        return /^\d{3}$/.test(cvv);
    }

    // Helper function to show error messages
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        if (!field) return;
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = 'red';
        errorDiv.style.fontSize = '12px';
        errorDiv.style.marginTop = '5px';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
        field.style.borderColor = 'red';
    }

    // Get the payment form element
    const paymentForm = document.getElementById('payment-form');
    if (paymentForm) {
        // Handle form submission
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name')?.value.trim() || '';
            const email = document.getElementById('email')?.value.trim() || '';
            const card = document.getElementById('card')?.value.trim() || '';
            const expiry = document.getElementById('expiry')?.value.trim() || '';
            const cvv = document.getElementById('cvv')?.value.trim() || '';
            
            // Clear previous error messages
            document.querySelectorAll('.error-message').forEach(el => el.remove());
            
            // Validate each field
            let isValid = true;
            
            if (!validateName(name)) {
                showError('name', 'Name should only contain letters and spaces');
                isValid = false;
            }
            
            if (!validateEmail(email)) {
                showError('email', 'Please enter a valid email address');
                isValid = false;
            }
            
            if (!validateCardNumber(card)) {
                showError('card', 'Please enter a valid 16-digit card number');
                isValid = false;
            }
            
            if (!validateExpiry(expiry)) {
                showError('expiry', 'Please enter a valid expiry date (MM/YY)');
                isValid = false;
            }
            
            if (!validateCVV(cvv)) {
                showError('cvv', 'CVV must be 3 digits');
                isValid = false;
            }
            
            if (isValid) {
                // Add payment processing logic here
                alert('Thank you for your purchase! We will process your payment and send you a confirmation email shortly.');
            }
        });

        // Add input event listeners for real-time validation
        const nameInput = document.getElementById('name');
        if (nameInput) {
            nameInput.addEventListener('input', function(e) {
                this.style.borderColor = validateName(this.value.trim()) ? '' : 'red';
            });
        }

        const emailInput = document.getElementById('email');
        if (emailInput) {
            emailInput.addEventListener('input', function(e) {
                this.style.borderColor = validateEmail(this.value.trim()) ? '' : 'red';
            });
        }

        const cardInput = document.getElementById('card');
        if (cardInput) {
            cardInput.addEventListener('input', function(e) {
                // Format card number in groups of 4
                let value = this.value.replace(/\D/g, '');
                value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
                this.value = value;
                this.style.borderColor = validateCardNumber(value) ? '' : 'red';
            });
        }

        const expiryInput = document.getElementById('expiry');
        if (expiryInput) {
            expiryInput.addEventListener('input', function(e) {
                // Format expiry date
                let value = this.value.replace(/\D/g, '');
                if (value.length >= 2) {
                    value = value.substring(0, 2) + '/' + value.substring(2, 4);
                }
                this.value = value;
                this.style.borderColor = validateExpiry(value) ? '' : 'red';
            });
        }

        const cvvInput = document.getElementById('cvv');
        if (cvvInput) {
            cvvInput.addEventListener('input', function(e) {
                let value = this.value.replace(/\D/g, '');
                this.value = value.substring(0, 3);
                this.style.borderColor = validateCVV(this.value) ? '' : 'red';
            });
        }
    }
});
