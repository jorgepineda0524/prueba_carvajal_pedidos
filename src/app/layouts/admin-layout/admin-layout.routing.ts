import { Routes } from '@angular/router';

import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'user',           component: UserComponent },
    { path: 'table',          component: TableComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'notifications',  component: NotificationsComponent }
];
