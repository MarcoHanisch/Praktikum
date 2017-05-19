import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { JwtHelper } from 'angular2-jwt'

@Component({
  selector: 'app-topicdetail',
  templateUrl: './topicdetail.component.html',
  styleUrls: ['./topicdetail.component.css']
})
export class TopicdetailComponent implements OnInit {
  posts : any = [];
  private params : Params;
  jwtHelper: JwtHelper = new JwtHelper();
  decoded: any;
  selectedPost: any;

  constructor(private postsService: PostsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params
     .switchMap((params: Params) =>  this.postsService.getTopic(params['topicsname'])).subscribe(posts => {
      this.posts = posts
    })
    this.useJwtHelper()
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
   useJwtHelper() {
    var token = localStorage.getItem('token');
     this.decoded = this.jwtHelper.decodeToken(token)
  }
  isSelected(post){
    return post === this.selectedPost
  }
  onSelect(post){
    this.router.navigate(['/posts', post._id])
  }
}
