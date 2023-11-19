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
        name: 'Congo'
      },
      {
        id: 3,
        name: 'Gabon'
      },
      {
        id: 4,
        name: 'Guinée équatoriale'
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


      //Congo
      {
        id: 2,
        name: 'Bandundu'
      },
      {
        id: 2,
        name: 'Baraka'
      },
      {
        id: 2,
        name: 'Beni'
      },
      {
        id: 2,
        name: 'Boende'
      },
      {
        id: 2,
        name: 'Boma'
      },
      {
        id: 2,
        name: 'Bukavu'
      },
      {
        id: 2,
        name: 'Bunia'
      },
      {
        id: 2,
        name: 'Buta'
      },
      {
        id: 2,
        name: 'Butembo'
      },
      {
        id: 2,
        name: 'Gbadolite'
      },
      {
        id: 2,
        name: 'Gemena'
      },
      {
        id: 2,
        name: 'Goma'
      },
      {
        id: 2,
        name: 'Inongo'
      },
      {
        id: 2,
        name: 'Isiro'
      },
      {
        id: 2,
        name: 'Kabinda'
      },
      {
        id: 2,
        name: 'Kalemie'
      },
      {
        id: 2,
        name: 'Kamina'
      },
      {
        id: 2,
        name: 'Kananga'
      },
      {
        id: 2,
        name: 'Kenge'
      },
      {
        id: 2,
        name: 'Kikwit'
      },
      {
        id: 2,
        name: 'Kindu'
      },
      {
        id: 2,
        name: 'Kisangani'
      },
      {
        id: 2,
        name: 'Kinshasa'
      },
      {
        id: 2,
        name: 'Kolwezi'
      },
      {
        id: 2,
        name: 'Likasi'
      },
      {
        id: 2,
        name: 'Lisala'
      },
      {
        id: 2,
        name: 'Lubumbashi'
      },
      {
        id: 2,
        name: 'Lusambo'
      },
      {
        id: 2,
        name: 'Matadi'
      },
      {
        id: 2,
        name: 'Mbandaka'
      },
      {
        id: 2,
        name: 'Mbujimayi'
      },
      {
        id: 2,
        name: 'Muene-Ditu'
      },
      {
        id: 2,
        name: 'Tshikapa'
      },
      {
        id: 2,
        name: 'Uvira'
      },
      {
        id: 2,
        name: 'Zongo'
      },


      //Gabon
      {
        id: 3,
        name: 'Libreville'
      },
      {
        id: 3,
        name: 'Moanda'
      },
      {
        id: 3,
        name: 'Bitam'
      },
      {
        id: 3,
        name: 'Booué'
      },
      {
        id: 3,
        name: 'Cocobeach'
      },
      {
        id: 3,
        name: 'Fougamou'
      },
      {
        id: 3,
        name: 'Franceville'
      },
      {
        id: 3,
        name: 'Gamba'
      },
      {
        id: 3,
        name: 'Kango'
      },
      {
        id: 3,
        name: 'Koulamoutou'
      },
      {
        id: 3,
        name: 'Lambaréné'
      },
      {
        id: 3,
        name: 'Lastourville'
      },
      {
        id: 3,
        name: 'Lékoni'
      },
      {
        id: 3,
        name: 'Libreville'
      },
      {
        id: 3,
        name: 'Makokou'
      },
      {
        id: 3,
        name: 'Mayumba'
      },
      {
        id: 3,
        name: 'Mbigou'
      },
      {
        id: 3,
        name: 'Medouneu'
      },
      {
        id: 3,
        name: 'Mékambo'
      },
      {
        id: 3,
        name: 'Mitzic'
      },
      {
        id: 3,
        name: 'Mimongo'
      },
      {
        id: 3,
        name: 'Minvoul'
      },
      {
        id: 3,
        name: 'Mounana'
      },
      {
        id: 3,
        name: 'Moanda'
      },
      {
        id: 3,
        name: 'Mouila'
      },
      {
        id: 3,
        name: 'Ndendé'
      },
      {
        id: 3,
        name: 'Ndjolé'
      },
      {
        id: 3,
        name: 'Nkan'
      },
      {
        id: 3,
        name: 'Ntoum'
      },
      {
        id: 3,
        name: 'Okondja'
      },
      {
        id: 3,
        name: 'Omboué'
      },
      {
        id: 3,
        name: 'Oyem'
      },
      {
        id: 3,
        name: 'Port-Gentil'
      },
      {
        id: 3,
        name: 'Tchibanga'
      },
      {
        id: 3,
        name: 'Tsogni'
      },

      //Gunée équatoriale'
      {
        id: 4,
        name: 'Bata'
      },
      {
        id: 4,
        name: 'Malabo'
      },
      {
        id: 4,
        name: 'Ebebiyín'
      },
      {
        id: 4,
        name: 'Aconibe'
      },
      {
        id: 4,
        name: 'Añisoc'
      },
      {
        id: 4,
        name: 'Luba'
      },
      {
        id: 4,
        name: 'Evinayong'
      },
      {
        id: 4,
        name: 'Mongomo'
      },
      {
        id: 4,
        name: 'Mengomeyén'
      },
      {
        id: 4,
        name: 'Mikomeseng'
      },
      {
        id: 4,
        name: 'Rebola'
      },
      {
        id: 4,
        name: 'Bidjabidjan'
      },
      {
        id: 4,
        name: 'Niefang'
      },
      {
        id: 4,
        name: 'Cogo'
      },
      {
        id: 4,
        name: 'Nsok'
      },
      {
        id: 4,
        name: 'SAP'
      },
      {
        id: 4,
        name: 'Mbini'
      },
      {
        id: 4,
        name: 'Nsork'
      },
      {
        id: 4,
        name: 'Ayene'
      },
      {
        id: 4,
        name: 'Nkimi'
      },
      {
        id: 4,
        name: 'Machinda'
      },
      {
        id: 4,
        name: 'Acurenam'
      },
      {
        id: 4,
        name: 'Corisco'
      },
      {
        id: 4,
        name: 'Baney'
      },
      {
        id: 4,
        name: 'Bicurga'
      },
      {
        id: 4,
        name: 'Nsang'
      }
    ];
  }
}
