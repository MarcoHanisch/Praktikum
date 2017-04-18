import { Component, OnInit } from '@angular/core';
import { Test } from './test';
import { TestDetailComponent } from './test-detail.component';
import { TestService } from './test.service';
import { TESTS } from './mock-test';


@Component({
  selector: 'my-app',
  template: `
  <h1>Hello {{title}}</h1>
  <h2> Aufgaben </h2>
  <ul class="tests">
    <li *ngFor="let test of tests"
    [class.selected]="test === selectedtest" 
    (click)="onSelect(test)">
      <span class="badge"> {{test.id}}</span> {{test.name}} 
    </li>
  </ul>
  <div>
    <input [(ngModel)]="title" placeholder="title">
  </div>
  <test-detail [test]="selectedtest"></test-detail>
  `,
 styles: [`
  .selected {
    background-color: #0000FF !important;
    color: white;
  }
  .tests {
    margin: 0 0 2em 0;
    list-style-type: none;
    padding: 0;
    width: 15em;
  }
  .tests li {
    cursor: pointer;
    position: relative;
    left: 0;
    background-color: #EEE;
    margin: .5em;
    padding: .3em 0;
    height: 1.6em;
    border-radius: 4px;
  }
  .tests li.selected:hover {
    background-color: #BBD8DC !important;
    color: white;
  }
  .tests li:hover {
    color: #607D8B;
    background-color: #DDD;
    left: .1em;
  }
  .tests .text {
    position: relative;
    top: -3px;
  }
  .tests .badge {
    display: inline-block;
    font-size: small;
    color: white;
    padding: 0.8em 0.7em 0 0.7em;
    background-color: #607D8B;
    line-height: 1em;
    position: relative;
    left: -1px;
    top: -4px;
    height: 1.8em;
    margin-right: .8em;
    border-radius: 4px 0 0 4px;
  }
`],
providers: [ TestService]
})
export class AppComponent  {
    title = 'Übung';
    tests: Test[];

    constructor(private testService: TestService) {

    }

    getTests(): void {
      this.testService.getTests().then(tests => this.tests =tests);
    }

    ngOnInit(): void {
      this.getTests();
    }

    selectedtest: Test;

  onSelect(test: Test): void {
    this.selectedtest = test;
  }

 }