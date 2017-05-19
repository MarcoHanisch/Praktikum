import { Component, OnInit } from '@angular/core';
import { PostsService, User } from '../posts.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Location } from '@angular/common';
import { JwtHelper } from 'angular2-jwt'

@Component({
  selector: 'app-editcomment',
  templateUrl: './editcomment.component.html',
  styleUrls: ['./editcomment.component.css']
})
export class EditcommentComponent implements OnInit {
  comment: any =[];
  jwtHelper: JwtHelper = new JwtHelper();
  decoded: any;

  constructor(private postsService: PostsService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
      this.route.params
      .switchMap((params: Params) => this.postsService.getComment(params['comment_id'])).subscribe(comment => {
        this.comment = comment
      })
      this.useJwtHelper()
  }
  editComment(title: string, content: string, comment_id: string): void { 
    this.postsService.editComment(title, content,comment_id).subscribe(comment =>this.comment.push(comment))
    this.location.back();
  }
 useJwtHelper() {
    var token = localStorage.getItem('token');
     this.decoded = this.jwtHelper.decodeToken(token)
  }
}
