import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { ApiserviceService } from '../apiservice.service';
import { Post } from '../app.component';
import { Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  post: Post[];
  constructor(private apiserviceService : ApiserviceService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
   this.route.params
            .switchMap((params: Params) => this.apiserviceService.getPost(+params['id']))
            .subscribe(post => this.post = post); 
  }
 

}
