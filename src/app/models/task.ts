import { Params } from '@angular/router';
import { User } from './user';

export enum StatusEnum {
  OPEN = 'OPEN',
  FINISHED = 'FINISHED'
}

export class Task {
  _id: string;
  description: string;
  status: StatusEnum;
  statusTranslate: string;
  concluded: Date;
  responsible: User;
  responsibleName: string;
  createdAt: Date;

  constructor(task: Task) {
    this._id = task._id;
    this.description = task.description;
    this.responsibleName = task.responsible.name;
    this.status = task.status;

    if (StatusEnum.OPEN === this.status) this.statusTranslate = 'Em aberto';
    else this.statusTranslate = 'Concluído';
  }
}

export enum TaskFilterEnum {
  MY,
  OPENED,
  FINISHED,
  ALL
}

export class TaskFilter {
  title: string;
  link = '/pages/tasks/';
  queryParams: Params;

  constructor(title:string, filter: TaskFilterEnum) {
    this.title = title;
    this.queryParams = { filter };
  }
}
