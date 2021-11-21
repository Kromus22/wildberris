const search = () => {
  const input = document.querySelector('.search-block > input')
  const searchBtn = document.querySelector('.search-block > button')
  
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
  
  const getData = (value) => {
    fetch('https://test123-d9d60-default-rtdb.firebaseio.com/db.json')
      // получаем массив с данными, выводя его в читаемый вид. res = response
      .then((res) => res.json())
      .then((data) => {
        // перебор всех данных. сверка с тем, что вводим в поиск
        const array = data.filter(good => good.name.toLowerCase().includes(value.toLowerCase()))
        console.log(value)
        // юзаем JSON стринги чтобы преобразовать строку в объект.
        localStorage.setItem('goods', JSON.stringify(array))

        //переход на страницу с товарами. проверка, если мы уже там, то повторного перехода не будет и страница не обновится. 
        if (window.location.pathname !== "/goods.html") {
          window.location.href = './goods.html'
        } else {
          // отрисовка товаров на странице по выбранной категории.
          renderGoods(array)
        }
        
        })
    }

  searchBtn.addEventListener('click', () => {
    console.log(input.value);
    getData(input.value)
  })
}

search()