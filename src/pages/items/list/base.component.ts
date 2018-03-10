import { DoCheck, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController, ToastController } from 'ionic-angular';

import { BackandItemService, BackandItem } from '../../../providers';

export class ItemBase implements DoCheck, OnInit {
  public dbTable: string;
  public delete: boolean;
  public itemType: string;
  public items: Array<BackandItem>;
  public none: boolean;
  public type: string;
  private checkImg: RegExp = new RegExp('http*', 'i');

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
    console.log(this.checkImg);
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
      position: 'top',
      duration: 5000
    })

    del.present();
  }

  ebcDel(id: number) {
    this.backand.deleteItem(this.dbTable, id)
     .subscribe(() => { 
       this.deleteToast();
       this.myItems();
    });
  }

  goTo(ebc: BackandItem) {
    this.nav.push('detail', ebc);
  }


  myItems() {
    this.backand.getList(this.dbTable, this.type)
      .subscribe((list: BackandItem[]) => this.items = list,
        err => console.log(err));
  }

  share(ebc: BackandItem) {
    let shareMod = this.modal.create('share', ebc);

    shareMod.present();
  }
}