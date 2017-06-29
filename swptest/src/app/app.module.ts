import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { ContactComponent } from './contact/contact.component';
import { BlacklistComponent } from './blacklist/blacklist.component';
import { SetingsComponent } from './setings/setings.component';
import { WorkshoptemplistComponent } from './workshoptemplist/workshoptemplist.component';
import { WorkshoptempComponent } from './workshoptemp/workshoptemp.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    LoginComponent,
    ContactComponent,
    BlacklistComponent,
    SetingsComponent,
    WorkshoptemplistComponent,
    WorkshoptempComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
