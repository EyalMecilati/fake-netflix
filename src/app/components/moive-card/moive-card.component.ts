import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,Params } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-moive-card',
  templateUrl: './moive-card.component.html',
  styleUrls: ['./moive-card.component.scss']
})
export class MoiveCardComponent implements OnInit {

  public movie_info:any = null

  constructor(private router: Router, private authService: AuthService,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.get_movie_info();
  }

  public get_movie_info(){
    let route_params:Params = {};
    this.activatedRoute.params.subscribe(
      parmas => {
        route_params = parmas
        this.authService.get_movie(route_params.id).subscribe(res=>{
          this.movie_info = res
        },err=>{
          console.log(err)
        })
      }
    );

  }

}
