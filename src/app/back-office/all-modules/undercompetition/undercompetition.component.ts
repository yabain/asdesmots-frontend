import { Component, OnInit } from '@angular/core';
import { SousCompetitionService } from './services/sous-competition.service';
import { SousCompetion } from 'src/app/shared/entities/scompetion.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArcardeService } from '../arcarde/services/arcarde.service';

@Component({
  selector: 'app-undercompetition',
  templateUrl: './undercompetition.component.html',
  styleUrls: ['./undercompetition.component.css']
})
export class UndercompetitionComponent implements OnInit {
    constructor(){}
    ngOnInit(): void {
    }
  }
