import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { idUserLogged } from 'app/app.component';

import {
  StatusEnum, Task, TaskFilterEnum,
} from 'app/models/task';
import { DashService } from 'app/services/dash.service';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'dashboard',
  styleUrls: ['dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  totalMyTasks = 0;
  totalOpeneds = 0;
  totalFinisheds = 0;
  totalAll = 0;

  optionMyTasks: EChartsOption;
  optionTaskResponsible: EChartsOption;

  constructor(private dashService: DashService, private router: Router) {
    this.dashService.list().subscribe((res) => {
      this.setTotalDash(res.body, idUserLogged);
      this.setOptionMyTask(res.body, idUserLogged);
      this.setOptionTaskResponsible(res.body);
    });
  }

  private setTotalDash(tasks: Task[], idUserLogged: string): void {
    this.totalMyTasks = tasks.filter((task) => task.responsible._id === idUserLogged).length;
    this.totalOpeneds = tasks.filter((task) => task.status === StatusEnum.OPEN).length;
    this.totalFinisheds = tasks.filter((task) => task.status === StatusEnum.FINISHED).length;
    this.totalAll = tasks.length;
  }

  private setOptionMyTask(tasks: Task[], idUserLogged: string): void {
    this.optionMyTasks = {
      title: {
        text: 'Minhas tarefas',
        left: 15,
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        bottom: 20,
        left: 'center',
      },
      series: [
        {
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '20',
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: this.getDataOptionMyTask(tasks, idUserLogged),
        },
      ],
    };
  }

  private getDataOptionMyTask(tasks: Task[], idUserLogged: string) {
    const openeds = tasks.filter((task) => (task.status === StatusEnum.OPEN && task.responsible._id === idUserLogged)).length;
    const finisheds = tasks.filter((task) => (task.status === StatusEnum.FINISHED && task.responsible._id === idUserLogged)).length;

    return [
      { value: openeds, name: 'Em Aberto', itemStyle: { color: '#f1c40f' } },
      { value: finisheds, name: 'Finalizadas', itemStyle: { color: '#2ecc71' } },
    ];
  }

  private setOptionTaskResponsible(tasks: Task[]): void {
    this.optionTaskResponsible = {
      title: {
        text: 'Tarefas por responsável',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {
        data: ['Em Aberto', 'Finalizadas'],
        bottom: 20,
        left: 'center',
      },
      grid: {
        bottom: '15%',
        containLabel: true,
      },
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01],
      },
      yAxis: this.getyAxisOptionTaskResponsible(tasks),
      series: this.getSeriesOptionTaskResponsible(tasks),
    };
  }

  private getyAxisOptionTaskResponsible(tasks: Task[]): { type, data } {
    const names = [...new Set(tasks.map((task) => task.responsible.name))];
    return { type: 'category', data: names };
  }

  private getSeriesOptionTaskResponsible(tasks: Task[]): any {
    const dataOpeneds = [];
    const dataFinisheds = [];

    const ids = [...new Set(tasks.map((task) => task.responsible._id))];
    ids.forEach((id) => {
      dataOpeneds.push(tasks.filter((task) => (task.status === StatusEnum.OPEN && task.responsible._id === id)).length);
      dataFinisheds.push(tasks.filter((task) => (task.status === StatusEnum.FINISHED && task.responsible._id === id)).length);
    });

    return [
      {
        name: 'Em Aberto',
        type: 'bar',
        data: dataOpeneds,
        color: '#f1c40f',
      },
      {
        name: 'Finalizadas',
        type: 'bar',
        data: dataFinisheds,
        color: '#2ecc71',
      },
    ];
  }

  public btnGoToMy() {
    this.goTo(TaskFilterEnum.MY);
  }

  public btnGoToOpened() {
    this.goTo(TaskFilterEnum.OPENED);
  }

  public btnGoToFinished() {
    this.goTo(TaskFilterEnum.FINISHED);
  }

  public btnGoToAll() {
    this.goTo(TaskFilterEnum.ALL);
  }

  private goTo(filter: TaskFilterEnum) {
    this.router.navigateByUrl(`/pages/tasks?filter=${filter}`);
  }
}
