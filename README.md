# hungry workers app (Node.js + Angular 2) #

Install:

```
npm install
```

Run the project:

```
npm start
```

Check code coverage:

```
npm run coverage
```

![picture alt](https://github.com/fmartinsba/hungry-workers/blob/master/ScreenShot.png "Screen Shot - hungry workers")

## Some notes about the code ##

### Logic ###

NOTE: As this app is a kind of proof of ability for some concepts and technologies, I choose to don't implement the login to access each worker's profile. All the workers profiles can be accessed by clicking on it's name on the list. This will make it easy to try the app by casting votes as different workers and check the results.

#### Every object restaurant have: ####
* id: number -> to identify each restaurant object inside the array
* name: string -> to represent the restaurant in the view layer
* active: boolean -> to know if the restaurant is available for the current voting or not. When it wins, active = false until reset the winners (every week)
* votes: number[] -> to store the id of each worker that cast a vote for it, to count the total votes and to prevent a worker to vote twice for the same restaurant

- - - -

## Technology ##

#### Server-side ####

* Node.js
* Hapi.js

#### Client-side ####

* TypeScript
* Angular 2 (Beta13)

#### Tests ####

* Jasmine
* Karma
* Istanbul

- - - -

## App Structure ##

#### Client-side ####

The Client-side is witten in components, services and interfaces.
The interfaces represents each object type by defining theirs attributes.
The services communicates with the REST API to provide data to the components.
The components interacts with the users and holds all the logics to controll the UI.

#### Server-Side ####

The Server-side is just a really simple REST API written in Node.js using Hapi.js FrameWork.
There is no database, every data is stored and updated in memory and provided by the server when requested.

Server URIs:

Type  | URI                                      | Payload   | Response                                                    |
------| -----------------------------------------|-----------|-------------------------------------------------------------|
GET   | http://localhost:3000/workers            |           | [{id: 5, name: "Wagner Nunes"},...]                         |
GET   | http://localhost:3000/restaurants        |           | [{id:1, name: "Opera Bar", active: true, votes: [1,2]},...] |
POST  | http://localhost:3000/restaurants/{id}   | worker_id | [{id:1, name: "Opera Bar", active: true, votes: [1,2]},...] |
GET   | http://localhost:3000/close	             |           | [{id:1, name: "Opera Bar", active: true, votes: [1,2]},...] |
GET   | http://localhost:3000/winners            |           | [{id: 2, name: "Aqua Dining", date: "Thu Sep 22 2016"},...] |

- - - -

## What could have been done in a better way?

* The server could implement some validations using Joi
* The server could be redesigned in TypeScript classes
* The angular 2 (Beta 13) could be updated to the recently released Final version
* The tests could cover more situations
* The UI could be redesigned
