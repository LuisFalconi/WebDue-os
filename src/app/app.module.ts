import { CrearMenuComponent } from './pages/crear-menu/crear-menu.component';
import { LoginComponent } from './login/login.component';
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
import { PlatoComponent } from './pages/plato/plato.component';
import { PlatoEdicionComponent } from './pages/plato/plato-edicion/plato-edicion.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { Not403Component } from './pages/not403/not403.component';
import { CrearUsuarioComponent } from './login/crear-usuario/crear-usuario.component';
import { EditarPerfilComponent } from './pages/editar-perfil/editar-perfil.component';
import { AgregarPerfilComponent } from './pages/editar-perfil/agregar-perfil/agregar-perfil.component';
import { MiMenuComponent } from './pages/mi-menu/mi-menu.component';
import { CrearRestauranteComponent } from './pages/crear-restaurante/crear-restaurante.component';
import { MenusComponent } from './pages/menus/menus.component';
import { ListaRestaurantesComponent } from './restaurantes/lista-restaurantes/lista-restaurantes.component';
import { ListaClientesComponent } from './pages/cliente/lista-clientes/lista-clientes.component';
import { NuevoRestauranteComponent } from './restaurantes/nuevo-restaurante/nuevo-restaurante.component';
import { EditRestauranteComponent } from './restaurantes/edit-restaurante/edit-restaurante.component';
import { PromocionesComponent } from './pages/promociones/promociones.component';
import { EditMenusComponent } from './restaurantes/edit-menus/edit-menus.component';
import { ListaPromocionesComponent } from './pages/promociones/lista-promociones/lista-promociones.component';
import { ValidacionComponent } from './pages/validacion/validacion.component';
import { VerificacionRestaurantesComponent } from './usuarios/verificacion-restaurantes/verificacion-restaurantes.component';
import { EditRestauranteDuenoComponent } from './restaurantes/edit-restaurante-dueno/edit-restaurante-dueno.component';
import { InfoPerfilComponent } from './pages/info-perfil/info-perfil.component';
import { EditCoordenadasRestaurantComponent } from './restaurantes/edit-coordenadas-restaurant/edit-coordenadas-restaurant.component';
import { PromocionesInicioComponent } from './pages/promociones/promociones-inicio/promociones-inicio.component';
import { VerficacionEmailComponent } from './pages/verficacion-email/verficacion-email.component';
import { CrearDesayunoComponent } from './pages/platos/crear-desayuno/crear-desayuno.component';
import { EditarDesayunoComponent } from './pages/platos/editar-desayuno/editar-desayuno.component';
import { EditDesayunoComponent } from './restaurantes/edit-desayuno/edit-desayuno.component';
import { CrearAlmuerzoComponent } from './pages/platos/crear-almuerzo/crear-almuerzo.component';
import { EditarAlmuerzoComponent } from './pages/platos/editar-almuerzo/editar-almuerzo.component';
import { EditAlmuerzoComponent } from './restaurantes/edit-almuerzo/edit-almuerzo.component';
import { EditarMeriendaComponent } from './pages/platos/editar-merienda/editar-merienda.component';
import { CrearMeriendaComponent } from './pages/platos/crear-merienda/crear-merienda.component';
import { EditMeriendaComponent } from './restaurantes/edit-merienda/edit-merienda.component';
import { MaterialModule } from './material/material.module';
import { AfiliadosComponent } from './usuarios/afiliados/afiliados.component';
import { NoAfiliadosComponent } from './usuarios/no-afiliados/no-afiliados.component';
import { EditarPerfilUserComponent } from './usuarios/editar-perfil-user/editar-perfil-user.component';
import { ModalEditPerilUsuarioComponent } from './modal/modal-edit-peril-usuario/modal-edit-peril-usuario.component';
import { EditPerfilUserComponent } from './usuarios/edit-perfil-user/edit-perfil-user.component';
import { ListaUsuariosDeshabilitadosComponent } from './usuarios/lista-usuarios-deshabilitados/lista-usuarios-deshabilitados.component';
import { ListaUsuariosComponent } from './usuarios/lista-usuarios/lista-usuarios.component';
import { ValidacionDocumentoComponent } from './pages/validacion-documento/validacion-documento.component';
import { TemplateValidacionDocumentoComponent } from './pages/template-validacion-documento/template-validacion-documento.component';
import { EditEstadoDocumentoModalComponent } from './modal/edit-estado-documento-modal/edit-estado-documento-modal.component';
import { EditEstadoDocumentoComponent } from './restaurantes/edit-estado-documento/edit-estado-documento.component';

@NgModule({

  declarations: [
    AppComponent,
    AdminLayoutComponent,
    PlatoComponent,
    PlatoEdicionComponent,
    ClienteComponent,
    PerfilComponent,
    LoginComponent,
    Not403Component,
    CrearUsuarioComponent,
    EditarPerfilComponent,
    AgregarPerfilComponent,
    MiMenuComponent,
    CrearMenuComponent,
    CrearRestauranteComponent,
    MenusComponent,
    ModalComponent,
    ListaRestaurantesComponent,
    ListaClientesComponent,
    NuevoRestauranteComponent,
    NuevoResComponent,
    EditRestauranteComponent,
    ModalEditRestautanteComponent,
    PromocionesComponent,
    AddMenuModalComponent,
    EditMenuModalComponent,
    EditMenusComponent,
    ListaPromocionesComponent,
    ListaUsuariosDeshabilitadosComponent,
    ListaUsuariosComponent,
    ValidacionComponent,
    VerificacionRestaurantesComponent,
    ModalEditRestaurantDuenoComponent,
    EditRestauranteDuenoComponent,
    InfoPerfilComponent,
    EditCoordenadasModalComponent,
    EditCoordenadasRestaurantComponent,
    PromocionesInicioComponent,
    VerficacionEmailComponent,
    ModalDesayunoComponent,
    CrearDesayunoComponent,
    EditarDesayunoComponent,
    ModalEditarDesayunoComponent,
    EditDesayunoComponent,
    CrearAlmuerzoComponent,
    EditarAlmuerzoComponent,
    ModalEditarAlmuerzoComponent,
    EditAlmuerzoComponent,
    ModalAlmuerzoComponent,
    EditarMeriendaComponent,
    CrearMeriendaComponent,
    ModalEditarMeriendaComponent,
    EditMeriendaComponent,
    ModalMeriendaComponent,
    AfiliadosComponent,
    NoAfiliadosComponent,
    EditarPerfilUserComponent,
    ModalEditPerilUsuarioComponent,
    EditPerfilUserComponent,
    ListaUsuariosDeshabilitadosComponent,
    ValidacionDocumentoComponent,
    TemplateValidacionDocumentoComponent,
    EditEstadoDocumentoModalComponent,
    EditEstadoDocumentoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
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
    ModalEditarMeriendaComponent,
    EditEstadoDocumentoModalComponent
  ],
  providers: [
    AngularFirestore,
  { provide: FirestoreSettingsToken, useValue: {} },
  { provide: StorageBucket, useValue: 'gs://muertosdehambre.appspot.com'} // Sirve par subir archivos a Firebase
],
  bootstrap: [AppComponent]
})
export class AppModule { }
