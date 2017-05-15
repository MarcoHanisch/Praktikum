import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { Params, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-postadd',
  templateUrl: './postadd.component.html',
  styleUrls: ['./postadd.component.css']
})
export class PostaddComponent implements OnInit {
  post: any = [];
  constructor(private route: ActivatedRoute, private postsService: PostsService) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) =>  this.postsService.getPost(params['post_id'])).subscribe(post => {
      this.post = post
    })
  }

}
