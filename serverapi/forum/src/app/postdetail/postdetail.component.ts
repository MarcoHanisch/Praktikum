import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { Params, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-postdetail',
  templateUrl: './postdetail.component.html',
  styleUrls: ['./postdetail.component.css']
})
export class PostdetailComponent implements OnInit {
  
  constructor(private postsService: PostsService, private route : ActivatedRoute) { }
 
  post: any = [] ;
  comments: any = [];

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) =>  this.postsService.getPost(params['post_id'])).subscribe(post => {
      this.post = post
    })
    this.route.params
       .switchMap((params: Params) =>  this.postsService.getComments(params['post_id'])).subscribe(comments => {
      this.comments = comments
    })
  }

}
