var id = require('pow-mongodb-fixtures').createObjectId;

var users = exports.users = {
    user1: {
        name: 'Nutzer1',
        password:'haus',
        isAdmin: true,
        _id: id(),
        firstname: 'John',
        lastname: 'Franklin',
        birthday: '16. April 1786',
        street: 'Seitengasse',
        number: '1b',
        town: 'Erfurt',
        ZIP: '980963',
        country: 'Germany'
            

    },
    user2: {
        name: 'Komoot',
        password: 'radfahren',
        isAdmin: false,
        _id: id('592c25abc1c76b3226edfaab'),
        firstname: 'Roald',
        lastname: 'Amundsen',
        birthday: '16. July 1872',
        street: 'Schlossalle',
        number: '87',
        town: 'Dresden',
        ZIP: '01059',
        country: 'Germany'
        
    },
    user3: {
        name: 'NutzerAdmin',
        password: 'Admin',
        isAdmin: true,
        _id: id('5925840408613c256cf47853'),
        firstname: 'Alexander',
        lastname: 'von Humboldt',
        birthday: '14. September 1769',
        street: '1th Avenue',
        number: '2343',
        town: 'Vancouver',
        ZIP: '2342432',
        country: 'Kanada'
        
    },
   
}