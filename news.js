const newsData = [
  {
    id: 1,
    title: "Україна перемогла на Євробаченні",
    content: "Україна зайняла перше місце в Євробаченні 2025 завдяки емоційному виступу гурту з Львова.",
    date: "2025-05-19T18:20",

  },
  {
    id: 2,
    title: "Новий рекорд по сонячній енергії",
    content: "Сонячна електростанція в Херсоні встановила рекорд генерації — 15 МВт за добу.",
    date: "2025-05-19T16:10",

  },
  {
    id: 3,
    title: "Оновлення у міському транспорті",
    content: "У Києві запустили нові електробуси з автономним керуванням.",
    date: "2025-05-18T11:30",

  },
  {
    id: 4,
    title: "Верховна Рада схвалила закон про електронні паспорти",
    content: "Громадяни зможуть користуватись електронними ID без потреби у паперовій версії.",
    date: "2025-05-17T14:45",

  },
  {
    id: 5,
    title: "Новий український фільм потрапив до Канн",
    content: "Стрічка 'Після дощу' режисерки Олени Коваленко була відібрана до конкурсної програми.",
    date: "2025-05-17T09:10",

  },
  {
    id: 6,
    title: "Штучний інтелект допоміг розпізнати підробку на виборах",
    content: "ЦВК заявила, що нова система виявила спробу фальсифікації бюлетенів на дільницях у Дніпрі.",
    date: "2025-05-16T20:00",

  },
  {
    id: 7,
    title: "ПриватБанк запустив функцію оплати через обличчя",
    content: "Функція FacePay доступна в 50 магазинах Києва з підтримкою NFC камер.",
    date: "2025-05-16T08:40",
  
  },
  {
    id: 8,
    title: "На Донеччині відкрили новий завод з переробки відходів",
    content: "Підприємство дозволить зменшити обсяг сміття на 70% у регіоні.",
    date: "2025-05-15T15:25",

  },
  {
    id: 9,
    title: "Мінцифра запустила мобільний застосунок для пенсіонерів",
    content: "Додаток 'Дія.Сеньйор' допоможе літнім людям отримувати цифрові послуги без складнощів.",
    date: "2025-05-15T11:10",

  },
  {
    id: 10,
    title: "Українські хакери зламали пропагандистські ресурси РФ",
    content: "Група активістів виклала дані про роботу кремлівських ботів.",
    date: "2025-05-14T22:30",

  }
];

newsData.sort((a, b) => new Date(b.date) - new Date(a.date));

function renderNewsList() {
  const list = document.getElementById("newsList");
  list.innerHTML = "";

  newsData.forEach(news => {
    const div = document.createElement("div");
    div.className = `news-item ${news.important ? "important" : ""}`;
    div.textContent = `${formatDate(news.date)} - ${news.title}`;
    div.addEventListener("click", () => showNews(news));
    list.appendChild(div);
  });
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function showNews(news) {
  const container = document.getElementById("newsContent");
  container.innerHTML = `
    <h2>${news.title}</h2>
    <p><em>${formatDate(news.date)}</em></p>
    <p>${news.content}</p>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  renderNewsList();

  setInterval(() => {
    renderNewsList();
  }, 60000);
});