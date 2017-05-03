import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { Router } from '@angular/router';




export class Post {
id: number;
userID:number;
title: string;
body: string;
}

@Component({
  selector: 'app-postlist',
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.css'],
  
})
export class PostlistComponent  implements OnInit {
  title = 'Posts';
  empty : boolean;
 public posts: Post[];

  constructor (private apiserviceService: ApiserviceService,
  private router: Router) {
    

  }
  ngOnInit() { this.getPosts();}
  getPosts() {this.apiserviceService.startLoading();
    this.apiserviceService.progressLoading(90);
    this.apiserviceService.getPosts()
              .subscribe(
                posts => this.posts = posts
              );

   
  }
 /* getPosts(): void {
    this.apiserviceService
        .getPosts()
        .then(posts => this.posts = posts);
  }*/
  gotoDetail(post: Post) {
    this.router.navigate(['/detail', post.id])
  }
  gotoEdit(post : Post) {
    this.router.navigate(['/edit', post.id])
  }
  delete(post: Post): void {
    this.apiserviceService.startLoading();
    this.apiserviceService.progressLoading(97);
    this.apiserviceService
      .delete(post.id)
      .then(()=> {
        this.posts = this.posts.filter( p=> p !== post)
      })
  }
  addPost(title: string): void {
    if (!title) { this.empty = true; setTimeout(function() {
                 this.empty = false  }.bind(this), 5000) ; return}
    this.apiserviceService.startLoading();
    this.apiserviceService.progressLoading(95);
    this.apiserviceService.create(title)
        .subscribe(post => this.posts.push(post))
  }
 
}
