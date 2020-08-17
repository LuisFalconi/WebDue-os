import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav'; 
import { MatDividerModule } from '@angular/material/divider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule  } from '@angular/material/chips';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatTabsModule,
    MatTableModule,
    MatFormFieldModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatDividerModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatProgressBarModule,
    MatListModule,
    MatSelectModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatChipsModule
    
  ],
  exports: [
    MatMenuModule,
    MatButtonModule,
    MatTabsModule,
    MatTableModule,
    MatFormFieldModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatDividerModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatProgressBarModule,
    MatListModule,
    MatSelectModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatChipsModule

    
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-ES'}]

})
export class MaterialModule { }
