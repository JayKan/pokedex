import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class StoreService {

  private _cache = new Map();
  private _url: string;

  constructor(private _http: Http) {
    this._url = '/pokedex.json';
  }

  getAll(): Observable<any> {
    if (this._cache.get(this._url)) {
      return Observable.of(this._cache.get(this._url));
    }
    return this._http.get(this._url)
      .map(res => res.json())
      .map(res => this._cacheData(res.pokemon));
  }

  private _cacheData(data): void {
    let normalized = data.map(item => {
      return {
        id: item.num,
        name: item.name,
        candyAmt: item.candy.split(' ')[0],
        candyDes: [item.name, 'Candy'].join(' '),
        egg: item.egg,
        type: item.type,
        img: item.img,
        height: item.height,
        weight: item.weight,
        multipliers: item.multipliers
      };
    });
    this._cache.set(this._url, normalized);
    return normalized;
  }
}

export interface Pokemon {
  id: number;
  name: string;
  candyAmt: string;
  candyDes: string;
  egg: string,
  type: string;
  img: string,
  height: string;
  weight: string;
  multipliers: number;

}
