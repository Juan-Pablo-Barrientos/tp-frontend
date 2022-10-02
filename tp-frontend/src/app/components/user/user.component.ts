import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Author } from 'src/app/models/author';
import { Post } from 'src/app/models/post';
import { RequestResponse } from 'src/app/models/Responses/requestResponse';
import { User } from 'src/app/models/user';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  faPencil=faPencil
  user: User = new User();
  idUser: number = 0;
  posts:Post[] = []
  passwordChangeForm:any
  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private dataService: DataService,
    public authService: AuthService,
    private toastr:ToastrService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.idUser = parseInt(this.route.snapshot.paramMap.get("id") ?? "0");
    this.dataService.getUserWithPosts(this.idUser).subscribe(
      (response: RequestResponse<Author>) => {
        this.user = response.data;
        this.posts = response.data.Posts
      }
    );
  }

  openPasswordChange(content: any) {
    this.passwordChangeForm = new FormGroup({
      oldPasswordControl:new FormControl('',{validators: [Validators.required,Validators.maxLength(50)]}),
      newPasswordControl:new FormControl('',[Validators.required,Validators.maxLength(50)]),
      newConfirmPasswordControl:new FormControl('',[Validators.required,Validators.maxLength(50)]),
    },{validators: [this.checkPasswords]})
    this.modalService.open(content, {ariaLabelledBy: 'changePasswordModal'}).result
  }

  onSubmitPassword(){
    let request = {
      oldPassword : this.passwordChangeForm.controls.oldPasswordControl.value,
      newPassword : this.passwordChangeForm.controls.newPasswordControl.value,
      userId: this.authService.getDecodedAccessToken(this.authService.getJwtToken()!).id_user
    }
    this.passwordChangeForm.reset()
    this.dataService.editUserPassword(request).subscribe({
      next : (res:any)=>{
      this.toastr.success('Se ha cambiado la contraseña', 'Éxito',{positionClass:'toast-bottom-right'})
    },
      error: (error: HttpErrorResponse) => {
        if (error.status==404){
          this.toastr.error('Contraseña erronea', '🥺',{positionClass:'toast-bottom-right'});
        }}
    });
  }

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    let pass = group.get('newPasswordControl')?.value;
    let confirmPass = group.get('newConfirmPasswordControl')?.value
    return pass === confirmPass ? null : { 'notSame': true }
  }

}
