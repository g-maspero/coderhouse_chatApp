class ProductModel {
    constructor() {
        this.products = [];
        this.nextId = 0;
    }

    getProduct(id) {
        return this.products.find(product => product.id == id);
    }
    
    getProducts() {
        return this.products;
    }
    
    addProduct(title, price, thumbnail) {
        const newProduct = {
            title: title,
            price: price,
            thumbnail: thumbnail
        };
        newProduct.id = `${nextId}`;
        this.products.push(newProduct);
        nextId++;
        return newProduct;
    };
    
    updateProduct(id, title, price, thumbnail) {
        const productToUpdate = this.products.find(product => product.id == id);
        if (productToUpdate != undefined) {
            productToUpdate.title = title;
            productToUpdate.price = price;
            productToUpdate.thumbnail = thumbnail;
            return true;
        } else {
            return false;
        }
    };
    
    deleteProduct(id) {
        const previousProductQuantity = this.products.length;
        products = products.filter(product => this.product.id != id);
        if (previousProductQuantity == this.products.length) {
            return false;
        } else {
            return true;
        }
    };
}

const productModel = new ProductModel();

module.exports = productModel;