import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
  ViewChild
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as ApexCharts from 'apexcharts';
import { TranslationService } from 'src/app/services/translation/language.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public chartOptions:any

  constructor(
    private translate: TranslateService,
    private translationService: TranslationService
  ) {
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  ngOnInit(): void {
    this.scrollToTop();
    this.translate.use(this.translationService.getLanguage());

    var options = {
      colors: ['#7638ff', '#ff737b', '#fda600', '#1ec1b0'],
      series: [55, 40, 20, 10],
      chart: {
        fontFamily: 'Poppins, sans-serif',
        height: 350,
        type: 'donut',
      },
      labels: ['Paid', 'Unpaid', 'Overdue', 'Draft'],
      legend: {show: false},
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    };

    var chart = new ApexCharts(document.querySelector("#invoice_chart"), options);
    chart.render();

    var options1 = {
      colors: ['#dc3545', '#22cc62', '#fda600', '#7638ff'],
      series: [
        {
          name: "Mega Million",
        type: "column",
        data: [50, 100, 85, 67, 93, 32, 27, 41, 122, 212, 160, 65, 80]
        },
        {
        name: "Euro Million",
        type: "column",
        data: [70, 150, 80, 180, 150, 175, 201, 60, 200, 120, 190, 160, 50]
        },
        {
        name: "Bingo",
        type: "column",
        data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16, 100]
        },
        {
        name: "Lotto",
        type: "column",
        data: [30, 20, 15, 60, 10, 200, 17, 63, 97, 30, 55, 6, 180]
        }
      ],
      chart: {
        type: 'bar',
        fontFamily: 'Poppins, sans-serif',
        height: 350,
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
        horizontal: false,
        columnWidth: '60%',
        endingShape: 'rounded'
      },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct','Nov', 'Dec', 'Jan'],
      },
      yaxis: {
        title: {
          text: '€ (thousands)'
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val:any) {
            return "€ " + val + " thousands"
          }
        }
      }
    };

    var chart = new ApexCharts(document.querySelector("#sales_chart"), options1);
    chart.render();
    // Column chart
    // var columnCtx = document.getElementById("sales_chart"),
    // columnConfig = {
    //   colors: ['#7638ff', '#fda600'],
    //   series: [
    //     {
    //     name: "Received",
    //     type: "column",
    //     data: [70, 150, 80, 180, 150, 175, 201, 60, 200, 120, 190, 160, 50]
    //     },
    //     {
    //     name: "Pending",
    //     type: "column",
    //     data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16, 80]
    //     }
    //   ],
    //   chart: {
    //     type: 'bar',
    //     fontFamily: 'Poppins, sans-serif',
    //     height: 350,
    //     toolbar: {
    //       show: false
    //     }
    //   },
    //   plotOptions: {
    //     bar: {
    //       horizontal: false,
    //       columnWidth: '60%',
    //       endingShape: 'rounded'
    //     },
    //   },
    //   dataLabels: {
    //     enabled: false
    //   },
    //   stroke: {
    //     show: true,
    //     width: 2,
    //     colors: ['transparent']
    //   },
    //   xaxis: {
    //     categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    //   },
    //   yaxis: {
    //     title: {
    //       text: '€ (thousands)'
    //     }
    //   },
    //   fill: {
    //     opacity: 1
    //   },
    //   tooltip: {
    //     y: {
    //       formatter: function (val) {
    //         return "€ " + val + " thousands"
    //       }
    //     }
    //   }
    // };
    // var columnChart = new ApexCharts(columnCtx, columnConfig);
    // columnChart.render();

    // //Pie Chart
    // var pieCtx = document.getElementById("invoice_chart"),
    // pieConfig = {
    //   colors: ['#7638ff', '#ff737b', '#fda600', '#1ec1b0'],
    //   series: [55, 40, 20, 10],
    //   chart: {
    //     fontFamily: 'Poppins, sans-serif',
    //     height: 350,
    //     type: 'donut',
    //   },
    //   labels: ['Paid', 'Unpaid', 'Overdue', 'Draft'],
    //   legend: {show: false},
    //   responsive: [{
    //     breakpoint: 480,
    //     options: {
    //       chart: {
    //         width: 200
    //       },
    //       legend: {
    //         position: 'bottom'
    //       }
    //     }
    //   }]
    // };
    // var pieChart = new ApexCharts(pieCtx, pieConfig);
    // pieChart.render();
  }
}
