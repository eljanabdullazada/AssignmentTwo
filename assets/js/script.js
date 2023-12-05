document.addEventListener("DOMContentLoaded", () => {
  fetchProducts();
  setupSearch();
});

let allProducts = [];

async function fetchProducts() {
  try {
    const response = await fetch("https://dummyjson.com/products");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    allProducts = data.products;
    displayProducts(allProducts);
    
    const categories = extractCategories(allProducts);
    setupCategoryFilter(categories); 
  } catch (error) {
    console.error("Error occurred: ", error);
  }
}

function displayProducts(products) {
  const container = document.getElementById("product-List");
  container.innerHTML = ''; 

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

function setupSearch() {
  const searchInput = document.createElement('input');
  searchInput.setAttribute('type', 'text');
  searchInput.setAttribute('placeholder', 'Search...');
  searchInput.addEventListener('input', handleSearch);
  document.getElementById('top-header').appendChild(searchInput);
}

function handleSearch() {
  const searchValue = this.value.trim().toLowerCase();
  const filteredProducts = allProducts.filter(product =>
    product.title.toLowerCase().includes(searchValue) ||
    product.description.toLowerCase().includes(searchValue) ||
    product.category.toLowerCase().includes(searchValue)
  );
  displayProducts(filteredProducts);
}

function setupCategoryFilter(categories) {
  const selectBox = document.createElement('select');
  const defaultOption = document.createElement('option');
  defaultOption.text = 'All Categories';
  defaultOption.value = '';
  selectBox.add(defaultOption);

  categories.forEach(category => {
    const option = document.createElement('option');
    option.text = category;
    option.value = category.toLowerCase(); 
    selectBox.add(option);
  });

  selectBox.addEventListener('change', handleCategoryFilter);
  document.getElementById('top-header').appendChild(selectBox);
}

// we use this to filter and get rid of same categories to make ure that we can show the user which categories exists in filter button
function extractCategories(products) {
  return [...new Set(products.map(product => product.category))];
}

function handleCategoryFilter() {
  const selectedCategory = this.value.toLowerCase();
  const filteredProducts = selectedCategory ?
    allProducts.filter(product => product.category.toLowerCase() === selectedCategory) :
    allProducts;
  displayProducts(filteredProducts);
}
