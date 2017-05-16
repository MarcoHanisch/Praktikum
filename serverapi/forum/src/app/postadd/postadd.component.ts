import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { Params, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

class Topics {
  description = '';
}
@Component({
  selector: 'app-postadd',
  templateUrl: './postadd.component.html',
  styleUrls: ['./postadd.component.css']
})
export class PostaddComponent implements OnInit {
  post: any = [];
  postForm: FormGroup;

  constructor(private route: ActivatedRoute, private postsService: PostsService, private fb: FormBuilder) {
    this.createForm()
   }

   createForm(){
     this.postForm = this.fb.group({
       title: '',
       secretLairs: this.fb.array([])
     })
   }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) =>  this.postsService.getPost(params['post_id'])).subscribe(post => {
      this.post = post
    })
    this.postForm.setValue({
      title: this.post.name,
      topics: this.post.descriptions[0] || new Topics()
    })
  }
  get secretLairs(): FormArray {
    return this.postForm.get('secrestLairs') as FormArray
  };

  setTopics(topics: Topics[]){
    const topicsFGs = topics.map(topics => this.fb.group(topics));
    const topicsFormArray = this.fb.array(topicsFGs);
    this.postForm.setControl('secretLairs', topicsFormArray)
  }

  addLair(){
    this.secretLairs.push(this.fb.group(new Topics()));
  }

  

}
