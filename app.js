const productsEl = document.querySelector(".products");
const cartItemsEl = document.querySelector(".cart-items");
const subtotalEl = document.querySelector(".subtotal");
const totalItemsInCartEl = document.querySelector(".total-items-in-cart");


function renderProdcuts() {
  products.forEach((product) => {
    productsEl.innerHTML += `
    <div class="item">
    <div class="item-container">
        <div class="item-img">
            <img src="${product.imgSrc}" alt="${product.name}">
        </div>
        <div class="desc">
            <h2>${product.name}</h2>
            <h2><small>$</small>${product.price}</h2>
            <p>
                ${product.description}
            </p>
        </div>

        <div class="add-to-cart" onclick="addToCart(${product.id})">
            <img src="images/bag.png" alt="add to cart">
        </div>
    </div>
</div>
`;

  });
}
renderProdcuts();


let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();


function addToCart(id) {

  if (cart.some((item) => item.id === id)) {
    changeNumberOfUnits("plus", id);
  } else {
    const item = products.find((product) => product.id === id);

    cart.push({
      ...item,
      numberOfUnits: 1,
    });
  }

  updateCart();
}


function updateCart() {
  renderCartItems();
  renderSubtotal();


  localStorage.setItem("CART", JSON.stringify(cart));
}


function renderSubtotal() {
  let totalPrice = 0,
    totalItems = 0;

  cart.forEach((item) => {
    totalPrice += item.price * item.numberOfUnits;
    totalItems += item.numberOfUnits;
  });

  subtotalEl.innerHTML = `Subtotal (${totalItems} itens): R$${totalPrice.toFixed(2)}`;
  totalItemsInCartEl.innerHTML = totalItems;
}


function renderCartItems() {
  cartItemsEl.innerHTML = ""; 
  cart.forEach((item) => {
    cartItemsEl.innerHTML += `
        <div class="cart-item">
            <div class="item-info" onclick="removeItemFromCart(${item.id})">
                <img src="${item.imgSrc}" alt="${item.name}">
                <h4>${item.name}</h4>
            </div>
            <div class="unit-price">
                <small>R$</small>${item.price}
            </div>
            <div class="units">
                <div class="btn minus" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
                <div class="number">${item.numberOfUnits}</div>
                <div class="btn plus" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>           
            </div>
        </div>
      `;
  });
}


function removeItemFromCart(id) {
  cart = cart.filter((item) => item.id !== id);

  updateCart();
}


function changeNumberOfUnits(action, id) {
  cart = cart.map((item) => {
    let numberOfUnits = item.numberOfUnits;

    if (item.id === id) {
      if (action === "minus" && numberOfUnits > 1) {
        numberOfUnits--;
      } else if (action === "plus" && numberOfUnits < item.instock) {
        numberOfUnits++;
      }
    }

    return {
      ...item,
      numberOfUnits,
    };
  });

  updateCart();
}