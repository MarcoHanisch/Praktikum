import { Component, Input } from '@angular/core';
import { Test } from './test';

@Component({
    selector: 'test-detail',
    template: `
    <div *ngIf="test">
    <h2>{{test.name}} Details </h2>
    <div><label> ID: </label>{{test.id}}</div>
    <div>
    <label> Name: </label>
    <input [(ngModel)]="test.name" placeholder="name" />
    </div>
    </div>
    `
})

export class TestDetailComponent {
    @Input() test: Test;
}