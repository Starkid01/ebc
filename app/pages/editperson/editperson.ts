import {FORM_DIRECTIVES, Validators, ControlGroup, Control} from 'angular2/common';
import {ViewChild, DoCheck} from 'angular2/core';
import {Page, Toast, NavController} from 'ionic-angular';
import {MoreMenu} from '../moremenu/moremenu';
import {Backand} from '../../components/backand/backand';
import {Services} from '../../components/services/services';
import {MyLoader} from '../../components/myloader/myloader';

@Page({
  templateUrl: 'build/pages/editperson/editperson.html',
  directives: [FORM_DIRECTIVES, MoreMenu, MyLoader]
})

export class EditPage implements DoCheck {
  @ViewChild(MoreMenu) more:MoreMenu;
  section:string = 'user';
  signed:Object;
  upFile:boolean = false;
  passwordForm:ControlGroup;
  oldPass:Control = new Control('', Validators.required);
  verify:ControlGroup;
  password:Control = new Control('', Validators.required);
  confirm:Control = new Control('', Validators.required);
  editForm:ControlGroup;
  firstName:Control = new Control('');
  lastName:Control = new Control('');

  constructor(public nav:NavController, public backand:Backand, public services:Services) {
    this.editForm = new ControlGroup({
      firstName: this.firstName,
      lastName:  this.lastName
    });

    this.verify = new ControlGroup({
      password: this.password,
      confirm: this.confirm
    }, {}, services.areEqual);

    this.passwordForm = new ControlGroup({
      oldPass: this.oldPass,
      verify: this.verify
    });
  }

  ngDoCheck() {
    if(this.services.newPic) {
      this.services.myUser['pic'] = this.services['picFile'];
      this.services.newPic = false;
      this.upFile = true;
    }
  }

  editPass(pass){
    let newPass = {
      oldPassword: pass.value.oldPass,
      newPassword: pass.value.verify.password
    };

    this.backand.updatePass(newPass).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
        this.services.clearForm(pass.controls.verify);
        this.services.clearField(pass.controls.oldPass);
      },
      () => {
        console.log('Password Changed');
        this.services.clearForm(pass.controls.verify);
        this.services.clearField(pass.controls.oldPass);
      });
  }

  savePic() {
    this.services.getSigned('usersPic')
      .subscribe(
        data => {
          this.signed = JSON.parse(data['_body']);
        },
        err => {
          console.log(err);
        },
        () => {
          console.log(this.signed);
          this.services.upload(this.signed, this.success);
    });
  }

  success = (result:any) => {
    let finish = JSON.parse(result.response);
    console.log(finish);
    let image = {
      pic: finish['url']
    };
    console.log(image);
    this.saveUpdate(image);
    this.picSaved();
  }

  picSaved() {
    let myImg = Toast.create({
        message: 'Your Profile Pic has been Saved',
        duration: 2000
    });
    myImg.onDismiss(() => {
      this.services.myLoader = false;
      this.upFile = false;
    });
    this.nav.present(myImg);
  }

  saveUpdate(value, form?) {
    let name = 'users';
    let id = this.services.myUser['id'];
    this.backand.updateItem(name, id, value).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
        if(form){
          this.services.clearForm(form);
        }
      },
      () => {
        console.log('Info has Changed');
        this.services.getUser();
        if(form){
          this.services.clearForm(form);
        }
      });
  }

  editInfo(info) {
    let input = info.value;
    for(let i in input){
      if(input[i] === ''){
        delete input[i];
        this.saveUpdate(input, info);
      }
    }
  }
}
