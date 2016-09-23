/// <reference path="../../node_modules/angular2/ts/typings/jasmine/jasmine.d.ts" />

import {it, describe, expect, beforeEach, beforeEachProviders, inject} from 'angular2/testing';
import {provide} from 'angular2/core';
import {HTTP_PROVIDERS, XHRBackend, Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from 'angular2/http';
import {MockBackend, MockConnection} from 'angular2/http/testing';
import {ResultsService} from './results.service';
import {Winner} from './winner';

describe('ResultsService Test', () => {

  //setup
  beforeEachProviders(() => {
    return [
      HTTP_PROVIDERS,
      provide(XHRBackend, {useClass: MockBackend}),
      ResultsService
    ];
  });

  it('should get all workers',

    inject([XHRBackend, ResultsService], (mockBackend, resultsService) => {

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

      resultsService.getWinners().subscribe((winners: Winner[]) => {
          expect(winners.length).toBe(1);
          expect(winners[0].id).toBe(2);
          expect(winners[0].name).toEqual("Aqua Dining");
        });
      }));

});
