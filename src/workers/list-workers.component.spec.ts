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
import {ListWorkersComponent} from './list-workers.component';
import {WorkersService} from './workers.service';
import {Worker} from './worker';

describe('ListWorkersComponent Tests', () => {

    //setup
    beforeEachProviders(() => {
      return [
        HTTP_PROVIDERS,
        DirectiveResolver,
        provide(XHRBackend, {useClass: MockBackend}),
        WorkersService,
        ListWorkersComponent
      ];
    });


    //specs

    it('Should get all workers',

      injectAsync([XHRBackend, WorkersService, TestComponentBuilder], (mockBackend, service, tcb) => {

        mockBackend.connections.subscribe(
          (connection: MockConnection) => {
            connection.mockRespond(new Response(
              new ResponseOptions({
                body: [
                  {id: 1, name: "Sarah Atkinson"},
                  {id: 2, name: "Juliano Bersano"},
                  {id: 3, name: "Dominik Katz"},
                  {id: 4, name: "Kathleen Karauna"},
                  {id: 5, name: "Wagner Nunes"},
                  {id: 6, name: "Miles Tillinger"},
                  {id: 7, name: "Jose Mathias Gusso"},
                  {id: 8, name: "Guilherme Tramontina"},
                  {id: 9, name: "Ronaldo Pereira"},
                  {id: 10, name: "Fagner Brack"},
                  {id: 11, name: "Rodolfo Pereira"},
                  {id: 12, name: "Vinicius Gerevini"},
                  {id: 13, name: "Wilson Mendes"}
                ]
              }
            )));
        });


        return tcb.createAsync(ListWorkersComponent).then((fixture) => {

          fixture.detectChanges();
          let list = fixture.debugElement.componentInstance;

          expect(list.workers.length).toBe(13);
          expect(list.workers[0].id).toBe(1);
          expect(list.workers[0].name).toEqual("Sarah Atkinson");

          var select = fixture.nativeElement.querySelectorAll('button')[0];
          select.click();
          expect(list.currentWorker.name).toEqual("Sarah Atkinson");

        });

      })
    );


});
