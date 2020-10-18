import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder) { 
    this.registerForm = this.fb.group({
      'userName': ['', [Validators.required]],
      'email': ['', [Validators.required]],
      'password': ['', [Validators.required]],
      'role': ['', [Validators.required]] 
    })
  }

  ngOnInit() { }

  submitRegister() {

  }

}
