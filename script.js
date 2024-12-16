document.addEventListener("DOMContentLoaded", () => {
  const products = JSON.parse(localStorage.getItem("ProductList")) || [
    { id: 1, name: "Product 1", price: 29.99 },
    { id: 2, name: "Product 2", price: 19.99 },
    { id: 3, name: "Product 3", price: 59.999 },
  ];
  saveTasksProductList();
  // const products = [
  //   { id: 1, name: "Product 1", price: 29.99 },
  //   { id: 2, name: "Product 2", price: 19.99 },
  //   { id: 3, name: "Product 3", price: 59.999 },
  // ];

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotalMessage = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkOutBtn = document.getElementById("checkout-btn");
  const deleteBtn = document.getElementById("delete");
  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
    <span>${product.name} - $${product.price.toFixed(2)}</span>
    <button data-id="${product.id}">Add to cart</button>
    `;
    productList.appendChild(productDiv);
  });
  renderCart();

  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);
      addToCart(product);
    }
  });
  function addToCart(product) {
    // if (IdArray.includes(product.id)) {
    //   let tempProduct = product;
    //   tempProduct.id = parseInt(String(tempProduct.id) + String(tempProduct.id));
    //   cart.push(tempProduct);
    // }
    // IdArray.push(product.id)
    // console.log(IdArray);

    cart.push(product);
    renderCart();
  }

  function renderCart() {
    cartItems.innerText = "";
    let totalPrice = 0;

    if (cart.length > 0) {
      emptyCartMessage.classList.add("hidden");
      cartTotalMessage.classList.remove("hidden");
      cart.forEach((item, index) => {
        totalPrice += item.price;
        const cartItem = document.createElement("div");
        cartItem.innerHTML = `
        <span id="cart">${item.name} - $${item.price.toFixed(2)}
        </span>
        <button class="delete" data-id="${item.id}">delete</button>
        `;
        cartItem.classList.add("cart");

        cartItems.appendChild(cartItem);
        totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
        saveTasksCart();
      });
    } else {
      emptyCartMessage.classList.remove("hidden");
      totalPriceDisplay.textContent = `$0.00`;
      saveTasksCart();
    }
  }

  checkOutBtn.addEventListener("click", () => {
    if (cart.length === 0) return;
    cart.length = 0;
    alert("Checkout successfully");
    renderCart();
  });

  cartItems.addEventListener("click", (e) => {
    // console.log('click');
    if (e.target.tagName === "BUTTON") {
      const cartItemId = parseInt(e.target.getAttribute("data-id"));
      cart = cart.filter((p) => p.id != cartItemId);
      renderCart();
    }
  });
  function saveTasksCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  function saveTasksProductList() {
    localStorage.setItem("ProductList", JSON.stringify(products));
  }
});
