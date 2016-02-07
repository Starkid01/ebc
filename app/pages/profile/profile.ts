import {Page} from 'ionic-framework/ionic';
import {Type} from 'angular2/core';
import {PersonPage} from '../myperson/myperson';
import {EditPage} from '../editperson/editperson';

@Page({
  templateUrl: 'build/pages/profile/profile.html'
})

export class Profile {
  cardTab: Type = PersonPage;
  flyerTab: Type = EditPage;

  constructor(){

  }
}
