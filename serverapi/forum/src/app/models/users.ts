export class User {
    constructor(public id = '', public name ='', public password= '', public isAdmin = false){}
    clone() { return new User(this.id, this.name, this.password, this.isAdmin)}
}