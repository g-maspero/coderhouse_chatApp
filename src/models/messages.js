const Contenedor = require('../contenedor');

class MessageModel {
    constructor(contenedor) {
        this.contenedor = contenedor;
        const preexistingMessages = this.contenedor.getAllSync();
        if (preexistingMessages != null && preexistingMessages != undefined) {
            this.messages = preexistingMessages;
        } else {
            this.messages = [];
        }
    }
    
    getMessages() {
        return this.messages;
    }
    
    addMessage(from, timestamp, body) {
        const newMessage = {
            from: from,
            timestamp: timestamp,
            body: body
        };
        this.messages.push(newMessage);
        this.persistNewMessage(newMessage);
        nextId++;
        return newMessage;
    };

    persistNewMessage(message) {
        this.contenedor.save(message);
    }
}

const messageModel = new MessageModel(new Contenedor('./messages.txt'));

module.exports = messageModel;