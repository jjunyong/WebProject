import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule, MatInputModule, MatCardModule } from '@angular/material';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatDividerModule,
    MatGridListModule,
    MatTableModule,
    MatMenuModule,
    MatInputModule,
    MatCardModule
  ],
  exports: [
    MatButtonModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatDividerModule,
    MatGridListModule,
    MatTableModule,
    MatMenuModule,
    MatInputModule,
    MatCardModule
  ],
  declarations: []
})
export class MaterialModule { }
