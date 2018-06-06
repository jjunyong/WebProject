import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule, MatInputModule, MatCardModule, MatSelectModule, MatStepperModule, MatDatepickerModule, MatSnackBarModule, MatCheckboxModule, MatNativeDateModule } from '@angular/material';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSortModule } from '@angular/material/sort';
import { MatAutocompleteModule } from '@angular/material/autocomplete';



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
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatSortModule,
    MatSelectModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatAutocompleteModule
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
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatSortModule,
    MatSelectModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatAutocompleteModule
  ],
  declarations: []
})
export class MaterialModule { }
