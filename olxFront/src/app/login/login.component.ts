import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../http-service.service';
import { FormGroup } from '@angular/forms/src/model';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userCrd: FormGroup;
  public alerts: Array<IAlert> = [];
  constructor(
    public httpservice: HttpServiceService,
    public frmbl: FormBuilder,
    public router: Router
  ) {
    this.userCrd = this.frmbl.group({
      username: [''],
      password: [],
    });
  }
  public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
  alertpush() {
    this.alerts.push({
      id: 1,
      type: 'danger',
      message: 'username or password incorrect',
    });
  }
  submit() {
    this.httpservice.login(this.userCrd.value)
      .subscribe((data: any) => {
        if (data) {
          if (data.IsSuccess) {
            this.router.navigate(['/home']);
          } else {
            this.alertpush();
          }
        }
        // console.log(data);
      });
    // console.log(this.userCrd.value);
  }
  ngOnInit() {
  }


}
export interface IAlert {
  id: number;
  type: string;
  message: string;
}
