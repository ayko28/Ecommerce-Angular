import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../Core/Services/authentication.service';
import { AdminLayoutComponent } from '../layouts/admin-layout/admin-layout.component';


export interface RouteInfo {
    path: string;
    title: string;forRole:string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
   /*  { path: '/dashboard',     title: 'Dashboard',  forRole:'Customer',       icon:'nc-bank',       class: '' },*/
    { path: '/',     title: 'Products',  forRole:'Customer',       icon:'nc-box',       class: '' },
    { path: '/cartDB',     title: 'cart',  forRole:'Customer',       icon:'nc-cart-simple',       class: '' },

    { path: '/orders',     title: 'orders',  forRole:'Customer',       icon:'nc-delivery-fast',       class: '' },

   /* { path: '/icons',         title: 'Icons',             forRole:'Customer',       icon:'nc-diamond',    class: '' }, */
    /*{ path: '/maps',          title: 'Maps',              forRole:'Customer',       icon:'nc-pin-3',      class: '' },*/
    /*{ path: '/notifications', title: 'Notifications',     forRole:'Customer',       icon:'nc-bell-55',    class: '' },*/
    /* { path: '/user',          title: 'User Profile',      icon:'nc-single-02',  class: '' },
     { path: '/table',         title: 'Table List',        icon:'nc-tile-56',    class: '' },
    { path: '/typography',    title: 'Typography',        icon:'nc-caps-small', class: '' }, */
    { path: '/seller/manage_product',    title: 'product',        forRole:'Seller',       icon:'nc-box', class: '' },
    { path: '/seller/manage_orders',    title: 'orders',        forRole:'Seller',       icon:'nc-cart-simple', class: '' },
  /*   { path: '/seller/manage_promotions',    title: 'Promotions',        forRole:'Seller',       icon:'nc-badge', class: '' }, */
    /* { path: '/seller/paycommission',    title: 'CommissionP',        forRole:'Seller',       icon:'nc-money-coins', class: '' },  */
    { path: '/seller/dboy',    title: 'DBoys',        forRole:'Seller',       icon:'nc-user-run', class: '' }, 
    { path: '/seller/users',    title: 'users',        forRole:'Seller',       icon:'nc-single-02', class: '' }, 
    //{path:'admin',component:AdminLayoutComponent}     
    { path: '/admin/users',    title: 'Users',        forRole:'Admin',       icon:'nc-single-02', class: '' }, 
    { path: '/admin/commission',    title: 'Commission',        forRole:'Admin',       icon:'nc-money-coins', class: '' }, 
    { path: '/admin/errors',    title: 'Errors',        forRole:'Admin',       icon:'nc-simple-remove', class: '' }, 
    { path: '/admin/errors',    title: 'Parameters',        forRole:'Admin',       icon:'nc-settings', class: '' }, 
    { path: '/seller/manage_product',    title: 'Behalf Ps',        forRole:'Admin',       icon:'nc-user-run', class: '' },
    { path: '/upgrade',       title: 'Upgrade to PRO',    forRole:'',       icon:'nc-spaceship',  class: 'active-pro' },
];

@Component({
   // moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems!: any[];
    currentUser:any;
    constructor(public servAuth:AuthenticationService){
        this.servAuth.currentUser.subscribe(x => this.currentUser = x);
        
    }
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
