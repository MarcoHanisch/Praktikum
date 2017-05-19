import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { Params, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtHelper } from 'angular2-jwt'

class Topics {
  description = '';
}
@Component({
  selector: 'app-postadd',
  templateUrl: './postadd.component.html',
  styleUrls: ['./postadd.component.css']
})
export class PostaddComponent implements OnInit {
  post: any = [];
  postForm: FormGroup;
  jwtHelper: JwtHelper = new JwtHelper();
  decoded: any;

  constructor(private route: ActivatedRoute, private postsService: PostsService, private fb: FormBuilder) {
    
   }
 useJwtHelper() {
    var token = localStorage.getItem('token');
     this.decoded = this.jwtHelper.decodeToken(token)
  }
  

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) =>  this.postsService.getPost(params['post_id'])).subscribe(post => {
      this.post = post
    })
    this.useJwtHelper()
  }
  editPost(title: string, topics:string, post_id: string){
    this.postsService.editPost(title, topics, post_id).subscribe(post => this.post.push(post))
   
  }
}
