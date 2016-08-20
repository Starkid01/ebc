import { Validators, REACTIVE_FORM_DIRECTIVES, FormControl, FormGroup } from '@angular/forms';
import { Component, DoCheck } from '@angular/core';
import { ToastController } from 'ionic-angular';

import { BackandService, FormHandler, UserService, PictureService } from '../../../services';
import { NavComponent } from '../../shared/nav';
import { MyLoader } from '../../shared/myloader';

@Component({
  templateUrl: 'build/pages/profile/editperson/editperson.page.html',
  directives: [MyLoader, NavComponent, REACTIVE_FORM_DIRECTIVES],
  providers: [PictureService]
})

export class EditPage implements DoCheck {
  section: string = 'user';
  signed: Object;
  upFile: boolean = false;
  passwordForm: FormGroup;
  oldPass: FormControl = new FormControl('', Validators.required);
  verify: FormGroup;
  password: FormControl = new FormControl('', Validators.required);
  confirm: FormControl = new FormControl('', Validators.required);
  editForm: FormGroup;
  firstName: FormControl = new FormControl('');
  lastName: FormControl = new FormControl('');

  constructor(public toast: ToastController, public backand: BackandService, public form: FormHandler, public user: UserService, public pic: PictureService) {
    this.editForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName
    });
    this.verify = new FormGroup({
      password: this.password,
      confirm: this.confirm
    }, {}, form.areEqual);
    this.passwordForm = new FormGroup({
      oldPass: this.oldPass,
      verify: this.verify
    });
  }

  ngDoCheck() {
    if (this.pic.newPic) {
      this.user.myUser['pic'] = this.pic['picFile'];
      this.upFile = true;
    }
  }

  editInfo(info) {
    let input = info.value;
    for (let i in input) {
      if (input[i] === '') {
        delete input[i];
        this.saveUpdate(input, info);
      }
    }
  }

  editPass(pass) {
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
        this.form.clearForm(pass.controls.verify);
        this.form.clearField(pass.controls.oldPass);
      },
      () => {
        this.profileUpdated('Password');
        this.form.clearForm(pass.controls.verify);
        this.form.clearField(pass.controls.oldPass);
      });
  }

  profileUpdated(action: string) {
    let editSuccess = this.toast.create({
      message: `Your ${action} has been updated`,
      duration: 5000
    })

    editSuccess.present();
  }

  savePic() {
    this.pic.getSigned('usersPic', this.user.myUser)
      .subscribe(
      data => {
        this.signed = JSON.parse(data['_body']);
      },
      err => {
        console.log(err);
      },
      () => {
        this.pic.upload(this.signed, this.success);
      });
  }

  saveUpdate(value, form?) {
    let name = 'users';
    let id = this.user.myUser['id'];
    this.backand.updateItem(name, id, value).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
        if (form) {
          this.form.clearForm(form);
        }
      },
      () => {
        console.log('Info has Changed');
        this.user.getUser();
        if (form) {
          this.form.clearForm(form);
          this.profileUpdated('Profile');
        }
      });
  }

  success = (result: any) => {
    let finish = JSON.parse(result.response);
    let image = {
      pic: finish['url']
    };
    this.saveUpdate(image);
    this.pic.picSaved();
    this.upFile = false;
  }
}