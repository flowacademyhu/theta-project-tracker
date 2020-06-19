import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './components/users.component';
import { UserResolver } from './resolvers/user.resolver';
/* import { LoginComponent } from './components/login.component'; */


const routes: Routes = [
  {
    path: '',
    redirectTo: 'LoginComponent',
    pathMatch: 'full',
  }, 
   {
    path: 'login',
    component: LoginComponent,
    resolve: { users: UserResolver }
  },
  {
    path: 'users',
    component: UsersComponent,
    resolve: { users: UserResolver }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }