var request = require("request");
var server = require("./server.js");
var url = "http://localhost:8080/api";
var jwt = require("jsonwebtoken");

describe("Server", function() {
    
describe("Posts", function(){
    var token = jwt.sign(user={username: 'NutzerAdmin', isAdmin: true, id:'5925840408613c256cf47853'},'apitest') 
    it("should delete a post", function(done){
            request.delete(url+"/posts/592294ed3d5dcf11e2e8aac5", {json: true, body:{token}}, function(error,response,body){
                expect(body.message).toEqual("Succesfully deleted")
                expect(response.statusCode).toBe(200)
                done();
            })
        })
})
describe("User", function(){
    var token = jwt.sign(user={username: 'NutzerAdmin', isAdmin: true, id:'5925840408613c256cf47853'},'apitest')
    it("return an special user is forbidden", function(done){
           request.get(url+"/user/5925840408613c256cf47853",function(error, response, body){
               expect(body).toMatch("no token provided")
               expect(response.statusCode).toEqual(403)
               done()
           })
       })
        it("return an special user ", function(done){
           request.get(url+"/user/5925840408613c256cf47853", {json: true, body:{token}},function(error, response, body){
               //console.log(token)
               expect(response.statusCode).toEqual(200)
               //console.log(body[0])
               expect(body[0]).toMatch(JSON.stringify(['NutzerAdmin']))
               done()
           })
       })
        it("should create a user and send statuscode 200", function(done){
            request.post(url+"/user",{json: true, body:{name:"Nutzer3", password: "test"}}, function(error, response,body){
                expect(response.statusCode).toBe(200)
                done();
            })
        })
        it("should show a warning, that user is in use", function(done){
           request.post(url+"/user",{json: true, body:{name:"Nutzer1", password: "test"}}, function(error, response,body){
                expect(body.message).toBe("User is already in use")
                done();
            })
        })
         it("should put a user", function(done){
            request.put("http://localhost:8080/api/user/5925840408613c256cf47853", {json: true, body:{password: "Test3",token}}, function(error, response,body){
                expect(response.statusCode).toBe(200)
                done();
            })
        })
        it("should not put a user, as normal user", function(done){
            var token = jwt.sign(user={username:'Komoot', isAdmin: false, id:'592c25abc1c76b3226edfaab'}, 'apitest')
            request.put("http://localhost:8080/api/user/5925840408613c256cf47853", {json: true, body:{password: "Test6",token}}, function(error, response,body){
                expect(response.statusCode).toBe(200)
                expect(body.message).toMatch(JSON.stringify(['wrong authorization']))
                done();
            })
        })
        it("should not be possible to edit without token", function(done){
            request.put(url+"/user/5925840408613c256cf47853", {json: true, body: { password: "weiterer test"}}, function(error, response,body){
                expect(response.statusCode).toBe(403)
                expect(body.message).toMatch(JSON.stringify(['no token provided']))
                done()
            })
        })
         it("should be possible to delete a user as admin", function(done){
            request.delete(url+"/user/5925840408613c256cf47853", { json: true, body:{token}}, function(error, response, body){
                expect(response.statusCode).toBe(200)
                expect(body.message).toEqual("Succesfully deleted")
                done()
            })
        })
        it("should not be possible to delete a user, when not be admin", function(done){
            request.delete(url+"/user/5925840408613c256cf47853", function(error, response, body){
                expect(response.statusCode).toBe(403)
                expect(body.message).toMatch(JSON.stringify(['no token provided']))
                done()
            })
             var token = jwt.sign(user={username:'Komoot', isAdmin: false, id:'592c25abc1c76b3226edfaab'}, 'apitest')
            request.delete(url+"/user/5925840408613c256cf47853", {json: true, body: { token}}, function(error, response, body){
                expect(body.message).toEqual("wrong authorization")
                done()
            })
        })
    })

describe("Topics",function(){
     it("return topics", function(done){
            request.get(url+"/topics", function(error, response, body){
                expect(body).toMatch(JSON.stringify(["Allgemein"]))
                expect(body).not.toBeNull()
                done();
            })
        })
})
describe("Login", function(){
    it("should authenticate the user succesfull", function(done){
            request.post(url+"/authenticate", {json: true, body: {name: "Nutzer1", password:"haus"}}, function(error, response,body){
                expect(body.message).toEqual("Enjoy your token")
                expect(body.succes).toEqual(true)
                done();
            })
        })
         it("should show that the password is wrong", function(done){
            request.post(url+"/authenticate", {json: true, body: {name: "Nutzer1", password:"haus23213"}}, function(error, response,body){
                expect(body.succes).toEqual(false)
                expect(body.message).toEqual("Wrong password")
                done();
            })
        })
         it("should show that the username is wrong", function(done){
            request.post(url+"/authenticate", {json: true, body: {name: "falschernutzer", password:"haus23213"}}, function(error, response,body){
                expect(body.succes).toEqual(false)
                expect(body.message).toEqual("User not found")
                done();
            })
        })
})
})