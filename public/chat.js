var socket = io.connect('http://localhost:4000');

var usernameInput = document.getElementById('username'),
    messageInput = document.getElementById('message'),
    sendButton = document.getElementById('send'),
    outputDiv = document.getElementById('output'),
    feedbackDiv = document.getElementById('feedback');

sendButton.addEventListener('click', function () {
    var username = usernameInput.value;
    var message = messageInput.value;

    if (username && message) {
        socket.emit('chat', {
            username: username,
            message: message
        });
        messageInput.value = "";
    }
});

messageInput.addEventListener('keypress', function () {
    var username = usernameInput.value;
    socket.emit('typing', username);
});

socket.on('chat', function (data) {
    feedbackDiv.innerHTML = '';
    outputDiv.innerHTML += '<p><strong>' + data.username + ': </strong>' + data.message + '</p>';
});

socket.on('typing', function (username) {
    feedbackDiv.innerHTML = '<p><em>' + username + ' está escribiendo un mensaje...</em></p>';
});

