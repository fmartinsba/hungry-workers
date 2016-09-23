
import {Component, OnInit, Input} from 'angular2/core';
import {RestaurantsService} from './restaurants.service';
import {Restaurant} from './restaurant';

@Component({
  selector: 'list-restaurants',
  template: `
    <h3>STEP 2</h3>
    <h4>Vote for your favorite restaurants</h4>
    <div class="list-group">
      <button
        *ngFor="#restaurant of restaurants"
        class="list-group-item"
        [class.disabled]="!restaurant.active"
        (click)="voteRestaurant(restaurant)">
        {{ restaurant.name }}
        <span class="badge">Votes {{ restaurant.votes.length }}</span>
      </button>
    </div>
  `,
  providers: [RestaurantsService]
})
export class ListRestaurantsComponent implements OnInit {

  @Input() currentWorker:any;
  restaurants: Restaurant[];
  service: RestaurantsService;

  constructor(private _service: RestaurantsService) {
    this.service = _service;
  }

  ngOnInit() {
    this.service.getRestaurants()
      .subscribe( res => {
        this.restaurants = res;
      });
  }

  voteRestaurant(r:Restaurant) {
    if (!this.currentWorker)
      return alert("Ooops! You must to select a worker before start voting :p");

    var worker = this.currentWorker;
    var votes:any;
    votes = r.votes;

    if(!r.active)
      return alert("Nooops! We already have been there this week :p");

    if(votes.includes(worker.id) )
      return alert("Sorry! But you cannot vote for the same restaurant twice :p");

    this.service.setVote(worker.id, r.id)
      .subscribe( res => {
        if (res) {
          this.restaurants = res;
          return alert("Good choice!");
        }
      })
  }

}
