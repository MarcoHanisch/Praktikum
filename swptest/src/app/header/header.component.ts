import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
     isIn = false;
    toggleState() {
      let bool = this.isIn;
      this.isIn = bool ===false ? true: false;
      
    }
  constructor() { }

  ngOnInit() {
  }

}
