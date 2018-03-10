import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { BackandItem, BackandItemService } from '../../providers/backand';

@IonicPage({
  name: 'deep',
  segment: 'deep/:id'
})
@Component({
  selector: 'page-deep-item',
  templateUrl: 'deep-item.html',
})
export class DeepItemPage implements OnInit {
  item: BackandItem;
  loaded: boolean = false;
  type: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userItems: BackandItemService) { }

  ngOnInit() {
    let id = this.navParams.get('id');
    this.userItems.getOne(id)
      .subscribe((res: BackandItem) => this.item = res,
        err => console.log(err),
        () => this.loaded = true);
  }
}
