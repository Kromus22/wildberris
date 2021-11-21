const getGoods = () => {
  // находим ссылки с категориями товаров, чтобы потом выводить список товаров по клику на категорию
  const links = document.querySelectorAll('.navigation-link')

  //переменная для отрисовки товаров на странице.
  const renderGoods = (goods) => {
    const goodsContainer = document.querySelector('.long-goods-list')

    // удаляем в вёрстке всё из контейнера, чтобы потом там отрисовать свои карточки 
    goodsContainer.innerHTML = ""

    //перебор всех полученных карточек с товарами. и создание нового элемента (карточки). для этого создаём див с необходимыми классами, как на уже существующих карточках в вёрстке.
    goods.forEach(good => {
      const goodBlock = document.createElement('div')

      goodBlock.classList.add('col-lg-3')
      goodBlock.classList.add('col-sm-6')

      //отрисовка новой карточки
      goodBlock.innerHTML = `
        <div class="goods-card">
						<span class="label ${good.label ? null : 'd-none'}">${good.label}</span>
						<img src="db/${good.img}" alt="${good.name}" class="goods-image">
						<h3 class="goods-title">${good.name}</h3>						
						<p class="goods-description">${good.description}</p>						
						<button class="button goods-card-btn add-to-cart" data-id="${good.id}">
							<span class="button-price">$${good.price}</span>
						</button>
				</div>
      `

      // заполнение контейнера нашими карточками
      goodsContainer.append(goodBlock)


    })
  }
  
  const getData = (value, category) => {
    fetch('https://test123-d9d60-default-rtdb.firebaseio.com/db.json')
      // получаем массив с данными, выводя его в читаемый вид. res = response
      .then((res) => res.json())
      .then((data) => {
        // перебор всех данных чтобы отфильтровать по категориям. и сразу выводим в сторедж необходимые данные
        const array = category ? data.filter((item) => item[category] === value) : data

        // юзаем JSON стринги чтобы преобразовать строку в объект.
        localStorage.setItem('goods', JSON.stringify(array))

        //переход на страницу с товарами. проверка, если мы уже там, то повторного перехода не будет и страница не обновится. 
        if (window.location.pathname !== "/goods.html") {
          window.location.href = '/goods.html'
        } else {
          // отрисовка товаров на странице по выбранной категории.
          renderGoods(array)
        }
        
        })
    }

    // перебираем ссылки по клику
  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault()
      // получаем текст ссылки для работы с фильтром
      const linkValue = link.textContent
      const category = link.dataset.field

      getData(linkValue, category)
      // теперь у нас запрос данных только при клике на категории товаров, а не сразу по загрузке страницы
    })
    })    
    

    //записываем эти данные в переменную и с помощью парса выводим массивом.
    //const goods = JSON.parse(localStorage.getItem('goods'))

    // удаление объекта из локальной хранилки.
    //localStorage.removeItem('goods')

    //проверка, какие элементы отрисовывать на странице. и не делать это на главной, только на странице товаров.
    if (localStorage.getItem('goods') && window.location.pathname === "/goods.html") {
      renderGoods(JSON.parse(localStorage.getItem('goods')))
    }

}

getGoods()