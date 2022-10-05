import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Post } from 'src/app/models/post';
import { RequestResponse } from 'src/app/models/Responses/requestResponse';
import { DataService } from 'src/app/shared/services/data.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {
  editPostForm: any;
  categories: any;
  provinces: any;
  idPost:string="";
  post: Post = new Post;

  constructor(private dataService:DataService, private authService:AuthService, private toastr:ToastrService, private router:Router, private route:ActivatedRoute) { }


  ngOnInit(): void {
    this.editPostForm=new FormGroup({
      titleControl: new FormControl('',[Validators.required, Validators.maxLength(50)]),
      categoryControl: new FormControl('',[Validators.required]),
      provinceControl: new FormControl('',[Validators.required]),
      bodyControl: new FormControl('',[Validators.required]),
      file: new FormControl(''),
      fileSource: new FormControl(''),
    });

    this.dataService.getCategories().subscribe((response:any)=>{
      this.categories=response.data;
    })

    this.dataService.getProvinces().subscribe((response:any)=>{
      this.provinces=response.data;
    })

  this.dataService.getPostsByIdWithAuthor(parseInt(this.route.snapshot.paramMap.get("id")!)).subscribe((response:RequestResponse<Post>)=>{
      this.post=response.data
      this.editPostForm.controls['titleControl'].setValue(this.post.title)
      this.editPostForm.controls['categoryControl'].setValue(this.post.categoryId)
      this.editPostForm.controls['provinceControl'].setValue(this.post.provinceId)
      this.editPostForm.controls['bodyControl'].setValue(this.post.body)
    }
    )

  }


  resetEditPost() {
    this.editPostForm.controls['file'].setValue('')
    this.editPostForm.controls['fileSource'].setValue('')
    this.editPostForm.controls['titleControl'].setValue(this.post.title)
    this.editPostForm.controls['categoryControl'].setValue(this.post.categoryId)
    this.editPostForm.controls['provinceControl'].setValue(this.post.provinceId)
    this.editPostForm.controls['bodyControl'].setValue(this.post.body)
  }


  onFileChange(event:any) {

    if (event.target.files.length > 0) {
      if(event.target.files[0].size > 4097152){
      this.toastr.error('El archivo es muy grande' , '🥺' , {positionClass:'toast-bottom-right'});
      event.target.value = null;
      event.target.files[0] = "";
      this.editPostForm.patchValue({
        fileSource: ""
      })}
   else{
      const file = event.target.files[0];
      this.editPostForm.patchValue({
        fileSource: file
      })}
    }
  }

  onSubmit(){
    const formData = new FormData()
    if (this.editPostForm.get('fileSource').value) {formData.append('myImage',this.editPostForm.get('fileSource').value)}
    formData.append('title',this.editPostForm.controls['titleControl'].value);
    formData.append('body',this.editPostForm.controls['bodyControl'].value );
    formData.append('categoryId',this.editPostForm.controls['categoryControl'].value );
    formData.append('provinceId',this.editPostForm.controls['provinceControl'].value );

    this.dataService.editPost(formData, this.post.id).subscribe({
      next : (res:any)=>{
        this.toastr.success('Se ha editado la noticia', 'Éxito',{positionClass:'toast-bottom-right'});
        this.router.navigate(['/PostAuthor', this.post.id])
      },
      error: (error: HttpErrorResponse) => {
      if (error.status==200){
        this.toastr.success('Se ha editado la noticia', 'Éxito',{positionClass:'toast-bottom-right'});
      }else {
        this.toastr.error('Error al editar la noticia' , '🥺' , {positionClass:'toast-bottom-right'});
      }}
     });
  }

}
