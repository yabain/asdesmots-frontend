import { AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ng-bmis-date-time-picker',
  templateUrl: './ng-bmis-date-time-picker.component.html',
  styleUrls: ['./ng-bmis-date-time-picker.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NgBmisDateTimePickerComponent implements OnInit, AfterViewInit {
  currentDate = new Date();
  selectedDate = new Date();
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  isDropdownAbove = false;
  inputElement: any;
  dateTimePicker: any;
  calendarIcon: any;
  daysContainer: any;
  timeInput: any;
  monthSelect: any;
  yearSelect: any;
  dateTimePickerId: string;
  calendarIconId: string;
  daysContainerId: string;
  timeInputId: string;
  monthSelectId: string;
  yearSelectId: string;
  
  constructor(private renderer: Renderer2, private el: ElementRef) {}
  
  ngOnInit() {
    this.dateTimePickerId = `datetime-picker-${Math.random().toString(36).substr(2, 9)}`;
    this.calendarIconId = `calendar-icon-${Math.random().toString(36).substr(2, 9)}`;
    this.daysContainerId = `days-${Math.random().toString(36).substr(2, 9)}`;
    this.timeInputId = `time-input-${Math.random().toString(36).substr(2, 9)}`;
    this.monthSelectId = `month-select-${Math.random().toString(36).substr(2, 9)}`;
    this.yearSelectId = `year-select-${Math.random().toString(36).substr(2, 9)}`;
  }
  
  ngAfterViewInit() {
    this.initializePicker();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.adjustDropdownPosition();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.adjustDropdownPosition();
  }

  initializePicker() {
    
    const uniqueDpInputId = `datetime-picker-input-${Math.random().toString(36).substr(2, 9)}`;
    this.inputElement = this.el.nativeElement.querySelector('input');
    this.renderer.setAttribute(this.inputElement, 'id', uniqueDpInputId);
    this.dateTimePicker = document.getElementById(this.dateTimePickerId) as HTMLSelectElement;
    this.calendarIcon = document.getElementById(this.calendarIconId) as HTMLElement;
    this.dateTimePicker = document.getElementById(this.dateTimePickerId) as HTMLElement;
    this.daysContainer = document.getElementById(this.daysContainerId) as HTMLElement;
    this.timeInput = document.getElementById(this.timeInputId) as HTMLInputElement;
    this.monthSelect = document.getElementById(this.monthSelectId) as HTMLSelectElement;
    this.yearSelect = document.getElementById(this.yearSelectId) as HTMLSelectElement;

    const currentYear = new Date().getFullYear();

    this.months.forEach((month, index) => {
      const option = document.createElement('option');
      option.value = index.toString();
      option.textContent = month;
      this.monthSelect.appendChild(option);
    });

    for (let year = currentYear - 50; year <= currentYear + 50; year++) {
      const option = document.createElement('option');
      option.value = year.toString();
      option.textContent = year.toString();
      this.yearSelect.appendChild(option);
    }

    const updateCalendar = () => {
      const year = parseInt(this.yearSelect.value);
      const month = parseInt(this.monthSelect.value);

      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);

      const prevLastDay = new Date(year, month, 0);
      const nextFirstDay = new Date(year, month + 1, 1);

      this.daysContainer.innerHTML = '';

      for (let i = 0; i < firstDay.getDay(); i++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day', 'disabled');
        dayElement.textContent = (prevLastDay.getDate() - firstDay.getDay() + 1 + i).toString();
        dayElement.addEventListener('click', () => {
          this.monthSelect.value = (month - 1).toString();
          if (month === 0) {
            this.yearSelect.value = (year - 1).toString();
            this.monthSelect.value = '11';
          }
          updateCalendar();
        });
        this.daysContainer.appendChild(dayElement);
      }

      for (let i = 1; i <= lastDay.getDate(); i++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        dayElement.textContent = i.toString();

        if (i === this.selectedDate.getDate() && month === this.selectedDate.getMonth() && year === this.selectedDate.getFullYear()) {
          dayElement.classList.add('active');
        }

        dayElement.addEventListener('click', () => {
          this.selectedDate = new Date(year, month, i);
          updateDisplay();
        });

        this.daysContainer.appendChild(dayElement);
      }

      const remainingDays = 42 - this.daysContainer.children.length;  // Ensure 42 days to cover 6 weeks

      for (let i = 1; i <= remainingDays; i++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day', 'disabled');
        dayElement.textContent = i.toString();
        dayElement.addEventListener('click', () => {
          this.monthSelect.value = (month + 1).toString();
          if (month === 11) {
            this.yearSelect.value = (year + 1).toString();
            this.monthSelect.value = '0';
          }
          updateCalendar();
        });
        this.daysContainer.appendChild(dayElement);
      }
    };

    const updateDisplay = () => {
      updateCalendar();
      this.inputElement.value = `${this.selectedDate.toLocaleDateString()} ${this.timeInput.value || '00:00'}`;
    };

    const toggleDateTimePicker = () => {
      this.dateTimePicker.style.display = this.dateTimePicker.style.display === 'block' ? 'none' : 'block';
      this.adjustDropdownPosition();
    };

    this.calendarIcon.addEventListener('click', toggleDateTimePicker);

    this.timeInput.addEventListener('change', updateDisplay);

    this.monthSelect.addEventListener('change', updateCalendar);
    this.yearSelect.addEventListener('change', updateCalendar);

    document.addEventListener('click', (event) => {
      if (!this.dateTimePicker.contains(event.target as Node) && event.target !== this.calendarIcon && event.target !== this.inputElement) {
        this.dateTimePicker.style.display = 'none';
      }
    });

    this.monthSelect.value = this.currentDate.getMonth().toString();
    this.yearSelect.value = currentYear.toString();
    updateDisplay();
  }

  adjustDropdownPosition() {
    const dateTimePicker = document.querySelector('.date-time-picker') as HTMLElement;
    const dateTimeInput = document.getElementById('dateTimeInput') as HTMLInputElement;

    const inputRect = dateTimeInput?.getBoundingClientRect();
    const pickerRect = dateTimePicker?.getBoundingClientRect();

    const spaceBelow = window.innerHeight - inputRect?.bottom;
    const spaceAbove = inputRect?.top;

    if (spaceBelow < pickerRect.height && spaceAbove > pickerRect.height) {
      this.isDropdownAbove = true;
      dateTimePicker.style.top = 'auto';
      dateTimePicker.style.bottom = 'calc(100% + 5px)';
    } else {
      this.isDropdownAbove = false;
      dateTimePicker.style.top = 'calc(100% + 5px)';
      dateTimePicker.style.bottom = 'auto';
    }
  }
}
