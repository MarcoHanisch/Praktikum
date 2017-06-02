export class Comment {
    constructor(public id = '', public title ='', public content = '',public Post_id = '', public Username= ''){}
    clone() { return new Comment(this.id, this.title, this.content,this.Post_id, this.Username)}
}