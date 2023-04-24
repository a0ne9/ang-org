import { Component } from '@angular/core';
import { DateService } from '../shared/date.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ITask, TasksService } from '../shared/tasks.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-organiser',
  templateUrl: './organiser.component.html',
  styleUrls: ['./organiser.component.scss'],
})
export class OrganiserComponent {
  form: FormGroup;
  tasks: ITask[] = [];
  constructor(
    public dateService: DateService,
    private tasksService: TasksService
  ) {}

  ngOnInit() {
    this.dateService.date
      .pipe(switchMap((value) => this.tasksService.loadTasks(value)))
      .subscribe((tasks) => {
        this.tasks = tasks;
      });
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
    });
  }

  submit() {
    const { title } = this.form.value;
    const task: ITask = {
      title,
      date: this.dateService.date.value.format('DD-MM-YYYY'),
    };

    this.tasksService.createTask(task).subscribe(
      () => {
        this.tasks.push(task);
        this.form.reset();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  remove(task: ITask) {
    this.tasksService.removeTask(task).subscribe(
      () => {
        this.tasks = this.tasks.filter((t) => t.id !== task.id);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
