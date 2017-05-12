import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {
  topics: any = [];

  constructor(private postsService: PostsService) { }

  ngOnInit() {
   this.postsService.getAllTopics().subscribe(topics => {
      this.topics = topics;
    });
   
  }

}
