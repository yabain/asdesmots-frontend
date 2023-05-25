import { Component, OnInit } from '@angular/core';
import { Event, Router, NavigationStart } from '@angular/router';
import * as Feather from 'feather-icons';
import * as ApexCharts from 'apexcharts';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
declare var $: any;

@Component({
  selector: 'app-dashboard-three',
  templateUrl: './dashboard-three.component.html',
  styleUrls: ['./dashboard-three.component.css']
})
export class DashboardThreeComponent implements OnInit {
  public chartOptions:any
  constructor(
    public router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    $('#sidebar-menu a').on('click', function (this:any,e:any) {
			if ($(this).parent().hasClass('submenu')) {
				e.preventDefault();
			}
			if (!$(this).hasClass('subdrop')) {
				$('ul', $(this).parents('ul:first')).slideUp(350);
				$('a', $(this).parents('ul:first')).removeClass('subdrop');
				$(this).next('ul').slideDown(350);
				$(this).addClass('subdrop');
			} else if ($(this).hasClass('subdrop')) {
				$(this).removeClass('subdrop');
				$(this).next('ul').slideUp(350);
			}
		});

    $(document).on('mouseover', function(e:any) {
      e.stopPropagation();
      if($('body').hasClass('mini-sidebar') && $('.toggle-dashthree').is(':visible')) {
          var targ = $(e.target).closest('.sidebar').length;
          if(targ) {
              $('body').addClass('expand-menu');
              $('.subdrop + ul').slideDown();
          } else {
              $('body').removeClass('expand-menu');
              $('.subdrop + ul').slideUp();
          }
          return false;
      }
  });
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
      colors: ['#7638ff', '#fda600'],
      series: [
        {
        name: "Received",
        type: "column",
        data: [70, 150, 80, 180, 150, 175, 201, 60, 200, 120, 190, 160, 50]
        },
        {
        name: "Pending",
        type: "column",
        data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16, 80]
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
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      },
      yaxis: {
        title: {
          text: 'XAF (Franc CFA)'
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val:any) {
            return "XAF " + val + " thousands"
          }
        }
      }
    };

    var chart = new ApexCharts(document.querySelector("#sales_chart"), options1);
    chart.render();
  }

  ngAfterViewInit() {
    Feather.replace();
  }
  burgerMenu() {
    if($('body').hasClass('mini-sidebar')) {
      $('body').removeClass('mini-sidebar');
      $('.subdrop + ul').slideDown();
    } else {
      $('body').addClass('mini-sidebar');
      $('.subdrop + ul').slideUp();
    }
    return false;
  }

  Logout(){
    this.authService.logOut();
  }
}
