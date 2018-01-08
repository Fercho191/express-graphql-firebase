const firebaseDB = require('../fireadmin');

class BaseModel {
    constructor(ref, modelName){
        this.ref = firebaseDB.ref(ref);
        this.modelName = modelName;
        this.data = [];

        this.ref.on("child_changed", (snapshot) => {
            let item = snapshot.val();
            item.id = snapshot.key
            let index = this.data.findIndex((data) => {
                return data.id == item.id
            }, item.id);
            this.data[index] = item;
            console.log(this.modelName + " updated:", snapshot.key)
        });

        this.ref.on("child_added", (snapshot) => {
            let item = snapshot.val();
            item.id = snapshot.key;
            this.data.push(item)
            console.log(this.modelName + " added:", snapshot.key)
        });

        this.ref.on("child_removed", (snapshot) => {
            let item = snapshot.val();
            item.id = snapshot.key;
            let index = this.data.findIndex((data) => {
                return data.id == item.id
            }, item.id);
            this.data.splice(index, 1);
            console.log(this.modelName + " removed:", snapshot.key)  
        });

        // Se ejecuta una sola vez
        this.ref.once("value", (snapshot) => {
            console.log(this.modelName + " data loaded:", snapshot.numChildren() === this.data.length);
        });
    }

    getData(){
        return this.data;   
    }
}

module.exports = BaseModel;