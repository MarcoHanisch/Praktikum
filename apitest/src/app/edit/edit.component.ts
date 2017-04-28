import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { ApiserviceService } from '../apiservice.service';
import { Post } from '../app.component';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  title = 'Edit Post';
  edited: boolean;
  post: Post;
  constructor(private apiserviceService : ApiserviceService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit(): void {
   this.route.params
            .switchMap((params: Params) => this.apiserviceService.getPost(+params['id']))
            .subscribe(post => this.post = post); 
  }
  save(): void {
    this.edited = true;
    setTimeout(function() {
      this.edited = false
    }.bind(this), 3000);
    this.apiserviceService.update(this.post)
      .then( );
  }
  goBack(): void {
    this.location.back();
  }

}
