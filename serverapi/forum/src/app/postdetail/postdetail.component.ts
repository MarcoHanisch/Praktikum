import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { Params, ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Location } from '@angular/common';
import { JwtHelper } from 'angular2-jwt'
import { TranslateService } from '@ngx-translate/core'



@Component({
  selector: 'app-postdetail',
  templateUrl: './postdetail.component.html',
  styleUrls: ['./postdetail.component.css'],
})
export class PostdetailComponent implements OnInit {
  
  constructor(private postsService: PostsService, private route : ActivatedRoute, private location: Location, private router: Router, private translate: TranslateService) {
     translate.addLangs(["Englisch","Deutsch"])
    translate.setDefaultLang('Englisch')
   }
  selectedid: string;
  post: any = [] ;
  comments: any = [];
  post_id : string;
  user: any = []
  jwtHelper: JwtHelper = new JwtHelper();
  decoded: any;

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
   this.useJwtHelper()
  }

  addComment(title: string, content: string, post_id: string): void { 
    this.postsService.addComment(title,content, post_id).subscribe(comments =>this.comments.push(comments))
  }
 deleteComment(comment): void {
    this.postsService.deleteComment(comment._id).then(()=> {
      this.comments = this.comments.filter(u => u !== comment)
    })
  }
    useJwtHelper() {
    var token = localStorage.getItem('token');
     this.decoded = this.jwtHelper.decodeToken(token)
  }
   gotoComment(comment){
     this.router.navigate(['/comment', comment._id])
   }
}
