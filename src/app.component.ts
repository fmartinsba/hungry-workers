import {Component} from 'angular2/core';
import {ListWorkersComponent} from './workers/list-workers.component';
import {ListRestaurantsComponent} from './restaurants/list-restaurants.component';
import {ListWinnersComponent} from './results/list-winners.component';

@Component({
    selector: 'hungry-workers-app',
    template: `
    <nav class="navbar navbar-inverse">
      <div class="container">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">Hungry Worker</a>
        </div>
      </div>
    </nav>
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <list-workers (selectWorker)="updateWorker($event)"></list-workers>
        </div>
        <div class="col-md-4">
          <list-restaurants [currentWorker]="worker"></list-restaurants>
        </div>
        <div class="col-md-4">
          <list-winners></list-winners>
        </div>
      </div>
    </div>
    `,
    directives: [
      ListWorkersComponent,
      ListRestaurantsComponent,
      ListWinnersComponent
    ]
})
export class AppComponent {

  worker:any;

  constructor() {}

  updateWorker($event) {
    this.worker = $event;
  }

}
