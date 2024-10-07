import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  transform(value: string): string {
    // Créer un objet Date ajusté au fuseau horaire du client
    let date = new Date(value);

    // Extraire l'année, le mois et le jour
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Ajouter un zéro si nécessaire
    let day = date.getDate().toString().padStart(2, '0');  // Ajouter un zéro si nécessaire

    // Extraire les heures et minutes
    let hours = date.getHours().toString().padStart(2, '0');  // Ajouter un zéro si nécessaire
    let minutes = date.getMinutes().toString().padStart(2, '0');  // Ajouter un zéro si nécessaire

    // Calculer le décalage en minutes entre UTC et l'heure locale
    const timezoneOffset = -date.getTimezoneOffset(); // En minutes, inversé pour obtenir la valeur correcte
    const offsetHours = Math.floor(timezoneOffset / 60); // Obtenir les heures
    const offsetMinutes = timezoneOffset % 60; // Obtenir les minutes restantes
    const gmtSign = offsetHours >= 0 ? '+' : '-'; // Signe du décalage

    // Construire le format GMT (ex: GMT+1 ou GMT-04:30)
    const gmtOffset = `GMT${gmtSign}${Math.abs(offsetHours).toString()}:${Math.abs(offsetMinutes).toString().padStart(2, '0')}`;

    // Retourner la date formatée avec le décalage horaire GMT
    return `${day}/${month}/${year} ${hours}:${minutes} (${gmtOffset})`;
  }
}
