import {Component, OnInit, Output, EventEmitter} from 'angular2/core';
import {WorkersService} from './workers.service';
import {Worker} from './worker';

@Component({
  selector: 'list-workers',
  template: `
    <h3>STEP 1</h3>
    <h4>Pick a Hangry Worker</h4>
    <div class="list-group">
      <button
        *ngFor="#worker of workers"
        class="list-group-item worker-button"
        (click)="onClick($event, worker)">
        {{ worker.name }}
      </button>
    </div>
  `,
  providers: [WorkersService]
})
export class ListWorkersComponent implements OnInit {

  workers: Worker[];
  service: WorkersService;
  currentWorker:Worker;
  @Output() selectWorker = new EventEmitter();
  // @Output() currentWorker = new EventEmitter();

  constructor(private _service: WorkersService) {
    this.service = _service;
  }

  ngOnInit() {
    this.service.getWorkers()
      .subscribe( res => {
        this.workers = res;
        // this.currentWorker.emit(false);
        this.selectWorker.emit(false);
      });
  }

  onClick(e, w:Worker) {
    // this.currentWorker.emit(w);
    this.currentWorker = w;
    this.selectWorker.emit(this.currentWorker);
    var elements = e.target.parentElement.getElementsByTagName("BUTTON");
    for (var i = 0; i < elements.length; i++) {
      elements[i].classList.remove('active');
    }
    e.target.className += " active";
  }
}
