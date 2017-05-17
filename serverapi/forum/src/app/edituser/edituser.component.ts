import { Component, OnInit } from '@angular/core';
import { PostsService, User } from '../posts.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {
  user: any = [];

  constructor(private postsService : PostsService, private route : ActivatedRoute, private router : Router) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.postsService.getUser(params['user_id'])).subscribe(user => {
        this.user = user
      })
  }
editUser(name: string, password: string,isAdmin: boolean, user_id: string): void { 
    this.postsService.editUser(name,password,isAdmin,user_id).subscribe(user =>this.user.push(user))
    this.router.navigate(['user'])
  }

  

}