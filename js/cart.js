const cart = () => {
    const cartBtn = document.querySelector('.button-cart')
    const cart = document.getElementById('modal-cart')
    const closeBtn = cart.querySelector('.modal-close')
    

    cart.addEventListener('click', (event) => {
      if(!event.target.closest('.modal')) {
        cart.style.display = ''
      }
    })

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        cart.style.display = ''
      }
    })

    cartBtn.addEventListener('click', () => {
      cart.style.display = 'flex'
    })

    closeBtn.addEventListener('click', () => {
      cart.style.display = ''
    })
}

cart()