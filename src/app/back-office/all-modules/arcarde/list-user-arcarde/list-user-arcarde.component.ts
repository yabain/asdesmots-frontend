import { Component, OnInit } from '@angular/core';
import { ArcardeService } from '../services/arcarde.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-user-arcarde',
  templateUrl: './list-user-arcarde.component.html',
  styleUrls: ['./list-user-arcarde.component.css']
})
export class ListUserArcardeComponent implements OnInit {
  idArcard: string = '';

  constructor(public arcardeServ: ArcardeService, private activedRouter: ActivatedRoute) { }

  ngOnInit(): void {

  }



}
