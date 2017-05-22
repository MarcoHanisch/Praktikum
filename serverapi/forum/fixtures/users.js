var id = require('pow-mongodb-fixtures').createObjectId;

var users = exports.users = {
    user1: {
        name: 'Nutzer1',
        password:'haus',
        isAdmin: true,
        _id: id()
    },
    user2: {
        name: 'Komoot',
        password: 'radfahren',
        isAdmin: false,
        _id: id()
    },
    user3: {
        name: 'NutzerAdmin',
        password: 'Admin',
        isAdmin: true,
        _id: id()
    },
   
}