var sideNav = document.querySelector(".sidenavbar");

function showNavbar() {
    sideNav.style.left="0%";
}

function closeNav() {
    sideNav.style.left="-60%";
}

function navigateToHome() {
    window.location.href = 'Index.html'; // Adjust the path as needed
}

var mens = document.querySelector(".disp1");
var womens = document.querySelector(".disp2");
var kids = document.querySelector(".disp3");

function changeMens() {
    mens.style.display = "block";
    womens.style.display = "none";
    kids.style.display = "none";
}

function changeWomens() {
    mens.style.display = "none";
    womens.style.display = "block";
    kids.style.display = "none";
}

function changeKids() {
    mens.style.display = "none";
    womens.style.display = "none";
    kids.style.display = "block";
}

var letter = document.getElementById("letter");
var newsInput = document.getElementsByClassName("add-inp")[0];

letter.addEventListener("click", function () {
  if (newsInput.value.trim() === "") {
    alert("Please write your email");
  } else {
    alert("Now you've subscribed to the newsletter!");
  }
});


var productContainer = document.getElementById("products");
var search = document.getElementById("search");
var productList = productContainer.querySelectorAll("div");

search.addEventListener("keyup", function(event) {
    var enterValue = event.target.value.toUpperCase();

    for (count = 0; count < productList.length; count= count+1) {
        var productH3 = productList[count].querySelector("h3");

        if (productH3) {
            // Check if productParagraph is not null
            var productName = productH3.textContent;

            if (productName.toUpperCase().indexOf(enterValue) === -1) {
                productList[count].style.display = "none";
            } else {
                productList[count].style.display = "block";
            }
        }
    }
});
 
var input = document.getElementById("inp");
input.addEventListener("click", function(event) {
    var enterValue = event.target.value.toUpperCase();

    for (count = 0; count < productList.length; count= count+1) {
        var productH3 = productList[count].querySelector("h3");

        if (productH3) {
            // Check if productParagraph is not null
            var productName = productH3.textContent;

            if (productName.toUpperCase().indexOf(enterValue) === -1) {
                productList[count].style.display = "none";
            } else {
                productList[count].style.display = "block";
            }
        }
    }
});


var cartIcon = document.querySelectorAll(".add-cart");
var cart = document.querySelector(".cart");
var closeCart = document.querySelector("#close-cart");

cartIcon.forEach(function(cartIcon) {
    cartIcon.addEventListener("click", function(event) {
        event.preventDefault();
        cart.style.right = "0%";
    });
});
closeCart.addEventListener("click", function(){
    cart.style.right="-100%"
});

if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
}else{
    ready()
}

function ready(){
    var removeCartBut = document.getElementsByClassName("cart-remove");
    for(var i=0; i< removeCartBut.length; i++){
        var button = removeCartBut[i];
        button.addEventListener("click", removeCartItem);
    }
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for(var i=0; i< quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener("click", quantChanges);
    }
    var addCart = document.querySelectorAll(".add-cart");
    for(var i=0; i< addCart.length; i++){
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
    document.getElementsByClassName("btn-buy")[0]
    .addEventListener("click", buyButtonClicked);
}

function buyButtonClicked() {
    var cartContent = document.querySelector(".cart-content");

    if (cartContent.childElementCount === 0) {
        alert("Your Cart is Empty! Please Add Some Products to Continue!");
    } else {
        alert("Your Order is Placed!");
        
        // Clear the cart and update the total (optional)
        while (cartContent.hasChildNodes()) {
            cartContent.removeChild(cartContent.firstChild);
        }
        updateTotal();
    }
}

function removeCartItem(event){
    var buttonClkd = event.target;
    buttonClkd.parentElement.remove();
    updateTotal();
}
function addCartClicked(event) {
    var button = event.target;
    var shopProd = button.parentElement;
    var title = shopProd.getElementsByClassName("prod-tit")[0].innerHTML;
    var price = shopProd.getElementsByClassName("price")[0].innerHTML;
    var cartImgs = shopProd.getElementsByClassName("cart-img");

    if (cartImgs.length > 0) {
        var prodImge = cartImgs[0].src;
        console.log("Product Image:", prodImge); // Add this line for debugging
        addProductToCart(title, price, prodImge);
        updateTotal();
    } else {
        console.error("Element with class 'cart-img' not found.");
    }
}

function addProductToCart(title, price, prodImge) {
    var cartItems = document.querySelector(".cart-content");
    var cartItemsNames = cartItems.getElementsByClassName("prod-tit");

    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].textContent === title) {
            alert("You have already added this item to the cart");
            return;
        }
    }

    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");

    var cartBoxContent = `
        <img src="${prodImge}" class="cart-img">
        <div class="detaile-box">
            <div class="prod-tit">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <i class="fa-solid fa-trash cart-remove" onclick="removeCartItem(event)"></i>`;

    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);

    cartShopBox.getElementsByClassName("cart-remove")[0]
        .addEventListener("click", removeCartItem);

    cartShopBox.getElementsByClassName("cart-quantity")[0]
        .addEventListener("click", quantChanges);

    updateTotal();
}

function quantChanges(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}

function updateTotal() {
    var cartContent = document.querySelector(".cart-content");
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;

    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElem = cartBox.getElementsByClassName("cart-price")[0];
        var quanElem = cartBox.getElementsByClassName("cart-quantity")[0];

        // Check if elements are found
        if (priceElem && quanElem) {
            var price = parseFloat(priceElem.textContent.replace("$", ""));
            var quantity = quanElem.value;
            
            // Check if price is a number
            if (!isNaN(price) && !isNaN(quantity)) {
                total += price * quantity;
            }
        }
    }

    // Check if total is a valid number
    if (!isNaN(total)) {
        total = Math.round(total * 100) / 100;
    }

    // Display the total
    document.querySelector(".total-price").innerHTML = "$" + total;
}

