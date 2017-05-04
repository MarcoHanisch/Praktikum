import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { Post } from '../postlist/postlist.component';
import 'rxjs/add/operator/switchMap';
import { ActivatedRoute, Params } from '@angular/router';


export class Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string
}

@Component({
  selector: 'app-postdetail',
  templateUrl: './postdetail.component.html',
  styleUrls: ['./postdetail.component.css']
})
export class PostdetailComponent implements OnInit {
  post: Post;
  comments: Comment[];
  empty: boolean;
  constructor(private apiserviceService: ApiserviceService,
              private route: ActivatedRoute) { }

  ngOnInit(): void { 
      this.route.params
                .switchMap((params: Params) => this.apiserviceService.getComments(+params['id']))
                .subscribe(comments => this.comments = comments);
      this.route.params
                .switchMap((params: Params) => this.apiserviceService.getPost(+params['id']))
               .subscribe(post => this.post = post);   
      this.apiserviceService.startLoading();
      this.apiserviceService.progressLoading(60);
      this.apiserviceService.completeLoading()
 }
  
  save(name: string, email: string, body: string): void {
   if(!name ) {
            this.empty = true;  
            setTimeout(function() {
               this.empty = false }
               .bind(this), 3000);
            return
              } 
   if(!email) {
            this.empty = true ;
            setTimeout(function() {
               this.empty = false }
               .bind(this), 3000); 
            return
              }
   if(!body) {
            this.empty = true; 
            setTimeout(function() {
              this.empty = false }
              .bind(this), 3000);
            return
          }
    this.apiserviceService.startLoading();
    this.apiserviceService.progressLoading(60);
    let id = this.route.snapshot.params['id']
    this.apiserviceService.createComment(id, name, email, body)
    .subscribe(comment => this.comments.push(comment));
    this.apiserviceService.completeLoading() 
  }
}