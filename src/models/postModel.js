const BaseModel = require('./baseModel');

class PostModel extends BaseModel {
    constructor(){
        super('posts', 'Post')
    }
    
    createPost(post) {
        let newPushRef = this.ref.push({
          title: post.title,
          body: post.body,
          authorId: post.authorId
        })
        return post
    }
}

module.exports = PostModel;