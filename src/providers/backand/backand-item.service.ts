import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Injectable()
export class BackandItemService {
  myApi: string = 'https://ebc.beezleeart.com';

  constructor(private http: HttpClient, private events: Events, private storage: Storage) { }
  
  createItem(newItem) {
    return this.http.post(`${this.myApi}/api/mobile/create`, newItem);
  }
  
  deleteItem(obj, id) {
    return this.http.delete(`${this.myApi}/api/obj/${obj}/${id}`)
  }

  getList(table, type) {
    let path: string = (table === 'items') ? `${type}s` : `${table}/${type}s`;
    return this.http.get(`${this.myApi}/api/mobile/${path.toLowerCase()}`)
  }

  getOne(id) {
    return this.http.get(`${this.myApi}/api/obj/items/${id}`);
  }

  updateList() {
    return this.events;
  }
}
