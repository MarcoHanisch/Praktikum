export class Post {
    constructor(public id = '', public title ='', public topics = '', public Username= ''){}
    clone() { return new Post(this.id, this.title, this.topics, this.Username)}
}