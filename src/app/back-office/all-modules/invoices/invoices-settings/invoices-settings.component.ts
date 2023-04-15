import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
declare var $: any;
@Component({
  selector: 'app-invoices-settings',
  templateUrl: './invoices-settings.component.html',
  styleUrls: ['./invoices-settings.component.css']
})
export class InvoicesSettingsComponent implements OnInit {

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
