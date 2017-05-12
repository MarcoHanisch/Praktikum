import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-topicdetail',
  templateUrl: './topicdetail.component.html',
  styleUrls: ['./topicdetail.component.css']
})
export class TopicdetailComponent implements OnInit {
  topic : any = [];
  private params : Params;
  

  constructor(private postsService: PostsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
     .switchMap((params: Params) =>  this.postsService.getTopic(params['topicsname'])).subscribe(topic => {
      this.topic = topic
    })
  }

}
