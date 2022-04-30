/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { NbMenuService } from '@nebular/theme';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private analytics: AnalyticsService, private seoService: SeoService, private menuService: NbMenuService,
              private router: Router) {  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();
    // Click nbContextMenu trong header component
    this.menuService.onItemClick()
      .subscribe((event) => {
        this.onContecxtItemSelection(event.item);
      });
  }

  onContecxtItemSelection(item) {
    if (item.tag == 'logout') { // Logout
      this.router.navigate(["/auth/logout"]);
    }
  }

}
