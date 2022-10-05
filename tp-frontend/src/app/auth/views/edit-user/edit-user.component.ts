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
user:any={};

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
    subscribedControl:new FormControl('',[Validators.required,Validators.maxLength(50)]),
    file: new FormControl(''),
    fileSource: new FormControl(''),
  })


  this.dataService.getUserWithPosts(parseInt(this.route.snapshot.paramMap.get("id")!)).subscribe((response:RequestResponse<User>)=>{console.log(response)
    this.user=response.data
    this.editUserForm.controls['usernameControl'].setValue(this.user.username)
    this.editUserForm.controls['nameControl'].setValue(this.user.name)
    this.editUserForm.controls['surnameControl'].setValue(this.user.surname)
    this.editUserForm.controls['emailControl'].setValue(this.user.email)
    this.editUserForm.controls['phoneControl'].setValue(this.user.phoneNumber)
    this.editUserForm.controls['bioControl'].setValue(this.user.bio)
    this.editUserForm.controls['subscribedControl'].setValue(this.user.subscribed)
  })
}


onSubmit() {
  this.getFormValidationErrors()
  const formData = new FormData()
  if (this.editUserForm.get('fileSource').value) {formData.append('myImage',this.editUserForm.get('fileSource').value)}
  formData.append('name',this.editUserForm.controls['nameControl'].value);
  formData.append('surname',this.editUserForm.controls['surnameControl'].value );
  formData.append('username',this.editUserForm.controls['usernameControl'].value );
  formData.append('email',this.editUserForm.controls['emailControl'].value );
  formData.append('phoneNumber',this.editUserForm.controls['phoneControl'].value );
  formData.append('subscribed',this.editUserForm.controls['subscribedControl'].value );
  if (this.editUserForm.controls.bioControl.value!==''){
    formData.append('bio',this.editUserForm.controls['bioControl'].value );
  }
  if (this.errors.length!==0){
    this.toastr.error('Falta completar campos o los ha insertado mal', '🥺',{positionClass:'toast-top-center'})
    this.editUserForm.markAllAsTouched();
  }else {
  this.dataService.editUser(formData,parseInt(this.route.snapshot.paramMap.get("id")!)).subscribe(async (res:any) => {
  if (!res.error){
    this.toastr.success('El editado de usuario fue exitoso', 'Éxito',{positionClass:'toast-bottom-right'});
    this.router.navigate(['/user', this.user.id])
  }else{
    this.toastr.error('Fallo el registro', '🥺',{positionClass:'toast-bottom-right'});
  }
})};
}

reset() {
  this.editUserForm.controls['file'].setValue('')
  this.editUserForm.controls['fileSource'].setValue('')
  this.editUserForm.controls['usernameControl'].setValue(this.user.username)
  this.editUserForm.controls['nameControl'].setValue(this.user.name)
  this.editUserForm.controls['surnameControl'].setValue(this.user.surname)
  this.editUserForm.controls['emailControl'].setValue(this.user.email)
  this.editUserForm.controls['phoneControl'].setValue(this.user.phoneNumber)
  this.editUserForm.controls['subscribed'].setValue(this.user.subscribed)
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

onFileChange(event:any) {

  if (event.target.files.length > 0) {
    if(event.target.files[0].size > 4097152){
    this.toastr.error('El archivo es muy grande' , '🥺' , {positionClass:'toast-bottom-right'});
    event.target.value = null;
    event.target.files[0] = "";
    this.editUserForm.patchValue({
      fileSource: ""
    })}
 else{
    const file = event.target.files[0];
    this.editUserForm.patchValue({
      fileSource: file
    })}
  }
}
}
