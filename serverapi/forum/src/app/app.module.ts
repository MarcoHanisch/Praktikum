import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AuthModule } from 'angular2-auth';
import { AuthConfig } from 'angular2-jwt';

import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Ng2PaginationModule } from 'ng2-pagination'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { FacebookModule } from 'ngx-facebook'
import { DatepickerModule } from 'ngx-bootstrap'
import { OrderModule } from 'ngx-order-pipe'

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
import { UserdetailComponent } from './userdetail/userdetail.component';
import { PostaddComponent } from './postadd/postadd.component';
import { EdituserComponent } from './edituser/edituser.component';
import { EditcommentComponent } from './editcomment/editcomment.component';
import { KarmatestComponent } from './karmatest/karmatest.component';
import { NewuserComponent } from './newuser/newuser.component';
import { FooterComponent } from './footer/footer.component';
import { ChatComponent } from './chat/chat.component';






export const ROUTES = [
  {
    path: '',
    redirectTo:'login',
    pathMatch: 'full'
  },
  {
    path: 'topics',
    component: TopicsComponent
  },
  {
    path: 'posts',
    component: PostsComponent,
    
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'user',
    component: UserComponent,
    
  },
  {
    path: 'newuser',
    component: NewuserComponent
  },
  {
    path: 'posts/:post_id',
    component: PostdetailComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path:'topics/:topicsname',
    component: TopicdetailComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'user/:user_id',
    component: UserdetailComponent,
    canActivate: [LoggedInGuard]
  },{
    path:'posts/edit/:post_id',
    component: PostaddComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path:'user/edit/:user_id',
    component: EdituserComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path:'comment/:comment_id',
    component: EditcommentComponent,
    canActivate: [LoggedInGuard]
  },{
    path: '**',
    component: LoginComponent,
    
  },
];

export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http)
}

@NgModule({
  declarations: [
    AppComponent,
    TopicsComponent,
    PostsComponent,
    LoginComponent,
    UserComponent,
    PostdetailComponent,
    TopicdetailComponent,
    UserdetailComponent,
    PostaddComponent,
    EdituserComponent,
    EditcommentComponent,
    KarmatestComponent,
    NewuserComponent,
    FooterComponent,
    ChatComponent,
   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    Ng2PaginationModule,
    RouterModule.forRoot(ROUTES, {useHash: true}),
    TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [Http]
          }
        }),
    FacebookModule.forRoot(),
    DatepickerModule.forRoot(),
    OrderModule
    // AuthModule.forRoot(),
  
  ],
  providers: [PostsService, AuthService, LoggedInGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
