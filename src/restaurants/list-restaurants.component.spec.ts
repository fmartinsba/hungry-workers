/// <reference path="../../node_modules/angular2/ts/typings/jasmine/jasmine.d.ts" />

import {HTTP_PROVIDERS, XHRBackend, Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from 'angular2/http';
import {MockBackend, MockConnection} from 'angular2/http/testing';

import {setBaseTestProviders} from 'angular2/testing';
import {
  TEST_BROWSER_PLATFORM_PROVIDERS,
  TEST_BROWSER_APPLICATION_PROVIDERS
} from 'angular2/platform/testing/browser';
import {
  TestComponentBuilder,
  beforeEachProviders,
  beforeEach,
  describe,
  expect,
  injectAsync,
  inject,
  it
} from 'angular2/testing';
import {DOM} from 'angular2/src/platform/dom/dom_adapter';
import {Component, provide, DirectiveResolver} from 'angular2/core';
import {ElementRef} from 'angular2/src/core/linker/element_ref';
import {ListRestaurantsComponent} from './list-restaurants.component';
import {RestaurantsService} from './restaurants.service';
import {Restaurant} from './restaurant';

describe('ListRestaurantsComponent Tests', () => {

    //setup
    beforeEachProviders(() => {
      return [
        HTTP_PROVIDERS,
        DirectiveResolver,
        provide(XHRBackend, {useClass: MockBackend}),
        RestaurantsService,
        ListRestaurantsComponent
      ];
    });


    //specs
    it('Should get all restaurants',

      injectAsync([XHRBackend, RestaurantsService, TestComponentBuilder], (mockBackend, service, tcb) => {

        mockBackend.connections.subscribe(
          (connection: MockConnection) => {
            connection.mockRespond(new Response(
              new ResponseOptions({
                body: [
                  {id: 1, name: "The Gantry Restaurant", active: true, votes: []},
                  {id: 2, name: "Aqua Dining", active: false, votes: []},
                  {id: 3, name: "The Dining Room", active: true, votes: []},
                  {id: 4, name: "Ripples at Milsons Point", active: true, votes: []},
                  {id: 5, name: "Lotus Dumpling Bar", active: true, votes: []},
                  {id: 6, name: "The Deck Sydney", active: true, votes: []},
                  {id: 7, name: "Playfair Cafe", active: true, votes: []},
                  {id: 8, name: "The Rocks Cafe", active: true, votes: []},
                  {id: 9, name: "Quay Restaurant", active: true, votes: []},
                  {id: 10, name: "Bennelong Restaurant Sydney", active: true, votes: []},
                  {id: 11, name: "La Renaissance Cafe", active: true, votes: []},
                  {id: 12, name: "Sails on Lavender Bay", active: true, votes: []},
                  {id: 13, name: "The Bar", active: true, votes: []},
                  {id: 14, name: "Pancakes on the Rocks", active: true, votes: []},
                  {id: 15, name: "Appetito", active: true, votes: []},
                  {id: 16, name: "The Living Room", active: true, votes: []},
                  {id: 17, name: "The Fine Food Store", active: true, votes: []},
                  {id: 18, name: "Opera Bar", active: true, votes: []},
                  {id: 19, name: "ARIA Restaurant", active: true, votes: []},
                  {id: 20, name: "Sake Restaurant & Bar", active: true, votes: []}
                ]
              }
            )));
        });


        return tcb.createAsync(ListRestaurantsComponent).then((fixture) => {

          fixture.detectChanges();
          let list = fixture.debugElement.componentInstance;

          expect(list.restaurants.length).toBe(20);
          expect(list.restaurants[0].id).toBe(1);
          expect(list.restaurants[0].name).toEqual("The Gantry Restaurant");

        });

      })
    );


    it('Should prevent from vote for any restaurant before pick a worker ',

      injectAsync([XHRBackend, RestaurantsService, TestComponentBuilder], (mockBackend, service, tcb) => {

        mockBackend.connections.subscribe(
          (connection: MockConnection) => {
            connection.mockRespond(new Response(
              new ResponseOptions({
                body: [
                  {id: 1, name: "The Gantry Restaurant", active: true, votes: []},
                  {id: 2, name: "Aqua Dining", active: false, votes: []},
                  {id: 3, name: "The Dining Room", active: true, votes: []},
                  {id: 4, name: "Ripples at Milsons Point", active: true, votes: []},
                  {id: 5, name: "Lotus Dumpling Bar", active: true, votes: []},
                  {id: 6, name: "The Deck Sydney", active: true, votes: []},
                  {id: 7, name: "Playfair Cafe", active: true, votes: []},
                  {id: 8, name: "The Rocks Cafe", active: true, votes: []},
                  {id: 9, name: "Quay Restaurant", active: true, votes: []},
                  {id: 10, name: "Bennelong Restaurant Sydney", active: true, votes: []},
                  {id: 11, name: "La Renaissance Cafe", active: true, votes: []},
                  {id: 12, name: "Sails on Lavender Bay", active: true, votes: []},
                  {id: 13, name: "The Bar", active: true, votes: []},
                  {id: 14, name: "Pancakes on the Rocks", active: true, votes: []},
                  {id: 15, name: "Appetito", active: true, votes: []},
                  {id: 16, name: "The Living Room", active: true, votes: []},
                  {id: 17, name: "The Fine Food Store", active: true, votes: []},
                  {id: 18, name: "Opera Bar", active: true, votes: []},
                  {id: 19, name: "ARIA Restaurant", active: true, votes: []},
                  {id: 20, name: "Sake Restaurant & Bar", active: true, votes: []}
                ]
              }
            )));
        });


        return tcb.createAsync(ListRestaurantsComponent).then((fixture) => {

          fixture.detectChanges();
          let list = fixture.debugElement.componentInstance;
          var select = fixture.nativeElement.querySelectorAll('button')[0];

          list.currentWorker = false;

          spyOn(window, "alert");
          select.click();
          expect(window.alert).toHaveBeenCalledWith("Ooops! You must to select a worker before start voting :p");
          expect(list.restaurants[0].votes.length).toBe(0);

        });

      })
    );


    it('Should prevent worker from vote for a restaurant that have been chosen in the same week ',

      injectAsync([XHRBackend, RestaurantsService, TestComponentBuilder], (mockBackend, service, tcb) => {

        mockBackend.connections.subscribe(
          (connection: MockConnection) => {
            connection.mockRespond(new Response(
              new ResponseOptions({
                body: [
                  {id: 1, name: "The Gantry Restaurant", active: true, votes: []},
                  {id: 2, name: "Aqua Dining", active: false, votes: []},
                  {id: 3, name: "The Dining Room", active: true, votes: []},
                  {id: 4, name: "Ripples at Milsons Point", active: true, votes: []},
                  {id: 5, name: "Lotus Dumpling Bar", active: true, votes: []},
                  {id: 6, name: "The Deck Sydney", active: true, votes: []},
                  {id: 7, name: "Playfair Cafe", active: true, votes: []},
                  {id: 8, name: "The Rocks Cafe", active: true, votes: []},
                  {id: 9, name: "Quay Restaurant", active: true, votes: []},
                  {id: 10, name: "Bennelong Restaurant Sydney", active: true, votes: []},
                  {id: 11, name: "La Renaissance Cafe", active: true, votes: []},
                  {id: 12, name: "Sails on Lavender Bay", active: true, votes: []},
                  {id: 13, name: "The Bar", active: true, votes: []},
                  {id: 14, name: "Pancakes on the Rocks", active: true, votes: []},
                  {id: 15, name: "Appetito", active: true, votes: []},
                  {id: 16, name: "The Living Room", active: true, votes: []},
                  {id: 17, name: "The Fine Food Store", active: true, votes: []},
                  {id: 18, name: "Opera Bar", active: true, votes: []},
                  {id: 19, name: "ARIA Restaurant", active: true, votes: []},
                  {id: 20, name: "Sake Restaurant & Bar", active: true, votes: []}
                ]
              }
            )));
        });


        return tcb.createAsync(ListRestaurantsComponent).then((fixture) => {

          fixture.detectChanges();
          let list = fixture.debugElement.componentInstance;
          var select = fixture.nativeElement.querySelectorAll('button')[1];

          list.currentWorker = {id: 1, name: "Sarah Atkinson"};

          spyOn(window, "alert");
          select.click();
          expect(window.alert).toHaveBeenCalledWith("Nooops! We already have been there this week :p");
          expect(list.restaurants[1].votes.length).toBe(0);


        });

      })
    );


    it('Should cast a vote from Sarah Atkinson for the restaurant Lotus Dumpling Bar ',

      injectAsync([XHRBackend, RestaurantsService, TestComponentBuilder], (mockBackend, service, tcb) => {

        mockBackend.connections.subscribe(
          (connection: MockConnection) => {
            connection.mockRespond(new Response(
              new ResponseOptions({
                body: [
                  {id: 1, name: "The Gantry Restaurant", active: true, votes: []},
                  {id: 2, name: "Aqua Dining", active: false, votes: []},
                  {id: 3, name: "The Dining Room", active: true, votes: []},
                  {id: 4, name: "Ripples at Milsons Point", active: true, votes: []},
                  {id: 5, name: "Lotus Dumpling Bar", active: true, votes: []},
                  {id: 6, name: "The Deck Sydney", active: true, votes: []},
                  {id: 7, name: "Playfair Cafe", active: true, votes: []},
                  {id: 8, name: "The Rocks Cafe", active: true, votes: []},
                  {id: 9, name: "Quay Restaurant", active: true, votes: []},
                  {id: 10, name: "Bennelong Restaurant Sydney", active: true, votes: []},
                  {id: 11, name: "La Renaissance Cafe", active: true, votes: []},
                  {id: 12, name: "Sails on Lavender Bay", active: true, votes: []},
                  {id: 13, name: "The Bar", active: true, votes: []},
                  {id: 14, name: "Pancakes on the Rocks", active: true, votes: []},
                  {id: 15, name: "Appetito", active: true, votes: []},
                  {id: 16, name: "The Living Room", active: true, votes: []},
                  {id: 17, name: "The Fine Food Store", active: true, votes: []},
                  {id: 18, name: "Opera Bar", active: true, votes: []},
                  {id: 19, name: "ARIA Restaurant", active: true, votes: []},
                  {id: 20, name: "Sake Restaurant & Bar", active: true, votes: []}
                ]
              }
            )));
        });


        return tcb.createAsync(ListRestaurantsComponent).then((fixture) => {

          fixture.detectChanges();
          let list = fixture.debugElement.componentInstance;
          var select = fixture.nativeElement.querySelectorAll('button')[4];
          list.currentWorker = {id: 1, name: "Sarah Atkinson"};

          spyOn(window, "alert");
          select.click();
          expect(window.alert).toHaveBeenCalledWith("Good choice!");

        });

      })
    );


    it('Should prevent worker from vote twice for the same restaurant in the current voting ',

      injectAsync([XHRBackend, RestaurantsService, TestComponentBuilder], (mockBackend, service, tcb) => {

        mockBackend.connections.subscribe(
          (connection: MockConnection) => {
            connection.mockRespond(new Response(
              new ResponseOptions({
                body: [
                  {id: 1, name: "The Gantry Restaurant", active: true, votes: []},
                  {id: 2, name: "Aqua Dining", active: false, votes: []},
                  {id: 3, name: "The Dining Room", active: true, votes: []},
                  {id: 4, name: "Ripples at Milsons Point", active: true, votes: []},
                  {id: 5, name: "Lotus Dumpling Bar", active: true, votes: []},
                  {id: 6, name: "The Deck Sydney", active: true, votes: []},
                  {id: 7, name: "Playfair Cafe", active: true, votes: []},
                  {id: 8, name: "The Rocks Cafe", active: true, votes: []},
                  {id: 9, name: "Quay Restaurant", active: true, votes: []},
                  {id: 10, name: "Bennelong Restaurant Sydney", active: true, votes: []},
                  {id: 11, name: "La Renaissance Cafe", active: true, votes: []},
                  {id: 12, name: "Sails on Lavender Bay", active: true, votes: []},
                  {id: 13, name: "The Bar", active: true, votes: []},
                  {id: 14, name: "Pancakes on the Rocks", active: true, votes: []},
                  {id: 15, name: "Appetito", active: true, votes: []},
                  {id: 16, name: "The Living Room", active: true, votes: []},
                  {id: 17, name: "The Fine Food Store", active: true, votes: []},
                  {id: 18, name: "Opera Bar", active: true, votes: []},
                  {id: 19, name: "ARIA Restaurant", active: true, votes: []},
                  {id: 20, name: "Sake Restaurant & Bar", active: true, votes: []}
                ]
              }
            )));
        });


        return tcb.createAsync(ListRestaurantsComponent).then((fixture) => {

          fixture.detectChanges();
          let list = fixture.debugElement.componentInstance;
          var select = fixture.nativeElement.querySelectorAll('button')[4];
          list.currentWorker = {id: 1, name: "Sarah Atkinson"};
          list.restaurants[4].votes = [1];

          spyOn(window, "alert");
          select.click();
          expect(window.alert).toHaveBeenCalledWith("Sorry! But you cannot vote for the same restaurant twice :p");

        });

      })
    );


});
