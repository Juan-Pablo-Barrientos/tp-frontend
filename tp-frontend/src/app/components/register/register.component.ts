import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { map, subscribeOn } from 'rxjs/operators';
import { ResponseExists } from 'src/app/models/Responses/responseExists';
import { User } from 'src/app/models/user';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  signUpForm: any;
  usernameControl:any;
  errors: any[]=[];

  ngOnInit(): void {

    this.signUpForm = new FormGroup({
      usernameControl:new FormControl('',{validators: [Validators.required,Validators.maxLength(50)]}),
      nameControl:new FormControl('',[Validators.required,Validators.maxLength(50)]),
      surnameControl:new FormControl('',[Validators.required,Validators.maxLength(50)]),
      passwordControl:new FormControl('',[Validators.required,Validators.maxLength(50)]),
      passwordConfirmControl:new FormControl('',[Validators.maxLength(20),Validators.required]),
      emailControl:new FormControl('',[Validators.required,Validators.maxLength(50),Validators.email]),
      phoneControl:new FormControl('',[Validators.required,Validators.maxLength(50)]),
    },{validators: [this.checkPasswords]})

  }

  constructor(private dataService : DataService, private toastr:ToastrService, private router:Router) {
  }

  onSubmit() {
    let user = new User();
    user.name = this.signUpForm.controls.nameControl.value;
    user.surname = this.signUpForm.controls.surnameControl.value;
    user.username = this.signUpForm.controls.usernameControl.value;
    user.password = this.signUpForm.controls.passwordControl.value;
    user.email = this.signUpForm.controls.emailControl.value;
    user.role = "Client";
    user.phoneNumber = this.signUpForm.controls.phoneControl.value;
    this.getFormValidationErrors()
    if (this.errors.length!==0){
      this.toastr.error('Falta completar campos o los ha insertado mal', '🥺',{positionClass:'toast-top-center'})
      this.signUpForm.markAllAsTouched();
    }else {
    this.dataService.addUser(user).subscribe(async (res:any) => {
    if (!res.error){
      this.toastr.success('El registro fue exitoso', 'Éxito',{positionClass:'toast-bottom-right'});
      this.router.navigate(['/login']);
    }else{
      this.toastr.error('Fallo el registro', '🥺',{positionClass:'toast-bottom-right'});
    }
  })};
  }

  reset() {
    this.signUpForm.reset();
  }

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    let pass = group.get('passwordControl')?.value;
    let confirmPass = group.get('passwordConfirmControl')?.value
    return pass === confirmPass ? null : { 'notSame': true }
  }

  validateUser(control: AbstractControl) {
    return this.dataService.userExists(control.value).pipe(
        map((res:any) => {;
            return res.exist ? { 'usernameExists': true }:null ;
        })
    );
  }

  onUsernameBlur(event:any){
    let user = new User();
    user.username = event.target.value;
    const usernameField = this.signUpForm.controls['usernameControl'];
    this.dataService.userExists(user).subscribe((res:any) => {
            if(res.exist) {
              usernameField.setErrors({'usernameExist': true});
              usernameField.markAsDirty();
          } else {
            usernameField.clearValidators();
            usernameField.markAsPristine();
          }
        }
    );
  }

  getFormControl() {
    return this.signUpForm;
  }

  onEmailBlur(event:any){
    let user = new User();
    user.email = event.target.value;
    const emailField = this.signUpForm.controls['emailControl'];
    this.dataService.emailExists(user).subscribe((res:ResponseExists<User>) => {
            if(res.exist) {
              emailField.setErrors({'emailExist': true});
              emailField.markAsDirty();
          } else {
            emailField.clearValidators();
            emailField.markAsPristine();
          }
        }
    );
  }

  getUserNameControl() {
    return this.signUpForm.controls['usernameControl'];
  }

  getFormValidationErrors() {
    this.errors=[]
    Object.keys(this.signUpForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.signUpForm.get(key).errors;
      if(controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
          this.errors.push(keyError);
        });}
      }
    );
  }
}
