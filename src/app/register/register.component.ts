import { Component, OnInit, Injectable } from '@angular/core';
import { Inject } from "@angular/core";
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SesionService } from '../sesion.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{

   email: string;
  password: string;

  constructor (@Inject('EMAIL')email: string, @Inject('PASSWORD')password: string) {
    this.email = email ?? '';
    this.password = password ?? '';

  }

  registro(){
     console.log(this.email);
     console.log(this.password); 

  }

}