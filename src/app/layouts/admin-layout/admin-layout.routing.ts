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
import { ListaUsuariosComponent } from '../../usuarios/lista-usuarios/lista-usuarios.component';
import { VerficacionEmailComponent } from '../../pages/verficacion-email/verficacion-email.component';

export const AdminLayoutRoutes: Routes = [

    {
        path: 'dueño', canActivate:[RolGuardGuard],  data:{role:'dueño'},
        children: [ 
           { path: 'dashboard',                component: DashboardComponent},
           { path: 'perfil',                component: InfoPerfilComponent},
           { path: 'verificacionE',      component: VerficacionEmailComponent},

           { path: '**',           redirectTo: 'dashboard'}, 
        ]
},

{
    path: 'admin', canActivate:[RolGuardGuard], data:{role:'admin'},
    children: [ 
       { path: 'perfil',                   component: InfoPerfilComponent},
       { path: 'listaU',                   component: ListaUsuariosComponent},
       { path: '**',           redirectTo: 'perfil'}, 

    ]
},   

    { path: 'verificacionE',      component: VerficacionEmailComponent},
    // { path: 'user-profile',   component: UserProfileComponent },
    // { path: 'table-list',     component: TableListComponent },
    // { path: 'typography',     component: TypographyComponent },
    // { path: 'icons',          component: IconsComponent },
    // { path: 'maps',           component: MapsComponent },
    // { path: 'notifications',  component: NotificationsComponent },
    // { path: 'upgrade',        component: UpgradeComponent },
    // { path: 'login',        component: LoginComponent },
];
