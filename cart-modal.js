document.addEventListener("DOMContentLoaded", () => {
    const openCartBtn = document.getElementById("openCartBtn");
    const closeCartBtn = document.getElementById("closeCartBtn");
    const continueShoppingBtn = document.getElementById("continueShoppingBtn");
    const cartModal = document.getElementById("cartModal");
    const cartTotal = document.getElementById("cartTotal");
    const clearCartBtn = document.getElementById("clearCartBtn");

    function getCart() {
        return JSON.parse(localStorage.getItem("cart")) || [];
    }

    function saveCart(cart) {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    function calculateTotal(cart) {
        return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }

    function updateCartTotal() {
        const cart = getCart();
        const total = calculateTotal(cart);
        cartTotal.textContent = `Загальна сума: ${total} грн`;
    }

    window.renderCartModal = function () {
        const cart = getCart();
        const cartContainer = document.getElementById("cartItemsContainer");
        cartContainer.innerHTML = "";

        if (cart.length === 0) {
            cartContainer.innerHTML = "<p>Кошик порожній</p>";
            cartTotal.textContent = "Загальна сума: 0 грн";
            return;
        }

        cart.forEach((item, index) => {
            const div = document.createElement("div");
            div.className = "cart-item";
            div.innerHTML = `
        <div>
          <strong>${item.title}</strong> — ${item.price} грн
          <div class="input-cart">
            <label>Кількість: <input type="number" min="1" value="${item.quantity}" data-index="${index}" class="quantityInput">  </label>
          </div>
        </div>
        <button class="removeItemBtn" data-index="${index}">Видалити</button>
      `;
            cartContainer.appendChild(div);
        });

        document.querySelectorAll(".quantityInput").forEach(input => {
            input.addEventListener("input", (e) => {
                const index = e.target.dataset.index;
                const newQuantity = parseInt(e.target.value);
                if (newQuantity >= 1) {
                    const cart = getCart();
                    cart[index].quantity = newQuantity;
                    saveCart(cart);
                    updateCartTotal();
                }
            });
        });

        document.querySelectorAll(".removeItemBtn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const index = e.target.dataset.index;
                const cart = getCart();
                cart.splice(index, 1);
                saveCart(cart);
                renderCartModal();
            });
        });

        updateCartTotal();
    };

    openCartBtn.addEventListener("click", () => {
        cartModal.classList.remove("hidden");
        renderCartModal();
    });

    closeCartBtn.addEventListener("click", () => {
        cartModal.classList.add("hidden");
    });

    continueShoppingBtn.addEventListener("click", () => {
        cartModal.classList.add("hidden");
    });

    clearCartBtn.addEventListener("click", () => {
        localStorage.removeItem("cart");
        renderCartModal();
    });
});