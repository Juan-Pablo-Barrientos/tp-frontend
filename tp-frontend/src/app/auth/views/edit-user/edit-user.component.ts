import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { Post } from 'src/app/models/post';
import { RequestResponse } from 'src/app/models/Responses/requestResponse';
import { ResponseExists } from 'src/app/models/Responses/responseExists';
import { User } from 'src/app/models/user';
import { DataService } from 'src/app/shared/services/data.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
editUserForm: any;
usernameControl:any;
errors: any[]=[];
user:User=new User()

constructor(private dataService : DataService, private toastr:ToastrService, private router:Router, private route:ActivatedRoute) {
}

ngOnInit(): void {

  this.editUserForm = new FormGroup({
    usernameControl:new FormControl('',{validators: [Validators.required,Validators.maxLength(50)]}),
    nameControl:new FormControl('',[Validators.required,Validators.maxLength(50)]),
    surnameControl:new FormControl('',[Validators.required,Validators.maxLength(50)]),
    emailControl:new FormControl('',[Validators.required,Validators.maxLength(50),Validators.email]),
    phoneControl:new FormControl('',[Validators.required,Validators.maxLength(50)]),
    bioControl:new FormControl('',[Validators.required,Validators.maxLength(50)]),
  })


  this.dataService.getUserWithPosts(parseInt(this.route.snapshot.paramMap.get("id")!)).subscribe((response:RequestResponse<User>)=>{
    this.user=response.data
    console.log(this.user)
    this.editUserForm.controls['usernameControl'].setValue(this.user.username)
    this.editUserForm.controls['nameControl'].setValue(this.user.name)
    this.editUserForm.controls['surnameControl'].setValue(this.user.surname)
    this.editUserForm.controls['emailControl'].setValue(this.user.email)
    this.editUserForm.controls['phoneControl'].setValue(this.user.phoneNumber)
    this.editUserForm.controls['bioControl'].setValue(this.user.bio)
  })
}


onSubmit() {
  let user = new User();
  user.name = this.editUserForm.controls.nameControl.value;
  user.surname = this.editUserForm.controls.surnameControl.value;
  user.username = this.editUserForm.controls.usernameControl.value;
  user.email = this.editUserForm.controls.emailControl.value;
  user.phoneNumber = this.editUserForm.controls.phoneControl.value;
  if (this.editUserForm.controls.bioControl.value!==''){
    user.bio=this.editUserForm.controls.bioControl.value
  }
  this.getFormValidationErrors()
  if (this.errors.length!==0){
    console.log(this.errors)
    this.toastr.error('Falta completar campos o los ha insertado mal', '🥺',{positionClass:'toast-top-center'})
    this.editUserForm.markAllAsTouched();
  }else {
  this.dataService.editUser(user,this.user.id).subscribe(async (res:any) => {
  console.log(res)
  if (!res.error){
    this.toastr.success('El editado de usuario fue exitoso', 'Éxito',{positionClass:'toast-bottom-right'});
    this.router.navigate(['/user', this.user.id])
  }else{
    this.toastr.error('Fallo el registro', '🥺',{positionClass:'toast-bottom-right'});
  }
})};
}

reset() {
  this.editUserForm.controls['usernameControl'].setValue(this.user.username)
  this.editUserForm.controls['nameControl'].setValue(this.user.name)
  this.editUserForm.controls['surnameControl'].setValue(this.user.surname)
  this.editUserForm.controls['emailControl'].setValue(this.user.email)
  this.editUserForm.controls['phoneControl'].setValue(this.user.phoneNumber)
  if (this.editUserForm.controls.bioControl.value!==''){
    this.editUserForm.controls['bioControl'].setValue(this.user.bio)
  }
}

getFormControl() {
  return this.editUserForm;
}

getUserNameControl() {
  return this.editUserForm.controls['usernameControl'];
}

getFormValidationErrors() {
  this.errors=[]
  Object.keys(this.editUserForm.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.editUserForm.get(key).errors;
    if(controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
        this.errors.push(keyError);
      });}
    }
  );
}
}
