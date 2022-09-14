import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/shared/services/data.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-redact-post',
  templateUrl: './redact-post.component.html',
  styleUrls: ['./redact-post.component.scss']
})
export class RedactPostComponent implements OnInit {
  createPostForm: any;
  categories: any;
  provinces: any;

  constructor(private dataService:DataService, private authService:AuthService, private toastr:ToastrService) { }

  get getCreatePostForm(){
    return this.createPostForm.controls;
  }


  ngOnInit(): void {

    this.createPostForm=new FormGroup({
      titleControl: new FormControl('',[Validators.required, Validators.maxLength(50)]),
      categoryControl: new FormControl('',[Validators.required]),
      provinceControl: new FormControl('',[Validators.required]),
      bodyControl: new FormControl('',[Validators.required]),
      requireSubscriptionControl: new FormControl(''),
      file: new FormControl('', [Validators.required]),
      fileSource: new FormControl('', [Validators.required]),
    });

    this.dataService.getCategories().subscribe((response:any)=>{
      this.categories=response.data;
    })

    this.dataService.getProvinces().subscribe((response:any)=>{
      console.log(response.data)
      this.provinces=response.data;
    })

  }
  resetAddPost() {
    this.createPostForm.reset();
    this.createPostForm.controls['provinceControl'].setValue('')
    this.createPostForm.controls['categoryControl'].setValue('')
  }


  onFileChange(event:any) {

    if (event.target.files.length > 0) {
      if(event.target.files[0].size > 4097152){
      this.toastr.error('El archivo es muy grande' , '🥺' , {positionClass:'toast-bottom-right'});
      event.target.value = null;
      event.target.files[0] = "";
      this.createPostForm.patchValue({
        fileSource: ""
      })}
   else{
      const file = event.target.files[0];
      this.createPostForm.patchValue({
        fileSource: file
      })}
    }
  }

  onSubmit(){
    const formData = new FormData()
    formData.append('myImage',this.getCreatePostForm.get('fileSource').value);
    formData.append('title',this.getCreatePostForm.controls['titleControl'].value);
    formData.append('body',this.getCreatePostForm.controls['bodyControl'].value );
    formData.append('userId',this.authService.getUserId());
    formData.append('categoryId',this.getCreatePostForm.controls['provinceControl'].value );
    formData.append('provinceId',this.getCreatePostForm.controls['genreControl'].value );
    formData.append('requiresSubscription',"0");

    this.dataService.addPost(formData).subscribe({
      next : (res:any)=>{
        this.toastr.success('Se ha añadido la película', 'Éxito',{positionClass:'toast-bottom-right'});
      },
      error: (error: HttpErrorResponse) => {
      if (error.status==201){
        this.toastr.success('Se ha añadido la película', 'Éxito',{positionClass:'toast-bottom-right'});
      }else {
        this.toastr.error('Error al crear la película' , '🥺' , {positionClass:'toast-bottom-right'});
      }}
     });
  }

}
