import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
   isIn = false;
    toggleState() {
      let bool = this.isIn;
      this.isIn = bool ===false ? true: false;
      
    }
  constructor() { }

  ngOnInit() {
  }

}
