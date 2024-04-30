import Chart from 'chart.js/auto';

async function fetchData() {
    const response = await fetch('https://studenter.miun.se/~mallar/dt211g/');
    const data = await response.json();
    return data;
}

async function init() {
    try {
        const data = await fetchData();
        const courses = data.filter(item => item.type === 'Kurs');
        const programs = data.filter(item => item.type === 'Program');

        const topCourses = sortItems(courses, 6);
        const topPrograms = sortItems(programs, 5);

        // Skapar ett bar-diagram för de 6 mest ansökta kurserna
        createChart('barChart', topCourses, 'De 6 mest ansökta kurserna', 'bar');
        // Skapar ett bar-diagram för de 5 mest ansökta programmen
        createChart('pieChart', topPrograms, 'De 5 mest ansökta programmen', 'pie');
    } catch (error) {
        console.error('Error with initializing:', error);
    }
}

function createChart(canvasId, items, title, type) {
    const ctx = document.getElementById(canvasId);
    new Chart(ctx, {
        type: type, // Använder type argument för att sätta typen av diagram
        data: {
            labels: items.map(item => item.name),
            datasets: [{
                label: '# of Applicants',
                data: items.map(item => item.applicantsTotal),
                borderWidth: 1,
                backgroundColor: ["red", "orange", "yellow", "green", "blue", "purple"]
            }]
        },
        options: {
            scales: {
                x: {
                    ticks: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: title,
                    font: {
                        size: 24
                    },
                    padding: {
                        top: 20,
                        bottom: 20
                    }
                }
            }
        }
    });
}

function sortItems(items, count) {
    return items.sort((a, b) => b.applicantsTotal - a.applicantsTotal).slice(0, count);
}

window.onload = init;
