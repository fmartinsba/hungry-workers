/// <reference path="../../node_modules/angular2/ts/typings/jasmine/jasmine.d.ts" />

import {it, describe, expect, beforeEach, beforeEachProviders, inject} from 'angular2/testing';
import {provide} from 'angular2/core';
import {HTTP_PROVIDERS, XHRBackend, Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from 'angular2/http';
import {MockBackend, MockConnection} from 'angular2/http/testing';
import {RestaurantsService} from './restaurants.service';
import {Restaurant} from './restaurant';

describe('RestaurantsService Test', () => {

  //setup
  beforeEachProviders(() => {
    return [
      HTTP_PROVIDERS,
      provide(XHRBackend, {useClass: MockBackend}),
      RestaurantsService
    ];
  });

  it('should get all restaurants',

    inject([XHRBackend, RestaurantsService], (mockBackend, restaurantsService) => {

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

      restaurantsService.getRestaurants().subscribe((restaurants: Restaurant[]) => {
          expect(restaurants.length).toBe(20);
          expect(restaurants[0].id).toBe(1);
          expect(restaurants[0].name).toEqual("The Gantry Restaurant");
        });
      }));


      it('Should cast a vote from Sarah Atkinson for the restaurant Lotus Dumpling Bar ',

        inject([XHRBackend, RestaurantsService], (mockBackend, restaurantsService) => {

          mockBackend.connections.subscribe(
            (connection: MockConnection) => {
              connection.mockRespond(new Response(
                new ResponseOptions({
                  body: [
                    {id: 1, name: "The Gantry Restaurant", active: true, votes: []},
                    {id: 2, name: "Aqua Dining", active: false, votes: []},
                    {id: 3, name: "The Dining Room", active: true, votes: []},
                    {id: 4, name: "Ripples at Milsons Point", active: true, votes: []},
                    {id: 5, name: "Lotus Dumpling Bar", active: true, votes: [1]},
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

          restaurantsService.setVote(1, 5).subscribe((restaurants: Restaurant[]) => {

              expect(restaurants[4].votes).toContain(1);
            });
          }));


});
