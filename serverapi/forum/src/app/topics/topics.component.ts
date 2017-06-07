import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { Router } from '@angular/router'
import { AuthService } from '../auth.service';
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {
  topics: any = [];
  private selectedDescription: string;
  loggedIn: boolean;

  constructor(private postsService: PostsService, private router: Router, private authService : AuthService, private translate: TranslateService) { 
    translate.addLangs(["Englisch","Deutsch"])
    translate.setDefaultLang('Englisch') }

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
