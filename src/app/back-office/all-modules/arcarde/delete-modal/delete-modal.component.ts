import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Arcarde } from 'src/app/shared/entities/arcarde.model';
import { ArcardeService } from '../services/arcarde.service';

@Component({
  selector: 'app-delete-arcade-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit {

  @Input() arcadeData: Arcarde;
  waiting: boolean = false;

  constructor(
    public arcadeServ: ArcardeService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  delete() {
    this.waiting = true;
    this.arcadeServ.deleteArcarde(this.arcadeData._id).then(() => {
      this.waiting = false;
      $('#cancel-btn00').click();
    });
  }
}
