import { Inject } from "@angular/core";
import { Component, OnInit,  Injectable  } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

@Injectable()
export class LoginComponent  {

  email: string;
  password: string;

  constructor (@Inject('EMAIL')email: string, @Inject('PASSWORD')password: string) {
    this.email = email ?? '';
    this.password = password ?? '';

  }
  login(){
     console.log(this.email);
     console.log(this.password); 

  }
}