// Импортим необходимый модуль для работы с файлами
const fs = require('fs');

// Читаем данные из json-файла
const rawData = fs.readFileSync('data.json');
const parsedData = JSON.parse(rawData);

// Для имитации поля ввода на сайте начинаем прослушивание ввода в терминал
const stdin = process.openStdin();
stdin.addListener("data", function(d) {
    // Получаем и выводим результат работы нашей функции
    let result = getShootingPlacesByAddress(d.toString().trim(), parsedData);
    console.log(result);
});

// Создадим отдельную функцию для получения нужных данных
function getShootingPlacesByAddress(input, data) {
    // Инициализируем пустой массив, чтобы складывать туда нужные данные
    const neededData = [];
    // Для каждого элемента из исходного массива выполняем действия
    data.forEach(item => {
        // Преобразуем адрес и округ к нижнему регистру, чтобы облегчить поиск
        const itemArea = item['AdmArea'].toLowerCase();
        const itemAddress = item['Address'].toLowerCase();
        // Введенный запрос тоже преобразуем к нижнему регистру и обрезаем пробелы по краям
        input = input.toLowerCase().trim();
        // Если в данных находим включение запроса, то добавляем к созданному массиву нужную информацию
        if (itemArea.includes(input) || itemAddress.includes(input)) {
            neededData.push(item['ObjectName'] + 'Адрес: ' + item['Address']);
        }
    });
    // Если так ничего и не нашли, то выводим сообщение
    if (!neededData.length) {
        return 'По указанному адресу нет мест для стрельбы. Попробуйте изменить параметры поиска'
    }
    // Возвращаем найденные данные
    return neededData;
}