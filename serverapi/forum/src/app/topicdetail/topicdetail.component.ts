import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-topicdetail',
  templateUrl: './topicdetail.component.html',
  styleUrls: ['./topicdetail.component.css']
})
export class TopicdetailComponent implements OnInit {
  posts : any = [];
  private params : Params;
  

  constructor(private postsService: PostsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params
     .switchMap((params: Params) =>  this.postsService.getTopic(params['topicsname'])).subscribe(posts => {
      this.posts = posts
    })
  }
   deletePost(post): void {
    this.postsService.deletePost(post._id).then(()=> {
      this.posts = this.posts.filter(u => u !== post)
    })
  }
  gotoDetail(post){
    this.router.navigate(['/posts', post._id])
  }
  gotoEdit(post){
    this.router.navigate(['/posts/edit', post._id])
  }
}
