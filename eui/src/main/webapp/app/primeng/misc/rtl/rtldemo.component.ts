import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/components/common/api';

@Component({
  selector: 'jhi-rtl',
  templateUrl: './rtldemo.component.html',
  styles: []
})
export class RTLDemoComponent implements OnInit {
  msgs: Message[] = [];
  messages: Message[] = [];
  activeIndex = 0;

  ngOnInit() {}

  public onChangeStep($event) {}
}
