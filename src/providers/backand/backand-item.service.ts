import { Injectable } from '@angular/core';
import { BackandService } from '@backand/angular2-sdk';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Injectable()
export class BackandItemService {

  constructor(private backand: BackandService, private events: Events, private storage: Storage) { }

  buildList() {
    let itemQuery = ['SampleCard', 'SampleFlyer', 'MyCard', 'MyFlyer', 'TempCard', 'TempFlyer'];

    itemQuery.forEach(i => {
      this.backand.query.get(i)
        .then(res => {
          this.storage.set(i, res['data'])
          .then(() => {
            this.events.publish('set-items', i);
          });
        })
        .catch(err => {
          console.log(err);
        })
    });
  }

  deleteItem(obj, id) {
    this.backand.object.remove(obj, id)
    .then(res => {
      this.backand.object.action.get('items', 'SendUpdatedList');
    })
    .catch(err =>{
      console.log(err);
    })
  }

  getList(name) {
    return this.storage.get(name);
  }

  updateList() {
    return this.events;
  }
}
