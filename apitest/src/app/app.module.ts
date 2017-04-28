import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { JsonpModule } from '@angular/http';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { ApiserviceService } from './apiservice.service';
import { PostdetailComponent } from './postdetail/postdetail.component';
import { PostlistComponent } from './postlist/postlist.component';
import { EditComponent } from './edit/edit.component';



@NgModule({
  declarations: [
    AppComponent,
    PostdetailComponent,
    PostlistComponent,
    EditComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    RouterModule.forRoot([
      {
        path: '', redirectTo: '/list', pathMatch: 'full'
      },
      {
        path: 'detail/:id',
        component: PostdetailComponent
      },
      {
        path: 'list', component: PostlistComponent
      },
      {
        path: 'edit/:id', component: EditComponent
      }
    ])
  ],
  providers: [ApiserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
