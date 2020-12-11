import { Component, OnInit } from '@angular/core';
import anime from 'animejs/lib/anime.es.js';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss']
})
export class HomeScreenComponent implements OnInit {

  public new_user:boolean = true;

  constructor() { }

  

  ngOnInit(): void {
    this.check_if_user_first_time();
  }

  public check_if_user_first_time(){
    let token = localStorage.getItem('token');
    if(token){
      this.new_user = false;
    }else{
      this.new_user = true;
    }
  }

}
