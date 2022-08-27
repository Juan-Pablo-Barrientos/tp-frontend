import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  //TO DO: ASYNC VALIDATOR
  signUpForm = new FormGroup({
    usernameControl:new FormControl('',{validators: [Validators.required,Validators.maxLength(50)], asyncValidators: this.validateUser(), updateOn: 'blur'}),
    nameControl:new FormControl('',[Validators.required,Validators.maxLength(50)]),
    surnameControl:new FormControl('',[Validators.required,Validators.maxLength(50)]),
    passwordControl:new FormControl('',[Validators.required,Validators.maxLength(50)]),
    passwordConfirmControl:new FormControl('',[Validators.required,Validators.maxLength(20)]),
    emailControl:new FormControl('',[Validators.required,Validators.maxLength(50),Validators.email]),
    phoneControl:new FormControl('',[Validators.required,Validators.maxLength(50)]),
    subscribeControl:new FormControl(false)
  })

  constructor(private dataService : DataService) {
    this.signUpForm.valueChanges.subscribe(value => console.log(value))
  }

  onSubmit() {
    let request = {
      name : this.signUpForm.controls.nameControl.value,
      surname : this.signUpForm.controls.surnameControl.value,
      username : this.signUpForm.controls.usernameControl.value,
      password : this.signUpForm.controls.passwordControl.value,
      email : this.signUpForm.controls.emailControl.value,
      role: 'client',
      phoneNumber : this.signUpForm.controls.phoneControl.value,
      subscribedUntil : this.signUpForm.controls.subscribeControl.value,
    }

    this.dataService.addUser(request).subscribe(response => {
      console.log(response);
    });
  }

  validateUser() {
    return null;
  }

  userExists() {

  }
  reset() {
    this.signUpForm.reset();
  }

}
