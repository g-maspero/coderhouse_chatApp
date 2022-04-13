const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const path = require('path');
const mainRouter = require('./routes/index');
const productModel = require('./models/products');
const messageModel = require('./models/messages');
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const fs = require('fs');
const { engine } = require('express-handlebars');
const Handlebars = require('handlebars');
const PORT = 8080;
const publicPath = path.resolve(__dirname, '../public');
const layoutsPath = path.resolve(__dirname, './../views/layouts');
const partialsPath = path.resolve(__dirname, './../views/partials');

app.use(express.static(publicPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', mainRouter);

app.set('view engine', 'hbs');
app.set('views', './views');

app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
        layoutsDir: layoutsPath,
        partialsDir: partialsPath
    })
);

const server = httpServer.listen(PORT, () => {
    console.log(`Listening on port ${server.address().port}...`);
})

server.on('error', (error) => {
    console.log(`Server error: ${error}`);
});

io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('new_product', (newProduct) => {
        const product = JSON.parse(newProduct);
        productModel.addProduct(product.title, product.price, product.thumbnail);
        const templateString = fs.readFileSync(`${partialsPath}/products.hbs`).toString('utf8');
        const template = Handlebars.compile(templateString);
        const products = productModel.getProducts();
        const html = template({ products: products, productListExists: products.length });
        io.sockets.emit('new_product', html);
    })

    socket.on('new_message', (newMessage) => {
        const message = JSON.parse(newMessage);
        messageModel.addMessage(message.from, message.timestamp, message.body);
        const templateString = fs.readFileSync(`${partialsPath}/messages.hbs`).toString('utf8');
        const template = Handlebars.compile(templateString);
        const messages = messageModel.getMessages();
        const html = template({ messages: messages });
        io.sockets.emit('new_message', html);
    })
})

app.get('/', (req, res) => {
    const products = productModel.getProducts();
    const messages = messageModel.getMessages();
    res.render('main', { products: products, productListExists: products.length , messages: messages});
});