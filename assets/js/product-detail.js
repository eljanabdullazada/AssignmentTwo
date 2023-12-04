async function fetchProductDetails(productId) {
    try {
      const response = await fetch(`https://dummyjson.com/products/${productId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const productData = await response.json();
      displayProductDetails(productData);
    } catch (error) {
      console.error('Error occurred while fetching product details: ', error);
    }
  }

  function displayProductDetails(product) {
    const productDetailsContainer = document.getElementById('product-details');
  
    const productHtml = `
      <h2>${product.title}</h2>
      <p>Description: ${product.description}</p>
      <p>Price: $${product.price}</p>
      <p>Discount: ${product.discountPercentage}%</p>
      <p>Rating: ${product.rating}</p>
      <p>Stock: ${product.stock}</p>
      <p>Brand: ${product.brand}</p>
      <p>Category: ${product.category}</p>
      <img src="${product.thumbnail}" alt="${product.title}" style="max-width: 200px; height: auto;">
      <h3>Product Images</h3>
      <div id="product-images">
        ${product.images.map(image => `<img src="${image}" alt="${product.title}">`).join('')}
      </div>
    `;

    productDetailsContainer.innerHTML = productHtml;
  }
  
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  
  fetchProductDetails(productId);
  