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
  console.log("Author updated:", snapshot.key)
});

ref.on("child_added", (snapshot) => {
  let item = snapshot.val();
  item.id = snapshot.key;
  Authors.push(item)
  console.log("Author added:", snapshot.key)
});

ref.on("child_removed", (snapshot) => {
  let item = snapshot.val();
  item.id = snapshot.key;
  let index = Authors.findIndex((author) => {
    return author.id == item.id
  }, item.id);
  Authors.splice(index, 1);
  console.log("Author removed:", snapshot.key)  
});

// Se ejecuta una sola vez
ref.once("value", (snapshot) => {
  console.log("Authors data loaded:", snapshot.numChildren() === Authors.length);
});

const createAuthor = author => {
  let newPushRef = ref.push({
    firstName: author.firstName,
    lastName: author.lastName,
    twitterHandle: author.twitterHandle
  })
  return author
}

const deleteAuthor = id => {
  ref.child(id).set(null, e => {
    if (e)
      return false  
    else 
      return true
  })
  return true
}

const updateAuthor = (author, id) => {
  const authorRef = ref.child(id)
  return authorRef.once("value", (snapshot)=> {
    if (snapshot.val())
      authorRef.update(author)
  })
}

module.exports = {
  Authors,
  createAuthor,
  deleteAuthor,
  updateAuthor
}; 