import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScriptLoaderService {
  private scripts: string[] = [];

  constructor() {}

  loadScript(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.scripts.includes(url)) {
        resolve();
      } else {
        const script = document.createElement('script');
        script.src = url;
        script.onload = () => {
          this.scripts.push(url);
          resolve();
        };
        script.onerror = () => {
          reject();
        };
        document.body.appendChild(script);
      }
    });
  }
}

