import { NgModule } from '@angular/core';
import { NbCardModule } from '@nebular/theme';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskService } from 'app/services/task.service';
import { UserService } from 'app/services/user.service';
import { ThemeModule } from '../../@theme/theme.module';

import { TaskComponent } from './task.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    NbCardModule,
    ThemeModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    TaskComponent,
  ],
  providers: [TaskService, UserService],

})
export class TaskModule { }
