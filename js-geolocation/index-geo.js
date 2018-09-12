function vkInit() {
    return new Promise((resolve, reject) => {
        VK.init({
            apiId: 6686757
        })

        VK.Auth.getLoginStatus(date => {
            if (date.status === 'connected') {
                resolve()
            } else {
                VK.Auth.login(data => {
                    if (data.session) {
                        resolve()
                    } else {
                        reject(new Error('Не удалось авторизоваться'))
                    }
                }, 2)
            }
        })

    })
}

function vkApi(method, options) {
    if (!options.v) {
        options.v = '5.68'
    }

    return new Promise ((resolve, reject) => {
        VK.api(method, options, data => {
            if (data.error) {
                reject(new Error(data.error.error_msg))
            } else {
                resolve(data.response)
            }
        })
    })
}

const cache = new Map()

function geocode(address) {
    // Смотрим есть ли в кэше запрашиваемый город
    if (cache.has(address)) {
        return cache.get(address)
    }

    cache.set(address, ymaps.geocode(address) // ложим в кэш адресс, чтобы заново его не запрашивать
        .then(result => {
            const points = result.geoObjects.toArray()

            // Геокодер вернет список адрессов, поэтому берем самый первый
            if (points.length) {
                return coodrs = points[0].geometry.getCoordinates()
            }
        }))
    return cache.get(address)
}

let myMap
let clusterer

new Promise(resolve => ymaps.ready(resolve)) // ждем загрузку карты
    .then(() => vkInit())  // авторизация источника данных
    .then(() => vkApi('friends.get', {fields: 'city,country'}))  // получаем список записей
    .then((friends => {
        // console.log(friends)
        myMap = new ymaps.Map('map', {
            center: [55.76, 37.64],  // Москва
            zoom: 5
        }, {
            searchControlProvider: 'yandex#search'
        });
        // clusterer = new ymaps.Clusterer({
        //     present: 'islands#invertedVioletClusterIcons',
        //     clusterDisableClickZoom: true,
        //     openBalloonOnClick: false
        // })

        // myMap.geoObjects.add(clusterer);

        return friends.items
    })) // инициализация карты
    // .then (friends => {
    //     const promises = friends
    //         .filter(friend => friend.country && friend.country.title) // получить друзей, у которых есть страна
    //         .map(friend => {
    //             let parts = friend.country.title

    //             if (friend.city) {
    //                 parts += ' ' + friend.city.title
    //             }

    //             return parts;
    //         }).map(geocode)

        
    //     return Promise.all(promises) // Наша функция geocode внутри будет вызывать много своих промисов, поэтому
    //     // с помошью return возвращаем ожидание возвращений всех промисов переменной promises
    // }) // получение списка адресов координат
    // .then(coords => {
    //     // console.log(coords)
    //     const placemarks = coords.map(coord => {
    //         return new  ymaps.Placemark(coord, {}, {present: 'islands#blueHomeCircleIcon'})
    //     })

    //     clusterer.add(placemarks)
    // }) // добавляем гео-объекты на карту
    .catch(e => alert('Ошибка: ' + e.message))