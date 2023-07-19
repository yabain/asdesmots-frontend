import { formatDate } from '@angular/common';

// user representation
export class Word {
  id: string;
  name: string;
  description: string;
  gameLevelId: string;
  type: string;


  constructor(word) {
    {
      this.id = word.id || '';
      this.name = word.name || '';
      this.description = word.description || '';
      this.gameLevelId = word.gameLevelId || '';
      this.type = word.type || '';
    }
  }
}
