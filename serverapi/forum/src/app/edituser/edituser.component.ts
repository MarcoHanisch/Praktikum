import { Component, OnInit } from '@angular/core';
import { PostsService, User } from '../posts.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { JwtHelper } from 'angular2-jwt'
import { TranslateService } from '@ngx-translate/core'


@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {
  user: any = [];
  jwtHelper: JwtHelper = new JwtHelper();
  decoded: any;
  calendar: boolean = false

  constructor(private postsService : PostsService, private route : ActivatedRoute, private router : Router, private translate: TranslateService) {
     translate.addLangs(["Englisch","Deutsch"])
    translate.setDefaultLang('Englisch')
   }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.postsService.getUser(params['user_id'])).subscribe(user => {
        this.user = user
      })
      this.useJwtHelper()
  }
editUser(name: string, password: string,isAdmin: boolean, user_id: string, firstname: string, lastname: string,
birthday: string, street: string, number: string, town: string, ZIP: string, country: string): void { 
    this.postsService.editUser(name,password,isAdmin,user_id,firstname,lastname,birthday,street,number,town,ZIP,country).subscribe(user =>this.user.push(user))
    this.router.navigate(['user'])
  }
 useJwtHelper() {
    var token = localStorage.getItem('token');
     this.decoded = this.jwtHelper.decodeToken(token)
  }
  showcal() {
    return this.calendar = (!this.calendar)
  }

}