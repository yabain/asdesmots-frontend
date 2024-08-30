import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Arcarde } from 'src/app/shared/entities/arcarde.model';
import { TranslationService } from 'src/app/shared/services/translation/language.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { ArcardeService } from '../services/arcarde.service';
import { ActivatedRoute, Router } from '@angular/router';
import { State } from 'src/app/shared/entities/state.enum';
import { DataTableTranslateService } from 'src/app/services/data-table-translate.service';

@Component({
  selector: 'app-list-arcarde',
  templateUrl: './list-arcarde.component.html',
  styleUrls: ['./list-arcarde.component.css'],
})
export class ListArcardeComponent implements OnInit {
  arcadeData: Arcarde = new Arcarde();
  userID: string = '';
  gameState = State;
  arcades: Arcarde[] = [];
  listUnderCompetion: any[] = [];
  listLocationArcarde: any[] = [];
  loading: boolean = true;
  placeholders = Array.from({ length: 12 }); // Crée un tableau de 8 éléments

  constructor(
    public userServ: UserService,
    public arcadeServ: ArcardeService,
    public dataTableTranslateService: DataTableTranslateService,
  ) { }

  ngOnInit(): void {
    this.getArcades();
  }

  getArcades() {
    this.arcadeServ.getAllArcades().then((response: any) => {
      this.arcades = response.data;
      response.data?.forEach((arcade) => {
        this.listUnderCompetion = [...arcade.competitionGames];
        if (arcade.competitionGames.length > 0) {
          arcade.competitionGames.forEach((compet) => {
            if (compet.localisation.toString()) {
              this.listLocationArcarde = [...compet.localisation];
            }
          });
        }
        this.loading = false;
      });
    })
    .catch(error => {
      console.error(error);
      this.loading = false;
    });
  }

  deletedFeedback(newValue: string) {
    if(newValue)
      this.getArcades();
  }
}
