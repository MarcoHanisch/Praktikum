import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  gotoBL( ){
    this.router.navigate(['/blacklist'])
  }

  gotoSettings(){
    this.router.navigate(['/settings'])
  }
  gotoWSTemplist(){
    this.router.navigate(['/workshoptemplatelist'])
  }
  gotoEMTemplist(){
    this.router.navigate(['/emailtemplatelist'])
  }
  gotoWSList(){
    this.router.navigate(['/workshoplist'])
  }
}
