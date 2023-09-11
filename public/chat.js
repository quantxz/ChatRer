const socket = io();
const room = document.querySelector(".roomName").textContent.trim();
const user = document.querySelector(".userName").textContent.trim();


const renderMessage = (message, user) => {
    $('.messages').append('<div class="message">autor: ' + user + ' - <strong>' + message + '</strong></div>');
}


socket.on("room_messages", (data) => {
    if (Array.isArray(data)) {
        data.forEach((message) => {
            console.log(message)
          renderMessage(message.message, message.author);
        });
      }
})

const btn = document.querySelector('.btn');

socket.emit("select_room", {
    room, 
    user
})

btn.addEventListener('click', (e) => {
    e.preventDefault();


    const messageInput = $('input[name=messages]');
    const message = messageInput.val();


    const data = {
        room,
        message,
        user
    };

    socket.emit("message", data, (response) => {
        console.log(response)
        });
    });


    socket.on("message", (data) => {
        console.log('Received Message:', data.message);
        renderMessage(data.message.message, data.user);
});
