import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor() { }
  country() {
    return [
      {
        id: 1,
        name: 'Cameroon'
      },
      {
        id: 2,
        name: 'France'
      },
      {
        id: 3,
        name: 'Belgique'
      },
    ];
  }

  city() {
    return [
      //Cameroun
      {
        id: 1,
        name: 'Bafang'
      },
      {
        id: 1,
        name: 'Bafia'
      },
      {
        id: 1,
        name: 'Bafoussam'
      },
      {
        id: 1,
        name: 'Bamenda'
      },
      {
        id: 1,
        name: 'Bangangté'
      },
      {
        id: 1,
        name: 'Buéa'
      },
      {
        id: 1,
        name: 'Douala'
      },
      {
        id: 1,
        name: 'Dschang'
      },
      {
        id: 1,
        name: 'Ebolowa'
      },
      {
        id: 1,
        name: 'Foumban'
      },
      {
        id: 1,
        name: 'Garoua'
      },
      {
        id: 1,
        name: 'Kaélé'
      },
      {
        id: 1,
        name: 'Koussérie'
      },
      {
        id: 1,
        name: 'Kribi'
      },
      {
        id: 1,
        name: 'Mbalmayo'
      },
      {
        id: 1,
        name: 'Mbanga'
      },
      {
        id: 1,
        name: 'Nagoundéré'
      },
      {
        id: 1,
        name: 'Sangmélima'
      },
      {
        id: 1,
        name: 'Yagoua'
      },
      {
        id: 1,
        name: 'Yaoundé'
      },


      // France
      {
        id: 2,
        name: 'Angers'
      },
      {
        id: 2,
        name: 'Bordeaux'
      },
      {
        id: 2,
        name: 'Caen'
      },
      {
        id: 2,
        name: 'Dijion'
      },
      {
        id: 2,
        name: 'Granoble'
      },
      {
        id: 2,
        name: 'Lille'
      },
      {
        id: 2,
        name: 'Lyon'
      },
      {
        id: 2,
        name: 'Marseil'
      },
      {
        id: 2,
        name: 'Monpellier'
      },
      {
        id: 2,
        name: 'Nantes'
      },
      {
        id: 2,
        name: 'Nice'
      },
      {
        id: 2,
        name: 'Paris'
      },
      {
        id: 2,
        name: 'Reims'
      },
      {
        id: 2,
        name: 'Rennes'
      },
      {
        id: 2,
        name: 'Saint-Etienne'
      },
      {
        id: 2,
        name: 'Strasbourg'
      },
      {
        id: 2,
        name: 'Toulon'
      },
      {
        id: 2,
        name: 'Toulouse'
      },

      //Belgique
      {
        id: 3,
        name: 'Anvers'
      },
      {
        id: 3,
        name: 'Brugues'
      },
      {
        id: 3,
        name: 'Bruxelles'
      },
      {
        id: 3,
        name: 'Dinant'
      },
      {
        id: 3,
        name: 'Gand'
      },
      {
        id: 3,
        name: 'Liège'
      },
      {
        id: 3,
        name: 'Louvain'
      },
      {
        id: 3,
        name: 'Mons'
      },
      {
        id: 3,
        name: 'Namur'
      },
      {
        id: 3,
        name: 'Ostende'
      },
    ];
  }
}
