import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SpeakService {
  constructor() { }
  
  speak(word, lang) {
    if(lang ==='en') {
      lang = 'en-GB';
    } else if(lang ==='fr') {
      lang = 'fr-FR';
    }
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = lang;
    speechSynthesis.speak(utterance);
  }
}
