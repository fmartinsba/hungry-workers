import {Component, OnInit} from 'angular2/core';
import {ResultsService} from './results.service';
import {Winner} from './winner';

@Component({
  selector: 'list-winners',
  template: `
    <h3>STEP 3</h3>
    <h4><a (click)="closeVoting()">Close the voting</a> and check the results</h4>
    <ul class="list-group">
      <li
        *ngFor="#winner of winners"
        class="list-group-item">
        {{ winner.name }}
        <span class="badge">{{ winner.date }}</span>
      </li>
    </ul>
  `,
  providers: [ResultsService]
})
export class ListWinnersComponent implements OnInit {

  winners:Winner[];
  service:ResultsService;

  constructor(private _service: ResultsService) {
    this.service = _service;
  }

  ngOnInit() {
    this.service.getWinners()
      .subscribe( res => {
        this.winners = res;
      });
  }

  closeVoting() {
    this.service.closeVoting()
      .subscribe( res => {

        if (res.length > 1)
          return alert("Oooops! We have a tie vote. Keep voting :p");

        if (res.length == 1) {
          this.service.getWinners()
            .subscribe( res => {
              this.winners = res;
            });
          return alert("Yummy! Today we are going to " + res[0].name);
        }

      });
  }
}
