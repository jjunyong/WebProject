import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

import { Observable } from 'rxjs/Observable';
import { Timestamp } from '@firebase/firestore-types';
import { NoticeService } from '../../services/notice.service';

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
  displayedColumns = ['title', 'timestamp'];

  constructor(public auth: AuthService,
    public nos: NoticeService) {
  }

  ngOnInit() {
    this.nos.getNotices()
      .subscribe(notices => this.notices = notices);
  }

}
