import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-emailtemplist',
  templateUrl: './emailtemplist.component.html',
  styleUrls: ['./emailtemplist.component.css']
})
export class EmailtemplistComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  gotoNewEMTemp(){
    this.router.navigate(['/emailtemplate'])
  }
}
