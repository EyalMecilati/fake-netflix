import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeScreenComponent } from './components/home-screen/home-screen.component';
import { LoginComponent } from './components/login/login.component';
import { MoiveCardComponent } from './components/moive-card/moive-card.component';
import { RegisterComponent } from './components/register/register.component';
import { UserMainComponent } from './components/user-main/user-main.component';


const routes: Routes = [
  { path: 'Home', component: HomeScreenComponent}, 
  { path: 'register', component: RegisterComponent}, 
  { path: 'login', component: LoginComponent}, 
  { path: 'main-content', component: UserMainComponent},
  { path: 'movie/:id', component: MoiveCardComponent}, 
  { path: '', redirectTo: '/Home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
