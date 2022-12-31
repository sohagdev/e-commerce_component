// Selecting all the elements
const menuEl = document.querySelector('.menu ul')
const cartEl = document.querySelector('.cart-summary')
const emptyEl = document.querySelector('.empty')
const totalEl = document.querySelector('.totals')
let cart = []

// Rendering all the menu item
const renderMenuItems = () => {
  menuItems.forEach((item) => {
    menuEl.innerHTML += `
    <li>
    <div class="plate">
      <img
        src="${item.image}"
        alt="${item.alt}"
        class="plate"
      />
    </div>
    <div class="content">
      <p class="menu-item">${item.name}</p>
      <p class="price">$${item.price}</p>
      <button data-id="${item.id}" class="add" onClick="addToCart(${item.id})" >Add to Cart</button>
    </div>
  </li>
    `
  })
}

renderMenuItems()

// Add the selected items to the cart
const addToCart = (id) => {
  if (cart.some((item) => item.id === id)) {
    alert('this item is already in the cart!')
  } else {
    const item = menuItems.find((item) => item.id === id)
    cart.push({
      ...item,
      count: 1
    })
    console.log(cart)
  }
  updateCart()
}

const updateCart = () => {
  emptyEl.style.display = 'none'
  renderCart()
  renderSubtotal()
}

const renderCart = () => {
  cartEl.innerHTML = '' // clear the cart element before adding the new one
  cart.forEach((item) => {
    // totalPriceOfCartItem = item.price * item.count
    cartEl.innerHTML += `
    <li id="cart-id">
          <div class="plate">
             <img
                src="${item.image}"
                alt="Fish Sticks and Fries"
               class="plate"
              />
              <div class="quantity" onClick="removeItemFromCart(${item.id})">
              &#10006
              </div>
          </div>
            <div class="content">
                  <p class="menu-item">${item.name}</p>
                  <p class="price">$${item.price}</p>
              </div>
         <div class="quantity__wrapper">
            <button class="decrease" onClick="changeNumberOfUnits('minus', ${
              item.id
            })">
           <img src="images/chevron.svg" />
              </button>
              <div id="quantity" class="quantity">${item.count}</div>
              <button class="increase" onClick="changeNumberOfUnits('plus', ${
                item.id
              })">
                 <img src="images/chevron.svg" />
               </button>
             </div>
             <div class="subtotal">$${item.price * item.count}</div>
       </li>
    `
  })
}
// remove the item from the cart

const removeItemFromCart = (id) => {
  cart = cart.filter((item) => item.id !== id)
  updateCart()
}

// rendering the subtotal
const renderSubtotal = () => {
  let totalPrice = 0,
    taxRate = 0,
    finalPrice = 0
  cart.forEach((item) => {
    totalPrice += item.count * item.price
    taxRate += item.price / 10
    finalPrice += totalPrice + taxRate
    totalEl.innerHTML = `
          <div class="line-item">
              <div class="label">Subtotal:</div>
              <div class="amount price subtotal">$${totalPrice.toFixed(2)}</div>
          </div>
          <div class="line-item">
              <div class="label">Tax:</div>
              <div class="amount price tax">$${taxRate.toFixed(2)}</div>
          </div>
          <div class="line-item total">
              <div class="label">Total:</div>
              <div class="amount price total">$${finalPrice.toFixed(2)}</div>
          </div>
    `
  })
}

// Change the the Number of Units
const changeNumberOfUnits = (action, id) => {
  cart = cart.map((item) => {
    let numberOfUnits = item.count
    if (item.id === id) {
      if (action === 'plus') {
        numberOfUnits++
      } else if (action === 'minus' && numberOfUnits > 0) {
        numberOfUnits--
      }
    }
    return {
      ...item,
      count: numberOfUnits
    }
  })
  updateCart()
}
