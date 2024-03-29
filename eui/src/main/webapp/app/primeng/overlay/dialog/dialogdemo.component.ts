import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/components/common/api';

@Component({
  selector: 'jhi-dialog',
  templateUrl: './dialogdemo.component.html',
  styles: []
})
export class DialogDemoComponent implements OnInit {
  basic = false;
  custom = false;
  advanced = false;
  maximizable = false;
  events = false;

  msgs: Message[] = [];
  activeIndex = 0;
  public display: boolean;

  ngOnInit() {}

  showBasicDialog() {
    this.basic = true;
    this.custom = false;
    this.advanced = false;
    this.maximizable = false;
    this.events = false;
  }

  showCustomDialog() {
    this.basic = false;
    this.custom = true;
    this.advanced = false;
    this.maximizable = false;
    this.events = false;
  }

  showAdvancedDialog() {
    this.basic = false;
    this.custom = false;
    this.advanced = true;
    this.maximizable = false;
    this.events = false;
  }

  showEventsDialog() {
    this.basic = false;
    this.custom = false;
    this.advanced = false;
    this.maximizable = false;
    this.events = true;
  }

  showDialog() {
    this.msgs.length = 0;
    this.maximizable = true;
    this.msgs.push({ severity: 'info', summary: 'Show dialog', detail: 'When dialog is shown' });
  }

  hideDialog() {
    this.msgs.length = 0;
    this.maximizable = false;
    this.msgs.push({ severity: 'info', summary: 'Hide dialog', detail: 'when dialog is hidden' });
  }

  onComplete() {
    this.custom = false;
    this.advanced = false;
  }

  onChangeStep(label: string) {
    this.msgs.length = 0;
    this.msgs.push({ severity: 'info', summary: label });
  }
}
