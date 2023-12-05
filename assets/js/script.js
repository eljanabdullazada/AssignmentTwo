document.addEventListener("DOMContentLoaded", () => {
  fetchProducts();
});

async function fetchProducts() {
  try {
    const response = await fetch("https://dummyjson.com/products");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    displayProducts(data.products);
  } catch (error) {
    console.error("Error occurred: ", error);
  }
}

function displayProducts(products) {
  
  const container = document.getElementById("product-List");

  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("product");

    productElement.addEventListener('click', () => {
      window.location.href = `pages/productDetail.html?id=${product.id}`;
    });

    productElement.innerHTML = `
      <h5 id="item-category">${product.category}</h5>
      <h3>${product.title}</h3>
      <img src="${product.thumbnail}" alt="${product.title}" />
      <p>${product.description}</p>
      <p>Price: $${product.price}</p>
      <p>Discount: $${product.discountPercentage}</p>
      <p>Available item: ${product.stock}</p>
    `;
    container.appendChild(productElement);
  });
}
