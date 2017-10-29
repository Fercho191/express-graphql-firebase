const firebaseDB = require('../fireadmin');

let ref  = firebaseDB.ref("authors");
let Authors = [];

ref.on("child_changed", (snapshot) => {
  let item = snapshot.val();
  item.id = snapshot.key
  let index = Authors.findIndex((author) => {
    return author.id == item.id
  }, item.id);
  Authors[index] = item;
});

ref.on("child_added", (snapshot) => {
  let item = snapshot.val();
  item.id = snapshot.key
  Authors.push(item) 
});


module.exports = Authors; 