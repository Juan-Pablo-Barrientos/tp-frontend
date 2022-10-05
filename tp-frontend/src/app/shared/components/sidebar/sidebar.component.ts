import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faHouse, faPencil } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Poll } from 'src/app/models/poll';
import { DataService } from '../../services/data.service';
@Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  mostClickedPosts : any[] = [];
  todayPoll:Poll= new Poll()
  pollRadioForm:any
  faPencil=faPencil
  faHouse=faHouse

  constructor(public authService:AuthService, private dataService:DataService, private router:Router) { }

  ngOnInit(): void {

    this.pollRadioForm = new FormGroup({
      poll_values: new FormControl('')
    })
    this.dataService.todayPoll$.subscribe((response)=>{
      if(response.data){
      this.todayPoll=response.data
      if (this.router.url==='/'){
        console.log("sda")
        let request:any={
          userId: this.authService.loggedUser.id,
          pollId: response.data.id
        }
        this.pollRadioForm.controls.poll_values.setValue('')
        this.dataService.getLoggedUserVote(request).subscribe((response)=>{
          this.pollRadioForm.controls.poll_values.setValue(response.data.pollValueId)
        })}
    }
    })



    this.dataService.mostClickedPosts$.subscribe((response) => {
      if (response.data) {
        this.mostClickedPosts = response.data.slice(0,5);
      }
    });
  }

  votePoll(){
    let voteRequest = {
      pollId:this.todayPoll.id,
      pollValueId:this.pollRadioForm.controls.poll_values.value,
      userId:this.authService.loggedUser.id
    }
    this.dataService.votePoll(voteRequest).subscribe(()=>{
      this.dataService.getTodayPoll().subscribe((response)=>{
        this.todayPoll=response.data
          let request:any={
          userId: this.authService.loggedUser.id,
          pollId: response.data.id
          }
          this.dataService.getLoggedUserVote(request).subscribe((response)=>{
            this.pollRadioForm.controls.poll_values.setValue(response.data.pollValueId)
          })
      })})
  }


 }


