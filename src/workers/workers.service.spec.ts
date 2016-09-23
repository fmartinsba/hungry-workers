/// <reference path="../../node_modules/angular2/ts/typings/jasmine/jasmine.d.ts" />

import {it, describe, expect, beforeEach, beforeEachProviders, inject} from 'angular2/testing';
import {provide} from 'angular2/core';
import {HTTP_PROVIDERS, XHRBackend, Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from 'angular2/http';
import {MockBackend, MockConnection} from 'angular2/http/testing';
import {WorkersService} from './workers.service';
import {Worker} from './worker';

describe('WorkersService Test', () => {

  //setup
  beforeEachProviders(() => {
    return [
      HTTP_PROVIDERS,
      provide(XHRBackend, {useClass: MockBackend}),
      WorkersService
    ];
  });

  it('should get all workers',

    inject([XHRBackend, WorkersService], (mockBackend, workersService) => {

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

      workersService.getWorkers().subscribe((workers: Worker[]) => {
          expect(workers.length).toBe(13);
          expect(workers[0].id).toBe(1);
          expect(workers[0].name).toEqual("Sarah Atkinson");
        });
      }));

});
