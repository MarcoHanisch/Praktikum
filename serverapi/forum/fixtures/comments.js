var id = require('pow-mongodb-fixtures').createObjectId;

var comments = exports.comments = {
    comment1: {
        title: 'Hallo',
        content: 'Hallo ich bin Komoot',
        Username: 'Komoot',
        Post_id: '592294ed3d5dcf11e2e8aac5',
        _id: id()
    },
    comment2: {
        title: 'Hy Kommot',
        content: 'Ich freue mich dich kenen zu lernen',
        Username: 'Nutzer1',
        Post_id: '592294ed3d5dcf11e2e8aac5',
        _id: id()
    }
}