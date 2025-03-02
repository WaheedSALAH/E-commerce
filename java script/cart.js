document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price"); // 🟢 عنصر المجموع الكلي

    function displayCart() {
        cartContainer.innerHTML = ""; // تفريغ المحتوى قبل إعادة العرض

        cart.forEach((product, index) => {
            let item = document.createElement("div");
            item.classList.add("cart-item");

            let imgSrc = product.img_url.startsWith("images/") ? `../${product.img_url}` : product.img_url;

            item.innerHTML = `
                <img src="${imgSrc}" alt="${product.product_name}" class="cart-img">
                <div class="cart-info">
                    <div>
                        <h3>${product.product_name}</h3>
                        <p>Price: $${product.price}</p>
                        
                        <div class="quantity-control">
                            <button class="decrease-btn" data-index="${index}">-</button>
                            <span class="quantity">${product.quantity}</span>
                            <button class="increase-btn" data-index="${index}">+</button>
                        </div>
                    </div>    
                    <div>
                        <button class="remove-btn" data-index="${index}">Remove</button>
                    </div>    
                </div>
            `;

            cartContainer.appendChild(item);
        });

        calculateTotal(); // ✅ تحديث المجموع الكلي عند كل تحديث
        addEventListeners(); // إعادة تعيين الأحداث بعد التحديث
    }

    function addEventListeners() {
        document.querySelectorAll(".remove-btn").forEach(button => {
            button.addEventListener("click", function () {
                let index = this.getAttribute("data-index");
                cart.splice(index, 1);
                updateCart();
            });
        });

        document.querySelectorAll(".increase-btn").forEach(button => {
            button.addEventListener("click", function () {
                let index = this.getAttribute("data-index");
                cart[index].quantity += 1;
                updateCart();
            });
        });

        document.querySelectorAll(".decrease-btn").forEach(button => {
            button.addEventListener("click", function () {
                let index = this.getAttribute("data-index");

                // ✅ 🔥 منع تقليل الكمية تحت 1
                if (cart[index].quantity > 1) {
                    cart[index].quantity -= 1;
                    updateCart();
                }
            });
        });
    }

    function calculateTotal() {
        let total = cart.reduce((sum, product) => sum + (product.price * product.quantity), 0);
        totalPriceElement.textContent = total.toFixed(2); // ✅ تحديث العنصر في الصفحة
    }

    function updateCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart(); // إعادة عرض السلة مع تحديث المجموع
    }

    displayCart(); // تشغيل الدالة عند تحميل الصفحة
});
