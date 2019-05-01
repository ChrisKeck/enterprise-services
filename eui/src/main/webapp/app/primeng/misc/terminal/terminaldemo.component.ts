import { Component, OnDestroy, OnInit } from '@angular/core';
import { Message } from 'primeng/components/common/api';
import { TerminalService } from 'primeng/components/terminal/terminalservice';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'jhi-terminal',
  templateUrl: './terminaldemo.component.html',
  styles: [],
  providers: [TerminalService]
})
export class TerminalDemoComponent implements OnInit, OnDestroy {
  msgs: Message[] = [];
  messages: Message[] = [];
  activeIndex = 0;
  subscription: Subscription;

  ngOnInit() {}

  constructor(private terminalService: TerminalService) {
    this.terminalService.commandHandler.subscribe(command => {
      const response = command === 'date' ? new Date().toDateString() : 'Unknown command: ' + command;
      this.terminalService.sendResponse(response);
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public onChangeStep($event) {}
}
