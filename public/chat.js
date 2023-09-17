const socket = io();
const room = document.querySelector(".roomName").textContent.trim();
const user = document.querySelector(".userName").textContent.trim();
const messagesElement = document.querySelector(".messages");

function check() {
    const messagesElement = document.querySelector(".messages");

    if (messagesElement.children.length === 0) {
        const nullMessage = document.createElement('div');
        nullMessage.className = 'NullMessage';
        nullMessage.textContent = 'Ainda não há mensagens aqui.';
        messagesElement.appendChild(nullMessage);
    } else if (messagesElement.children.length !== 0) {
        const firstChild = messagesElement.firstChild;
        messagesElement.removeChild(firstChild);
    }
}
check()


const renderMessage = (message, user) => {
    $('.messages').append('<div class="message">autor: ' + user + ' - <strong>' + message + '</strong></div>');
}


socket.on("room_messages", (data) => {
    if (Array.isArray(data)) {
        data.forEach((message) => {
          renderMessage(message.message, message.author);
        });
        check()
    }
})

const form = document.querySelector('.messageForm');

socket.emit("select_room", {
    room, 
    user
})

form.addEventListener('submit', (e) => {
    e.preventDefault();


    const messageInput = $('input[name=messages]');
    const message = messageInput.val();
    messageInput.val = ''

    const data = {
        room,
        message,
        user
    };

    socket.emit("message", data);

    document.getElementById("messsageInput").value = ''

    //checando se o numero de mendagems mudou

    check()
});


socket.on("message", (data) => {
    renderMessage(data.message.message, data.user);
});
