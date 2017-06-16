export class Post {
    constructor(public id = '', public title ='', public topics = '', public Username= '', public created=''){}
    clone() { return new Post(this.id, this.title, this.topics, this.Username, this.created)}
}