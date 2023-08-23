import { Injectable } from '@angular/core';
import { SousCompetion } from 'src/app/shared/entities/scompetion.model';

@Injectable({
  providedIn: 'root'
})
export class GameplayService {
  listCompetitionOnComming: SousCompetion[] = [
    {
      name: 'Competition des mots 1',
      description: 'Instructif ....',
      startDate: '11/12/2023',
      endDate: '12/12/2023',

    },
    {
      name: 'Competition Orange',
      description: 'Passionants ...',
      startDate: '8/12/2023',
      endDate: '9/12/2023',

    }
  ];

  listCompetitionStart: SousCompetion[] = [
    {
      name: 'Competition Centre linguistique',
      description: 'Passionants ...',
      maxPlayerLife: 5,
      maxTimeToPlay: 20,
      maxOfWinners: 1,
      gameLevel: 'Beginner'
    }
  ]
  constructor() { }
}
