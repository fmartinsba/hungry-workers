import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Winner} from './winner';

@Injectable()
export class ResultsService {

  private _baseUrl = "http://localhost:3000/";
  d = new Date();

  constructor(private _http: Http) {}

  getWinners(): Observable<Winner[]> {
    return this._http.get(this._baseUrl + "winners")
      .map(res => res.json());
  }

  closeVoting(): Observable<any> {
    return this._http.get(this._baseUrl + "close")
      .map(res => res.json());
  }

}
