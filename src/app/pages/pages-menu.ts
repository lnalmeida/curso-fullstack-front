import { NbMenuItem } from '@nebular/theme';
import { TaskFilter, TaskFilterEnum } from 'app/models/task';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: { icon: 'home-outline' },
    link: '/pages/default',
    home: true,
  },
  {
    title: 'Cadastros',
    icon: 'book-open-outline',
    group: true,
  },
  {
    title: 'Usuários',
    icon: 'people-outline',
    link: '/pages/users',
  },
  {
    title: 'Tarefas',
    icon: 'checkmark-square-outline',
    children: [
      new TaskFilter('Minhas', TaskFilterEnum.MY),
      new TaskFilter('Em aberto', TaskFilterEnum.OPENED),
      new TaskFilter('Concluídas', TaskFilterEnum.FINISHED),
      new TaskFilter('Todas', TaskFilterEnum.ALL),
    ],
  },
];
