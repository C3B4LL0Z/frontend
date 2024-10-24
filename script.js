let products = JSON.parse(localStorage.getItem("products")) || [];

function renderProducts() {
  const productsList = document.getElementById("productsList");
  productsList.innerHTML = "";

  products.forEach((product, index) => {
    const productItem = document.createElement("div");
    productItem.className = "product-item";

    productItem.innerHTML = `
            ${product.name}
            <button onclick="editProduct(${index})">Editar</button>
            <button onclick="deleteProduct(${index})">Eliminar</button>
        `;

    productsList.appendChild(productItem);
  });
}

function addProduct(name) {
  const newProduct = { name, id: Date.now() };
  products.push(newProduct);
  localStorage.setItem("products", JSON.stringify(products));
  renderProducts();
}

function editProduct(index) {
  const newName = prompt("Ingrese el nuevo nombre del producto:");
  if (newName) {
    products[index].name = newName;
    localStorage.setItem("products", JSON.stringify(products));
    renderProducts();
  }
}

function deleteProduct(index) {
  if (confirm("¿Está seguro de eliminar este producto?")) {
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    renderProducts();
  }
}

document.getElementById("productForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const productName = document.getElementById("productName");
  addProduct(productName.value);
  productName.value = "";
});

renderProducts();
