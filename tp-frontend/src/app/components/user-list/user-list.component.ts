import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faTrash, faPencil, faEye } from '@fortawesome/free-solid-svg-icons';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  faTrash = faTrash;
  faPencil = faPencil;
  faEye = faEye;
  closeResult = '';
  users:any[]=[];
  editUserForm: any;
  user:any;


  constructor(private modalService: NgbModal, private dataService: DataService, private router:Router, private toastr:ToastrService) {

   }

   refreshUserList(){
    this.dataService.getUsers().subscribe((response:any)=>{
      this.users=response.data;
      this.users.sort(this.GetSortOrder('role'))
    })
  }

  ngOnInit(): void {

    this.dataService.getUsers().subscribe((response:any)=>{
      this.users=response.data;
      this.users.sort(this.GetSortOrder('role'))
    })

  }

  onSubmit() {
    let request:any
    request= {
      id : this.editUserForm.controls.idControl.value,
      username : this.editUserForm.controls.usernameControl.value,
      name : this.editUserForm.controls.nameControl.value,
      surname : this.editUserForm.controls.surnameControl.value,
      email : this.editUserForm.controls.emailControl.value,
      role: this.editUserForm.controls.role.value,
      phoneNumber: this.editUserForm.controls.phoneNumberControl.value
    }
    if (this.user.role==="Author") { request.bio= this.editUserForm.controls.bioControl.value}

    this.dataService.editUser(request,this.editUserForm.controls.idControl.value).subscribe({
      next : ()=>{
        this.toastr.success('El editado de usuario fue exitoso', 'Éxito',{positionClass:'toast-bottom-right'});
        this.modalService.dismissAll();
        this.refreshUserList();
      },
      error: (error: HttpErrorResponse) => {
      if (error.status==200){
        this.toastr.success('El editado de usuario fue exitoso', 'Éxito',{positionClass:'toast-bottom-right'});
        this.modalService.dismissAll();
        this.refreshUserList();
      }else {
        this.toastr.error('Error al editar usuario', '🥺',{positionClass:'toast-bottom-right'});
      }}
     })
  }

  openShow(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modalShow'}).result
  }

  openEdit(content: any, idUser:number) {

    this.user = this.users.find((user: { id: number; }) =>user.id===idUser)
    this.editUserForm = new FormGroup({
      idControl:new FormControl({value:this.user.id,disabled:true},[Validators.required,Validators.maxLength(50)]),
      usernameControl:new FormControl(this.user.username,{validators: [Validators.required,Validators.maxLength(50)]}),
      nameControl:new FormControl(this.user.name,[Validators.required,Validators.maxLength(50)]),
      surnameControl:new FormControl(this.user.surname,[Validators.required,Validators.maxLength(50)]),
      bioControl:new FormControl(this.user.bio,[Validators.maxLength(50)]),
      emailControl:new FormControl(this.user.email,[Validators.required,Validators.maxLength(50),Validators.email]),
      phoneNumberControl:new FormControl(this.user.phoneNumber,[Validators.required,Validators.maxLength(50)]),
      role:new FormControl(this.user.role,[Validators.required]),
    })

    this.modalService.open(content, {ariaLabelledBy: 'modalEdit'}).result
  }

  openDelete(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modalDelete'}).result
  }

  deleteUser(idUser:number){
    this.dataService.delUser(idUser).subscribe({
      next : ()=>{
        this.toastr.success('El borrado de usuario fue exitoso', 'Éxito',{positionClass:'toast-bottom-right'});
        this.modalService.dismissAll();
        this.refreshUserList();
      },
      error: (error: HttpErrorResponse) => {
      if (error.status==200){
        this.toastr.success('El borrado de usuario fue exitoso', 'Éxito',{positionClass:'toast-bottom-right'});
        this.modalService.dismissAll();
        this.refreshUserList();
      }else {
        this.toastr.error('Error al borrar el usuario', '🥺',{positionClass:'toast-bottom-right'});
      }}
     })
  }

  searchUser() {
    let searchUser:any, filter:any, table:any, tr:any, td, i, txtValue;
    searchUser = document.getElementById("searchUser");
    filter = searchUser.value.toUpperCase();
    table = document.getElementById("userList");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  GetSortOrder(prop:any) {
    return function(a:any, b:any) {
        if (a[prop] > b[prop]) {
            return 1;
        } else if (a[prop] < b[prop]) {
            return -1;
        }
        return 0;
    }
  }

}
