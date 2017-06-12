var id = require('pow-mongodb-fixtures').createObjectId;

var posts = exports.posts = {
    post1: {
        title: 'Dies ist ein Test',
        topics: { description: 'test'},
        Username: 'Nutzer1',
        _id: id()
    },
    post2: {
        title: 'Hallo zusammen',
        topics: { description: 'Allgemein'},
        Username: 'Komoot',
        _id: id('592294ed3d5dcf11e2e8aac5')
    },
    post3: {
        title: 'Neuigkeiten des Tages',
        topics: { description: 'Allgemein'},
        Username: 'Nutzer1',
        _id: id()
    }
}