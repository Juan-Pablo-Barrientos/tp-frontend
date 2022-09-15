import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/service/auth.service';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {

  postDetails: any;
  idPost : string;
  constructor(private dataService: DataService, private router:Router, private route: ActivatedRoute, public authService:AuthService, private toastr:ToastrService) {
    this.idPost = this.route.snapshot.paramMap.get("id")!;
  }

  ngOnInit(): void {
    this.dataService.getPostsByIdWithAuthor(parseInt(this.idPost)).subscribe((response: any) => {
      this.postDetails = response.data;
      console.log(this.postDetails);
    });
  }

  onClickDeleteButton(){
    this.dataService.deletePost(this.idPost).subscribe(async (res:any) => {
      console.log(res)
      if (!res.error){
        this.toastr.success('La noticia fue borrada', 'Éxito',{positionClass:'toast-bottom-right'});
        this.router.navigate(['/home']);
      }else{
        this.toastr.error('La noticia fue borrada', '🥺',{positionClass:'toast-bottom-right'});
      }
    })
  }
}
