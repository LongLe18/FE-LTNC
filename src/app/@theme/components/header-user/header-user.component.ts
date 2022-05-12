import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';
import { SelectedProductService } from '../../../selected-product.service';

import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { RippleService } from '../../../@core/utils/ripple.service';
import { UserData } from '../../../@core/data/users';
import { CategoryData } from '../../../@core/data/category';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-header-user',
  styleUrls: ['./header-user.component.scss'],
  templateUrl: './header-user.component.html',
})
export class HeaderUserComponent implements OnInit, OnDestroy {
  
  private destroy$: Subject<void> = new Subject<void>();
  public readonly materialTheme$: Observable<boolean>;
  userPictureOnly: boolean = false;
  user: any;
  isLogined: boolean = false;

  themes = [
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
    {
      value: 'material-light',
      name: 'Material Light',
    },
    {
      value: 'material-dark',
      name: 'Material Dark',
    },
  ];

  currentTheme = 'defalt';

  userMenu = [ { title: 'Hồ sơ', icon: 'people-outline', tag: 'profile' }, { title: 'Đăng xuất', icon: 'log-out-outline', tag: 'logout' } ];
  
  public constructor(
    private sidebarService: NbSidebarService,
    private themeService: NbThemeService,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private rippleService: RippleService,
    private serviceUser: UserData,
    private serviceCategory: CategoryData,
    private router: Router,
    private itemServ: SelectedProductService,
  ) {
    this.materialTheme$ = this.themeService.onThemeChange()
      .pipe(map(theme => {
        const themeName: string = theme?.name || '';
        return themeName.startsWith('material');
      }));
  }

  imageToShow: any;
  isImageLoading = true;

  subCategory;

  createImageFromBlob(image: Blob) { // Hàm convert blob thành img 
    let reader = new FileReader();
    reader.addEventListener("load", () => {
        this.imageToShow = reader.result;
    }, false);

    if (image) {
        reader.readAsDataURL(image);
    }
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;

    if (localStorage.getItem('auth_app_token') != null) {
      this.serviceUser.getUser().subscribe(res => {
        this.isLogined = true;
        this.user = res;
      });
    }

    ////////// get Parent Category
    this.serviceCategory.getListParentCategory().subscribe(res => {
      if (res.status == "SUCCESS") {
        this.serviceCategory.getListSubCategory(res['data'][0]['id_Category']).subscribe(response => {
          this.subCategory = response['data'];
        })
      }
    })

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => {
        this.currentTheme = themeName;
        this.rippleService.toggle(themeName?.startsWith('material'));
      });
  }

  get count(){
    return this.itemServ.items.length
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.router.navigate(["/page-user/main"]);
    return false;
  }
}
