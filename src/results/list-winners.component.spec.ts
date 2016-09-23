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
import {ListWinnersComponent} from './list-winners.component';
import {ResultsService} from './results.service';
import {Winner} from './winner';

describe('ListWinnersComponent Tests', () => {

    //setup
    beforeEachProviders(() => {
      return [
        HTTP_PROVIDERS,
        DirectiveResolver,
        provide(XHRBackend, {useClass: MockBackend}),
        ResultsService,
        ListWinnersComponent
      ];
    });


    //specs

    it('Should get all winners of the week',

      injectAsync([XHRBackend, ResultsService, TestComponentBuilder], (mockBackend, service, tcb) => {

        mockBackend.connections.subscribe(
          (connection: MockConnection) => {
            connection.mockRespond(new Response(
              new ResponseOptions({
                body: [
                  {id: 2, name: "Aqua Dining", date: "Thu Sep 22 2016"}
                ]
              }
            )));
        });


        return tcb.createAsync(ListWinnersComponent).then((fixture) => {

          fixture.detectChanges();
          let list = fixture.debugElement.componentInstance;

          expect(list.winners.length).toBe(1);
          expect(list.winners[0].id).toBe(2);
          expect(list.winners[0].name).toEqual("Aqua Dining");

        });

      })
    );


    it('Should notify the tie voting',

      injectAsync([XHRBackend, ResultsService, TestComponentBuilder], (mockBackend, service, tcb) => {

        mockBackend.connections.subscribe(
          (connection: MockConnection) => {
            connection.mockRespond(new Response(
              new ResponseOptions({
                body: [
                  {id: 4, name: "Ripples at Milsons Point", active: true, votes: [2,6,10]},
                  {id: 5, name: "Lotus Dumpling Bar", active: true, votes: [1,4,8]},
                ]
              }
            )));
        });


        return tcb.createAsync(ListWinnersComponent).then((fixture) => {

          fixture.detectChanges();
          let list = fixture.debugElement.componentInstance;

          spyOn(window, "alert");
          list.closeVoting();
          expect(window.alert).toHaveBeenCalledWith("Oooops! We have a tie vote. Keep voting :p");

        });

      })
    );


    it('Should show the winner of the voting',

      injectAsync([XHRBackend, ResultsService, TestComponentBuilder], (mockBackend, service, tcb) => {

        mockBackend.connections.subscribe(
          (connection: MockConnection) => {
            connection.mockRespond(new Response(
              new ResponseOptions({
                body: [
                  {id: 4, name: "Ripples at Milsons Point", active: false, votes: [2,6,10]},
                ]
              }
            )));
        });


        return tcb.createAsync(ListWinnersComponent).then((fixture) => {

          fixture.detectChanges();
          let list = fixture.debugElement.componentInstance;

          spyOn(window, "alert");
          list.closeVoting();
          expect(window.alert).toHaveBeenCalledWith("Yummy! Today we are going to Ripples at Milsons Point");

        });

      })
    );


});
