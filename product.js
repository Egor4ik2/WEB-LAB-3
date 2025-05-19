const items = [
  { id: 1, title: "Книжки так Кістяний Пил", category: "books", img: "img/1-b.jpg", desc: "Казка від Тревіса Бродлі", price: 200, rating: 4.5 },
  { id: 2, title: "The Division", category: "games", img: "img/1-g.jpg", desc: "Постапокаліптичний світ у Нью Йорку", price: 244, rating: 4.2 },
  { id: 3, title: "Рос-Українська війна", category: "books", img: "img/2-b.jpg", desc: "Опис подій самого великого конфлікту 21 століття", price: 321, rating: 5.0 },
  { id: 4, title: "Dishonored", category: "games", img: "img/2-g.jpg", desc: "Стімпанк стелс гра", price: 550, rating: 4.6 },
  { id: 5, title: "Книжки то любов", category: "books", img: "img/3-b.jpg", desc: "Як отримати любов до книжок?", price: 240, rating: 3.9 },
  { id: 6, title: "Ghost Of Tsusima", category: "games", img: "img/3-g.jpg", desc: "Станьте самураєм і відвоюйте свої землі!", price: 800, rating: 4.8 },
  { id: 7, title: "Чернівці", category: "books", img: "img/4-b.jpg", desc: "Тур книжка для поїздки", price: 265, rating: 4.1 },
  { id: 8, title: "Control", category: "games", img: "img/5-g.jpg", desc: "Розслідуйте корпорацію і аномалії", price: 278, rating: 4.3 },
  { id: 9, title: "Переслідуваний Аделіні", category: "books", img: "img/5-b.jpg", desc: "якась дічь", price: 200, rating: 3.5 },
  { id: 10, title: "Borderlands 3", category: "games", img: "img/4-g.jpg", desc: "вибухи шаленство", price: 50, rating: 3.9 },
  { id: 11, title: "Тінь у ЖАРИВІ", category: "books", img: "img/6-b.jpg", desc: "жариво", price: 100, rating: 3.2 },
  { id: 12, title: "Far Cry 4", category: "games", img: "img/6-g.jpg", desc: "наркоманія в гімалаях", price: 500, rating: 4.0 },
  { id: 13, title: "Вогні Небес", category: "books", img: "img/7-b.png", desc: "небесні вогнні", price: 400, rating: 4.4 },
  { id: 14, title: "The Crew 2", category: "games", img: "img/7-g.jpg", desc: "гонки", price: 400, rating: 4.1 },
  { id: 15, title: "Володар Перстнів", category: "books", img: "img/8-b.jpg", desc: "моя прелесть", price: 600, rating: 5.0 },
  { id: 16, title: "MAX PAYNE", category: "games", img: "img/8-g.jpg", desc: "Максу боляче", price: 344, rating: 4.7 },
  { id: 17, title: "ШПИГУНСЬКЕ УЗБЕРЕЖЖЯ", category: "books", img: "img/9-b.jpg", desc: "шпигуни", price: 500, rating: 3.8 },
  { id: 18, title: "Formula 1 2024", category: "games", img: "img/9-g.jpg", desc: "макс ферстапен", price: 250, rating: 4.0 },
  { id: 19, title: "Коти Вояки", category: "books", img: "img/10-b.jpg", desc: "фурі коти воюють", price: 100, rating: 3.6 },
  { id: 20, title: "Star Citizen", category: "games", img: "img/10-g.jpg", desc: "Космо сім", price: 300, rating: 4.2 },
];

const productId = parseInt(localStorage.getItem("selectedProductId"));
const product = items.find(item => item.id === productId);
const container = document.getElementById("product-details");

if (product) {
  container.innerHTML = `
    <h2>${product.title}</h2>
    <img src="${product.img}" alt="${product.title}" style="max-width: 300px;">
    <p><strong>Опис:</strong> ${product.desc}</p>
    <p><strong>Ціна:</strong> ${product.price} грн</p>
    <p><strong>Рейтинг:</strong> ${product.rating} </p>
  `;
} else {
  container.innerHTML = "<p>Товар не знайдено</p>";
}

const addToCartBtn = document.getElementById("addToCartBtn");
if (addToCartBtn) {
  addToCartBtn.addEventListener("click", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find(item => item.id === product.id);

    if (!existing) {
      const productToAdd = { ...product, quantity: 1 };
      cart.push(productToAdd);
    } else {
      existing.quantity += 1;
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    const cartModal = document.getElementById("cartModal");
    cartModal.classList.remove("hidden");

    if (typeof renderCartModal === "function") {
      renderCartModal();
    } else {
      console.warn("renderCartModal не визначена");
    }
  });
}