import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NoticeService, Notice } from '../../services/notice.service';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.css']
})
export class NoticeComponent implements OnInit {
  notice: any;
  notices: any[];
  displayedColumns = ['title', 'timestamp'];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    public nos: NoticeService
  ) { }

  ngOnInit() {
    this.getNotice();
    this.nos.getNotices()
      .subscribe(notices => {
        this.notices = notices;
        console.log(notices);
      });

  }

  getNotice(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);

    if (id != null) {
      this.nos.getNotice(id)
        .subscribe(notice => this.notice = notice);
    }

  }

  goTo(nav: string) {
    this.location.go(nav);

  }

}
