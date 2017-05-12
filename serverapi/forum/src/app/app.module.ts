import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AuthModule } from 'angular2-auth';



import { AppComponent } from './app.component';
import { TopicsComponent } from './topics/topics.component';
import { PostsService } from './posts.service';
import { PostsComponent } from './posts/posts.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AuthService } from './auth.service';
import { LoggedInGuard } from './logged-in.guard';
import { PostdetailComponent } from './postdetail/postdetail.component';
import { TopicdetailComponent } from './topicdetail/topicdetail.component';
import { UserdetailComponent } from './userdetail/userdetail.component'





const ROUTES = [
  {
    path: '',
    redirectTo:'posts',
    pathMatch: 'full'
  },
  {
    path: 'topics',
    component: TopicsComponent
  },
  {
    path: 'posts',
    component: PostsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'posts/:post_id',
    component: PostdetailComponent
  },
  {
    path:'topics/:topicsname',
    component: TopicdetailComponent
  },
  {
    path: 'user/:user_id',
    component: UserdetailComponent
  }
];
@NgModule({
  declarations: [
    AppComponent,
    TopicsComponent,
    PostsComponent,
    LoginComponent,
    UserComponent,
    PostdetailComponent,
    TopicdetailComponent,
    UserdetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, {useHash: true}),
   // AuthModule.forRoot(),
  
  ],
  providers: [PostsService, AuthService, LoggedInGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
