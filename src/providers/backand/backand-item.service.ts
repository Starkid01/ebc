import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { BackandConfigService } from './backand-config.service';

@Injectable()
export class BackandItemService {
  baseUrl: string = `${this.config.apiUrl}/1/objects`;

  constructor(public config: BackandConfigService, public http: Http) { }

  public addItem(list, data) {
    let url = `${this.baseUrl}/${list}`;
    let added = JSON.stringify(data);
    let headers = this.config.authHeader;

    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let $obs = this.http.post(url, added, {
      headers: headers
    }).map(res => res.json()).do(
      data => console.log(data),
      err => this.config.errorHander(err),
      () => console.log('Items'));

    return $obs;
  }

  public deleteItem(list, id) {
    let url = `${this.baseUrl}/${list}/${id}`;
    let headers = this.config.authHeader;
    
    headers.append('Content-Type', 'application/json');
    let $obs = this.http.delete(url, {
      headers: headers
    }).map(res => res.json()).do(
      data => console.log(data),
      err => this.config.errorHander(err),
      () => console.log('Items'));

    return $obs;
  }

  public getList(list) {
    let url = `${this.baseUrl}/${list}`;
    let headers = this.config.authHeader;

    let $obs = this.http.get(url, {
      headers: headers
    }).map(res => res.json()).do(
      data => console.log(data),
      err => this.config.errorHander(err),
      () => console.log('Items'));

    return $obs;
  }

  public getItem(list, id) {
    let url = `${this.baseUrl}/${list}/${id}`;
    let headers = this.config.authHeader;

    let $obs = this.http.get(url, {
      headers: headers
    }).map(res => res.json()).do(
      data => console.log(data),
      err => this.config.errorHander(err),
      () => console.log('Items'));

    return $obs;
  }

  public getItems(item: string) {
    let itemQuery = `${this.config.apiUrl}/1/query/data/${item}`;
    let headers = this.config.authHeader;

    let $obs = this.http.get(itemQuery, {
      headers: headers
    }).map(res => res.json()).do(
      data => console.log(data),
      err => this.config.errorHander(err),
      () => console.log('Items'));

    return $obs;
  }

  public updateItem(list, id, data) {
    let url = `${this.baseUrl}/${list}/${id}`;
    let update = JSON.stringify(data);
    let headers = this.config.authHeader;

    let $obs = this.http.put(url, update, {
      headers: headers
    }).map(res => res).do(
      data => console.log(data),
      err => this.config.errorHander(err),
      () => console.log('Items'));

    return $obs;
  }
}
