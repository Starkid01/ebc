import {Page, Storage, SqlStorage} from 'ionic-angular';
import {Type} from 'angular2/core';
import {MoreMenu} from '../moremenu/moremenu';
import {PersonPage} from '../myperson/myperson';
import {EditPage} from '../editperson/editperson';

@Page({
  templateUrl: 'build/pages/profile/profile.html',
  directives: [MoreMenu]
})

export class Profile {
  personTab: Type = PersonPage;
  editTab: Type = EditPage;
  title: string;
  hide: boolean;

  constructor(){
    this.hide = true;
  }

  GetTitle(Type) {
    let tab = Type;

    if(tab == PersonPage){
      this.title = 'My Profile';
    }
    if(tab == EditPage){
      this.title = 'Edit Profile';
    }
  }

  More(){
    this.hide = !this.hide;
  }

  HideMore(){
    this.hide = true;
  }
}
