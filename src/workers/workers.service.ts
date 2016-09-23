import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Worker} from './worker';

@Injectable()
export class WorkersService {

  private _baseUrl = "http://localhost:3000/workers";

  constructor(private _http: Http) {}

  getWorkers(): Observable<Worker[]> {
    return this._http.get(this._baseUrl)
      .map(res => res.json());
  }

}
