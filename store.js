if(document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    // Add cart items event listeners
    var cartItems = document.getElementsByClassName("cart-items")[0]
    var cartQuantity = cartItems.getElementsByClassName("cart-quantity")

    for(var i = 0; i < cartQuantity.length; i++) {
        var btn = cartQuantity[i].getElementsByClassName("btn-danger")[0]
        var input = cartQuantity[i].getElementsByClassName("cart-quantity-input")[0]

        btn.addEventListener('click', removeCartItem)
        input.addEventListener('change', cartQuantityItemOnChange)
    }

    // Add shop items event listeners
    var shopItemBtns = document.getElementsByClassName("shop-item-btn")

    for(var i = 0; i < shopItemBtns.length; i++) {
        shopItemBtns[i].addEventListener('click', addToCartClicked)
    }

    // Add purchase items event listeners
    document.getElementsByClassName("btn-purchase")[0].addEventListener('click', purchaseCartItems)
}

function removeCartItem(e) {
    var btnClicked = e.target
    btnClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function cartQuantityItemOnChange(e) {
    var inputChanged = e.target
    
    if(isNaN(inputChanged.value) || inputChanged.value < 1)
        inputChanged.value = 1
    
    updateCartTotal()
}

function addToCartClicked(e) {
    var btnClicked = e.target
    var ancestor = btnClicked.parentElement.parentElement

    var titleElement = ancestor.getElementsByClassName("shop-item-title")[0]
    var title = titleElement.innerText

    var cartItems = document.getElementsByClassName("cart-items")[0]
    var cartItemTitles = cartItems.getElementsByClassName("cart-item-title")

    for(var i = 0; i < cartItemTitles.length; i++) {
        var itemTitle = cartItemTitles[i].innerText
        if(itemTitle == title) {
            var input = cartItemTitles[i].parentElement.parentElement.getElementsByClassName("cart-quantity-input")[0]
            input.value++
            updateCartTotal()
            return
        }
    }

    var priceElement = ancestor.getElementsByClassName("shop-item-price")[0]
    var price = priceElement.innerText
    var imgElement = ancestor.getElementsByClassName("shop-item-image")[0]
    var img = imgElement.src

    var row = document.createElement('div')
    row.innerHTML = `<div class="cart-item cart-column">
                        <img class="cart-item-image" src="${img}" width="100">
                        <span class="cart-item-title">${title}</span>
                    </div>
                    <span class="cart-price cart-column">${price}</span>
                    <div class="cart-quantity cart-column">
                        <input class="cart-quantity-input" type="number" value="1">
                        <button class="btn btn-danger" type="button">REMOVE</button>
                    </div>`
    row.classList.add("cart-row")

    row.getElementsByClassName("cart-quantity-input")[0].addEventListener('change', cartQuantityItemOnChange)
    row.getElementsByClassName("btn-danger")[0].addEventListener('click', removeCartItem)

    cartItems.append(row)

    updateCartTotal()
}

function purchaseCartItems() {
    //alert("Thank you for your purchase!")
    var cartItems = document.getElementsByClassName("cart-items")[0]

    console.time('doSomething')
    while(cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.lastChild)
    }
    console.timeEnd('doSomething')
}

function updateCartTotal() {
    var cartContainer = document.getElementsByClassName("cart-items")[0]
    var cartRows = cartContainer.getElementsByClassName("cart-row")
    var total = 0
    for(var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName("cart-price")[0]
        var quantityElement = cartRow.getElementsByClassName("cart-quantity-input")[0]
        
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = parseInt(quantityElement.value)
        total += price * quantity
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}