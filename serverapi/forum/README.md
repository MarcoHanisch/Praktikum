# Forum

This project create a typically Forum.

Dieses Projekt erstellt ein typisches Forum.

### Backend

[MongoDb][1] wird als Datenbank verwendet. Diese hat 3 Collections, eine für Nutzer, eine für Posts und eine für Kommentare.

Der Server ist mit Node JS und Express ertellt wurden.

Der Server greift mittels [Mongoose][2], einem npm-package, auf die Datenbank zu. Zu beachten ist, dass die Datenbank vor dem starten des Servers bereit sein muss, um Verbindungen zu bilden.
Die Schematas der Collections werden aus ihren Dateien importiert.

Im Moment wird die Datenbank bei jedem starten des Servers auf einen definierten Stand zurückgesetzt. Dies wird mittels des npm-packages [pow-mongodb-fixtures][3] realisert. Dabei werden die Daten aus einem Ordner, nach dem leeren der Datenbank, in die Datenbank eingefügt. 

#### Api-Routen

Um Zugriffsschutz zu erstellen werden JWT-Token erstellt.

Lediglich ein Teil der Routen ist frei erreichbar. Der Großteil der Routen ist nur mit einem gültigen JWT-Token erreichbar.

Alle Routen nach der folgenden Funktion sind nur mit einem Token erreichbar. Diese Funktion prüft dass Vorhandensein eines gültigen Tokens und ist eine der 2 benötigten Funktionen für JWT.

``` javascript
router.use(function(req, res, next){
    var token = req.body.token || req.query.token ||req.headers['x-acces-token']||req.headers['Authorization:'];

    if (token){

        jwt.verify(token, app.get('superSecret'), function(err, decoded){
            if (err) {
                return res.json({succes: false, message: 'Failed to authenticate'});
            }else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(403).send({
            succes: false,
            message: 'no token provided'
        });
    }
});
```
Die Funktion jwt.sign() beeinhaltet alle Eigenschaften, welche in dem Token gespeichert werden, sowie die Zeit, für welche der Token gültig ist.

Es gibt für Posts, Nutzer und Kommentare jeweils Routen, um diese zu erstellen, bearbeiten, löschen und lesen. Topics können nur gelesen werden. Zudem gibt es eine Funktion zum Authentifizieren, bei welcher der JWT-Token erstellt wird, dies ist die zweite benötigte Funktion von JWT. Diese Funtkion zum Authentifizieren muss vor der Funktion zum überprüfen des Tokens stehen, da man diese sonst nicht erreichen kann.

``` javascript
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

Manche Funktionen benötigen Informationen aus dem JWT-Token, diese werden mithilfe des npm-packages JWT-Simple aus dem Token gewonnen.
Diese Informationen werden zum Teil benötigt um den Zugriff zu steuern,
``` javascript
.put(function(req, res){
            Post.findById(req.params.post_id , function(err,post){
                var token = req.body.token || req.query.token ||req.headers['x-acces-token'];
                var decoded = jwt_simple.decode(token, app.get('superSecret'))
                if(decoded.username === post.Username)
```
zum Teil werden die Informationen benötigt um einer Eigenschaft einen Wert  zuzuweisen.

``` javascript
 .post(function(req, res) {
            var token = req.body.token || req.query.token ||req.headers['x-acces-token'];
            var decoded = jwt_simple.decode(token, app.get('superSecret'))
            var comment = new Comment();
            comment.Username = req.decoded.username;
```

### Frontend

Für das Frontend wurde Angular 2 verwendet, sowie für das Design Bootstrap.

##### Service

Es werden zwei Service verwendet. Zum einen der PostsService, welcher zur Kommunikation mit der API dient und zum anderen der AuthService welcher nur die Authentifizierung und die dazugehörige Kommunikation mit der API realisiert. 

Der AuthService ist dadurch für das Setzen des Tokens im LocalStorage verantwortlich. Zudem ist er mithilfe des Logged-inGuard für die Zugriffskontrolle der Routen verantwortlich. Jede Route, bei der diese Kontrolle gesetzt ist, kann nur mit einem gültigen Token erreicht werden. Diese Routen haben folgenden Aufbau, in der RoutingComponente:

``` javascript
{
    path:'topics/:topicsname',
    component: TopicdetailComponent,
    canActivate: [LoggedInGuard]
  },
```
Im PostsService muss man beachten, dass für Funktionen, welche nur mit gültigen Token ausgeführt werden können, der Token aus dem LocalStorage in den Header befördert werden muss. Nachfolgend dargstellt.

``` typescript
getPost(post_id: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let token = localStorage.getItem('token');
    headers.append('x-acces-token', `${token}`);
```
##### Routen

Die Routen und das Routingmodule sind momentan im AppModule. Sollte eine Url eingegeben werden, welche keine der Routen trifft wird auf die TopicsComponente umgeleitet.

Damit das Routing auch beim neuladen der Seite funktioniert muss folgende Zeile bei den Imports stehen:

``` typescript
 RouterModule.forRoot(ROUTES, {useHash: true}),
```

#### Komponenten

Jede View hat eine eigene Komponente, diese sind jeweils in einem eigenen Ordner, welcher die zugehörige Css-Datei, Html-Datei, Typescript-Datei und eine Datei zum testen enthält.
Die meisten CSS-Dateien sind leer, da mir zum Großteil das Bootstrap-design ausgereicht hat.

Manche Html-Elemente sind nur für bestimmte Nutzer sichtbar (Administratoren, Verfasser) oder nur im eingeloggten Zustand. Dies wurde mit der NgIf-Direktive realisiert.

``` html
<div *ngIf="loggedIn === false">
  <h3>Bitte erst einloggen um fortzufahren</h3>
</div>
```

Damit diese Elemente zum Beispiel nur für Administratoren zu sehen sind, musste auch Frontend-seitig der JWT-Token decodiert werden. Dies wird mittels des npm-packages [anguler2-jwt][4] realisiert. Dafür muss man den JWT-Helper in der jeweiligen Komponente definieren und eine Funktion ausführen.

``` typescript
import { JwtHelper } from 'angular2-jwt'
...
export class Beispiel implements OnInit {
 
  jwtHelper: JwtHelper = new JwtHelper();
  decoded: any;
  

  constructor(...) {... }

  ngOnInit() {
    ...
    this.useJwtHelper()
    ...
  }

  ...

   useJwtHelper() {
    var token = localStorage.getItem('token');
     this.decoded = this.jwtHelper.decodeToken(token)
  }
    
  ...
}
```

Hat man dies implementiert kann man die Html-Elemente aufgrund von Token-Informationen darstellen oder eben nicht.

``` html
<button *ngIf="decoded.isAdmin === true || decoded.id === user._id">
```

### Tests

Behebung des Fehlers 

``` javascript
23 05 2017 14:47:11.504:ERROR [launcher]: No binary for Chrome browser on your platform.
  Please, set "CHROME_BIN" env variable.
  ```

  mittels des Konsolenbefehls 
  ``` javascript
  $ export CHROME_BIN=/usr/bin/chromium-browser
  ```

Die Tests sind Backend- und Frontend-seitig mithilfe von [jasmine][5] geschrieben. Frontend-seitig werden die Tests mithilfe von [Karma][6] ausgeführt. Die Optionen von Karma werden in dem karma.conf.js-file angegegeben, unter anderem welche files getestet werden sollen.

Die Tests können mithilfe von describe-Blöcken gegliedert werden.
``` javascript
describe("Server", function() { ... }
```
Die Tests an sich werden durch it-Funktionen ausgeführt. Damit ein Test erfolgreich ist müssen alle expect-Bedingungen des Tests erfolgreich sein.

``` javascript
it("return an special user is forbidden", function(done){
           request.get(url+"/user/5925840408613c256cf47853",function(error, response, body){
               expect(body).toMatch("no token provided")
               expect(response.statusCode).toEqual(403)
               done()
           })
       })
```
Fontend-seitig wird mithilfe von angular-cli zu jeder Komponente und zu jedem Service, jeweils ein Test-File erzeugt. Diese Tests enthalten mehr Elemente als der Test des Servers. Vor allem sind Angular-typische Imports wichtig. Zudem kann es in den describe-Blöcken auch noch BeforeAll, BeforeEach, AfterAll und AfterEach-Blöcke geben.
Im Normalfall gibt es mindestens ein BeforeEach-Block, in welchem die Testumgebung definiert wird. Dabei werden benötigte Komponenten, mindestnes  die zu testende, deklariert, benötigte Services definiert, sowie weitere benötigte Module, wie z.b. RouterTestingModule, HttpModule, import.
``` javascript
beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserdetailComponent ],
      providers: [
        {provide: PostsService, useClass: MockPostsService}
        ],
      imports: [ HttpModule, BrowserModule, RouterTestingModule]
    })
    .compileComponents();
  }));
  ```
Bei Modulen mit dynamischen Elementen muss die Komponente noch mit einem weiteren BeforeEach-Block definiert werden. Dieser initialisiert die Testumgebung und setzt sie vor jedem Test zurück. 
``` javascript
 beforeEach(() => {TestBed.resetTestEnvironment(); TestBed.initTestEnvironment( BrowserDynamicTestingModule, platformBrowserDynamicTesting() )
    .configureTestingModule({declarations:[UserdetailComponent]}); 
  });
```
Damit man beim Testen nicht auf den originalen Service zugreifen muss kann man Mocks schreiben. Um diese zu verwenden muss die geschriebene Mockklasse als zu nutzende Klasse für den Service definiert werden (s.o.). Diese Mockklasse führt keine Anfragen an die API aus, sie dient als Ersatz für den eigentlichen Service, damit API-Abfragen während des Tests simuliert werden können.
``` javascript
class MockPostsService {
 
 public getAllUser(): Observable<User[]> {
    let toReturn: User[] = [] ;
    toReturn.push(new User('1','Test','Test', false));
    toReturn.push(new User('2', 'Drei','Zwei', true));
    return Observable.of(toReturn)
  };

public postUser( name: string, password: string): Observable<User[]> {
  toReturn.push(new User('8' ,name,password, false))
  return Observable.of(toReturn)
}

public deleteUser(): Promise<void> {
  toReturn.splice(2,1)
  return
}

}
```

[1]: https://www.mongodb.com/de
[2]: http://mongoosejs.com/
[3]: https://www.npmjs.com/package/pow-mongodb-fixtures
[4]: https://www.npmjs.com/package/angular2-jw
[5]: https://jasmine.github.io/2.4/introduction.html
[6]: https://karma-runner.github.io/1.0/index.html