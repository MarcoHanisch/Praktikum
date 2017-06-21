import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'

@Pipe({ name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) {}
  transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  newMessage = new Array
  countarray = new Array
  count = 0

  constructor() { }

  ngOnInit() {
    this.addmessage()
    this.addmessage()
    console.log(this.newMessage)
    console.log(this.countarray)
}
 resetChat(){
   location.reload()
 }
 addmessage(){
   this.newMessage.push('<li style="width:50%;  word-break: break-all" class="question" >' +
                        '<div class="msj macro" style="margin-top:5px;border-radius:5px;padding:5px;display:flex;float:left;background:lightgrey">' +
                            '<div class="text text-l" style="display:flex;flex-direction:column; float:left;padding-right:10px">' +
                                '<p>'+ "test" +'</p>' +
                            '</div>' +
                        '</div>' +
                    '</li>')
  this.count = this.count + 1
  this.countarray.push(this.count)
}
}
