import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { JsonpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { SlimLoadingBarModule} from 'ng2-slim-loading-bar';
import { Ng2PaginationModule } from 'ng2-pagination';


import { AppComponent } from './app.component';
import { ApiserviceService } from './apiservice.service';
import { PostdetailComponent } from './postdetail/postdetail.component';
import { PostlistComponent } from './postlist/postlist.component';
import { EditComponent } from './edit/edit.component';
import { SearchComponent } from './search/search.component';


import { NgPipesModule } from 'ngx-pipes';



@NgModule({
  declarations: [
    AppComponent,
    PostdetailComponent,
    PostlistComponent,
    EditComponent,
    SearchComponent,
    
 
    
   
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    Ng2PaginationModule,
   NgPipesModule,
    SlimLoadingBarModule.forRoot(),
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
  bootstrap: [AppComponent],
 
})
export class AppModule { }
