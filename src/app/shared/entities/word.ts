import { formatDate } from '@angular/common';

// user representation
export class Word {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  type: string;


  constructor(word) {
    {
      this._id = word.id || '';
      this.name = word.name || '';
      this.description = word.description || '';
      this.createdAt = word.createdAt || '';
      this.type = word.type || '';
    }
  }
}
