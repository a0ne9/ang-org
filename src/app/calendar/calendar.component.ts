import { Component } from '@angular/core';
import * as moment from 'moment';
import { DateService } from '../shared/date.service';
import { now } from 'moment';
import { map, switchMap } from 'rxjs';
import { ITask, TasksService } from '../shared/tasks.service';

interface Day {
  value: moment.Moment;
  disabled: boolean;
  selected: boolean;
  active: boolean;
  tasks?: ITask[];
}

interface Week {
  days: Day[];
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  calendar: Week[] = [];
  tasks: ITask[] = [];
  constructor(
    private dateService: DateService,
    private tasksService: TasksService
  ) {}

  ngOnInit() {
    this.dateService.date.subscribe(this.generate.bind(this));
    //this.tasksService.tasks$.pipe().subscribe(t => (this.tasks = t));
  }

  generate(date: moment.Moment) {
    const startDay = date.clone().startOf('month').startOf('week');
    const endDay = date.clone().endOf('month').endOf('week');
    const cDate = startDay.subtract(1, 'day');
    const calendar = [];

    while (cDate.isBefore(endDay, 'day')) {
      calendar.push({
        days: Array(7)
          .fill(0)
          .map(() => {
            const value = cDate.add(1, 'day').clone();
            let tasks: ITask[] = [];
            // console.log(this.tasks);
            // if (this.tasks.length) {
            //   tasks = this.tasks.filter(
            //     (t) => t.date === value.format('DD-MM-YYYY')
            //   );
            // }
            return {
              value,
              disabled: !date.isSame(value, 'month'),
              selected: date.isSame(value, 'date'),
              active: moment().isSame(value, 'date'),
              tasks,
            };
          }),
      });
    }

    this.calendar = calendar;
  }

  select(day: moment.Moment) {
    this.dateService.changeDate(day);
  }
}
