var id = require('pow-mongodb-fixtures').createObjectId;

var posts = exports.posts = {
    post1: {
        title: 'Dies ist ein Test',
        topics: { description: 'test'},
        Username: 'Nutzer1',
        created: '2017-06-14T15:17:49.934Z',
        _id: id()
    },
    post2: {
        title: 'Hallo zusammen',
        topics: { description: 'Allgemein'},
        Username: 'Komoot',
        created: '2017-06-15T15:17:49.934Z',
        _id: id('592294ed3d5dcf11e2e8aac5')
    },
    post3: {
        title: 'Neuigkeiten des Tages',
        topics: { description: 'Allgemein'},
        Username: 'Nutzer1',
        created: '2017-06-14T15:19:49.934Z',
        _id: id()
    }
}