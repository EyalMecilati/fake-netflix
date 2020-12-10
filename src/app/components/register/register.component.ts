import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  public rejisterForm: FormGroup;
  public user:any;
  public user_already_register:boolean = false;

  constructor(private fBuilder: FormBuilder, private router: Router, private authService:AuthService) { }

  ngOnInit(): void {
    this.rejisterForm = this.fBuilder.group({
      first_name: ['john', [Validators.required]],
      last_name: ['doe', [Validators.required]],
      email: ['johndoe@gmail.com', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      password_row: ['*****', [Validators.required, Validators.minLength(4)]]
    });
  }


  public handleSubmit(){
      this.authService.register_user(this.rejisterForm.value).subscribe(
        res => {
          this.user = res
          this.check_register();
        },err=>{
          console.log(err+'err')
        }
      )
  }

  public check_register(){
    if(this.user.check){
      this.user_already_register = true;
    }else{
      this.router.navigateByUrl('login');
      localStorage.setItem('email',this.rejisterForm.value.email)
    }
  }

  public set_to_empty(input_name){
    this.rejisterForm.controls[input_name].setValue('');
  }

}
