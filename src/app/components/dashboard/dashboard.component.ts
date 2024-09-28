import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material.module';
import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexLegend,
  ApexStroke,
  ApexTooltip,
  ApexAxisChartSeries,
  ApexPlotOptions,
  NgApexchartsModule,
  ApexFill,
} from 'ng-apexcharts';
import { TablerIconsModule } from 'angular-tabler-icons';

export interface revenueForecastChart {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  fill: ApexFill;
}

interface model {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MaterialModule, TablerIconsModule, NgApexchartsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class AppDashboardComponent {
  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  public revenueForecastChart!: Partial<revenueForecastChart> | any;

  models: model[] = [
    { value: 'v1.01', viewValue: 'v1.01' },
    { value: 'v1.02', viewValue: 'v1.02' },
    { value: 'v1.03', viewValue: 'v1.03' },
  ];

  constructor() {
    this.revenueForecastChart = {
      series: [
        {
          name: 'v1.03',
          data: [0.85, 0.87, 0.83, 0.88, 0.86, 0.90, 0.89, 0.87, 0.91],
        },
        {
          name: 'v1.02',
          data: [0.80, 0.82, 0.79, 0.83, 0.85, 0.86, 0.88, 0.85, 0.89],
        },
        {
          name: 'v1.01',
          data: [0.75, 0.78, 0.76, 0.80, 0.82, 0.81, 0.83, 0.84, 0.86],
        },
      ],

      chart: {
        type: 'line', // Changed to 'line'
        fontFamily: 'inherit',
        foreColor: '#adb0bb',
        height: 295,
        toolbar: {
          show: false,
        },
      },
      colors: ['rgba(99, 91, 255, 1)', 'rgba(255, 102, 146,1)', 'rgba(0, 204, 153,1)'],
      stroke: {
        width: 2, // Width of the line
        curve: 'smooth', // Make the line smooth
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: true, // Enable legend to differentiate models
        position: 'top',
      },
      grid: {
        show: true,
        padding: {
          top: 0,
          bottom: 0,
          right: 0,
        },
        borderColor: 'rgba(0,0,0,0.05)',
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },

      yaxis: {
        min: 0.7,
        max: 1.0,
        tickAmount: 6,
        title: {
          text: 'Precisión del modelo (%)',
          style: {
            color: '#adb0bb',
          },
        },
      },
      xaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        categories: [
          'Enero',
          'Febrero',
          'Marzo',
          'Abril',
          'Mayo',
          'Junio',
          'Julio',
          'Agosto',
          'Septiembre',
        ],
        labels: {
          style: { fontSize: '13px', colors: '#adb0bb', fontWeight: '400' },
        },
        title: {
          text: 'Meses',
          style: {
            color: '#adb0bb',
          },
        },
      },
      tooltip: {
        theme: 'dark',
        x: {
          show: true,
        },
        y: {
          formatter: (val: number) => `${val.toFixed(2)} Precisión promedio`, // Custom tooltip for precision values
        },
      },
    };
  }
}
