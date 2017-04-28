import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from './apiservice.service';
import { Router } from '@angular/router';

export class Post {
userID:number;
id: number;
title: string;
body: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loaded : boolean;
  posts: Post[];
  constructor (private apiserviceService: ApiserviceService,
  private router: Router) {}
  ngOnInit() { this.getPosts()}
  getPosts() {
    this.apiserviceService.getPosts()
              .subscribe(
                posts => this.posts = posts
              )
  }
 /* getPosts(): void {
    this.apiserviceService
        .getPosts()
        .then(posts => this.posts = posts);
  }*/
  gotoDetail(): void {
    this.router.navigate(['/detail'])
  }

}