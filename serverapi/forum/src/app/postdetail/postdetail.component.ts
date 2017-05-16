import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { Params, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-postdetail',
  templateUrl: './postdetail.component.html',
  styleUrls: ['./postdetail.component.css'],
})
export class PostdetailComponent implements OnInit {
  
  constructor(private postsService: PostsService, private route : ActivatedRoute) { }
 
  post: any = [] ;
  comments: any = [];
  post_id : string;

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) =>  this.postsService.getPost(params['post_id'])).subscribe(post => {
      this.post = post
    })
    this.route.params
       .switchMap((params: Params) =>  this.postsService.getComments(params['post_id'])).subscribe(comments => {
      this.comments = comments
    })
    this.route.params.subscribe((params: Params) => {
      this.post_id = params['post_id']
   })
  }

  addComment(title: string, content: string, post_id: string): void { 
    this.postsService.addComment(title,content, post_id).subscribe(comments =>this.comments.push(comments))
  }
 deleteComment(comment): void {
    this.postsService.deleteComment(comment._id).then(()=> {
      this.comments = this.comments.filter(u => u !== comment)
    })
  }
}
