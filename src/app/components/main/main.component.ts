import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

import { Observable } from 'rxjs/Observable';
import { Timestamp } from '@firebase/firestore-types';
import { NoticeService } from '../../services/notice.service';
import { RankService } from '../../services/rank.service';
import { MatchService } from '../../services/match.service';

interface Notice {
  title: string;
  content: string;
  timestamp: Timestamp;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit {
  notices: any[];
  ranks: any[];
  matches: any[];
  noticeDisplayedColumns = ['title', 'timestamp'];
  rankDisplayedColumns = ['name', 'win'];
  matchDisplayedColumns = ['name', 'date'];

  constructor(
    public auth: AuthService,
    public nos: NoticeService,
    public ras: RankService,
    public mas: MatchService
  ) {
  }

  ngOnInit() {
    this.nos.getNotices()
      .subscribe(notices => this.notices = notices.slice(0, 5));
    this.ras.getTeams()
      .subscribe(ranks => this.ranks = ranks.slice(0, 5));
    this.mas.getMatches()
      .subscribe((matches) => {
        this.matches = matches.slice(0, 5);
      });
  }


}
