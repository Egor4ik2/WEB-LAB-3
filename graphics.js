const items = [
    { id: 1, title: "Книжки так Кістяний Пил", category: "books", rating: 4.5 },
    { id: 2, title: "The Division", category: "games", rating: 4.2 },
    { id: 3, title: "Рос-Українська війна", category: "books", rating: 5.0 },
    { id: 4, title: "Dishonored", category: "games", rating: 4.6 },
    { id: 5, title: "Книжки то любов", category: "books", rating: 3.9 },
    { id: 6, title: "Ghost Of Tsusima", category: "games", rating: 4.8 },
    { id: 7, title: "Чернівці", category: "books", rating: 4.1 },
    { id: 8, title: "Control", category: "games", rating: 4.3 },
    { id: 9, title: "Переслідуваний Аделіні", category: "books", rating: 3.5 },
    { id: 10, title: "Borderlands 3", category: "games", rating: 3.9 },
    { id: 11, title: "Тінь у ЖАРИВІ", category: "books", rating: 3.2 },
    { id: 12, title: "Far Cry 4", category: "games", rating: 4.0 },
    { id: 13, title: "Вогні Небес", category: "books", rating: 4.4 },
    { id: 14, title: "The Crew 2", category: "games", rating: 4.1 },
    { id: 15, title: "Володар Перстнів", category: "books", rating: 5.0 },
    { id: 16, title: "MAX PAYNE", category: "games", rating: 4.7 },
    { id: 17, title: "ШПИГУНСЬКЕ УЗБЕРЕЖЖЯ", category: "books", rating: 3.8 },
    { id: 18, title: "Formula 1 2024", category: "games", rating: 4.0 },
    { id: 19, title: "Коти Вояки", category: "books", rating: 3.6 },
    { id: 20, title: "Star Citizen", category: "games", rating: 4.2 },
];


const ctx = document.getElementById("popularityChart").getContext("2d");
let chart;

function calculatePopularity() {

    const popularity = {
        books: { count: 0, ratingSum: 0 },
        games: { count: 0, ratingSum: 0 },
    };

    items.forEach(item => {
        if (popularity[item.category]) {
            popularity[item.category].count += 1;
            popularity[item.category].ratingSum += item.rating;
        }
    });

    return popularity;
}

function createChart(type) {
    const popularity = calculatePopularity();


    const labels = ["Книжки", "Ігри"];
    const counts = [popularity.books.count, popularity.games.count];
    const ratings = [popularity.books.ratingSum.toFixed(2), popularity.games.ratingSum.toFixed(2)];

    if (chart) {
        chart.destroy();
    }

    if (type === "pie") {
        chart = new Chart(ctx, {
            type: "pie",
            data: {
                labels,
                datasets: [{
                    label: 'Сумарний рейтинг',
                    data: ratings,
                    backgroundColor: ['#ff6384', '#36a2eb'],
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'bottom' }
                }
            }
        });
    } else if (type === "bar") {
        chart = new Chart(ctx, {
            type: "bar",
            data: {
                labels,
                datasets: [
                    {
                        label: "Кількість товарів",
                        data: counts,
                        backgroundColor: '#36a2eb',
                    },
                    {
                        label: "Сумарний рейтинг",
                        data: ratings,
                        backgroundColor: '#ff6384',
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { stepSize: 1 }
                    }
                },
                plugins: {
                    legend: { position: 'bottom' }
                }
            }
        });
    } else if (type === "line") {
        chart = new Chart(ctx, {
            type: "line",
            data: {
                labels,
                datasets: [
                    {
                        label: "Кількість товарів",
                        data: counts,
                        borderColor: '#36a2eb',
                        backgroundColor: '#36a2eb33',
                        fill: true,
                        tension: 0.3
                    },
                    {
                        label: "Сумарний рейтинг",
                        data: ratings,
                        borderColor: '#ff6384',
                        backgroundColor: '#ff638433',
                        fill: true,
                        tension: 0.3
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: { position: 'bottom' }
                }
            }
        });
    }
}


createChart("pie");


document.getElementById("chartType").addEventListener("change", (e) => {
    createChart(e.target.value);
});