import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestore, FirestoreSettingsToken, AngularFirestoreModule } from '@angular/fire/firestore';
import { StorageBucket, AngularFireStorageModule } from '@angular/fire/storage';
import { NuevoResComponent } from './modal/nuevo-res/nuevo-res.component';
import { ModalEditRestautanteComponent } from './modal/modal-edit-restautante/modal-edit-restautante.component';
import { AddMenuModalComponent } from './modal/add-menu-modal/add-menu-modal.component';
import { EditMenuModalComponent } from './modal/edit-menu-modal/edit-menu-modal.component';
import { ModalEditRestaurantDuenoComponent } from './modal/modal-edit-restaurant-dueno/modal-edit-restaurant-dueno.component';
import { EditCoordenadasModalComponent } from './modal/edit-coordenadas-modal/edit-coordenadas-modal.component';
import { ModalDesayunoComponent } from './modal/modal-desayuno/modal-desayuno.component';
import { ModalEditarDesayunoComponent } from './modal/modal-editar-desayuno/modal-editar-desayuno.component';
import { ModalAlmuerzoComponent } from './modal/modal-almuerzo/modal-almuerzo.component';
import { ModalEditarAlmuerzoComponent } from './modal/modal-editar-almuerzo/modal-editar-almuerzo.component';
import { ModalMeriendaComponent } from './modal/modal-merienda/modal-merienda.component';
import { ModalEditarMeriendaComponent } from './modal/modal-editar-merienda/modal-editar-merienda.component';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ModalComponent } from './modal/modal/modal.component';

@NgModule({

  declarations: [
    AppComponent,
    AdminLayoutComponent,
    ModalComponent, 
    NuevoResComponent, 
    ModalEditRestautanteComponent,
    AddMenuModalComponent,
    EditMenuModalComponent,
    ModalEditRestaurantDuenoComponent,
    EditCoordenadasModalComponent,
    ModalDesayunoComponent,
    ModalEditarDesayunoComponent,
    ModalAlmuerzoComponent,
    ModalEditarAlmuerzoComponent,
    ModalMeriendaComponent,
    ModalEditarMeriendaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    HttpClientModule,
    AngularFireStorageModule,
    AngularFireAuthModule, // logica de seguridad 
    // AgmCoreModule.forRoot({
    //   apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    // })
  ],
  // Para trabajar con dialogos se crea entryComoonents
  entryComponents: [
    ModalComponent, 
    NuevoResComponent, 
    ModalEditRestautanteComponent,
    AddMenuModalComponent,
    EditMenuModalComponent,
    ModalEditRestaurantDuenoComponent,
    EditCoordenadasModalComponent,
    ModalDesayunoComponent,
    ModalEditarDesayunoComponent,
    ModalAlmuerzoComponent,
    ModalEditarAlmuerzoComponent,
    ModalMeriendaComponent,
    ModalEditarMeriendaComponent
  ],
  providers: [
    AngularFirestore,
  { provide: FirestoreSettingsToken, useValue: {} },
  { provide: StorageBucket, useValue: 'gs://muertosdehambre.appspot.com'} // Sirve par subir archivos a Firebase
],
  bootstrap: [AppComponent]
})
export class AppModule { }
