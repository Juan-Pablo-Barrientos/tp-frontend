import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faTrash, faPencil, faEye } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  faTrash = faTrash;
  faPencil = faPencil;
  faEye = faEye;
  closeResult = '';
  provinces:any;
  editProvinceForm: any;
  createProvinceForm:any

  constructor(private modalService: NgbModal, private dataService: DataService, private router:Router, private toastr:ToastrService) { }


 ngOnInit(): void {

   this.dataService.getProvinces().subscribe((response:any)=>{
     this.provinces=response.data;
   })


   this.createProvinceForm=new FormGroup({
     nameControl: new FormControl('',[Validators.required, Validators.maxLength(50)]),
   });
 }

 onSubmit(){
   let request = {
     name : this.createProvinceForm.controls.nameControl.value,
   }
   this.dataService.addProvince(request).subscribe({
     next : (res:any)=>{
       this.toastr.success('Se ha creado la provincia', 'Éxito',{positionClass:'toast-bottom-right'})
       this.modalService.dismissAll();
       this.provinces.unshift(res.data);
     },
     error: (error: HttpErrorResponse) => {
     if (error.status==201){
       this.toastr.success('Se ha creado la provincia', 'Éxito',{positionClass:'toast-bottom-right'})
       this.modalService.dismissAll();
       this.refreshPronviceList();
     }else {
       this.toastr.error('Fallo el crear de la provincia', '🥺',{positionClass:'toast-bottom-right'})
     }}
    });
 }

 openCreate(content: any) {
   this.resetCreate();
   this.modalService.open(content, {ariaLabelledBy: 'modalCreate'}).result
 }

 resetCreate() {
   this.createProvinceForm.reset();
 }

 onSubmitEdit() {
   let request = {
     id : this.editProvinceForm.controls.idControl.value,
     name : this.editProvinceForm.controls.nameControl.value,
   }
   this.dataService.editProvinces(request,this.editProvinceForm.controls.idControl.value).subscribe({
     next : ()=>{
       this.toastr.success('Se ha editado la provincia', 'Éxito',{positionClass:'toast-bottom-right'})
       this.modalService.dismissAll();
       this.refreshPronviceList();
     },
     error: (error: HttpErrorResponse) => {
     if (error.status==200){
       this.toastr.success('Se ha editado la provincia', 'Éxito',{positionClass:'toast-bottom-right'})
       this.modalService.dismissAll();
       this.refreshPronviceList();
     }else {
       this.toastr.error('Error al editar la provincia', '🥺',{positionClass:'toast-bottom-right'})
     }}
    })
 }

openShow(content: any) {
   this.modalService.open(content, {ariaLabelledBy: 'modalShow'}).result
 }

openEdit(content: any, idProvince:number) {
   const province = this.provinces.find((province: { id: number; }) =>province.id===idProvince)
   this.editProvinceForm = new FormGroup({
     idControl:new FormControl({value:province.id,disabled:true},[Validators.required,Validators.maxLength(50)]),
     nameControl:new FormControl(province.name,{validators: [Validators.required,Validators.maxLength(50)]}),
   })
   this.modalService.open(content, {ariaLabelledBy: 'modalEdit'}).result
 }

openDelete(content: any) {
   this.modalService.open(content, {ariaLabelledBy: 'modalDelete'}).result
 }

deleteProvince(idProvince:any){
   this.dataService.delProvinces(idProvince).subscribe({
     next : ()=>{
       this.toastr.success('Se ha borrado la provincia', 'Éxito',{positionClass:'toast-bottom-right'})
       this.modalService.dismissAll();
       this.refreshPronviceList();
     },
     error: (error: HttpErrorResponse) => {
     if (error.status==200){
       this.toastr.success('Se ha borrado la provincia', 'Éxito',{positionClass:'toast-bottom-right'})
       this.modalService.dismissAll();
       this.refreshPronviceList();
     }else {
      this.toastr.success('Se ha borrado la provincia', 'Éxito',{positionClass:'toast-bottom-right'})
      this.modalService.dismissAll();
      this.refreshPronviceList();
     }}
    })
 }

 searchProvince() {
   let searchProvince:any, filter:any, table:any, tr:any, td, i, txtValue;
   searchProvince = document.getElementById("searchProvince");
   filter = searchProvince.value.toUpperCase();
   table = document.getElementById("provinceList");
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

 refreshPronviceList(){
   this.dataService.getProvinces().subscribe((response:any)=>{
     this.provinces=response.data;
 })}
}

