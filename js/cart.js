const cart = () => {
  const cartBtn = document.querySelector('.button-cart')
  const cart = document.getElementById('modal-cart')
  const closeBtn = cart.querySelector('.modal-close')
  const goodsContainer = document.querySelector('.long-goods-list')
  const cartTable = document.querySelector('.cart-table__goods')
  const modalForm = document.querySelector('.modal-form')
  const totalPrice = document.querySelector('.card-table__total')

  const resetCart = () => {
    cartTable.innerHTML = ''
    localStorage.removeItem('cart')
  }

  const deleteCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem('cart'))

    const newCart = cart.filter(good => {
      return good.id !== id
    })

    localStorage.setItem('cart', JSON.stringify(newCart))
    renderCartGoods(JSON.parse(localStorage.getItem('cart')))
  }

  const plusCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem('cart'))

    const newCart = cart.map(good => {
      if (good.id === id) {
        good.count++
      }
      return good
    })

    localStorage.setItem('cart', JSON.stringify(newCart))
    renderCartGoods(JSON.parse(localStorage.getItem('cart')))
  }

  const minusCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem('cart'))

    const newCart = cart.map(good => {
      if (good.id === id) {
        if (good.count > 0) {
          good.count--
        }
      }
      return good
    })

    localStorage.setItem('cart', JSON.stringify(newCart))
    renderCartGoods(JSON.parse(localStorage.getItem('cart')))
  }

  const addToCart = (id) => {
    //получаем массив товаров в кликнутой категории
    const goods = JSON.parse(localStorage.getItem('goods'))
    //а теперь по ID находим и получаем именно наш товар, который хотим закинуть в корзину.
    const clickedGood = goods.find(good => good.id === id)
    //создаём новый массив выбранных товаров для корзины.
    const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []

    // проверяем что уже напихано в корзине.
    if (cart.some(good => good.id === clickedGood.id)) {
      //проверяем, есть ли товар уже в корзине, если да, то добавляем ещё 1.
      cart.map(good => {
        if (good.id === clickedGood.id) {
          good.count++
        }
        return good
      })
    } else {
      //если товара нет, то пихаем его в корзину.
      clickedGood.count = 1
      cart.push(clickedGood)
    }

    // полученные товары для корзины сохраняем в локальную хранилку.
    localStorage.setItem('cart', JSON.stringify(cart))
  }


  //заполнение корзины выбранными товарами при открытии.
  const renderCartGoods = (goods) => {
    cartTable.innerHTML = ''

    //создаём пустой массив для внесения туда суммарной цены по каждому товару в корзине
    const totalPriceArray = []
    //создаём новый элемент в вёрстке при каждом переборе. чтобы затем добавлять туда инфу по выбранным товарам.
    goods.forEach(good => {
      const tr = document.createElement('tr')
      tr.innerHTML = `
            <td>${good.name}</td>
              <td>${good.price}$</td>
              <td><button class="cart-btn-minus"">-</button></td>
              <td>${good.count}</td>
              <td><button class="cart-btn-plus"">+</button></td>
              <td>${+good.price * +good.count}$</td>
						<td><button class="cart-btn-delete"">x</button></td>
        `

      //создаём в вёрстке наши, выбранные, товары
      cartTable.append(tr)

      //добавление и убавление количества товара в корзине по кнопкам. удаление товара.
      tr.addEventListener('click', (e) => {
        if (e.target.classList.contains('cart-btn-minus')) {
          minusCartItem(good.id)
        } else if (e.target.classList.contains('cart-btn-plus')) {
          plusCartItem(good.id)
        } else if (e.target.classList.contains('cart-btn-delete')) {
          deleteCartItem(good.id)
        }
      })
      // заталкиваем в пустой массив финальные суммы по каждому товару
      totalPriceArray.push(`${+good.price * +good.count}`)
    });

    // высчитываем сумму всех товаров в корзине
    const finalPrice = totalPriceArray.reduce(
      (previousValuev, currentValue) => previousValuev + Number(currentValue),
      0
    )
    // выводим всё сумму в корзине.    
    totalPrice.textContent = `${finalPrice} $`
  }

  //отправка формы из корзины
  const sendForm = () => {
    const cartArray = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []

    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        cart: cartArray,
        name: '',
        phone: ''
      })
    }).then(() => {
      cart.style.display = ''
      resetCart()
    })
  }

  modalForm.addEventListener('submit', (e) => {
    e.preventDefault()
    sendForm()
  })


  cart.addEventListener('click', (event) => {
    if (!event.target.closest('.modal') && event.target.classList.contains('overlay')) {
      cart.style.display = ''
    }
  })

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      cart.style.display = ''
    }
  })

  cartBtn.addEventListener('click', () => {

    const cartArray = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
    renderCartGoods(cartArray)
    cart.style.display = 'flex'
  })

  closeBtn.addEventListener('click', () => {
    cart.style.display = ''
  })

  // добавление товара в корзину. 
  if (goodsContainer) {
    goodsContainer.addEventListener('click', (event) => {
      if (event.target.closest('.add-to-cart')) {
        //получаем айдишник именно нужной нам кнопки
        const buttonToCart = event.target.closest('.add-to-cart')
        const goodID = buttonToCart.dataset.id

        addToCart(goodID)

      }
    })
  }
}

cart()