// создаем баттон элемент 
const ButtonElement = document.getElementById('button');
// создали масив
let arr = [];

if (localStorage.getItem('items') !== null) {
    let localStorageJson = localStorage.getItem('items');
    arr = JSON.parse(localStorageJson);
}

const removeElement = function(index) {

    let localStorageJson = localStorage.getItem('items');
    data = JSON.parse(localStorageJson);

    data.splice(index, 1);

    let myJson = JSON.stringify(data);

    localStorage.setItem('items', myJson);

    arr = data;

    showList();

}


//Функция  шоулист = Добавляет все элементы из localstorage НА СТРАНИЦУ
const showList = function() {
    // локалсторадж получает ключ со значением
    let localStorageJson = localStorage.getItem('items');
    //преобразовывает из джейсона в масив
    let itemsArray = JSON.parse(localStorageJson);
    //получаем элемент по айди "лист"
    document.getElementById('list').innerText = '';
    //
    itemsArray.forEach((element, index) => {
        //создаем элемент "див"
        let div = document.createElement('div');
        let button = document.createElement('button');
        button.textContent = 'delete';

        div.className = 'div-text';
        button.className = 'delete-button';

        button.dataset.index = index;

        button.addEventListener('click', function(event) {

            removeElement(event.target.dataset.index);

            event.preventDefault();
        });

        //написанный текст являеться элементом  
        div.innerText = element;
        //все элементы "лист" идут в столбик как дочерние
        document.getElementById('list').appendChild(div);
        document.getElementById('list').appendChild(button);
    });

};
//происходит ивент при клике на баттон
ButtonElement.addEventListener('click', function(event) {

    // Получаем значение поля с текстом
    let inputElement = document.getElementById('text').value;

    if (inputElement == "") {
        event.preventDefault();
        return false;
    }

    // В массив добавляем наш новый элемент
    arr.push(inputElement);

    //Делаем из массива JSON
    let myJson = JSON.stringify(arr);

    // Записываем JSON в локалсторадж
    localStorage.setItem('items', myJson);

    // Добавляем все элементы из localstorage НА СТРАНИЦУ
    showList();
    // не дает странице обновляться после каждого нажатия на кнопку
    event.preventDefault();

});

showList();