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
      <h1>${product.title}</h1>
      <p>Description: ${product.description}</p>
      <div class="container">

      <div class="information">
          <p>Price: $${product.price}</p>
          <p>Discount: ${product.discountPercentage}%</p>
          <p>Rating: ${product.rating}</p>
          <p>Stock: ${product.stock}</p>
          <p>Brand: ${product.brand}</p>
          <p>Category: ${product.category}</p>
      </div>

      <div class="name-gallery">
            <h3>Product Images</h3>
            <div id="product-images">
              ${product.images.map(image => `<img src="${image}" alt="${product.title}">`).join('')}
            </div>
      </div>
      
      </div>
    `;

    productDetailsContainer.innerHTML = productHtml;
  }
  
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  
  fetchProductDetails(productId);
  