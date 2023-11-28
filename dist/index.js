document.addEventListener("DOMContentLoaded", () => {
    const wrapperProduct = document.getElementById("wrapper-product");
    const sortBySelect = document.getElementById("SortBy")

    fetch("http://localhost:8000/api/products")
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            let products = Array.isArray(data.products) ? data.products : [];
            const displayProducts = (wrapper, products) => {
                wrapper.innerHTML = "";
                products.forEach(product => {
                    const productItem = document.createElement("div");
                    productItem.classList.add("product-item");
                    productItem.setAttribute("data-id", product.id);

                    productItem.addEventListener("click", () => {
                        window.location.href = `chitiet.html?id=${product.id}`;
                    })

                    const img = document.createElement("img");
                    img.src = product.imageProduct[0].imgMain;
                    img.alt = product.name;
                    img.classList.add("cursor-pointer");

                    const imgSecond = document.createElement("img");
                    imgSecond.src = product.imageProduct[0].imgSecond;
                    imgSecond.alt = "";
                    imgSecond.classList.add("hidden");
                    productItem.appendChild(imgSecond);

                    const title = document.createElement("span");
                    title.classList.add("uppercase", "font-semibold", "text-base");
                    title.textContent = product.name;

                    const priceContainer = document.createElement("div");
                    priceContainer.classList.add("flex-grow");

                    const price = document.createElement("span");
                    price.classList.add("font-bold");
                    price.textContent = formatPrice(product.price) + 'đ';

                    priceContainer.appendChild(price);

                    const buttons = document.createElement("div");
                    buttons.classList.add("my-3", "flex", "justify-between", "text-sm");

                    const buyButton = document.createElement("button");
                    buyButton.classList.add("transtion-button");
                    buyButton.innerHTML = `<span class="uppercase font-bold"><i class="fa-solid fa-cart-shopping"></i> mua ngay</span>`;

                    const viewButton = document.createElement("button");
                    viewButton.classList.add("transtion-button");
                    viewButton.innerHTML = `<span class="uppercase font-bold"><i class="fa-solid fa-eye"></i> xem ngay</span>`;

                    buttons.appendChild(buyButton);
                    buttons.appendChild(viewButton);

                    productItem.appendChild(img);
                    productItem.appendChild(title);
                    productItem.appendChild(priceContainer);
                    productItem.appendChild(buttons);

                    productItem.addEventListener("mouseenter", () => {
                        img.classList.add("hidden");
                        imgSecond.classList.remove("hidden");
                    });

                    productItem.addEventListener("mouseleave", () => {
                        img.classList.remove("hidden");
                        imgSecond.classList.add("hidden");
                    });

                    wrapperProduct.appendChild(productItem);
                });
            }

            displayProducts(wrapperProduct, products)

            sortBySelect.addEventListener("change", () => {
                const selectedValue = sortBySelect.value;
                products = sortProducts(products, selectedValue)
                displayProducts(wrapperProduct, products)
            })

            const sortProducts = (products, sortBy) => {
                switch (sortBy) {
                    case "title-ascending":
                        return products.sort((a, b) => a.name.localeCompare(b.name));
                    case "title-descending":
                        return products.sort((a, b) => b.name.localeCompare(a.name));
                    case "price-ascending":
                        return products.sort((a, b) => a.price - b.price);
                    case "price-descending":
                        return products.sort((a, b) => b.price - a.price);
                    default:
                        return products;
                }
            }
        })
        .catch(error => console.error("Error fetching data:", error));
});

const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};


// toggleMobile
var toggleMobile = document.getElementById('toggleMobile');
var closeMobileInside = document.getElementById('closeMobileInside');
var mobileMenu = document.getElementById('mobileMenu');

toggleMobile.addEventListener('click', function () {
    mobileMenu.classList.add('active');
    toggleMobile.classList.add('hidden');
    closeMobileInside.classList.remove('hidden');
});

closeMobileInside.addEventListener('click', function () {
    mobileMenu.classList.remove('active');
    toggleMobile.classList.remove('hidden');
    closeMobileInside.classList.add('hidden');
});

