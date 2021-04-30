import { ProductoComponent } from './../../pages/producto/producto.component';
import { Routes } from '@angular/router';

import { UserComponent } from '../../pages/user/user.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { PedidoComponent } from 'app/pages/pedidos/pedido.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'user',           component: UserComponent },
    { path: 'producto',       component: ProductoComponent },
    { path: 'pedidos',        component: PedidoComponent },
    { path: 'notifications',  component: NotificationsComponent }
];
