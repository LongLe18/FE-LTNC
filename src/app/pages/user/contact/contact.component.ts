import {Component, OnDestroy, OnInit} from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';
import { faFacebook, faYoutube, faGoogle } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'ngx-contact',
  styleUrls: ['./contact.component.scss'],
  templateUrl: './contact.component.html',
})
export class ContactComponent implements OnDestroy, OnInit {

  private alive = true;

  faFacebook = faFacebook;
  faYoutube = faYoutube;
  faGoogle = faGoogle;
  
  constructor(private toastrService: NbToastrService, private router: Router, ) {
      
  }
  submit() {
    this.toastrService.show('Gửi liên lạc thành công\n Chúng tôi sẽ liên lạc bạn trong thời gian sớm nhất', 'Thành công', { status: 'success' })
    this.router.navigate(["/page-user/main"]);
  }
  ngOnInit() {
    
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
