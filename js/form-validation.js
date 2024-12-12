document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('payment-form');
    
    // Validation patterns
    const patterns = {
        name: /^[A-Za-z\s]+$/,  // Only letters and spaces
        email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,  // Email format
        card: /^[0-9]{16}$/,  // Exactly 16 digits
        expiry: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,  // MM/YY format
        cvv: /^[0-9]{3}$/  // Exactly 3 digits
    };

    // Input formatting and validation
    function formatCardNumber(input) {
        let value = input.value.replace(/\D/g, '');
        let formattedValue = '';
        for (let i = 0; i < value.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedValue += ' ';
            }
            formattedValue += value[i];
        }
        input.value = formattedValue;
    }

    function formatExpiryDate(input) {
        let value = input.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2);
        }
        input.value = value;
    }

    // Real-time validation
    document.getElementById('name').addEventListener('input', function() {
        this.value = this.value.replace(/[0-9]/g, '');
        this.setCustomValidity(patterns.name.test(this.value) ? '' : 'Please enter only letters and spaces');
    });

    document.getElementById('email').addEventListener('input', function() {
        this.setCustomValidity(patterns.email.test(this.value) ? '' : 'Please enter a valid email address');
    });

    document.getElementById('card').addEventListener('input', function() {
        formatCardNumber(this);
        const cardNumber = this.value.replace(/\s/g, '');
        this.setCustomValidity(patterns.card.test(cardNumber) ? '' : 'Please enter a valid 16-digit card number');
    });

    document.getElementById('expiry').addEventListener('input', function() {
        formatExpiryDate(this);
        if (patterns.expiry.test(this.value)) {
            const [month, year] = this.value.split('/');
            const currentYear = new Date().getFullYear() % 100;
            const currentMonth = new Date().getMonth() + 1;
            const inputYear = parseInt(year);
            const inputMonth = parseInt(month);

            if (inputYear < currentYear || (inputYear === currentYear && inputMonth < currentMonth)) {
                this.setCustomValidity('Card has expired');
            } else {
                this.setCustomValidity('');
            }
        } else {
            this.setCustomValidity('Please enter a valid expiry date (MM/YY)');
        }
    });

    document.getElementById('cvv').addEventListener('input', function() {
        this.value = this.value.replace(/\D/g, '').substring(0, 3);
        this.setCustomValidity(patterns.cvv.test(this.value) ? '' : 'Please enter a valid 3-digit CVV');
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Check all validations
        const inputs = form.querySelectorAll('input');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.checkValidity()) {
                isValid = false;
                input.reportValidity();
            }
        });

        if (isValid) {
            // Here you would typically handle the form submission
            alert('Payment information validated successfully!');
        }
    });
});
