import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-arcade-competititon',
  templateUrl: './competititon.component.html',
  styleUrls: ['./competititon.component.css'],
})
export class CompetititonComponent implements OnInit {
  @Input() competition: any;

  competitions: any[] = [
    {
      name: 'Olympiades Juniors',
      gameState: 'NO_START',
      description: 'Compétition pour les jeunes athlètes.',
      _id: '1',
      parent_Id: null,
      children: [
        {
          name: 'Athlétisme',
          gameState: 'NO_START',
          parentCompetition: 'jFG',
          description: "Compétitions d'athlétisme pour les juniors.",
          _id: '2',
          parent_Id: '1',
          children: [
            {
              name: 'Athlétisme child',
              gameState: 'NO_START',
              parentCompetition: 'jFG',
              description: "Sous-catégorie de l'athlétisme.",
              _id: '3',
              parent_Id: '2',
              children: [
                {
                  name: 'Athlétisme',
                  gameState: 'NO_START',
                  parentCompetition: 'jFG',
                  description: "Compétition d'athlétisme.",
                  _id: '4',
                  parent_Id: '3',
                },
              ],
            },
          ],
        },
        {
          name: 'Natation',
          gameState: 'NO_START',
          parentCompetition: 'jFG',
          description: 'Compétitions de natation pour les juniors.',
          _id: '5',
          parent_Id: '1',
        },
        {
          name: 'Gymnastique',
          gameState: 'NO_START',
          parentCompetition: 'jFG',
          description: 'Compétitions de gymnastique pour les juniors.',
          _id: '6',
          parent_Id: '1',
        },
      ],
    },
    {
      name: 'Festival des Arts',
      category: 'artistiques',
      description: 'Festival des arts pour les jeunes talents.',
      _id: '7',
      parent_Id: null,
      children: [
        {
          name: 'Peinture',
          gameState: 'NO_START',
          parentCompetition: 'jFG',
          description: 'Compétitions de peinture pour les juniors.',
          _id: '8',
          parent_Id: '7',
        },
        {
          name: 'Sculpture',
          gameState: 'NO_START',
          parentCompetition: 'jFG',
          description: 'Compétitions de sculpture pour les juniors.',
          _id: '9',
          parent_Id: '7',
        },
        {
          name: 'Théâtre',
          gameState: 'NO_START',
          parentCompetition: 'jFG',
          description: 'Compétitions de théâtre pour les juniors.',
          _id: '10',
          parent_Id: '7',
        },
      ],
    },
    {
      name: 'Défi des Petits Génies',
      category: 'academiques',
      description: 'Défi académique pour les jeunes génies.',
      _id: '11',
      parent_Id: null,
      children: [
        {
          name: 'Mathématiques',
          gameState: 'NO_START',
          description: 'Compétitions de mathématiques pour les juniors.',
          _id: '12',
          parent_Id: '11',
        },
        {
          name: 'Sciences',
          gameState: 'NO_START',
          description: 'Compétitions de sciences pour les juniors.',
          _id: '13',
          parent_Id: '11',
        },
        {
          name: 'Histoire',
          gameState: 'NO_START',
          description: "Compétitions d'histoire pour les juniors.",
          _id: '14',
          parent_Id: '11',
        },
      ],
    },
    {
      name: "Tournoi d'Échecs Junior",
      category: 'academiques',
      description: "Tournoi d'échecs pour les jeunes joueurs.",
      _id: '15',
      parent_Id: null,
      children: [
        {
          name: 'Blitz',
          gameState: 'NO_START',
          description: 'Compétitions de blitz pour les juniors.',
          _id: '16',
          parent_Id: '15',
        },
        {
          name: 'Classique',
          gameState: 'NO_START',
          description: "Compétitions d'échecs classiques pour les juniors.",
          _id: '17',
          parent_Id: '15',
        },
        {
          name: 'Rapide',
          gameState: 'NO_START',
          description: "Compétitions d'échecs rapides pour les juniors.",
          _id: '18',
          parent_Id: '15',
        },
      ],
    },
  ];
  
  

  constructor() {
  
  }
  
  ngOnInit() {}

  startGame(competitionId: string) {
    // Logique pour démarrer une compétition
  }
}
