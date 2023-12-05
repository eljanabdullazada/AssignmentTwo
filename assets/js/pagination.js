const linkCardGrid = document.getElementById("link-card-grid");
const loadMoreButton = document.getElementById("load-more-button");
let page = 1;
const postsPerPage = 10;

const loadLinks = async () => {
  const skip = (page - 1) * postsPerPage;
  const paginatedUrl = `https://dummyjson.com/products?limit=${postsPerPage}&skip=${skip}`;

  const { products } = await fetch(paginatedUrl).then((res) => res.json());

  const htmlString = products
    .map(
      (product) => `<div class="card" onclick="redirectToProductDetail('${product.id}')">
            <h2>${product.title}</h2>
            <img src="${product.images[0]}"/>
          </div>`
    )
    .join("");

  if (linkCardGrid) {
    linkCardGrid.innerHTML = htmlString;
  }
  page++;
};

loadMoreButton.addEventListener("click", loadLinks);
loadLinks();

function redirectToProductDetail(productId) {
  window.location.href = `pages/productDetail.html?id=${productId}`;
}
