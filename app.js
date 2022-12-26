const menuItems = [
  {
    name: 'French Fries with Ketchup',
    price: 223,
    image: 'images/plate__french-fries.png',
    alt: 'French Fries',
    count: 0
  },
  {
    name: 'Salmon and Vegetables',
    price: 512,
    image: 'images/plate__salmon-vegetables.png',
    alt: 'Salmon and Vegetables',
    count: 0
  },
  {
    name: 'Spaghetti Meat Sauce',
    price: 782,
    image: 'images/plate__spaghetti-meat-sauce.png',
    alt: 'Spaghetti with Meat Sauce',
    count: 0
  },
  {
    name: 'Bacon, Eggs, and Toast',
    price: 599,
    image: 'images/plate__bacon-eggs.png',
    alt: 'Bacon, Eggs, and Toast',
    count: 0
  },
  {
    name: 'Chicken Salad with Parmesan',
    price: 698,
    image: 'images/plate__chicken-salad.png',
    alt: 'Chicken Salad with Parmesan',
    count: 0
  },
  {
    name: 'Fish Sticks and Fries',
    price: 634,
    image: 'images/plate__fish-sticks-fries.png',
    alt: 'Fish Sticks and Fries',
    count: 0
  }
]
// Show and hide the cart using the add to cart button

const addCartBtn = document.querySelectorAll('.add')
const cartSummerySection = document.querySelector('.cart-summary')
const empty = document.querySelector('.empty')
let cartItems = []

for (let i = 0; i < addCartBtn.length; i++) {
  addCartBtn[i].addEventListener('click', () => {
    addCartBtn[i].classList.remove('add')
    addCartBtn[i].classList.add('in-cart')
    addCartBtn[i].innerHTML = `<img src="images/check.svg" alt="Check" />
    In Cart`
    addCartBtn[i].disabled = true
    empty.style.display = 'none'
    addToCart(i)
  })
}

// add to cart functionality
const addToCart = (i) => {
  for (let n = 0; n < menuItems.length; n++) {
    const selectedMenuItem = menuItems[n]
    if (i === n) {
      cartItems.push(selectedMenuItem)
      const div = document.createElement('div')
      div.innerHTML = `
         <li>
            <div class="plate">
              <img
                 src='${selectedMenuItem.image}'
                 alt="Fish Sticks and Fries"
                class="plate"
              />
              <div class="quantity">${selectedMenuItem.count + 1}</div>
            </div>
            <div class="content">
              <p class="menu-item">${selectedMenuItem.name}</p>
               <p class="price">$${selectedMenuItem.price}</p>
           </div>
             <div class="quantity__wrapper">
               <button class="decrease">
                 <img src="images/chevron.svg" />
              </button>
              <div class="quantity">1</div>
              <button class="increase">
                <img src="images/chevron.svg" />
              </button>
            </div>
            <div class="subtotal">$${selectedMenuItem.price}</div>
         </li>
      `
      cartSummerySection.appendChild(div)
      increaseCountFunc(menuItems[n])
    }
  }
}
function increaseCountFunc(menuItem) {
  let quantity = 0
  quantity++
  menuItem.count = quantity
}

// increasing & decreasing the quantity
document.addEventListener('click', (e) => {
  const increaseBtn = e.target.closest('.increase')
  const decreaseBtn = e.target.closest('.decrease')

  if (increaseBtn) {
    itemIncreased()
  }
})
