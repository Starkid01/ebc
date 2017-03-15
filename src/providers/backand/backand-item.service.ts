import { Injectable } from '@angular/core';
import { BackandService } from '@backand/angular2-sdk';

@Injectable()
export class BackandItemService {
  ebcMaster: Array<any> = [];

  constructor(private backand: BackandService) { }

  buildList() {
    let itemQuery = ['SampleCard', 'SampleFlyer', 'MyCard', 'MyFlyer', 'TempCard', 'TempFlyer'];

    itemQuery.forEach(i => {
      this.backand.query.get(i)
        .then(res => {
          let list = {}
          list[i] = res['data'];

          this.ebcMaster.push(list);
        })
        .catch(err => {
          console.log(err);
        })
    });
  }

  deleteItem(obj, id) {
    this.backand.object.remove(obj, id)
    .then(res => {
      console.log(res);
    })
    .catch(err =>{
      console.log(err);
    })
  }

  getList(name) {
    let items = this.ebcMaster.find(list => list.hasOwnProperty(name));
    return items;
  }
}
