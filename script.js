document.addEventListener("DOMContentLoaded", () => {
    const calculateBtn = document.getElementById("calculate-btn");

    calculateBtn.addEventListener("click", () => {
        const startingAmount = parseFloat(document.getElementById("starting-amount").value);
        const monthlySavings = parseFloat(document.getElementById("monthly-savings").value);
        const interestRate = parseFloat(document.getElementById("interest-rate").value) / 100; // Convert to decimal
        const timePeriod = parseFloat(document.getElementById("time-period").value);

        if (isNaN(startingAmount) || isNaN(monthlySavings) || isNaN(interestRate) || isNaN(timePeriod) ||
            startingAmount < 0 || monthlySavings < 0 || interestRate < 0 || timePeriod < 0) {
            alert("Please enter valid positive numbers for all fields.");
            return;
        }

        let totalSavings = startingAmount;
        let totalContributions = startingAmount;
        const totalMonths = timePeriod * 12;
        let monthlyBalances = [startingAmount]; // Start with initial balance

        for (let i = 0; i < totalMonths; i++) {
            totalSavings = (totalSavings + monthlySavings) * (1 + interestRate / 12);
            monthlyBalances.push(totalSavings); // Add to balances
            totalContributions += monthlySavings;
        }

        const interestEarned = totalSavings - totalContributions;

        // Show the results header
        document.getElementById("result-header").style.display = "block";

        // Display savings and interest earned in result section
        document.getElementById("result").innerHTML += `
            <p>Total savings after ${timePeriod} years: <strong>$${Number(totalSavings.toFixed(2)).toLocaleString()}</strong></p>
            <p>Interest earned: <strong>$${Number(interestEarned.toFixed(2)).toLocaleString()}</strong></p>
        `;

        // Render the line chart
        const ctx = document.getElementById("savings-chart").getContext("2d");
        new Chart(ctx, {
            type: "line",
            data: {
                labels: Array.from({ length: monthlyBalances.length }, (_, i) => `Month ${i}`), // X-axis labels
                datasets: [{
                    label: "Savings Over Time",
                    data: monthlyBalances,
                    borderColor: "white",
                    borderWidth: 2,
                    fill: false
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: "top"
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: "Time (Months)"
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: "Savings ($)"
                        },
                        beginAtZero: true
                    }
                }
            }
        });
    });
});