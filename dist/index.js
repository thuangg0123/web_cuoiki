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

                    const img = document.createElement("img");
                    img.src = product.imageProduct[0].imgMain;
                    img.alt = product.name;
                    img.classList.add("cursor-pointer");

                    const imgSecond = document.createElement("img");
                    imgSecond.src = product.imageProduct[0].imgSecond;
                    imgSecond.alt = "";
                    imgSecond.classList.add("hidden");
                    productItem.appendChild(imgSecond);
                    imgSecond.addEventListener("click", () => {
                        console.log("Image clicked!");
                        window.location.href = `chitiet.html?id=${product.id}`;
                    });

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
                    viewButton.innerHTML = `<span class="uppercase font-bold" onclick="addItemToCart(${product.id}, '${product.name}', '${product.imageProduct[0].imgMain}', ${product.price})""><i class="fa-solid fa-eye"></i> Thêm giỏ</span>`;

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

const viewCartBtn = document.getElementById("viewCartBtn");
const screenHeight = window.innerHeight;

window.addEventListener("scroll", function () {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;

    if (scrollPosition > screenHeight / 2) {
        viewCartBtn.style.top = "200px";
    } else {
        viewCartBtn.style.top = "-100px";
    }
});

const cartSidebar = document.getElementById("cartSidebar");

let isCartOpen = false;

const toggleCart = () => {
    if (cartSidebar) {
        if (isCartOpen) {
            closeCart();
        } else {
            openCart();
        }
    }
}

const openCart = () => {
    if (cartSidebar) {
        cartSidebar.style.width = "500px";
        cartSidebar.classList.add('open');
    }
}

const closeCart = () => {
    if (cartSidebar) {
        cartSidebar.style.width = "0";
        cartSidebar.classList.remove('open');
    }
}

const addItemToCart = (id, name, imgMain, price) => {
    const quantity = 1;

    const existingItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    const newItem = {
        id: id,
        name: name,
        image: imgMain,
        price: price,
        quantity: quantity
    };
    alert(`Bạn đã thêm sản phẩm ${newItem.name} vào giỏ hàng thành công`)

    const existingItemIndex = existingItems.findIndex(item => item.id === id);

    if (existingItemIndex !== -1) {
        existingItems[existingItemIndex].quantity += quantity;
    } else {
        existingItems.push(newItem);
    }

    localStorage.setItem('cartItems', JSON.stringify(existingItems));

    updateCartUI();
}

const updateCartUI = () => {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    cartItemsContainer.innerHTML = '';

    cartItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.className = 'cart-item enlarged';

        const image = document.createElement('img');
        image.src = item.image;
        listItem.appendChild(image);

        const productInfo = document.createElement('div');
        productInfo.className = 'product-info';

        const productName = document.createElement('div');
        productName.className = 'product-name';
        productName.textContent = item.name;
        productInfo.appendChild(productName);

        const productPrice = document.createElement('div');
        productPrice.className = 'product-price';
        productPrice.textContent = `${formatPrice(item.price)} x ${item.quantity}`;
        productInfo.appendChild(productPrice);

        listItem.appendChild(productInfo);

        cartItemsContainer.appendChild(listItem);
    });

    const totalAmountDiv = document.createElement('div');
    totalAmountDiv.className = 'total-amount';
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    totalAmountDiv.textContent = `Tổng tiền: ${formatPrice(totalPrice)}`;
    cartItemsContainer.appendChild(totalAmountDiv);

    const buyNowButton = document.createElement('button');
    buyNowButton.className = 'buy-now-button';
    buyNowButton.textContent = 'Mua Ngay';
    buyNowButton.addEventListener('click', () => {
        if (cartItems.length > 0) {
            alert('Mua hàng thành công !!!');
            localStorage.clear();
            location.reload();
        }
        else {
            alert('Bạn tạm thời không thể Thanh toán do giỏ hàng đang trống !!!')
        }
    });
    cartItemsContainer.appendChild(buyNowButton);
}
updateCartUI();
