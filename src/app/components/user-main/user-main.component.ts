import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.scss'],
})
export class UserMainComponent implements OnInit {
  public authorized: boolean = true;
  public movies: [] = [];
  public search_form:FormGroup;

  constructor(private fBuilder: FormBuilder,private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.search_form = this.fBuilder.group({
      title: ['Harry Potter', [Validators.required]],
    });
    this.check_auth();
    this.get_all_movies();
  }

  public check_auth() {
    const token = localStorage.getItem('token');
    this.authService.check_authorization(token).subscribe(
      (res) => {
        this.authorized = true;
      },
      (err) => {
        this.authorized = false;
        setTimeout(() => {
          this.router.navigateByUrl('login');
        }, 3000);
      }
    );
  }

  public get_all_movies() {
    this.authService.get_movies().subscribe(
      (res) => {
        this.movies = res.results;
      },
      (err) => {
        this.movies = null;
      }
    );
  }

  public get_movie_id(id){
    this.router.navigateByUrl('movie/'+id)
  }

  public handle_submit(){  
    this.authService.get_movie_by_search(this.search_form.value.title).subscribe(res=>{
      this.movies = res.results
    },err=>{
      this.search_form.value.title = ''     
    })
  }


}
