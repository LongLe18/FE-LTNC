import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'grid-outline',
    link: '/pages-admin/dashboard',
    home: true,
    data: {
      permission: 'view',
      resource: 'news'
    }
  },
  // {
  //   title: 'Giám sát mạng',
  //   icon: 'activity-outline',
  //   link: '/pages/trackNetwork',
  // },
  // {
  //   title: 'Cảnh báo thông minh',
  //   icon: 'eye-outline',
  //   children: [
  //     {
  //       title: 'Phát hiện theo luật',
  //       link: '/pages/tracking-network',
  //     },
  //     {
  //       title: 'Phát hiện theo AI',
  //       link: '/pages/ai',
  //     },
  //     {
  //       title: 'Cảnh báo C&C',
  //       link: '/pages/cnc-detection'
  //     },
  //   ]
  // },
  // {
  //   title: 'Card mạng',
  //   icon: 'compass-outline',
  //   link: '/pages/sensor',
  // },
  // {
  //   title: 'Các chính sách',
  //   icon: 'book-open-outline',
  //   children: [
  //     {
  //       title: 'Luật',
  //       link: '/pages/rule',
  //     },
  //     {
  //       title: 'Danh sách C&C',
  //       link: '/pages/blacklist'
  //     },
  //     {
  //       title: 'Sao lưu',
  //       link: '/pages/backup'
  //     }
  //   ]
  // },
  // {
  //   title: 'Thiết lập cảnh báo tự động',
  //   icon: 'email-outline',
  //   link: '/pages/setting/settingthreat',
  // },
  // {
  //   title: 'HỆ THỐNG',
  //   group: true,
  // },
  {
    title: 'Quản trị hệ thống',
    icon: 'settings-outline',
    children: [
      {
        title: 'Thành viên',
        link: '/pages/user/account',
      },
      {
        title: 'Thiết lập email',
        link: '/pages/settingrule',
      },
      {
        title: 'Thiết lập sao lưu',
        link: '/pages/setting-backup',
      },
      {
        title: 'Log',
        link: '/pages/log',
      },
    ],
  },
  {
    title: 'HỒ SƠ',
    group: true,
  },
  {
    title: 'Tùy chỉnh',
    icon: 'lock-outline',
    children: [
      {
        title: 'Hồ sơ',
        link: '/pages/profile/user',
      },
      {
        title: 'Đăng xuất',
        link: '/auth/logout',
      },
    ],
  },
];
