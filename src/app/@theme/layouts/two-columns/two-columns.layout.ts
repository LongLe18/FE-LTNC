import { Component } from '@angular/core';

@Component({
  selector: 'ngx-two-columns-layout',
  styleUrls: ['./two-columns.layout.scss'],
  template: `
  <nb-layout windowMode>
    <nb-layout-header fixed>
      <ngx-header-user></ngx-header-user>
    </nb-layout-header>

    <nb-layout-column>
      <ng-content select="router-outlet"></ng-content>
    </nb-layout-column>

    <nb-layout-footer fixed>
      <ngx-footeruser style="width: 100%"></ngx-footeruser>
    </nb-layout-footer>
  </nb-layout>
`,
})
export class TwoColumnsLayoutComponent {}
