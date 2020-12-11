import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  public login_form:FormGroup;
  public token:string;
  public error_msg_email:boolean = false;
  public error_msg_password:boolean = false;

  constructor(private fBuilder: FormBuilder, private router: Router, private authService:AuthService) { }

  ngOnInit(): void {
    let user_email = localStorage.getItem('email');
    this.login_form = this.fBuilder.group({
      email: [user_email, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      password_row: ['*****', [Validators.required, Validators.minLength(4)]]
    });
  }

  public handle_submit(){
    this.authService.login_user(this.login_form.value).subscribe(
      res=> {
        this.token = res.token;
        localStorage.setItem('token',this.token)
        this.router.navigateByUrl('main-content')
      },err=>{
        console.log(err)
        if(err.error.text == 'Not Allowed'){
          this.error_msg_email = false;
          this.error_msg_password = true;
        }else if(err.error == 'Cannot Find User'){
          this.error_msg_email = true;
          this.error_msg_password = false;
        }
      }
    )
  }

  public set_to_empty(input_name){
    this.login_form.controls[input_name].setValue('');
  }

}
