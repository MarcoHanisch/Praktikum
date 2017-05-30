import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'
import { JwtHelper } from 'angular2-jwt'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: any =[];
  loggedIn: boolean
  jwtHelper: JwtHelper = new JwtHelper();
  decoded: any;
  selectedUser: any;

  constructor(public postsService: PostsService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.postsService.getAllUser().subscribe(user => {
      this.user = user
    })
    this.loggedIn = this.authService.isLoggedIn()
    if(this.loggedIn ===true){
    this.useJwtHelper()}
    
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
   useJwtHelper() {
    var token = localStorage.getItem('token');
     this.decoded = this.jwtHelper.decodeToken(token)
  }
    isSelected(user){
    return user === this.selectedUser
  }
  onSelect(user){
    this.router.navigate(['/user', user._id])
  }
}

