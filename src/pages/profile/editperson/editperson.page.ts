import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Component, DoCheck } from '@angular/core';
import { Events, IonicPage, ToastController } from 'ionic-angular';
import { UserInfo } from 'firebase';

import { BackandUser } from '../../../providers/backand';
import { FormHandler, UserService, PictureService, UploadOpts } from '../../../providers/myservices';

@IonicPage({
  name: 'edit',
  segment: 'edit'
})
@Component({
  selector: 'page-edit',
  templateUrl: 'editperson.page.html'
})

export class EditPage implements DoCheck {
  section: string = 'user';
  upFile: boolean = false;
  userData: BackandUser;
  passwordForm: FormGroup;
  password: FormControl = new FormControl('', Validators.required);
  confirm: FormControl = new FormControl('', Validators.required);
  editForm: FormGroup;
  displayName: FormControl = new FormControl('');

  constructor(public events: Events, public form: FormHandler, public user: UserService,
    public pic: PictureService, public toast: ToastController) {
    this.editForm = new FormGroup({
      displayName: this.displayName
    });
    this.passwordForm = new FormGroup({
      password: this.password,
      confirm: this.confirm
    }, form.areEqual);
  }

  ngDoCheck() {
    if (this.pic.newPic) {
      this.userData.photoUrl = this.pic.picFile;
      this.upFile = true;
    }
  }

  ngOnInit() {
    this.ebcUser();
    this.watchUpdate();
  }

  editInfo(info) {
    let input = info.value;
    this.user.updateUser(input)
      .subscribe((user: UserInfo) => {
        this.userData.displayName = user.displayName
        this.user.setUser(user);
        this.profileUpdated('Username');
        this.editForm.reset()
      });
  }

  editPass(pass) {
    let newPass = {
      password: pass.value.password
    };
    this.user.updateUser(newPass)
      .subscribe(() => {
        this.profileUpdated('Password');
        this.passwordForm.reset();
      });
  }

  errorToast(message) {
    let errMess = this.toast.create({
      message: message,
      position: 'top',
      duration: 5000
    });

    errMess.present();
  }

  profileUpdated(action: string) {
    let editSuccess = this.toast.create({
      message: `Your ${action} has been updated`,
      position: 'top',
      duration: 5000
    });

    editSuccess.present();
  }

  savePic() {
    let picOpt: UploadOpts = {
      upload_preset: 'usersPic',
      tags: [this.userData.displayName]
    }
    this.pic.uploadImg(picOpt)
      .subscribe(
        data => {
          let image = {
            photoUrl: data['secure_url']
          };
          this.saveUpdate(image);
          this.upFile = false;
          this.pic.picSaved();
        },
        err => {
          this.pic.picSaved();
          console.log(err);
        });
  }

  saveUpdate(pic) {
    this.user.updateUser(pic)
      .subscribe(data => {
        this.profileUpdated('Profile');
        this.user.setUser(data);
      });
  }

  private ebcUser() {
    this.user.getUser()
      .then(user => this.userData = user);
  }

  private watchUpdate() {
    this.events.subscribe('myUser', user => {
      this.userData = user
    });
  }
}