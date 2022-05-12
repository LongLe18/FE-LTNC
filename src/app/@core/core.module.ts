import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_RIPPLE_GLOBAL_OPTIONS } from '@angular/material/core';
import { NbAuthJWTToken, NbAuthModule, NbPasswordAuthStrategy } from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';

import { throwIfAlreadyLoaded } from './module-import-guard';
import {
  AnalyticsService,
  LayoutService,
  PlayerService,
  SeoService,
  StateService,
} from './utils';
import { UserData } from './data/users';
import { CategoryData } from './data/category';
import { BrandData } from './data/brand';
import { ProductData } from './data/product';
import { WarrantlyData } from './data/warrantly';

import { UserService } from './mock/users.service';
import { CategoryService } from './mock/category.service';
import { BrandService } from './mock/brand.service';
import { ProductService } from './mock/product.service';
import { WarrantlyService } from './mock/warrantly.service';

import { TokenInterceptorService } from './mock/auth.service';
import { RippleService } from './utils/ripple.service';
import { MockDataModule } from './mock/mock-data.module';
import { environment } from '../../environments/environment';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './auth-guard.service';
import { NbSimpleRoleProvider } from './mock/role.service'
import { MAT_SELECT_SCROLL_STRATEGY } from '@angular/material/select';
import { scrollFactory } from './mock/scroll.service';
import { Overlay } from '@angular/cdk/overlay';

const socialLinks = [
  {
    url: 'https://github.com/akveo/nebular',
    target: '_blank',
    icon: 'github',
  },
  {
    url: 'https://www.facebook.com/akveo/',
    target: '_blank',
    icon: 'facebook',
  },
  {
    url: 'https://twitter.com/akveo_inc',
    target: '_blank',
    icon: 'twitter',
  },
];

const DATA_SERVICES = [
  { provide: UserData, useClass: UserService },
  // { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
  { provide: AuthGuard }, 
  { provide: NbRoleProvider, useClass: NbSimpleRoleProvider},
  { provide: MAT_RIPPLE_GLOBAL_OPTIONS, useExisting: RippleService },
  { provide: MAT_SELECT_SCROLL_STRATEGY, useFactory: scrollFactory, deps: [Overlay] },
  { provide: CategoryData, useClass: CategoryService },
  { provide: BrandData, useClass: BrandService },
  { provide: ProductData, useClass: ProductService },
  { provide: WarrantlyData, useClass: WarrantlyService },
];

export const NB_CORE_PROVIDERS = [
  ...MockDataModule.forRoot().providers,
  ...DATA_SERVICES,
  ...NbAuthModule.forRoot({

    strategies: [
      NbPasswordAuthStrategy.setup({
        name: 'email',
        token: {
          class: NbAuthJWTToken,
          key: 'token',
        },
        baseEndpoint: environment.BASE_URL,

        login: {
          endpoint: '/api/auth/signin',
          method: 'post',
          redirect: {
            success: '/auth/verify',
            failure: null,
          },
        },
        register: {
          endpoint: '/api/auth/signup',
          method: 'post',
          redirect: {
            success: '/auth/login',
            failure: '/auth/login',
          },
        },
        logout: {
          endpoint: '/api/auth/signout',
          method: 'post',
          redirect: {
            success: '/pages-user/main',
            failure: null,
          },
        },
        requestPass: {
          endpoint: '/password/forgotpassword',
          method: 'post',
        },
        resetPass: {
          endpoint: 'auth/resetPass',
          method: 'put'
        }
      }),
    ],
    forms: {
      login: {
        redirectDelay: 500,
        strategy: 'email',
        rememberMe: false,
        showMessages: {
          success: true,
          error: true,
        },
      },
      register: {
        redirectDelay: 500,
        strategy: 'email',
        showMessages: {
          success: true,
          error: true,
        },
        terms: true,
      },
      requestPassword: {
        redirectDelay: 500,
        strategy: 'email',
        showMessages: {
          success: true,
          error: true,
        },
        socialLinks: socialLinks
      },
      resetPassword: {
        redirectDelay: 500,
        strategy: 'email',
        showMessages: {
          success: true,
          error: true,
        },
        socialLinks: socialLinks
      },
      logout: {
        redirectDelay: 500,
        strategy: 'email',
      },
      validation: {
        password: {
          required: true,
          minLength: 1,
        },
        email: {
          required: true,
        },
        fullName: {
          required: true,
          minLength: 4,
          maxLength: 100,
        }
      },
    },
  }).providers,

  NbSecurityModule.forRoot({
    accessControl: {
      admin: {
        view: '*',
        create: '*',
        edit: '*',
        remove: '*',
      },
      user: {
        parent: 'guest',
        
      },
    },
  }).providers,

  AnalyticsService,
  LayoutService,
  PlayerService,
  SeoService,
  StateService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
