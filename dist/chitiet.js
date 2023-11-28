document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    if (productId) {
        fetchProductDetails(productId);
    } else {
        console.error("Product ID not found in the URL");
    }
});

const fetchProductDetails = (productId) => {
    const API_URL = `http://localhost:8000/api/products/${productId}`

    fetch(API_URL)
        .then(response => response.json())
        .then(productData => {
            renderProductDetails(productData);
        })
        .catch(error => {
            console.error("Lỗi không thể fetch data:", error);
        });
}

const renderProductDetails = (productData) => {
    const productNameHeading = document.querySelector(".product-name-heading")
    const productImgDetail = document.querySelector(".product-img-detail")
    const productNameElement = document.querySelector(".product-name");
    const productCodeElement = document.querySelector(".product-code");
    const productPriceElement = document.querySelector(".product-price");
    const productColorElement = document.querySelector(".product-color")
    const productSizeElement = document.querySelector(".product-size")
    const productInventory = document.querySelector(".product-inventory")
    const productDes1 = document.querySelector(".des1")
    const productDes2 = document.querySelector(".des2")
    const modelElement = document.querySelector(".model");
    const textColorElement = document.querySelector(".text-color");
    const lengthElement = document.querySelector(".length");
    const weightElement = document.querySelector(".weight");
    const perimeterElement = document.querySelector(".perimeter");
    const stiffnessElement = document.querySelector(".stiffness");
    const headWeightElement = document.querySelector(".head-weight");
    const poundElement = document.querySelector(".pound");
    const materialElement = document.querySelector(".material");
    const tech1 = document.querySelector(".tech1")
    const tech2 = document.querySelector(".tech2")
    const tech3 = document.querySelector(".tech3")
    const tech4 = document.querySelector(".tech4")
    const feature = document.querySelector(".feature")


    productNameHeading.textContent = productData.name
    productImgDetail.src = productData.imageProduct[0].imgMain
    productNameElement.textContent = productData.name;
    productCodeElement.textContent = `Mã vợt: ${productData.code}`;
    productPriceElement.textContent = formatPrice(productData.price) + '₫';
    productColorElement.textContent = productData.color;
    productSizeElement.textContent = productData.size;
    productInventory.textContent = productData.quantity
    productDes1.textContent = productData.description[0].des1
    productDes2.textContent = productData.description[0].des2
    modelElement.textContent = `SỐ MODEL: ${productData.description[0].model}`;
    textColorElement.textContent = `MÀU SẮC: ${productData.description[0].textColor}`;
    lengthElement.textContent = `CHIỀU DÀI VỢT: ${productData.description[0].length}`;
    weightElement.textContent = `TRỌNG LƯỢNG: ${productData.description[0].weight}`;
    perimeterElement.textContent = `CHU VI CÁN VỢT: ${productData.description[0].perimeter}`;
    stiffnessElement.textContent = `ĐỘ CỨNG THÂN VỢT: ${productData.description[0].stiffness}`;
    headWeightElement.textContent = `ĐỘ NẶNG ĐẦU: ${productData.description[0].headWeight}`;
    poundElement.textContent = `SỨC CĂNG KHUYẾN NGHỊ ${productData.description[0].pound}`;
    materialElement.textContent = `CHẤT LIỆU: ${productData.description[0].material}`;
    tech1.textContent = productData.description[0].technology1
    tech2.textContent = productData.description[0].technology2
    tech3.textContent = productData.description[0].technology3
    tech4.textContent = productData.description[0].technology4
    feature.textContent = productData.description[0].feature
}