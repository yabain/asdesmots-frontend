import { Component, OnInit } from '@angular/core';
declare const $: any;
@Component({
  selector: 'app-mapvector',
  templateUrl: './mapvector.component.html',
  styleUrls: ['./mapvector.component.css']
})
export class MapvectorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('#world_map').vectorMap({
    map: 'world_mill',
    scaleColors : ['#03a9f4', '#03a9f4'],
    normalizeFunction : 'polynomial',
    hoverOpacity : 0.7,
    hoverColor : false,
    regionStyle : {
      initial : {
        fill : '#7638ff'
      }
    },
    backgroundColor : 'transparent'
  });
  $('#usa').vectorMap({
    map: 'us_aea',
    scaleColors : ['#03a9f4', '#03a9f4'],
    normalizeFunction : 'polynomial',
    hoverOpacity : 0.7,
    hoverColor : false,
    regionStyle : {
      initial : {
        fill : '#7638ff'
      }
    },
    backgroundColor : 'transparent'
  });
  $('#india').vectorMap({
    map : 'in_mill',
    backgroundColor : 'transparent',
    regionStyle : {
      initial : {
        fill : '#7638ff'
      }
    }
  });
  $('#uk').vectorMap({map: 'uk_countries_mill',backgroundColor: 'transparent',
        regionStyle: {
        initial: {
          fill: '#7638ff'
        }
        }});
  $('#russia').vectorMap({
    map: 'ru_mill',
    backgroundColor: 'transparent',
        regionStyle: {
        initial: {
          fill: '#7638ff'
        }
        }});
  }

}
