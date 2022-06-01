import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Thống kê doanh thu',
    icon: 'bar-chart-2-outline',
    link: '/pages-admin/dashboard',
    home: true,
  },
  {
    title: 'Quản lý tài khoản',
    icon: 'people-outline',
    link: '/pages-admin/account-manager',  
  },
  {
    title: 'Quản lý danh mục',
    icon: 'grid-outline',
    link: '/pages-admin/category',
  },
  {
    title: 'Quản lý sản phẩm',
    icon: 'eye-outline',
    link: '/pages-admin/product'
  },
  {
    title: 'Quản lý hóa đơn',
    icon: 'file-text-outline',
    link: '/pages-admin/invoice',
  },
  {
    title: 'Quản lý tồn kho',
    icon: 'book-open-outline',
    link: '/pages-admin/ware'
  },
  {
    title: 'Quản lý phiếu nhập',
    icon: 'email-outline',
    link: '/pages-admin/input',
  },
  // {
  //   title: 'Quản lý số seri',
  //   icon: 'browser-outline',
  //   link: '/pages-admin/seri'
  // },
  {
    title: 'Quản lý bảo hành',
    icon: 'clock-outline',
    link: '/pages-admin/insurrance'
  },
  // {
  //   title: 'Quản lý Shipper',
  //   icon: 'car-outline',
  //   link: '/pages-admin/shipper'
  // },
  {
    title: 'Quản lý mùa sự kiện',
    icon: 'shake-outline',
    link: '/pages-admin/event'
  },
];
