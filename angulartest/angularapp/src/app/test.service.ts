import { Injectable } from '@angular/core';
import { Test } from './test';
import { TESTS } from './mock-test';

@Injectable()
    export class TestService {
        getTests(): Promise<Test[]> {
            return Promise.resolve(TESTS);            
        }
    }
