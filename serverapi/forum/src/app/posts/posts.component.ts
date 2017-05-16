import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  constructor(private postsService: PostsService) { }
  posts: any = [];
  ngOnInit() {
     this.postsService.getAllPosts().subscribe(posts => {
      this.posts = posts
    })
  }
  addPost(title: string, topics: string): void {
    this.postsService.addPost(title,topics).subscribe(posts =>this.posts.push(posts));
  }
    deletePost(post): void {
    this.postsService.deletePost(post._id).then(()=> {
      this.posts = this.posts.filter(u => u !== post)
    })
  }


}
