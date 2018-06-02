import { Component, OnInit, ViewChild } from '@angular/core';
import { RankService } from '../../services/rank.service';
import { MatTableDataSource, MatSort } from '@angular/material';


@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.css']
})
export class RankComponent implements OnInit {
  displayedColumns = [/*'position',*/ 'name', 'match_num', 'win', 'lose'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatSort) sort: MatSort;

  constructor(public rank: RankService) {
    this.rank.getTeams()
      .subscribe(teams => {

        this.dataSource = new MatTableDataSource(teams);
        // this.dataSource.data.push(teams);
        console.log(this.dataSource);
        this.dataSource.sort = this.sort;


      });
  }

  /**
 * Set the sort after the view init since this component will
 * be able to query its view for the initialized sort.
 */
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {

  }

}

export interface Element {
  name: string;
  position: number;
  match_num: number;
  win: number;
  lose: number;
}

const ELEMENT_DATA: Element[] = [
  { position: 1, name: 'FCL', match_num: 33, win: 30, lose: 3 },
  { position: 2, name: 'H-Millan', match_num: 26, win: 20, lose: 6 },
  { position: 3, name: '여기가 네 안방', match_num: 31, win: 20, lose: 11 },
  { position: 4, name: '프랑슛', match_num: 22, win: 14, lose: 8 },
  { position: 5, name: '13동호회', match_num: 22, win: 13, lose: 9 },
  { position: 6, name: '14동호회', match_num: 13, win: 8, lose: 5 },
  { position: 7, name: '15동호회', match_num: 14, win: 7, lose: 7 },
  { position: 8, name: '16동호회', match_num: 15, win: 6, lose: 9 },
  { position: 9, name: '17동호회', match_num: 18, win: 8, lose: 10 },
  { position: 10, name: '18동호회', match_num: 20, win: 9, lose: 11 },
  { position: 11, name: 'Team윤석', match_num: 22, win: 7, lose: 15 },
  { position: 12, name: '호준바바팀', match_num: 24, win: 6, lose: 18 },
  { position: 13, name: 'SFC', match_num: 26, win: 5, lose: 21 },
  { position: 14, name: 'IVF', match_num: 28, win: 4, lose: 24 }
];
