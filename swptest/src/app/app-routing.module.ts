import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ContactComponent } from './contact/contact.component'
import { BlacklistComponent} from './blacklist/blacklist.component'
import { SetingsComponent } from './setings/setings.component'
import { WorkshoptemplistComponent } from './workshoptemplist/workshoptemplist.component'
import { WorkshoptempComponent } from './workshoptemp/workshoptemp.component'
import { EmailtemplistComponent } from './emailtemplist/emailtemplist.component'
import { EmailtempComponent } from './emailtemp/emailtemp.component'
import { WorkshoplistComponent } from'./workshoplist/workshoplist.component'

const routes: Routes = [
    {path: '', redirectTo:'start', pathMatch: 'full'},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'start', component: AppComponent },
    {path: 'login', component:LoginComponent },
    {path: 'contact', component: ContactComponent},
    {path: 'blacklist', component: BlacklistComponent},
    {path: 'settings', component: SetingsComponent},
    {path: 'workshoptemplatelist', component: WorkshoptemplistComponent},
    {path: 'workshoptemplate', component: WorkshoptempComponent},
    {path: 'emailtemplatelist', component: EmailtemplistComponent},
    {path: 'emailtemplate', component: EmailtempComponent},
    {path: 'workshoplist', component: WorkshoplistComponent}
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}