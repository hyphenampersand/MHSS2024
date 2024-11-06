// Toggle forms for sign-in and sign-up
const signUpButton = document.getElementById('signUpButton');
const signInButton = document.getElementById('signInButton');
const signInForm = document.getElementById('signIn');
const signUpForm = document.getElementById('signup');

signUpButton.addEventListener('click', function() {
    signInForm.style.display = "none";
    signUpForm.style.display = "block";
});

signInButton.addEventListener('click', function() {
    signInForm.style.display = "block";
    signUpForm.style.display = "none";
});

// Waste type values
const wasteValues = {
    plastic: 5,
    candyWrapper: 1,
    junkFoodPlastic: 7,
    carryingPlastic: 5,
    plasticBottles: 10
};

// Submit waste data (Log.html)
function submitWaste() {
    const classValue = document.getElementById('class').value;
    const name = document.getElementById('name').value;
    const wasteType = document.getElementById('wasteType').value;
    const amount = parseInt(document.getElementById('amount').value);
    const wasteScore = wasteValues[wasteType] * amount;
    const date = document.getElementById('date').value;

    if (classValue && name && wasteType && amount && date) {
        const data = new FormData();
        data.append('class', classValue);
        data.append('name', name);
        data.append('wasteType', wasteType);
        data.append('amount', amount);
        data.append('wasteScore', wasteScore);
        data.append('date', date);

        fetch('submit_waste.php', {
            method: 'POST',
            body: data
        })
        .then(response => response.text())
        .then(data => alert(data))
        .catch(error => console.error('Error:', error));
    } else {
        alert('Please complete all fields.');
    }
}

// Display leaderboard (Leaderboard.html)
function renderLeaderboard() {
    fetch(`fetch_leaderboard.php`)
        .then(response => response.json())
        .then(data => {
            const leaderboardHTML = data.map((entry, index) => `
                <div class="leaderboard-entry">
                    <span class="rank">#${index + 1}</span>
                    <span class="class-name">${entry.class_name}</span>
                    <span class="total-waste">${entry.total_waste} points</span>
                </div>
            `).join('');
            document.getElementById('leaderboardDisplay').innerHTML = `
                <h2>Class Leaderboard (Lowest to Highest Waste)</h2>
                ${leaderboardHTML}
            `;
        })
        .catch(error => console.error('Error:', error));
}

// View class waste (Check.html)
function viewClassWaste() {
    const selectedClass = document.getElementById('classSelect').value;
    if (selectedClass) {
        fetch(`fetch_waste.php?class=${selectedClass}`)
            .then(response => response.json())
            .then(data => {
                const totalWaste = data.reduce((sum, entry) => sum + entry.waste_score, 0);
                document.getElementById('displayArea').innerHTML = `
                    <h2>${selectedClass} Waste Log</h2>
                    <p>Total Waste: ${totalWaste} points</p>
                    <ul>
                        ${data.map(entry => `
                            <li>${entry.student_name}: ${entry.waste_score} points (${entry.amount} of ${entry.waste_type}) - ${entry.date}</li>
                        `).join('')}
                    </ul>
                `;
            })
            .catch(error => console.error('Error:', error));
    } else {
        alert('Please select a class.');
    }
}

// Go back function
function goBack() {
    window.history.back();
}

function goBack1() {
    window.history.back();
  }
