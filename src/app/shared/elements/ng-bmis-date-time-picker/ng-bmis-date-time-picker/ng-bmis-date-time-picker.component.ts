import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'ng-bmis-date-time-picker',
  templateUrl: './ng-bmis-date-time-picker.component.html',
  styleUrls: ['./ng-bmis-date-time-picker.component.css']
})
export class NgBmisDateTimePickerComponent implements OnInit {
  currentDate: Date = new Date();
  selectedDate: Date = new Date();
  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  dateTimePickerVisible: boolean = false;

  ngOnInit(): void {
    this.populateMonthSelect();
    this.populateYearSelect();
    this.updateDisplay();
  }

  populateMonthSelect(): void {
    const monthSelect = document.getElementById('monthSelect') as HTMLSelectElement;
    this.months.forEach((month, index) => {
      const option = document.createElement('option');
      option.value = index.toString();
      option.textContent = month;
      monthSelect.appendChild(option);
    });
  }

  populateYearSelect(): void {
    const yearSelect = document.getElementById('yearSelect') as HTMLSelectElement;
    const currentYear = new Date().getFullYear();
    for (let year = currentYear - 50; year <= currentYear + 50; year++) {
      const option = document.createElement('option');
      option.value = year.toString();
      option.textContent = year.toString();
      yearSelect.appendChild(option);
    }
  }

  updateCalendar(): void {
    const yearSelect = document.getElementById('yearSelect') as HTMLSelectElement;
    const monthSelect = document.getElementById('monthSelect') as HTMLSelectElement;
    const daysContainer = document.querySelector('.days') as HTMLElement;

    const year = parseInt(yearSelect.value);
    const month = parseInt(monthSelect.value);
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    daysContainer.innerHTML = '';

    for (let i = 0; i < firstDay.getDay(); i++) {
      const emptyDay = document.createElement('div');
      emptyDay.classList.add('day', 'disabled');
      daysContainer.appendChild(emptyDay);
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      const dayElement = document.createElement('div');
      dayElement.classList.add('day');
      dayElement.textContent = i.toString();
      dayElement.addEventListener('click', () => this.selectDate(i));
      daysContainer.appendChild(dayElement);
    }
  }

  selectDate(day: number): void {
    const yearSelect = document.getElementById('yearSelect') as HTMLSelectElement;
    const monthSelect = document.getElementById('monthSelect') as HTMLSelectElement;

    const year = parseInt(yearSelect.value);
    const month = parseInt(monthSelect.value);
    this.selectedDate = new Date(year, month, day);
    this.updateDisplay();
    this.dateTimePickerVisible = false; // Ferme le calendrier après la sélection
  }

  updateDisplay(): void {
    const dateTimeInput = document.getElementById('dateTimeInput') as HTMLInputElement;
    dateTimeInput.value = this.selectedDate.toLocaleString();
  }

  toggleDateTimePicker(): void {
    this.dateTimePickerVisible = !this.dateTimePickerVisible;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.date-time-input')) {
      this.dateTimePickerVisible = false;
    }
  }
}
