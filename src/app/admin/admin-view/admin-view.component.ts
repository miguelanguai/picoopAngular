import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { WebData } from '../model/WebData';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss']
})
export class AdminViewComponent implements OnInit {

  webData:WebData;

  constructor(
   private adminService: AdminService,
  ) { }

  ngOnInit(): void {
    this.getData();
    console.log("hola");
    

  }

  getData():void{
    this.adminService.getWebData().subscribe(data=>{
      this.webData=data;
    })
  }
}
