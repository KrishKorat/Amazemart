import {cart, productAddToCart} from '../data/cart.js';
import {products, loadProducts} from '../data/products.js';


// Runs code after products arr has fetched from backend
loadProducts(amazonJsFunc);

// Bundling functions to insert in loadProducts
function amazonJsFunc() {
    productGridGenerator();
    addToCartInteractive(); // Contains all the things when we click 'add to cart' button
    updateCartQuantity(); // Updates count of cart in the right corner
}


// Generate product grid
function productGridGenerator() {
    let productGridHTML = '';

    // Connects to product.js >>> products named array
    products.forEach((product) => {
        
        productGridHTML += `
        
            <div class="product-container">
            <div class="product-image-container">
                <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
                ${product.name}
            </div>

            <div class="product-rating-container">
                <img class="product-rating-stars"
                src="${product.getUrl()}">
                <div class="product-rating-count link-primary">
                ${product.rating.count}
                </div>
            </div>

            <div class="product-price">
                ${product.getPrice()}
            </div>

            <div class="product-quantity-container">
                <select class="js-quantity-selector-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                </select>
            </div>

            ${product.extraInfoHTML()}

            <div class="product-spacer"></div>

            <div class="added-to-cart js-added-popup-${product.id}">
                <img src="images/icons/checkmark.png">
                Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart-button" data-product-id="${product.id}">
                Add to Cart
            </button>
            </div>
        `;
        
    });

    document.querySelector('.products-grid')
        .innerHTML = productGridHTML;
}


// Contains all the things when we click 'add to cart' button
function addToCartInteractive() {
    
    let addTimeoutMSG = {}; // Contains the active id if popup is running, not then null

    // Makes all the button functionable separately 
    document.querySelectorAll('.js-add-to-cart-button')
        .forEach((button) => {

            // Adds functionality when we click button
            button.addEventListener('click', () => {

                let productId = button.dataset.productId;

                // Gets total value from drop down box
                let selectElem = document.querySelector(`.js-quantity-selector-${productId}`);
                let selectVal = selectElem.value;
                selectVal = Number(selectVal);

                // Check if there is matching value, yes then adds to that
                productAddToCart(productId, selectVal);

                // Updates the cart quantity on shoping item each time we add new product
                updateCartQuantity();      

                // Adds green popup message
                popUp(productId, addTimeoutMSG);

            });
        });
}
// Updates the cart quantity on shoping item each time we add new product
function updateCartQuantity() {
    let cartQuantity = 0;

    cart.forEach((item) => {
        cartQuantity += item.quantity;
    });
    document.querySelector('.js-cart-quantity')
        .innerHTML = cartQuantity;
}

// Adds green popup message
function popUp(productId, addTimeoutMSG) {
    
    let addedPopup = document.querySelector(`.js-added-popup-${productId}`);
    addedPopup.classList.add('added-to-cart-visible');

        //  Catches if any product has popup on during clicking button
    let isPreviousTimeoutOn = addTimeoutMSG[productId];
    if(isPreviousTimeoutOn) {
        clearTimeout(isPreviousTimeoutOn);
    }

    let timoutId = setTimeout(() => { // removes the added class after 2 sec
        addedPopup.classList.remove('added-to-cart-visible');
    }, 2000);

    addTimeoutMSG[productId] = timoutId; // Adds value to above object while popup is showing, terminaters afterwards
}