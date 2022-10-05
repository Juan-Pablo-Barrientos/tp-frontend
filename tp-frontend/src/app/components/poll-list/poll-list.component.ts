import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEye, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { Poll } from 'src/app/models/poll';
import { RequestResponse } from 'src/app/models/Responses/requestResponse';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-poll-list',
  templateUrl: './poll-list.component.html',
  styleUrls: ['./poll-list.component.scss']
})
export class PollListComponent implements OnInit {
  faTrash = faTrash;
  faPencil = faPencil;
  faEye = faEye;
  closeResult = '';
  polls:Poll[]=new Array()
  categories:Category[] = new Array();
  editPollForm: any;
  createPollForm:any
  minDate:string="";
  maxDate:string="";
  now = new Date();

  constructor(private modalService: NgbModal, private dataService: DataService, private router:Router, private toastr:ToastrService) {
  }


 ngOnInit(): void {

   this.dataService.getPolls().subscribe((response:RequestResponse<Poll[]>)=>{
     this.polls=response.data;
   })

   this.dataService.getCategories().subscribe((response:any)=>{
    this.categories=response.data;
   })

   this.minDate=new Date().toISOString().split('T')[0];
   this.maxDate=new Date(this.now.setMonth(this.now.getMonth() + 1)).toISOString().split('T')[0];


 }

 onSubmit(){
  let poll = new Poll();
  poll.description = this.createPollForm.controls.descriptionControl.value;
  poll.pollDate = this.createPollForm.controls.dateControl.value;
  poll.categoryId = this.createPollForm.controls.categoryControl.value;
  poll.poll_values= new Array()
  poll.poll_values.push({description:this.createPollForm.controls.option1Control.value})
  poll.poll_values.push({description:this.createPollForm.controls.option2Control.value})
  this.createPollForm.controls.option3Control.value ? poll.poll_values.push({description:this.createPollForm.controls.option3Control.value}): null
  this.createPollForm.controls.option4Control.value ? poll.poll_values.push({description:this.createPollForm.controls.option4Control.value}): null
  this.createPollForm.controls.option5Control.value ? poll.poll_values.push({description:this.createPollForm.controls.option5Control.value}): null
   this.dataService.addPoll(poll).subscribe({
     next : (res:any)=>{
       this.toastr.success('Se ha creado la encuesta', 'Éxito',{positionClass:'toast-bottom-right'})
       this.modalService.dismissAll();
       this.refreshPollList();
     },
     error: (error: HttpErrorResponse) => {
     if (error.status==409){
       this.toastr.error('Ya existe una encuesta en esa fecha', 'Fallo',{positionClass:'toast-bottom-right'})
       this.refreshPollList();
     }else {
       this.toastr.error('Ya existe una encuesta en esa fecha', '🥺',{positionClass:'toast-bottom-right'})
     }}
    });
 }

 openCreate(content: any) {
  this.createPollForm=new FormGroup({
    descriptionControl: new FormControl('',[Validators.required]),
    dateControl: new FormControl('',[Validators.required, Validators.maxLength(50)]),
    categoryControl: new FormControl('',[Validators.required]),
    option1Control: new FormControl('',[Validators.required, Validators.maxLength(15)]),
    option2Control: new FormControl('',[Validators.required, Validators.maxLength(15)]),
    option3Control: new FormControl('',[Validators.maxLength(15)]),
    option4Control: new FormControl('',[Validators.maxLength(15)]),
    option5Control: new FormControl('',[Validators.maxLength(15)]),
   });
   this.modalService.open(content, {ariaLabelledBy: 'modalCreate'}).result
 }

 resetCreate() {
   this.createPollForm.reset();
   this.createPollForm.controls['categoryControl'].setValue('')
 }

 onSubmitEdit() {
   let poll = new Poll();
   poll.id = this.editPollForm.controls.idControl.value;
   poll.description = this.editPollForm.controls.descriptionEditControl.value;
   poll.pollDate = this.editPollForm.controls.dateEditControl.value;
   poll.categoryId = this.editPollForm.controls.categoryEditControl.value;
   poll.poll_values= new Array()
   poll.poll_values.push({
    description:this.editPollForm.controls.option1EditControl.value,
    id:this.editPollForm.controls.option1EditId.value
  })
   poll.poll_values.push({
    description:this.editPollForm.controls.option2EditControl.value,
    id:this.editPollForm.controls.option2EditId.value
  })
   poll.poll_values.push({
    description:this.editPollForm.controls.option3EditControl.value,
    id:this.editPollForm.controls.option3EditId.value
  })
   poll.poll_values.push({
    description:this.editPollForm.controls.option4EditControl.value,
    id:this.editPollForm.controls.option4EditId.value
  })
   poll.poll_values.push({
    description:this.editPollForm.controls.option5EditControl.value,
    id:this.editPollForm.controls.option5EditId.value
  })
  poll.poll_values.forEach((poll_value)=>{
    poll_value.PollId=poll.id
  })
   this.dataService.editPoll(poll,this.editPollForm.controls.idControl.value).subscribe({
     next : ()=>{
       this.toastr.success('Se ha editado la encuesta', 'Éxito',{positionClass:'toast-bottom-right'})
       this.modalService.dismissAll();
       this.refreshPollList();
     },
     error: (error: HttpErrorResponse) => {
     if (error.status==409){
       this.toastr.error('Ya existe una encuesta en esa fecha', 'Fallo',{positionClass:'toast-bottom-right'})
     }else {
       this.toastr.error('Ya existe una encuesta en esa fecha', '🥺',{positionClass:'toast-bottom-right'})
     }}
    })
 }

openShow(content: any) {
   this.modalService.open(content, {ariaLabelledBy: 'modalShow'}).result
 }

openEdit(content: any, idPoll:number) {
   const poll = this.polls.find((poll: { id: number; }) =>poll.id===idPoll) ?? new Poll()
   this.editPollForm = new FormGroup({
     idControl:new FormControl({value:poll.id,disabled:true},[Validators.required,Validators.maxLength(50)]),
     descriptionEditControl: new FormControl(poll.description,[Validators.required]),
     dateEditControl: new FormControl(poll.pollDate,[Validators.required, Validators.maxLength(50)]),
     categoryEditControl: new FormControl(poll.categoryId,[Validators.required]),
     option1EditControl: new FormControl(poll.poll_values[0].description,[Validators.required, Validators.maxLength(15)]),
     option2EditControl: new FormControl(poll.poll_values[1].description,[Validators.required, Validators.maxLength(15)]),
     option3EditControl: new FormControl(poll.poll_values[2] ? poll.poll_values[2].description : '',[ Validators.maxLength(15)]),
     option4EditControl: new FormControl(poll.poll_values[3] ? poll.poll_values[3].description : '',[ Validators.maxLength(15)]),
     option5EditControl: new FormControl(poll.poll_values[4] ? poll.poll_values[4].description : '',[ Validators.maxLength(15)]),
     option1EditId: new FormControl(poll.poll_values[0].id,[Validators.required]),
     option2EditId: new FormControl(poll.poll_values[1].id,[Validators.required]),
     option3EditId: new FormControl(poll.poll_values[2] ? poll.poll_values[2].id : ''),
     option4EditId: new FormControl(poll.poll_values[3] ? poll.poll_values[3].id : ''),
     option5EditId: new FormControl(poll.poll_values[4] ? poll.poll_values[4].id : ''),
   })
   this.modalService.open(content, {ariaLabelledBy: 'modalEdit'}).result
 }

openDelete(content: any) {
   this.modalService.open(content, {ariaLabelledBy: 'modalDelete'}).result
 }

deletePoll(idPoll:number){
   this.dataService.delPoll(idPoll).subscribe({
     next : ()=>{
       this.toastr.success('Se ha borrado la encuesta', 'Éxito',{positionClass:'toast-bottom-right'})
       this.modalService.dismissAll();
       this.refreshPollList();
     },
     error: (error: HttpErrorResponse) => {
     if (error.status==200){
       this.toastr.success('Se ha borrado la encuesta', 'Éxito',{positionClass:'toast-bottom-right'})
       this.modalService.dismissAll();
       this.refreshPollList();
     }else {
      this.toastr.success('Se ha borrado la encuesta', 'Éxito',{positionClass:'toast-bottom-right'})
      this.modalService.dismissAll();
      this.refreshPollList();
     }}
    })
 }

 searchPoll() {
   let searchPoll:any, filter:any, table:any, tr:any, td, i, txtValue;
   searchPoll = document.getElementById("searchPoll");
   filter = searchPoll.value.toUpperCase();
   table = document.getElementById("pollList");
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

 refreshPollList(){
   this.dataService.getPolls().subscribe((response:RequestResponse<Poll[]>)=>{
     this.polls=response.data;
 })}
 onDateChange(){
  return null
 }
}

