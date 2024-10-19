
import { NgModule } from '@angular/core';
import { OncommingListPlaceholderComponent } from '../back-office/all-modules/game-play/oncomming/oncomming-list-placeholder/oncomming-list-placeholder.component';
import { CommonModule } from '@angular/common';



@NgModule( {
       imports: [
              CommonModule
       ],
       declarations: [
              OncommingListPlaceholderComponent, // Déclaration du composant ici
       ],

       exports: [

              OncommingListPlaceholderComponent, // Export du composant ici

       ],

} )
export class SharedModule2 { }
