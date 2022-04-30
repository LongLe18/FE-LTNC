import { Component } from '@angular/core';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages-user.component.scss'],
  template: `
    <ngx-two-columns-layout>
      <router-outlet></router-outlet>
    </ngx-two-columns-layout>
  `,
})

export class PagesUserComponent {
  
}

