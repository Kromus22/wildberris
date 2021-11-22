const smoothScroll = () => {
  const links = document.querySelectorAll('.scroll-link')
  // перебираем все линки с таким классом на странице, если их несколько и на каждый цепляем Клик.
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault()
      // после отключения дефолтного поведения ссылки и ставим плавную прокрутку наверх.
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    })
  })
}

smoothScroll()