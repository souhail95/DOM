if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded',ready)
}else
{ready()}
function ready(){
var addToCartButtons = document.getElementsByClassName('shop-item-button')
for( var i = 0; i < addToCartButtons.length; i++){
    var button = addToCartButtons[i]
    button.addEventListener('click',addToCartClicked)
}
var removeCartItemButtons = document.getElementsByClassName('btn btn-danger')
console.log(removeCartItemButtons)
for(var i = 0; i < removeCartItemButtons.length; i++){
    removeCartItemButtons[i].addEventListener('click', removeItems)
}
var quantityInputs = document.getElementsByClassName('cart-quantity-input')
for(var i = 0; i < removeCartItemButtons.length; i++){
    input = quantityInputs[i]
    input.addEventListener('change', quantityChanged)
}
document.getElementsByClassName('btn-purchase')[0].addEventListener('click' , purchaseClicked)
}
function purchaseClicked(){
    var cartItems = document.getElementsByClassName('cart-items')[0]
    if(updateCartTotal()==0){
        alert('no items added')  
        return
    }
    else{
    alert('Thank you for your purchase')
    while(cartItems.hasChildNodes())
    {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()}
}
function removeItems(event){
     removebtn = event.target
     removebtngrandparent=removebtn.parentElement.parentElement
    removebtngrandparent.remove()
    updateCartTotal()
}
function quantityChanged(event){
    var input = event.target
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event){
      var button = event.target
      var shopItem = button.parentElement.parentElement
      var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
      var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
      var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
      addItemToCart(title, price, imageSrc)
}

function addItemToCart(title, price, imageSrc ){
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0] 
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for(var i = 0; i < cartItemNames.length; i++){
        if(cartItemNames[i].innerText == title){
            alert('This item is already added to the card')
            return
        }
    }
    var cartRowContents = `<div class="cart-item cart-column">
        <img class="cart-item-image" width="100px" height="100px" src=${imageSrc}>
        <div class="cart-item-title" style="margin-bottom:50px"> ${title} </div>
        </div>
        <span class="cart-price "> ${price} </span>
        <div class="cart-quantity cart-column">
        <button class="btn minus-btn disabled" type="button">-</button>
        <input class="cart-quantity-input" id="quantity" type="text" value="1">
        <button class="btn plus-btn" type="button">+</button>
        <button class="btn btn-danger"  type="button"> REMOVE </button>
        </div>
`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.querySelector(".minus-btn").setAttribute("disabled","disabled"); 
    cartRow.getElementsByClassName('minus-btn')[0].addEventListener('click', substraction)
    cartRow.getElementsByClassName('plus-btn')[0].addEventListener('click', addition)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeItems)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
    updateCartTotal()
    
}
function addition(event){
var valuecount1=event.target
  var valuecount = valuecount1.parentElement;
 var  valuecount2 = valuecount.getElementsByClassName("cart-quantity-input")[0];
 var  valuecount3 = valuecount2.value
 if(valuecount3 == 1)
 {
    valuecount.querySelector(".minus-btn").setAttribute("disabled","disabled"); 
 }
   valuecount3++;
   valuecount2.value = valuecount3;
   if(valuecount3 > 1){
   valuecount.querySelector(".minus-btn").removeAttribute("disabled");
   valuecount.querySelector(".minus-btn").classList.remove("disabled","disabled");}
   updateCartTotal()
}
function substraction(event){
    var valuecount1=event.target
    var   valuecount = valuecount1.parentElement;
     var valuecount2 = valuecount.getElementsByClassName("cart-quantity-input")[0];
     var  valuecount3 = valuecount2.value
       valuecount3--;
       valuecount2.value = valuecount3;
   if(valuecount3 == 1)
   {
      valuecount.querySelector(".minus-btn").setAttribute("disabled","disabled"); 
   }
   updateCartTotal()
}

function updateCartTotal()  {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for( var i = 0; i < cartRows.length; i++){
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price= parseFloat(priceElement.innerText.replace('$',''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
        console.log(total)
    }
total = Math.round(total*100)/100
document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
return total;
}


