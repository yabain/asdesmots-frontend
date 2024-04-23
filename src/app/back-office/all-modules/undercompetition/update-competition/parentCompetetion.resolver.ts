import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { SousCompetitionService } from '../services/sous-competition.service';
import { SousCompetion } from 'src/app/shared/entities/scompetion.model';
import { ArcardeService } from '../../arcarde/services/arcarde.service';

@Injectable({
  providedIn: 'root'
})

export class CompetitionResolver implements Resolve<SousCompetion> {
  // parentCompetitionName: any;
  parentCompetition: SousCompetion;
  currentCompetition: SousCompetion;
  constructor(private competitionService: SousCompetitionService,
              private arcardeService: ArcardeService,
              private route: ActivatedRoute
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SousCompetion> | Promise<SousCompetion> | SousCompetion {
    // const competitionId = this.route.snapshot.params['id'];
    const competitionId = route.params['id'];
    console.log("idUnderCompetition: ", competitionId);
    if (competitionId) {
      // Trouver la compétition courante dans la liste existante
      console.log("list all underCompetition: ", this.arcardeService.listUnderCompetion);
       this.currentCompetition = this.arcardeService.listUnderCompetion.find(competition => competition._id === competitionId);
      console.log("current competition: ", this.currentCompetition);
      if (this.currentCompetition && this.currentCompetition.parentCompetition) {
        // Si la compétition courante a un attribut parentCompetition, trouver la compétition parente
        if (typeof this.currentCompetition.parentCompetition === "string") {
          console.log("hey!!!!!");
          console.log("Compétition courante avec parentCompetition en chaîne : ", this.currentCompetition);
          this.parentCompetition = this.arcardeService.listUnderCompetion.find(competition => competition._id === this.currentCompetition.parentCompetition);
          this.currentCompetition.parentCompetition = this.parentCompetition;
          // this.parentCompetitionName = this.parentCompetition ? this.parentCompetition.name : '';
          console.log("Compétition courante avec parentCompetition en objet : ", this.currentCompetition);
          return this.currentCompetition;
        } else if (typeof this.currentCompetition.parentCompetition === "object") {
          // S'il n'y a pas de parentCompetition, renvoyer null
          console.log("hiiiiii!!!!!");
          console.log("compétition resolue: ", this.currentCompetition);
          return this.currentCompetition;
        } else {
          return of(null);
        }
      } else {
        // Si la compétition courante n'est pas trouvée, et parentCompetition est undifined renvoyer une erreur ou null
        console.log("nein");
        return this.currentCompetition; // Ou gérer l'erreur de manière appropriée
      }
    } else {
      // Si aucun competitionId n'est fourni, renvoyer une erreur ou null
      return of(null); // Ou gérer l'erreur de manière appropriée
    }
  }
}
