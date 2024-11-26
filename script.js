console.log("JavaScript is connected!");

// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
    const calculateBtn = document.getElementById("calculate-btn");

    calculateBtn.addEventListener("click", () => {
        // Get input values
        const startingAmount = parseFloat(document.getElementById("starting-amount").value);
        const monthlySavings = parseFloat(document.getElementById("monthly-savings").value);
        const interestRate = parseFloat(document.getElementById("interest-rate").value) / 100; // Convert to decimal
        const timePeriod = parseFloat(document.getElementById("time-period").value);

        // Check if inputs are valid
        if (isNaN(startingAmount) || isNaN(monthlySavings) || isNaN(interestRate) || isNaN(timePeriod) ||
            startingAmount < 0 || monthlySavings < 0 || interestRate < 0 || timePeriod < 0) {
            alert("Please enter valid positive numbers for all fields.");
            return;
        }

        // Perform calculation: Compound Interest Formula
        let totalSavings = startingAmount;
        let totalContributions = startingAmount;
        const totalMonths = timePeriod * 12;

        for (let i = 0; i < totalMonths; i++) {
            totalSavings = (totalSavings + monthlySavings) * (1 + interestRate / 12);
            totalContributions += monthlySavings;
        }
        const interestEarned = totalSavings - totalContributions;

        // Display result
        alert(`Total savings after ${timePeriod} years: $${totalSavings.toFixed(2)}\nInterest earned: $${interestEarned.toFixed(2)}`);
    });
});