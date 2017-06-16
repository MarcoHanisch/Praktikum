$(document).ready(function() {
var me = {};
var you = {};
var question = ["Question1","Question2","Question3","Question4","Question5","Question6","Question7"]
var answer = [["Option1", "Option2","Optisdddddddddsdon3"],["OtherOp1","OtherOp2"],["asd","as"],["asd","as"],["asd","as"],["asd","as"],["asd","as"]]
var index = 0
var voted = []

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}            


function insertChat(who, text, time = 0){
    var control = "";
    var date = formatAMPM(new Date());
   
    
    if (who == "me"){
        
        control = '<li style="width:50%; display: none; word-break: break-all" class="question" >' +
                        '<div class="msj macro">' +
                        '<div class="avatar"></div>' +
                            '<div class="text text-l">' +
                                '<p>'+ text +'</p>' +
                                '<p><small>'+date+'</small></p>' +
                            '</div>' +
                        '</div>' +
                    '</li>';                    
    }else{
        control = '<div class="message" style="text-align: right ; word-break: break-all">'+
        '<li style="width:50%; float: right">' +
                        '<div class="msj-rta macro">' +
                            '<div class="text text-r">' +
                                '<p>'+text+'</p>' +
                               '<p><small>'+date+'</small></p>' +
                            '</div>' +
                        '<div class="avatar" style="padding:0px 0px 0px 10px !important"</div>' +                                
                  '</li>';
    } $("ul").append(control);


}

function resetChat(){
    $("ul").empty();
    index = 0
}

function insertOption(who, text, time = 0){
    var control = "";
    var date = formatAMPM(new Date());
    var divide = 12/answer[index].length
    controller = '<div class="row ">'+
                '</div>';
        $("ul").append(controller)
    for (var i=0;i<answer[index].length;i++){
    text = answer[index][i]

        
        control = '<li style="width:100%; display: none ; word-break: break-all" class="option col-sm-'+divide+'"  >' +
                        '<div class="msj macro" style="background: lightblue">' +
                        '<div class="avatar"></div>' +
                            '<div class="text text-l" >' +
                               '<button style="border:none; background: lightblue" >'+text+'</button>' +
                            '</div>' +
                        '</div>' +
                    '</li>';   
                                     
         $(".row ").append(control)
         

    }
}

function hideoptions(){
    $('.option').remove()
    $(".row").remove()
}

function showit(classname, time) {
    
    setTimeout(function(){
       var options = document.getElementsByClassName(classname)
        for( var i=0;i<options.length;i++){
            options[i].style.display = "unset"
        }
    },time)
    
}

 $("ul").on('click', '.option', function(){
     index = index+1
     vote = $(this).text()
     insertChat("you",vote)
     voted.push(vote)
          console.log(voted)
     hideoptions()
     if(index<answer.length){
     insertChat("me", question[index],0)
     insertOption("me",answer[index],0)}
     showit("question",2000)
     showit("option",5000)
 })




//-- Clear Chat
resetChat();

//-- Print Messages

insertChat("me", question[index], 0); 

insertOption("me",answer[index],1000)
showit("question",2000)
showit("option",5000)




})