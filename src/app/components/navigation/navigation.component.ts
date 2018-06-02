import { Component, OnInit, EventEmitter, Output  } from '@angular/core';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

}
