import {FORM_DIRECTIVES, Validators, ControlGroup, Control} from 'angular2/common';
import {Page} from 'ionic-angular';
import {MoreMenu} from '../moremenu/moremenu';
import {Backand} from '../../components/backand/backand';
import {Services} from '../../components/services/services';

@Page({
  templateUrl: 'build/pages/editperson/editperson.html',
  providers: [Backand, Services],
  directives: [FORM_DIRECTIVES, MoreMenu]
})

export class EditPage {
  section:string = 'user';
  passwordForm:ControlGroup;
  oldPass:Control = new Control('', Validators.required);
  verify:ControlGroup;
  password:Control = new Control('', Validators.required);
  confirm:Control = new Control('', Validators.required);
  editForm:ControlGroup;
  firstName:Control = new Control('');
  lastName:Control = new Control('');

  constructor(public backand: Backand, public services: Services) {
    this.services.getAuth();
    this.services.getUser();
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

  editInfo(info){
    let name = 'users';
    let id = this.services.myUser['id'];
    let input = info.value;
    for(let i in input){
      if(input[i] === ''){
        delete input[i];
        this.backand.updateItem(name, id, input).subscribe(
          data => {
            console.log(data);
          },
          err => {
            console.log(err);
            this.services.clearForm(info);
          },
          () => {
            console.log('Info has Changed');
            this.services.clearForm(info);
            this.services.getUser();
          });
      }
    }
  }
}
