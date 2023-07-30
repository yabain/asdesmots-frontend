import { formatDate } from '@angular/common';

// user representation
export class Level {
  _id: string;
  name: string;
  description: string;
  words: any;
  createAt: string;

  constructor(level?) {
    {
      this._id = level.id || '';
      this.name = level.name || '';
      this.description = level.description || '';
      this.words = level.words || '';
      this.createAt = formatDate(level.createAt, 'yyyy-MM-dd', 'en') || '';
    }
  }
}
