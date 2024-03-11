import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SousCompetitionService } from '../services/sous-competition.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/shared/entities/user';

@Component({
  selector: 'app-list-participants',
  templateUrl: './list-participants.component.html',
  styleUrls: ['./list-participants.component.css']
})
export class ListParticipantsComponent implements OnInit {

  idCompetition: string = '';
  participantChooseData: User = new User();
  listParticipants: User[] = [];

  constructor(
    public competitionSrv: SousCompetitionService,
    private route:ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.idCompetition = this.route.snapshot.params['id'];
    this.getListParticipant();
  }

  async getListParticipant(){

    await this.competitionSrv.getListParticipants(this.idCompetition)
    .then((listParticipants) => {
      this.listParticipants = listParticipants;
      this.changeDetectorRef.detectChanges();
    })
    .catch((error) => {
      console.log('Erreur lors de la tentative de recuperation de la liste de participants : '+ error);
    })
  }


}
