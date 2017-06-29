import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css']
})
export class NewuserComponent implements OnInit {
  calendar: boolean = false
  date = new Date()
  user: any = []
  failed: boolean = false
  


  constructor(private postsService: PostsService, private router: Router) { }

  ngOnInit() {
  }
  addUser(name: string, password: string, firstname: string, lastname: string, 
  street: string, number: string, ZIP: string, town: string, country: string, birthday: Date) {
    if(!name || !password || !firstname || !lastname || !birthday){return this.failed = true}
    this.postsService.addUser(name,password,firstname,lastname,street,number,ZIP,town,country,birthday).subscribe(user =>this.user.push(user));
    this.router.navigate(['login'])
}

  getDate(): number {
    return this.date && this.date.getTime() || new Date().getTime()
  }
  showcal() {
    return this.calendar = (!this.calendar)
  }
}
