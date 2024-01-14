import productOperations from "../services/product-operations.js";

// Data Exchange B/w View and Model.
async function loadPizzas() {
  const pizzas = await productOperations.loadProducts();
  console.log("Pizzas are ", pizzas);
  for (let pizza of pizzas) {
    preparePizza(pizza);
  }
}
loadPizzas();

function addToCart() {
  console.log("pAdd to cart is called ", this);
  const currentButton = this;
  const pizzaId = currentButton.getAttribute("product-id");
  console.log("pizza ki id", pizzaId);
  const pizza = productOperations.search(pizzaId);
  if (pizza.isAddedInCart==true) {
   pizza.isAddedInCart= false;
  }
  else{
    pizza.isAddedInCart=true;
  }
  if(pizza.isAddedInCart){
    this.className = 'btn btn-success';
    this.innerText = 'Remove from Cart';
    // pizza.addToCart(pizza);
}
else{
    this.className = 'btn btn-danger';
    this.innerText = 'Add to Cart';
    removeFromCart(pizza);

}
  printBasket();
  
}
function removeFromCart(pizza){
  pizza.isAddedInCart=false;
  printBasket();
  
}
function printBasket() {
  const cartProducts = productOperations.getProductsInCart();
  const basket = document.querySelector("#basket");
  basket.innerHTML = "";
  var sum = 0;

  for (let product of cartProducts) {
    const li = document.createElement("li");
    li.innerText = `${product.name} ${product.price}`;
    basket.appendChild(li);
    sum += parseFloat(product.price);
    
  }
  printTotal(sum);
}

function printTotal(sum){
  const totalBill = document.querySelector("#total");

  if (!totalBill) {
    totalBill = document.createElement("p");

  }

  totalBill.innerText = `Sub Total: Rs ${sum.toFixed(2)}`;
  const Final= document.createElement('p');
  const tax= sum*1.18;
  Final.innerText=`Total: Rs ${tax.toFixed(2)}`;
  totalBill.appendChild(Final);
}



function preparePizza(pizza) {
  const outDiv = document.getElementById("output");
  const colDiv = document.createElement("div");
  colDiv.className = "col-4";
  const cardDiv = document.createElement("div");
  cardDiv.className = "card";
  cardDiv.style = "width: 15rem;";
  colDiv.appendChild(cardDiv);
  const img = document.createElement("img");
  img.src = pizza.url;
  img.className = "card-img-top";
  cardDiv.appendChild(img);
  const cardBody = document.createElement("div");
  cardBody.className = "card-body";
  cardDiv.appendChild(cardBody);
  const h5 = document.createElement("h5");
  h5.className = "card-title";
  h5.innerHTML = pizza.name;
  const pTag = document.createElement("p");
  pTag.className = "card-text";
  pTag.innerHTML = pizza.desc;
  const button = document.createElement("button");
  button.setAttribute("product-id", pizza.id);
  button.addEventListener("click", addToCart);
  button.innerText = "Add to Cart";
  button.className = "btn btn-danger";

  cardBody.appendChild(h5);

  cardBody.appendChild(pTag);
  cardBody.appendChild(button);
  outDiv.appendChild(colDiv);
}
