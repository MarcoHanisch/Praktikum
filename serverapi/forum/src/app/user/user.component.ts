import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: any =[];

  constructor(private postsService: PostsService, private router: Router) { }

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
  gotoDetail(user){
    this.router.navigate(['/user', user._id])
  }
  gotoEdit(user){
    this.router.navigate(['/user/edit', user._id])
  }
}
