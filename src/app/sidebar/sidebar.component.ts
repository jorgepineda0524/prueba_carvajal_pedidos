import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/pedidos',         title: 'Pedidos',       icon:'nc-diamond',    class: '' },
    { path: '/user',          title: 'Usuarios',       icon:'nc-single-02',  class: '' },
    { path: '/producto',      title: 'Productos',      icon:'nc-box',  class: '' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
