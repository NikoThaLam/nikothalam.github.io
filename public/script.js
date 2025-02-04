const socket = io();

window.onload = () => {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.forEach(data => {
        const li = document.createElement('li');
        li.textContent = `${data.username}: ${data.message}`;
        document.getElementById('messages').appendChild(li);
    });
};

document.getElementById('setUsernameBtn').onclick = () => {
    const username = document.getElementById('username').value;
    socket.emit('setUsername', username);
    document.getElementById('usernameSection').style.display = 'none'; 
};

document.getElementById('sendBtn').onclick = () => {
    const message = document.getElementById('message').value;
    socket.emit('chatMessage', message);
    document.getElementById('message').value = '';
};

socket.on('chatMessage', (data) => {
    const li = document.createElement('li');
    li.textContent = `${data.username}: ${data.message}`;
    document.getElementById('messages').appendChild(li);

    saveMessageToLocalStorage(data);
});

function saveMessageToLocalStorage(data) {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.push(data);
    localStorage.setItem('messages', JSON.stringify(messages));
}

const toggleButton = document.getElementById('toggleButton');
toggleButton.onchange = () => {
    document.body.classList.toggle('dark-mode');
    document.querySelector('.container').classList.toggle('dark-mode');
    document.getElementById('messages').classList.toggle('dark-mode');
};


if (localStorage.getItem('darkMode') === 'enabled') {
    toggleButton.checked = true;
    document.body.classList.add('dark-mode');
    document.querySelector('.container').classList.add('dark-mode');
    document.getElementById('messages').classList.add('dark-mode');
    document.querySelectorAll('.input').forEach(input => {
        input.style.color = '#fff';
        input.style.borderBottomColor = 'rgba(221, 221, 221, 0.39)';
    });
}

toggleButton.onchange = () => {
    if (toggleButton.checked) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }
    document.body.classList.toggle('dark-mode');
    document.querySelector('.container').classList.toggle('dark-mode');
    document.getElementById('messages').classList.toggle('dark-mode');
    document.querySelectorAll('.input').forEach(input => {
        input.style.color = toggleButton.checked ? '#fff' : '#000';
        input.style.borderBottomColor = toggleButton.checked ? 'rgba(221, 221, 221, 0.39)' : '#5891ff';
    });
};