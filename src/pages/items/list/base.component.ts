import { DoCheck, OnInit } from '@angular/core';
import { ItemSliding, NavController, ToastController } from 'ionic-angular';

import { DetailPage } from '../detail';
import { BackandItemService, BackandItem } from '../../../providers';

export class ItemBase implements DoCheck, OnInit {
  public dbTable: string;
  public delete: boolean;
  public itemType: string;
  public items: Array<BackandItem>;
  public none: boolean;
  public type: string;

  constructor(public backand: BackandItemService, public nav: NavController, public toast: ToastController) { }

  ngDoCheck() {
    if (this.items === undefined || this.items.length === 0) {
      this.none = true;
    } else {
      this.none = false;
    }
  }

  ngOnInit() {
    this.myItems();
  }

  deleteToast() {
    let del = this.toast.create({
      message: `The ${this.type} has been deleted.`,
      duration: 5000
    })

    del.present();
  }

  ebcDel(id: number) {
    this.backand.deleteItem(this.dbTable, id)
    .subscribe(
      () => {
        this.deleteToast();
        this.myItems();
      });
  }

  goTo(id: number) {
    let item = {
      index: id,
      table: this.dbTable
    };
    this.nav.push(DetailPage, item);
  }

  myItems() {
    let items = this.itemType;
    this.backand.getItems(items).subscribe(
      data => this.items = data);
  }
}