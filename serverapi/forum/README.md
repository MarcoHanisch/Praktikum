# Forum

This project create a typically Forum.

Dieses Projekt erstellt ein typisches Forum.

###Backend

MongoDb wird als Datenbank verwendet. Diese hat 3 Collections, eine für Nutzer, eine für Posts und eine für Kommentare.

Der Server ist mit Node JS und Express ertellt wurden.

Der Server greift mittels Mongoose, einem npm-package, auf die Datenbank zu. Zu beachten ist, dass die Datenbank vor dem starten des Servers bereit sein muss, um Verbindungen zu bilden.
Die Schematas der Collections werden aus ihren Dateien importiert.

####Api-Routen

Um Zugriffsschutz zu erstellen werden JWT-Token erstellt.

Lediglich ein Teil der Routen ist frei erreichbar. Der Großteil der Routen ist nur mit einem gültigen JWT-Token erreichbar.

Alle Routen nach der folgenden Funktion sind nur mit einem Token erreichbar. Diese Funktion prüft dass Vorhandensein eines gültigen Tokens und ist eine der 2 benötigten Funktionen für JWT.

```javascript
router.route('/authenticate')
        .post(function(req, res){
            User.findOne({name: req.body.name}, function(err, user){
                if(err) throw err;
                if(!user) {
                    res.json({succes: false, message: 'User not found'});
                } else if(user) {
                    if (user.password != req.body.password){
                        res.json({succes: false, message: 'Wrong password'});
                    }else {
                        var token = jwt.sign(user={username: user.name, isAdmin: user.isAdmin, id:user._id}, app.get('superSecret'), {
                            expiresIn: 300
                        }) 
                        res.json({
                            succes: true,
                            message: 'Enjoy your token',
                            token: token
                        });
                    }
                }
            });
        });
```
Die Funktion jwt.sign() beeinhaltet alle Eigenschaften, welche in dem Token gespeichert werden, sowie die Zeit, für welche der Token gültig ist.



###Frontend

Für das Frontend wurde Angular 2 verwendet, sowie für das Design Bootstrap.