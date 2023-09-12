const socket = io();
const room = document.querySelector(".roomName").textContent.trim();
const user = document.querySelector(".userName").textContent.trim();


const renderMessage = (message, user) => {
    $('.messages').append('<div class="message">autor: ' + user + ' - <strong>' + message + '</strong></div>');
}


socket.on("room_messages", (data) => {
    if (Array.isArray(data)) {
        data.forEach((message) => {
          renderMessage(message.message, message.author);
        });
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

});


socket.on("message", (data) => {
    renderMessage(data.message.message, data.user);
});
