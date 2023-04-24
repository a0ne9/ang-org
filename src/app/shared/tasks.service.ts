import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, ReplaySubject, Subject } from 'rxjs';
import * as moment from 'moment';

export interface ITask {
  title: string;
  id?: string;
  date?: string;
}

interface IResponse {
  name: string;
}
@Injectable({
  providedIn: 'root',
})
export class TasksService {
  static url: string =
    'https://angular-organiser-8de6b-default-rtdb.firebaseio.com';

  public tasks$: Subject<ITask[]> = new ReplaySubject();

  constructor(private http: HttpClient) {}

  loadTasks(date: moment.Moment): Observable<any> {
    return this.http
      .get<any>(`${TasksService.url}/tasks/${date.format('DD-MM-YYYY')}.json`)
      .pipe(
        map((tasks) => {
          if (!tasks) {
            return [];
          }
          // this.tasks$.next(
          //   Object.keys(tasks).map((key) => ({
          //     ...tasks[key],
          //     id: key,
          //   }))
          // );
          return Object.keys(tasks).map((key) => ({
            ...tasks[key],
            id: key,
          }));
        })
      );
  }

  createTask(task: ITask): Observable<ITask> {
    return this.http
      .post<IResponse>(`${TasksService.url}/tasks/${task.date}.json`, task)
      .pipe(
        map((res) => {
          return { ...task, id: res.name };
        })
      );
  }

  removeTask(task: ITask): Observable<void> {
    return this.http.delete<void>(
      `${TasksService.url}/tasks/${task.date}/${task.id}.json`
    );
  }
}
