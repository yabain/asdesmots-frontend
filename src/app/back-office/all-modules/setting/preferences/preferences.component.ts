import { Component, OnInit,TemplateRef  } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {CommonServiceService  } from 'src/app/shared/services/common-service.service';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit {
	constructor(public commonService:CommonServiceService,private modalService: BsModalService) { }

  ngOnInit(): void {


  }



}
