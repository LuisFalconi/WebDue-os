import { LoginComponent } from './../../login/login.component';
import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { RolGuardGuard } from '../../guards/rol-guard.guard';
import { InfoPerfilComponent } from '../../pages/info-perfil/info-perfil.component';
import { VerficacionEmailComponent } from '../../pages/verficacion-email/verficacion-email.component';
import { MenusComponent } from '../../pages/menus/menus.component';
import { PromocionesComponent } from '../../pages/promociones/promociones.component';
import { ListaPromocionesComponent } from '../../pages/promociones/lista-promociones/lista-promociones.component';
import { MiMenuComponent } from '../../pages/mi-menu/mi-menu.component';
import { Not403Component } from '../../pages/not403/not403.component';
import { PerfilComponent } from '../../pages/perfil/perfil.component';
import { ListaRestaurantesComponent } from '../../restaurantes/lista-restaurantes/lista-restaurantes.component';
import { VerificacionRestaurantesComponent } from '../../usuarios/verificacion-restaurantes/verificacion-restaurantes.component';
import { AfiliadosComponent } from '../../usuarios/afiliados/afiliados.component';
import { NoAfiliadosComponent } from '../../usuarios/no-afiliados/no-afiliados.component';
import { ListaUsuariosComponent } from '../../usuarios/lista-usuarios/lista-usuarios.component';
import { ValidacionDocumentoComponent } from '../../pages/validacion-documento/validacion-documento.component';
import { MapaComponent } from '../../pages/mapa/mapa.component';

export const AdminLayoutRoutes: Routes = [

    {
        path: 'dueño',canActivate:[RolGuardGuard], data:{role:'dueño'},
        children: [ 
         //  { path: 'dashboard',                component: DashboardComponent},
            {path: 'restaurante', component: PerfilComponent},
            {path: 'miMenu', component: MiMenuComponent},
            {path: 'promociones', component: PromocionesComponent},
            {path: 'listaPromociones', component: ListaPromocionesComponent},
            {path: 'afiliados', component: AfiliadosComponent},
            {path: 'noAfiliados', component: NoAfiliadosComponent},
            { path: 'verificacionE',      component: VerficacionEmailComponent},
            { path: 'mapa',      component: MapaComponent},
            {path: 'not-403', component: Not403Component},
            { path: 'perfil', component: InfoPerfilComponent},
            { path: '**',           redirectTo: 'perfil'}, 
        ]
},
// canActivate:[RolGuardGuard]
{
    path: 'admin', canActivate:[RolGuardGuard], data:{role:'admin'},
    children: [ 
       { path: 'perfil',                    component: InfoPerfilComponent},
       { path: 'listaU',                    component: ListaUsuariosComponent},
       {path: 'listaR',                     component: ListaRestaurantesComponent},
    //    {path: 'verificacionR',              component: VerificacionRestaurantesComponent},
       {path: 'verificacionDoc',              component: ValidacionDocumentoComponent},
       { path: 'verificacionE',      component: VerficacionEmailComponent},
       { path: '**',           redirectTo: 'perfil'}, 

    ]
},   

    // { path: 'user-profile',   component: UserProfileComponent },
    // { path: 'table-list',     component: TableListComponent },
    // { path: 'typography',     component: TypographyComponent },
    // { path: 'icons',          component: IconsComponent },
    // { path: 'maps',           component: MapsComponent },
    // { path: 'notifications',  component: NotificationsComponent },
    // { path: 'upgrade',        component: UpgradeComponent },
    // { path: 'login',        component: LoginComponent },
];
