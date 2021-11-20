const getGoods = () => {
  // находим ссылки с категориями товаров, чтобы потом выводить список товаров по клику на категорию
  const links = document.querySelectorAll('.navigation-link')
  
  const getData = () => {
    fetch('https://test123-d9d60-default-rtdb.firebaseio.com/db.json')
      // получаем массив с данными, выводя его в читаемый вид. res = response
      .then((res) => res.json())
      .then((data) => {
        // юзаем JSON стринги чтобы преобразовать строку в объект.
        localStorage.setItem('goods', JSON.stringify(data))
        console.log(data);
      })
    }

    // перебираем ссылки по клику
  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault()
      getData()
      // теперь у нас запрос данных только при клике на категории товаров, а не сразу по загрузке страницы
    })
    })    
    

    //записываем эти данные в переменную и с помощью парса выводим массивом.
    const goods = JSON.parse(localStorage.getItem('goods'))

    // удаление объекта из локальной хранилки.
    //localStorage.removeItem('goods')
}

getGoods()