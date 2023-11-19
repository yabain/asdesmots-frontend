import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';

@Component({
  selector: 'app-bank-settings',
  templateUrl: './bank-settings.component.html',
  styleUrls: ['./bank-settings.component.css']
})
export class BankSettingsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.loadfeather("assets/plugins/icons/feather/feather.css")
  }
  loadfeather(js:any) {
    var script = document.createElement('link');
    script.href = js;
    script.rel = "stylesheet"
    document.head.appendChild(script);
  }
}
