jQuery(document).ready(function () {
    var me = true
    //counter to get wrigth answer
    var index = 0
    //array with all choosen answers
    var voted = []
    //boolean for display elements
    var waiting = false
    var question = ["Wann soll das Meeting statt finden?", "Bitte wählem Sie eine der nachfolgenden Antworten Wer-Einträge aus!", "Bitte wählem Sie eine der nachfolgenden Antworten Wieviel-Einträge aus!", "Bitte wählem Sie eine der nachfolgenden Antworten Was-Einträge aus!", "Wie lang soll das Meeting dauern?"];
    var answer = [["≤ 2 Wochen", "2", "1 x Monat/Quartal", "3", "1-2 x im Jahr", "4"], ["Extern", "5", "OE-Intern", "6", "OE-Übergeifend", "7"], ["10≤X≤25", "8", "26≤X", "9", "X≤9", "10"], ["Überwiegend Information", "11"], ["≤1 H", "12", "1H&lt;XH≤3H", "13", "3&lt;XH", "14"]]

    //function to get the time
    function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    function insertEnd(who, text, time) {

        var control = ""

        var date = formatAMPM(new Date())

        control = '<li style="width:100% " id="end"  >' +
            '<form class="form-horizontal" action="' + jQuery(location).attr('href') + 'meetings' + '" method="Post">' +
            '<div class="msj chat-text" style="background: lightblue">' +
            '<input id="frage1" type="hidden" name="frage1" value="' + voted[0] + '">' +
            '<input id="frage2" type="hidden" name="frage2" value="' + voted[1] + '">' +
            '<input id="frage3" type="hidden" name="frage3" value="' + voted[2] + '">' +
            '<input id="frage4" type="hidden" name="frage4" value="' + voted[3] + '">' +
            '<input id="frage5" type="hidden" name="frage5" value="' + voted[4] + '">' +
            '<button type="submit" style="border:none; background: lightblue" >' + text + '</button>' +
            '</div>' +
            '</form>' +
            '</li>'
        jQuery("#chatbox").append(control);
        control = '<li style="width:100% " id="reset"  >' +
            '<div class="msj chat-text" style="background: lightblue">' +
            '<button style="border:none; background: lightblue" onclick="resetChat()">Zurücksetzen</button>' +
            '</div>' +
            '</li>'
        jQuery("#chatbox").append(control);
        var element = document.getElementById('chat-message')
        element.scrollTop = element.scrollHeight
    }

    //function to insert the question and the choosen answer
    function insertChat(who, text, time = 0) {
        var control = "";
        var date = formatAMPM(new Date());
        if (who === true) {
            //elements to show LoadingDots before question is shown
            var controller = '<li class="loading" >' +
                '<div class="msj chat-text">' +
                '<p class="saving" style="margin-bottom:0px"><span>.</span><span>.</span><span>.</span></p>'
                '</div>' +
                '</li>';
            jQuery("#chatbox").append(controller)

            //elements to initialize the question, is hidden till function showit() is called
            control = '<li style="display: none" class="question msj chat-text" >' +
                '<p style="margin-bottom:0px">' + text + '</p>' +
                '</li>';
            //elements to initialize LoadingDots after question is shown, is hidden till function showit() is calledâ€‚â€‚â€‚â€‚â€‚â€‚â€‚â€‚â€‚â€‚
            var controller2 = '<li style="display: none" class="question waiting" id="waiting" >' +
                '<div class="msj chat-text">' +
                '<p class="saving" style="margin-bottom:0px"><span>.</span><span>.</span><span>.</span></p>'
                '</div>' +
                '</li>';
        } else {
            //elements to initialize and show the choosen option as answer
            control = '<div class="message">' +
                '<li class="msj-rta chat-text">' +
                '<p style="margin-bottom:0px">' + text + '</p>' +
                '</li>';
        }
        jQuery("#chatbox").append(control);
        jQuery("#chatbox").append(controller2)
    }

    function resetChat() {
        jQuery("#chatbox").empty();
        index = 0
    }


    //function to initialize the possible answers
    function insertOption(who, text, time = 0) {
        var control = "";
        var date = formatAMPM(new Date());
        //div is needed to show all answer in one row
        controller = '<div id="chat-row" class="row chat-row">' +
            '</div>';
        jQuery("#chatbox").append(controller)
        //loop to initialize all answers to the latest question, get latest question with help of counter
        for (var i = 0; i < answer[index].length; i = i + 2) {
            text = answer[index][i]
            id = answer[index][i + 1]
            //elements to initialize the possible answers, is hidden till function showit() is called
            control = '<li id="' + id + '" style="display: none; margin-left: 10px; margin-top: 5px" class="option "â€‚â€‚>' +
                '<button  style="border:none; background: lightblue; border-radius: 5px; font-size: 13px" >' + text + '</button>' +
                '</li>';
            jQuery("#chat-row").append(control)
        }
    }

    //function to remove the options from answered questions
    function hideoptions() {
        jQuery('.option').remove()
        jQuery(".chat-row").remove()
    }

    //function to show and hide elements, need classname from elements, which should be shown and time after that elements are shown as input
    //time is set in 1/1000 seconds (5 seconds = 5000)
    function showit(classname, time) {

        setTimeout(function () {
            //get all elements with the classname
            var options = document.getElementsByClassName(classname)
            //each founded element get the property "display: unset", elements are shown now
            for (var i = 0; i < options.length; i++) {
                options[i].style.display = "unset"
            }
            //remove the LoadingDots before the question, when question is shown
            jQuery(".loading").remove()
            var element = document.getElementById('chat-message')
            element.scrollTop = element.scrollHeight
            //remove the LoadingDots after the question, when options are shown
            if (waiting === true) {
                jQuery(".waiting").remove()
            }
            waiting = !waiting
        }, time)

    }

    //trigger to start actions when option is choosen
    jQuery("#chatbox").on('click', '.option', function () {
        selected = 2 * ($(this).index()) + 1
        //get choosen option and insert as answer
        vote = jQuery(this).text()
        //voteId = jQuery(this).context.id;
        votedId = answer[index][selected]
        insertChat(false, vote)
        //insert choosen option to array with all choosen answers
        voted.push(votedId)
        //increase counter to get next question
        index = index + 1
        //remove options
        hideoptions()
        //if more questions are avaible initialize this question with answer and show them
        if (index < answer.length) {
            insertChat(true, question[index], 0)
            insertOption(true, answer[index], 0)
        }
        else {
            insertEnd(true, "Meetings suchen", 1000)
        }

        showit("question", 2000)
        showit("option", 2000)

    })

    //-- Clear Chat
    resetChat();
    //-- Print Messages

    insertChat(true, question[index], 0);
    insertOption(true, answer[index], 1000)
    showit("question", 2000)
    showit("option", 2000)


})


function resetChat() {
    jQuery("#chatbox").empty();
    location.reload()
}