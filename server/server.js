'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 3000 });

// ---------------------------------- Routes ---------------------------------- //

// URI to return the list of all restaurants
server.route({
    method: 'GET',
    path: '/restaurants',
    handler: function (request, reply) {
        reply(restaurants);
    }
});

// URI to return the list of all hangry workers
server.route({
    method: 'GET',
    path: '/workers',
    handler: function (request, reply) {
        reply(workers);
    }
});

// URI to set a new vote
server.route({
    method: 'POST',
    path: '/restaurants/{restaurant_id}',
    handler: function (request, reply) {
        reply(setVote(request.params.restaurant_id, request.payload));
    }
});

server.route({
    method: 'GET',
    path: '/restaurants/{restaurant_id}/{worker_id}',
    handler: function (request, reply) {
        reply(setVote(request.params.restaurant_id, request.params.worker_id));
    }
});

// URI to return the list of winners of the week
server.route({
    method: 'GET',
    path: '/winners',
    handler: function (request, reply) {
        reply(winners);
    }
});

// URI to close the current voting and return the updated list of winners of the week
server.route({
    method: 'GET',
    path: '/close',
    handler: function (request, reply) {
        reply(closeVoting());
    }
});

// These options are used to allow requests from different origens
server.register({
	register: require('hapi-cors'),
	options: {
		origins: ['http://localhost:3001']
	}
});

// Function to start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});


// ---------------------------------- Methods ---------------------------------- //

function setVote(restaurant_id, worker_id) {
  for (var i = 0; i < restaurants.length; i++) {
    if (restaurants[i].id == restaurant_id) {
      restaurants[i].votes.push(parseInt(worker_id));
      return restaurants;
    }
  }
  return false;
}

function closeVoting() {
  var mostVoted = [];
  for (var i = 0; i < restaurants.length; i++) {
    if (mostVoted.length < 1)
      mostVoted.push(restaurants[i]);
    if (
      restaurants[i].votes.length == mostVoted[0].votes.length &&
      restaurants[i].id !== mostVoted[0].id
    )
      mostVoted.push(restaurants[i]);
    if (restaurants[i].votes.length > mostVoted[0].votes.length)
      mostVoted.splice(0, mostVoted.length, restaurants[i])
  }
  if (mostVoted.length == 1) {
    addWinner(mostVoted[0]);
    updateRestaurants(mostVoted[0].id);
  }
  return mostVoted;
}

function updateRestaurants(restaurant_id) {
  for (var i = 0; i < restaurants.length; i++) {
    restaurants[i].votes = [];
    if (restaurants[i].id == restaurant_id)
      restaurants[i].active = false;
  }
}

function addWinner(mostVoted) {
  var winner = {};
  winner.id = mostVoted.id;
  winner.name = mostVoted.name;
  winner.date = new Date().toDateString();
  winners.push(winner);
}


// ---------------------------------- Mock DataBase ---------------------------------- //

// This array stores all the workers
var workers = [
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
];

// This array stores all the restaurants
var restaurants = [
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
];

// This array stores the winners
var winners = [
  {id: 2, name: "Aqua Dining", date: "Thu Sep 22 2016"}
];
