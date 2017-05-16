import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: any =[];

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.postsService.getAllUser().subscribe(user => {
      this.user = user
    })
  }

  addUser(name: string, password: string): void {
    this.postsService.postUser(name,password).subscribe(user =>this.user.push(user));
  }

  deleteUser(user): void {
    this.postsService.deleteUser(user._id).then(()=> {
      this.user = this.user.filter(u => u !== user)
    })
  }

}
