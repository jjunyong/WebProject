import { Component, OnInit } from '@angular/core';
//import { MatBadgeModule } from '@angular/material/badge';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'hammerjs';
import { AngularFireStorage } from 'angularfire2/storage';


@Component({
  selector: 'app-myteam',
  templateUrl: './myteam.component.html',
  styleUrls: ['./myteam.component.css']
})
export class MyteamComponent implements OnInit {

  element_data= ELEMENT_DATA;
  constructor() { }

  ngOnInit() {
  }

}
export interface Element {
  name: string;
  image : string;
  position: number;
  match_num: number;
  win: number;
  lose: number;

   PERSONS : Person[];
}
export interface Person{
  id: string;
  name: string;
  
}

const PERSONS : Person[]=[
  { id: '215', name: '팀원1'},
  { id: '213', name: '팀원2'},
  { id: '213', name: '팀원3'},
  { id: '213', name: '팀원4'},
  { id: '213', name: '팀원5'},
  { id: '213', name: '팀원6'}
];
const ELEMENT_DATA: Element[] = [
  { position: 1,image:'https://search.pstatic.net/common?type=o&size=78x59&quality=95&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fkeypage%2Fimage%2Fdss%2F146%2F84%2F59%2F06%2F146_2845906_team_image_url_1467618027703.jpg', name: 'FCL', match_num: 33, win: 30, lose: 3,PERSONS},
  { position: 2,image:'https://search.pstatic.net/common?type=o&size=78x59&quality=95&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fkeypage%2Fimage%2Fdss%2F146%2F30%2F33%2F09%2F146_100303309_team_image_url_1435204280058.jpg', name: 'H-Millan', match_num: 26, win: 20, lose: 6,PERSONS},
  
];
