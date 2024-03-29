import { Component, OnInit } from '@angular/core';
import { MenuItem, Message } from 'primeng/components/common/api';

@Component({
  selector: 'jhi-tieredmenu',
  templateUrl: './tieredmenudemo.component.html',
  styles: []
})
export class TieredMenuDemoComponent implements OnInit {
  activeIndex = 0;
  msgs: Message[] = [];
  items: MenuItem[];

  ngOnInit() {
    this.items = [
      {
        label: 'File',
        icon: 'fa fa-file-o',
        items: [
          {
            label: 'New',
            icon: 'fa fa-plus',
            items: [{ label: 'Project' }, { label: 'Other' }]
          },
          { label: 'Open' },
          { label: 'Quit' }
        ]
      },
      {
        label: 'Edit',
        icon: 'fa fa-edit',
        items: [{ label: 'Undo', icon: 'fa fa-mail-forward' }, { label: 'Redo', icon: 'fa fa-mail-reply' }]
      },
      {
        label: 'Help',
        icon: 'fa fa-question',
        items: [
          {
            label: 'Contents'
          },
          {
            label: 'Search',
            icon: 'fa fa-search',
            items: [
              {
                label: 'Text',
                items: [
                  {
                    label: 'Workspace'
                  }
                ]
              },
              {
                label: 'File'
              }
            ]
          }
        ]
      },
      {
        label: 'Actions',
        icon: 'fa fa-gear',
        items: [
          {
            label: 'Edit',
            icon: 'fa fa-refresh',
            items: [{ label: 'Save', icon: 'fa fa-save' }, { label: 'Update', icon: 'fa fa-save' }]
          },
          {
            label: 'Other',
            icon: 'fa fa-phone',
            items: [{ label: 'Delete', icon: 'fa fa-minus' }]
          }
        ]
      },
      {
        label: 'Quit',
        icon: 'fa fa-minus'
      }
    ];
  }

  onChangeStep(label: string) {
    this.msgs.length = 0;
    this.msgs.push({ severity: 'info', summary: label });
  }
}
