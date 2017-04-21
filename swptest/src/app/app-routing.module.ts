import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
    {path: '', redirectTo:'start', pathMatch: 'full'},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'start', component: AppComponent },
    {path: 'login', component:LoginComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}