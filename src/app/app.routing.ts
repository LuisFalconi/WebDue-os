import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { GuardsGuard } from './guards.guard';
import { ListaClientesComponent } from './pages/cliente/lista-clientes/lista-clientes.component';
import { ListaRestaurantesComponent } from './restaurantes/lista-restaurantes/lista-restaurantes.component';
import { LoginGuardService } from './_service/login-guard.service';
import { ListaUsuariosComponent } from './usuarios/lista-usuarios/lista-usuarios.component';
import { VerificacionRestaurantesComponent } from './usuarios/verificacion-restaurantes/verificacion-restaurantes.component';
import { VerficacionEmailComponent } from './pages/verficacion-email/verficacion-email.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { MenusComponent } from './pages/menus/menus.component';
import { PromocionesComponent } from './pages/promociones/promociones.component';
import { ListaPromocionesComponent } from './pages/promociones/lista-promociones/lista-promociones.component';
import { PromocionesInicioComponent } from './pages/promociones/promociones-inicio/promociones-inicio.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { InfoPerfilComponent } from './pages/info-perfil/info-perfil.component';
import { MiMenuComponent } from './pages/mi-menu/mi-menu.component';
import { Not403Component } from './pages/not403/not403.component';
import { EditarPerfilComponent } from './pages/editar-perfil/editar-perfil.component';
import { CrearUsuarioComponent } from './login/crear-usuario/crear-usuario.component';
import { AgregarPerfilComponent } from './pages/editar-perfil/agregar-perfil/agregar-perfil.component';
import { NologinGuard } from './_service/noLogin-guard.service';

const routes: Routes =[

  {
    path: '',
    component: LoginComponent, canActivate: [NologinGuard]
  },
  {
    path: 'login',
    component: LoginComponent, canActivate: [NologinGuard]
  },
  {
    path: '',
    component: AdminLayoutComponent, canActivate:[GuardsGuard],
    children: [{
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    }]},
    {path: 'clientesHome', component: ListaClientesComponent},
    {path: 'listaR', component: ListaRestaurantesComponent, canActivate: [LoginGuardService]},
    {path: 'listaU', component: ListaUsuariosComponent, canActivate: [LoginGuardService]},
    {path: 'verificacionR', component: VerificacionRestaurantesComponent, canActivate: [LoginGuardService]},
    {path: 'verificacionE', component: VerficacionEmailComponent},
    {path: 'cliente/:id', component: ListaClientesComponent},
    {path: 'cliente', component: ClienteComponent},
    {path: 'menus', component: MenusComponent},
    {path: 'promociones', component: PromocionesComponent},
    {path: 'listaPromociones', component: ListaPromocionesComponent, canActivate: [LoginGuardService]},
    {path: 'promocionesInicio', component: PromocionesInicioComponent},
    {path: 'menuInicio', component: MenusComponent},
    {path: 'perfil', component: PerfilComponent, canActivate: [LoginGuardService]},
    {path: 'infoPerfil', component: InfoPerfilComponent, canActivate: [LoginGuardService]},
    {path: 'miMenu', component: MiMenuComponent, canActivate: [LoginGuardService]},
    // {path: 'crearRestaurante', component: CrearRestauranteComponent, canActivate: [LoginGuardService]},
    {path: 'not-403', component: Not403Component},
    {path: 'editar', component: EditarPerfilComponent, children: [
      {path: 'nuevo', component: AgregarPerfilComponent},
      {path: 'edicion/:id', component: AgregarPerfilComponent},
      ],canActivate: [LoginGuardService] 
    },
    {path: 'crearUsuario', component: CrearUsuarioComponent, canActivate: [NologinGuard]},
  {path:"**", pathMatch:"full", redirectTo:""},

];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
