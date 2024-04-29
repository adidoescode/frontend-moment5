import Chart from 'chart.js/auto';

const ctx = document.getElementById('myChart');
new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

async function init() {
    try {
        const courses = await sortValues();
        sortValues(courses);
    }

    // Catchar felet och loggar det som gick fel i konsolen

    catch (error) {
        console.error('Error with initializing:', error);
    }
}

window.onload = init;