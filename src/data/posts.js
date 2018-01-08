const firebaseDB = require('../fireadmin');

let ref  = firebaseDB.ref("posts");
let Posts = [];

ref.on("child_changed", (snapshot) => {
  let item = snapshot.val();
  item.id = snapshot.key
  let index = Posts.findIndex((post) => {
    return post.id == item.id
  }, item.id);
  Posts[index] = item;
  console.log("Post updated:", snapshot.key)
});

ref.on("child_added", (snapshot) => {
  let item = snapshot.val();
  item.id = snapshot.key;
  Posts.push(item)
  console.log("Post added:", snapshot.key)
});

ref.on("child_removed", (snapshot) => {
  let item = snapshot.val();
  item.id = snapshot.key;
  let index = Posts.findIndex((post) => {
    return post.id == item.id
  }, item.id);
  Posts.splice(index, 1);
  console.log("Post removed:", snapshot.key)  
});

// Se ejecuta una sola vez
ref.once("value", (snapshot) => {
  console.log("Posts data loaded:", snapshot.numChildren() === Posts.length);
});

const createPost = post => {
  let newPushRef = ref.push({
    title: post.title,
    body: post.body,
    author_id: post.author_id
  })
  return post
}


module.exports = {
  Posts,
  createPost
};