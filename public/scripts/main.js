const socket = io.connect();

socket.on('new_product', html => {
    document.getElementById('product_list').innerHTML = html;
})

socket.on('new_message', html => {
    document.getElementById('messages').innerHTML = html;
})

onSubmit = () => {
    event.preventDefault();
    const titleInput = document.getElementById('product_title');
    const priceInput = document.getElementById('product_price');
    const thumbnailInput = document.getElementById('product_thumbnail');
    socket.emit('new_product', JSON.stringify({
        title: titleInput.value,
        price: priceInput.value,
        thumbnail: thumbnailInput.value
    }))
    titleInput.value = '';
    priceInput.value = '';
    thumbnailInput.value = '';
}

sendMessage = () => {
    event.preventDefault();
    const emailInput = document.getElementById('email_input');
    const messageInput = document.getElementById('message_input');
    if (emailInput.value && messageInput.value) {
        const timestamp = new Date().toLocaleString();
        socket.emit('new_message', JSON.stringify({
            from: emailInput.value,
            timestamp: timestamp,
            body: messageInput.value
        }))
        messageInput.value = '';
        emailInput.value = emailInput.value;
    } else {
        alert('You must enter your email and a message!');
    }
}