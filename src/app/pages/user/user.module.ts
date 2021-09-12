import { NgModule } from '@angular/core';
import { NbCardModule } from '@nebular/theme';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'app/services/user.service';
import { ThemeModule } from '../../@theme/theme.module';

import { UserComponent } from './user.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    NbCardModule,
    ThemeModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    UserComponent,
  ],
  providers: [UserService],

})
export class UserdModule { }
