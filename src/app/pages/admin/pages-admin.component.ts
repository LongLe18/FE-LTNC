import { Component, OnInit } from '@angular/core';
import { NbAccessChecker } from '@nebular/security';
import { NbMenuItem } from '@nebular/theme';

import { MENU_ITEMS } from './pages-admin-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages-admin.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})

export class PagesComponent {
  menu = MENU_ITEMS;
}
// export class PagesComponent implements OnInit {
//   menu = MENU_ITEMS;

//   constructor(private accessChecker: NbAccessChecker) {
    
//   }

//   ngOnInit() {
//     this.authMenuItems();
//   }

//   authMenuItems() {
//     this.menu.forEach(item => {
//       this.authMenuItem(item);
//     })
//   }

//   authMenuItem(menuItem: NbMenuItem) {
//     if (menuItem.data && menuItem.data['permission'] && menuItem.data['resource']) {
//       this.accessChecker.isGranted(menuItem.data['permission'], menuItem.data['resource']).subscribe(granted => {
//         menuItem.hidden = !granted;
//       });
//     } else {
//       menuItem.hidden = true;
//     }
    
//     if (!menuItem.hidden && menuItem.children != null) {
//       menuItem.children.forEach(item => { 
//         if (item.data && item.data['permission'] && item.data['resource']) { 
//           this.accessChecker.isGranted(item.data['permission'], item.data['resource']).subscribe(granted => {
//             item.hidden = !granted;
//           });
//         } else {
//           item.hidden = menuItem.hidden;
//         }
//       })
//     }
//   }
// }
