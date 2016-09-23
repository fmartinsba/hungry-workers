import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Restaurant} from './restaurant';

@Injectable()
export class RestaurantsService {

  private _baseUrl = "http://localhost:3000/restaurants";

  constructor(private _http: Http) {}

  getRestaurants(): Observable<Restaurant[]> {
    return this._http.get(this._baseUrl)
      .map(res => res.json());
  }

  setVote(worker_id, restaurant_id): Observable<Restaurant[]> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post(
      this._baseUrl + "/" + restaurant_id,
      worker_id,
      headers)
      .map(res => res.json());
  }

}
