const BaseModel = require("./baseModel");

class AuthorModel extends BaseModel {
  constructor() {
    super("authors", "Author");
  }

  createAuthor(author) {
    let newPushRef = this.ref.push({
      firstName: author.firstName,
      lastName: author.lastName,
      twitterHandle: author.twitterHandle
    });
    return author;
  }

  deleteAuthor(id) {
    this.ref.child(id).set(null, e => {
      if (e) return false;
      else return true;
    });
    return true;
  }

  updateAuthor(author, id) {
    const authorRef = this.ref.child(id);
    return authorRef.once("value", snapshot => {
      if (snapshot.val()) authorRef.update(author);
    });
  }
}

module.exports = AuthorModel;
