import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'


@Component({
  selector: 'app-workshoptemplist',
  templateUrl: './workshoptemplist.component.html',
  styleUrls: ['./workshoptemplist.component.css']
})
export class WorkshoptemplistComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  gotoWSTemp(){
    this.router.navigate(['/workshoptemplate'])
  }

}
