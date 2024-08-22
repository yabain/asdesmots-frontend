import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-part-modal',
  templateUrl: './create-part-modal.component.html',
  styleUrls: ['./create-part-modal.component.css']
})
export class CreatePartModalComponent implements OnInit {

  @Input() competitionId: string;
  loading: boolean = false;
  fetching: boolean = false;

  createForm : FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm = this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        gameCompetitionID: ['', Validators.required],
        numberOfWord: ['', Validators.required],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required]
    });
  }

  addPart() {}

}
