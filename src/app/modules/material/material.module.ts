import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


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
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';

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
        MatAutocompleteModule,
        MatDialogModule
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
        MatAutocompleteModule,
        MatDialogModule
    ],
    declarations: []
})
export class MaterialModule { }
