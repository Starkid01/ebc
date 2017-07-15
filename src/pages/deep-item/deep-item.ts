import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BackandService } from '@backand/angular2-sdk';

import { BackandItem } from '../../providers/backand';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private backand: BackandService) { }

  ngOnInit() {
    let id = this.navParams.get('id');
    this.backand.object.getOne('items', id)
      .then(ebc => {
        console.log(ebc);
        this.item = ebc['data'];
        this.type = this.item.flyer ? 'Flyer' : 'Card';
        this.loaded = true;
        this.item.pic = this.item.pic === '' ? null : this.item.pic;
      })
      .catch(err => console.log(err));
  }
}
