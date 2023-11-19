import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
@Component({
  selector: 'app-tax-settings',
  templateUrl: './tax-settings.component.html',
  styleUrls: ['./tax-settings.component.css']
})
export class TaxSettingsComponent implements OnInit {

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
