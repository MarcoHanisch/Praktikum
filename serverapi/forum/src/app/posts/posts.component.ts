import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { JwtHelper } from 'angular2-jwt'

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  loggedIn: boolean;
  jwtHelper: JwtHelper = new JwtHelper();
  decoded: any;
  selectedPost: any;
  themen: any= [];

  constructor(private postsService: PostsService, private router: Router, private authService: AuthService) { }
  posts: any = [];
  ngOnInit() {
     this.postsService.getAllPosts().subscribe(posts => {
      this.posts = posts
    });
    this.loggedIn = this.authService.isLoggedIn()
     if(this.loggedIn ===true){
    this.useJwtHelper()};
    this.postsService.getAllTopics().subscribe(themen => {
      this.themen = themen
    });
  }

  useJwtHelper() {
    var token = localStorage.getItem('token');
     this.decoded = this.jwtHelper.decodeToken(token)
  }
  addPost(title: string, topics: string): void {
    this.postsService.addPost(title,topics).subscribe(posts =>this.posts.push(posts));
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
 isSelected(post){
    return post === this.selectedPost
  }
  onSelect(post){
    this.router.navigate(['/posts', post._id])
  }
}
