//Ищем элементы
const btnSubmit = document.querySelector('.btn-submit')
const btnGeo = document.querySelector('.btn-geo')
const chatWindow = document.querySelector('.chat-window')

const wsUrl = 'wss://echo-ws-service.herokuapp.com'
let websocket

//Отображение сообщений клиента
const displayUserMessage = message => {
    let messageBox = document.createElement('div')
    messageBox.classList.add('message-box', 'user')
    messageBox.innerHTML = message
    chatWindow.appendChild(messageBox)
};

//Отображение сообщений сервера
const displayServerMessage = message => {
    let messageBox = document.createElement('div')
    messageBox.classList.add('message-box', 'server')
    messageBox.innerHTML = message
    chatWindow.appendChild(messageBox)
};

//Геолокация
const getGeolocation = url => {
    let messageBox = document.createElement('div')
    messageBox.classList.add('message-box', 'user')
    if (url) {
        let geoLink = document.createElement('a')
        geoLink.classList.add('geo-link')
        geoLink.innerHTML = 'Ваша геолокация'
        geoLink.href = url
        geoLink.target = '_blank'
        messageBox.appendChild(geoLink)
        chatWindow.appendChild(messageBox)
    } else {
        messageBox.innerHTML = 'Геолокация не доступна'
        chatWindow.appendChild(messageBox)
    }
};

document.addEventListener('DOMContentLoaded', () => {
    websocket = new WebSocket(wsUrl)
    
    btnSubmit.addEventListener('click', () => {
      const inputField = document.querySelector('.message-text')
      const userMessage = document.querySelector('.message-text').value
      if (userMessage) {
          displayUserMessage(userMessage)
          const serverResponce = displayServerMessage(userMessage)
          websocket.send(serverResponce)
          inputField.value = ''
      }
   })
})

// Отображение геолокации
btnGeo.addEventListener('click', () => {
    if ('geolocation' in navigator) {
        displayServerMessage('Поиск...')
        navigator.geolocation.getCurrentPosition((position) => {
            const { coords } = position
            const latitude = coords.latitude;
            const longitude = coords.longitude;
            const mapUrl = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`
            getGeolocation(mapUrl)
            websocket.send(coords)
        })
    }
})