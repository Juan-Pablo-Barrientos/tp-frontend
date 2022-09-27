import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faTrash, faPencil, faEye } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { RequestResponse } from 'src/app/models/Responses/requestResponse';
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
  categories:Category[] = new Array();
  editCategoryForm: any;
  createCategoryForm:any

  constructor(private modalService: NgbModal, private dataService: DataService, private router:Router, private toastr:ToastrService) { }


 ngOnInit(): void {

   this.dataService.getCategories().subscribe((response:RequestResponse<Category[]>)=>{
     this.categories=response.data;
   })


   this.createCategoryForm=new FormGroup({
     nameControl: new FormControl('',[Validators.required, Validators.maxLength(50)]),
   });
 }

 onSubmit(){
  let category = new Category();
  category.name = this.createCategoryForm.controls.nameControl.value;
   this.dataService.addCategory(category).subscribe({
     next : (res:any)=>{
       this.toastr.success('Se ha creado la categoría', 'Éxito',{positionClass:'toast-bottom-right'})
       this.modalService.dismissAll();
       this.categories.unshift(res.data);
     },
     error: (error: HttpErrorResponse) => {
     if (error.status==201){
       this.toastr.success('Se ha creado la categoría', 'Éxito',{positionClass:'toast-bottom-right'})
       this.modalService.dismissAll();
       this.refreshCategoryList();
     }else {
       this.toastr.error('Fallo el crear de la categoría', '🥺',{positionClass:'toast-bottom-right'})
     }}
    });
 }

 openCreate(content: any) {
   this.resetCreate();
   this.modalService.open(content, {ariaLabelledBy: 'modalCreate'}).result
 }

 resetCreate() {
   this.createCategoryForm.reset();
 }

 onSubmitEdit() {
   let category = new Category();
   category.id = this.editCategoryForm.controls.idControl.value;
   category.name = this.editCategoryForm.controls.nameControl.value;
   this.dataService.editCategory(category,this.editCategoryForm.controls.idControl.value).subscribe({
     next : ()=>{
       this.toastr.success('Se ha editado la categoría', 'Éxito',{positionClass:'toast-bottom-right'})
       this.modalService.dismissAll();
       this.refreshCategoryList();
     },
     error: (error: HttpErrorResponse) => {
     if (error.status==200){
       this.toastr.success('Se ha editado la categoría', 'Éxito',{positionClass:'toast-bottom-right'})
       this.modalService.dismissAll();
       this.refreshCategoryList();
     }else {
       this.toastr.error('Error al editar la categoría', '🥺',{positionClass:'toast-bottom-right'})
     }}
    })
 }

openShow(content: any) {
   this.modalService.open(content, {ariaLabelledBy: 'modalShow'}).result
 }

openEdit(content: any, idCategory:number) {
   const category = this.categories.find((category: { id: number; }) =>category.id===idCategory) ?? new Category()
   this.editCategoryForm = new FormGroup({
     idControl:new FormControl({value:category.id,disabled:true},[Validators.required,Validators.maxLength(50)]),
     nameControl:new FormControl(category.name,{validators: [Validators.required,Validators.maxLength(50)]}),
   })
   this.modalService.open(content, {ariaLabelledBy: 'modalEdit'}).result
 }

openDelete(content: any) {
   this.modalService.open(content, {ariaLabelledBy: 'modalDelete'}).result
 }

deleteCategory(idCategory:number){
   this.dataService.delCategory(idCategory).subscribe({
     next : ()=>{
       this.toastr.success('Se ha borrado la categoria', 'Éxito',{positionClass:'toast-bottom-right'})
       this.modalService.dismissAll();
       this.refreshCategoryList();
     },
     error: (error: HttpErrorResponse) => {
     if (error.status==200){
       this.toastr.success('Se ha borrado la categoria', 'Éxito',{positionClass:'toast-bottom-right'})
       this.modalService.dismissAll();
       this.refreshCategoryList();
     }else {
      this.toastr.success('Se ha borrado la categoria', 'Éxito',{positionClass:'toast-bottom-right'})
      this.modalService.dismissAll();
      this.refreshCategoryList();
     }}
    })
 }

 searchCategory() {
   let searchCategory:any, filter:any, table:any, tr:any, td, i, txtValue;
   searchCategory = document.getElementById("searchCategory");
   filter = searchCategory.value.toUpperCase();
   table = document.getElementById("categoryList");
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

 refreshCategoryList(){
   this.dataService.getCategories().subscribe((response:RequestResponse<Category[]>)=>{
     this.categories=response.data;
 })}
}

