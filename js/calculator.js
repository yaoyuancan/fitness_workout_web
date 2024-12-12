// Wait for the DOM to load fully
document.addEventListener('DOMContentLoaded', function() {
    console.log('Calculator script loaded');
    
    // Gets the form and result elements
    const calculatorForm = document.getElementById('calorie-calculator');
    const resultGroup = document.querySelector('.result-group');
    const weightLossResult = document.getElementById('weight-loss-result');
    const maintenanceResult = document.getElementById('maintenance-result');
    const weightGainResult = document.getElementById('weight-gain-result');

    // Check whether the element exists
    if (!calculatorForm || !resultGroup || !weightLossResult || !maintenanceResult || !weightGainResult) {
        console.error('Required elements not found');
        return;
    }

    console.log('Form and result elements found');

    // Add a form submission event listener
    calculatorForm.addEventListener('submit', function(e) {
        console.log('Form submitted');
        e.preventDefault(); // Prevents form default submission behavior

        try {
            // Get input value
            const weight = parseFloat(document.getElementById('weight').value);
            const height = parseFloat(document.getElementById('height').value);
            const age = parseInt(document.getElementById('age').value);
            const activity = parseFloat(document.getElementById('activity').value);
            const gender = document.getElementById('gender').value;

            console.log('Input values:', { weight, height, age, activity, gender });

            // Validation input
            if (!weight || !height || !age || !activity) {
                alert('Please fill in all fields');
                return;
            }

            // Calculate Basal Metabolic Rate (BMR)
            let bmr;
            if (gender === 'male') {
                // male BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age + 5
                bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
            } else {
                // female BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age - 161
                bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
            }

            console.log('BMR calculated:', bmr);

            // Calculate your daily calorie needs
            const dailyCalories = Math.round(bmr * activity);
            console.log('Daily calories:', dailyCalories);

            // Calculate calorie requirements for different goals
            const weightLoss = Math.round(dailyCalories * 0.8); 
            const maintenance = dailyCalories; 
            const weightGain = Math.round(dailyCalories * 1.2); 

            // Display result
            weightLossResult.value = weightLoss + ' calories/day';
            maintenanceResult.value = maintenance + ' calories/day';
            weightGainResult.value = weightGain + ' calories/day';

            // Display result area
            resultGroup.style.display = 'block';

            
            resultGroup.scrollIntoView({ behavior: 'smooth', block: 'start' });

            console.log('Results displayed');
        } catch (error) {
            console.error('Error in calculation:', error);
            alert('An error occurred while calculating. Please try again.');
        }
    });

    console.log('Calculator setup complete');
});
