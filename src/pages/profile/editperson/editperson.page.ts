import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Component, DoCheck } from '@angular/core';
import { ToastController } from 'ionic-angular';

import { BackandAuthService, BackandItemService, FormHandler, UserService, PictureService } from '../../../providers';

@Component({
  selector: 'page-edit',
  templateUrl: 'editperson.page.html'
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

  constructor(public auth: BackandAuthService,
    public backand: BackandItemService,
    public form: FormHandler,
    public user: UserService,
    public pic: PictureService,
    public toast: ToastController) {
    this.editForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName
    });
    this.verify = new FormGroup({
      password: this.password,
      confirm: this.confirm
    }, form.areEqual);
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
      old: pass.value.oldPass,
      new: pass.value.verify.password
    };

    this.auth.changePassword(newPass.old, newPass.new).subscribe(
      data => {
        this.form.clearForm(pass.controls.verify);
        this.form.clearField(pass.controls.oldPass);
        this.profileUpdated('Password');
      },
      err => {
        this.errorToast(err._body);
      });
  }

  errorToast(message) {
    let errMess =  this.toast.create({
      message: message,
      duration: 5000
    });

    errMess.present();
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