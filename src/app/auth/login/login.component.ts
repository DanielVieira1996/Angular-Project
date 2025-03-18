import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private router: Router) {}

  loginForm = new FormGroup({
    email: new FormControl('',{
      validators:[
        Validators.email,
        Validators.required
      ]
    }),
    password: new FormControl('',{
      validators:[
        Validators.required,
        Validators.minLength(12)
      ]
    })
    })

    onSubmit(){
      const email= this.loginForm.value.email;
      const pass=this.loginForm.value.password;
      if(email==="daniel@hotmail.com" && pass==="testedaniel123456"){
        console.log("accesso permitido");
        window.localStorage.setItem('login', JSON.stringify({email:email, password: pass}));
        this.router.navigate(["/main"]);
      }
      else{
        console.log("acesso negado");
      }
    }

}
