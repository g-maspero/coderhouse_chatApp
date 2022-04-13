const fs = require('fs');

class Contenedor {
    constructor(file) {
        this.file = file;
        this.currentId = 1;
    }

    save(object) {
        object.id = this.currentId;
        return this.checkFileExists()
            .then(fileExists => {
                if (fileExists) {
                    return this.writeObjectToExistingFile(object);
                } else {
                    return fs.promises.writeFile(this.file, JSON.stringify([object], null, 2));
                }
            })
            .then(() => { this.currentId++ })
            .catch(error => {
                console.log(`Oops, there was an error: ${error.message}`);
            })
    }

    async getById(id) {
        const data = await fs.promises.readFile(this.file, 'utf-8');
        if (data) {
            const jsonData = JSON.parse(data);
            const queriedObject = jsonData.find(object => object.id == id);
            return queriedObject == undefined ? null : queriedObject;
        } else {
            return null;
        }
    }

    async getAll() {
        const data = await fs.promises.readFile(this.file, 'utf-8');
        if (data) {
            if (data !== '') {
                return JSON.parse(data);
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    getAllSync() {
        let data = null;
        try {
            data = fs.readFileSync(this.file).toString('utf8');
        } catch (e) {
            return null;
        }
        if (data) {
            if (data !== '') {
                return JSON.parse(data);
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    checkFileExists() {
        return fs.promises.access(this.file, fs.constants.F_OK)
            .then(() => true)
            .catch(() => false)
    }

    writeObjectToExistingFile(object) {
        return fs.promises.readFile(this.file, 'utf-8')
            .then(data => {
                if (data) {
                    let savedObjects = JSON.parse(data);
                    savedObjects.push(object);
                    return fs.promises.writeFile(this.file, JSON.stringify(savedObjects, null, 2));
                } else {
                    //File exists but it was empty
                    return fs.promises.writeFile(this.file, JSON.stringify([object], null, 2));
                }
            })
    }
}

module.exports = Contenedor;