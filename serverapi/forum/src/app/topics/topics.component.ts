import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {
  topics: any = [];
  private selectedDescription: string;

  constructor(private postsService: PostsService, private router: Router) { }

  ngOnInit() {
   this.postsService.getAllTopics().subscribe(topics => {
      this.topics = topics;
    });
    
   
  }
  
  isSelected(topic){
    return topic === this.selectedDescription
  }
  onSelect(topic){
    this.router.navigate(['/topics', topic])
  }
}
