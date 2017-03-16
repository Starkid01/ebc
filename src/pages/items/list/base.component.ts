import { DoCheck, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController, ToastController } from 'ionic-angular';

import { DetailPage } from '../detail';
import { BackandItemService, BackandItem } from '../../../providers';
import { ShareModalComponent } from '../share-modal';

export class ItemBase implements DoCheck, OnInit {
  public dbTable: string;
  public delete: boolean;
  public itemType: string;
  public items: Array<BackandItem>;
  public none: boolean;
  public type: string;

  constructor(public alert: AlertController, public backand: BackandItemService,
    public modal: ModalController, public nav: NavController, public toast: ToastController) { }

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

  delAlert(id: number) {
    let confirm = this.alert.create({
      title: `Delete ${this.type}`,
      message: 'Are you sure?',
      buttons: [
        {
          text: 'No'
        },
        {
          text: 'Yes, Delete',
          handler: () => {
            this.ebcDel(id);
          }
        }
      ]
    });

    confirm.present();
  }

  deleteToast() {
    let del = this.toast.create({
      message: `The ${this.type} has been deleted.`,
      duration: 5000
    })

    del.present();
  }

  ebcDel(id: number) {
    this.backand.deleteItem(this.dbTable, id);
  }

  goTo(ebc: BackandItem) {
    this.nav.push(DetailPage, ebc);
  }


  myItems() {
    setTimeout(() => {
      let items = this.backand.getList(this.itemType);

      this.items = items[this.itemType];
    }, 1000);
  }

  share(ebc: BackandItem) {
    let shareMod = this.modal.create(ShareModalComponent, ebc);

    shareMod.present();
  }
}