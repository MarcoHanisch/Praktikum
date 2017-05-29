import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http'
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { PostsService } from './posts.service';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';

describe('PostsService', () => {

  beforeEach(() => {TestBed.resetTestEnvironment(); TestBed.initTestEnvironment( BrowserDynamicTestingModule, platformBrowserDynamicTesting() )
    .configureTestingModule({providers:[PostsService]}); 
  });


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostsService],
      imports: [ HttpModule]
    });
  });

  it('should ...', inject([PostsService], (service: PostsService) => {
    expect(service).toBeTruthy();
  }));
  it('should be getAllPosts is defined',inject([PostsService], (service: PostsService) => {
    expect(service.getAllPosts()).toBeDefined();
  }));
  it('should getAllPosts is not Null',inject([PostsService], (service: PostsService) =>{
    expect(service.getAllPosts()).not.toBeNull()
  }))
  it('should exist a topic with the name Allgemein', inject([PostsService], (service: PostsService) => {
    expect(service.getAllTopics()).toMatch(JSON.stringify(['Allgemein']))
  }))
  it('should getAllUser is not Null', inject([PostsService], (service: PostsService) => {
    expect(service.getAllUser()).not.toBeNull()
    expect(service.getAllUser()).toBeDefined()
  }))
  it('should find a User with the name NutzerAdmin', inject([PostsService], (service: PostsService) => {
    expect(service.getUser('5925840408613c256cf47853')).not.toBeNull()
    expect(service.getUser('5925840408613c256cf47853')).toMatch(JSON.stringify(['NutzerAdmin']))
  }))
  it('should add a Post', inject([ PostsService], (service: PostsService) => {
    expect(service.addPost('KarmaTest', 'Test')).not.toBeNull()
    expect(service.getAllPosts()).toMatch(JSON.stringify(['KarmaTest']))
  }))
  it('should delete a Post', inject([PostsService], (service: PostsService) => {
   expect( service.deletePost('592294ed3d5dcf11e2e8aac5')).toBeTruthy()
  }))
});
