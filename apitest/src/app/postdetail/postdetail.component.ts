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
  post: Post[];
  constructor(private apiserviceService: ApiserviceService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params
            .switchMap((params: Params) => this.apiserviceService.getPost(+params['id']))
            .subscribe(post => this.post = post);     
           
  }

}
