import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-avatar-photo',
  templateUrl: './avatar-photo.component.html',
  styleUrls: ['./avatar-photo.component.css'],
})
export class AvatarPhotoComponent implements OnInit {
  @Input()
  photoUrl: string;

  @Input()
  name: string;

  showInitials = false;
  initials: string;
  circleColor: string;

  private colors = [
    '#A4262C', //MexicanRed
    '#5C2E91', //Eminence
    '#8764B8', //Wisteria
    '#3063AD', //Primary
    '#750B1C', //Monarch
    '#0B6A0B', //PersianRed
    '#750B1C', //SanFelix
    '#0078D4', //Lochmara
    '#498205', //Limeade
    '#038387', //BlueLagoon
    '#4F6BED', //RoyalBlue
    '#C239B3', //FuchsiaPink
    '#005B70', //BlueStone
    '#DA3A00', //Grenadier
  ];

  constructor(private http: HttpClient) {}
  
  ngOnInit() {
    if (!(this.photoUrl && this.verifyImageUrl())) {
      this.showInitials = true;
      this.createInititals();

      const randomIndex = Math.floor(
        Math.random() * Math.floor(this.colors.length)
      );
      this.circleColor = this.colors[randomIndex];
    }
  }

  private createInititals(): void {
    const nameParts = this.name.split(' ');
    this.initials =
      nameParts[0]?.charAt(0).toUpperCase() +
      (nameParts[1]?.charAt(0).toUpperCase() ?? '') +
      (nameParts[2]?.charAt(0).toUpperCase() ?? '');
  }

  verifyImageUrl(): Observable<boolean> {
    return this.http.get(this.photoUrl, { responseType: 'blob' }).pipe(
      map(() => true),
      catchError((error: HttpErrorResponse) => {
        console.error(`Image not found or invalid URL: ${error.message}`);
        return of(false);
      })
    );
  }
}
