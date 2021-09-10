import { Component } from '@angular/core';
import { TaskFilterEnum } from 'app/models/task';
import { DashService } from 'app/services/dash.service';
import { TaskService } from 'app/services/task.service';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'default',
  styleUrls: ['default.component.scss'],
  templateUrl: './default.component.html',
})
export class DefaultComponent {
  constructor(
    private userService: UserService,
    private taskService: TaskService,
    private dashService: DashService,
  ) {
    this.userService.list()
      .subscribe((users) => console.log('Users: ', users));

    this.taskService.list(TaskFilterEnum.ALL)
      .subscribe((tasks) => console.log('Tasks: ', tasks));

    this.dashService.list()
      .subscribe((dash) => console.log('Dash: ', dash));
  }
}
