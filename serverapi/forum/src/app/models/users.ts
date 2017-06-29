export class User {
    constructor(public id = '', public name ='', public password= '', public isAdmin = false, public firstname='', public lastname='', public street='', public number='', public ZIP='', public town='', public country=''){}
    clone() { return new User(this.id, this.name, this.password, this.isAdmin, this.firstname, this.lastname, this.street, this.number, this.ZIP, this.town, this.country)}
}