import { Component, OnInit } from '@angular/core';
import { PostsService, User } from '../posts.service';
import { ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css']
})
export class UserdetailComponent implements OnInit {
  user: any = [];
  

  constructor(private postsService : PostsService, private route : ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.postsService.getUser(params['user_id'])).subscribe(user => {
        this.user = user
      })
      
  }
 
  

}
