import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, RoutesRecognized } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string[] = [];
  isConsole: Boolean = false;
  snapRoute = '';

  constructor(private route: ActivatedRoute,
    router: Router) {
      router.events.subscribe((e) => {
        if (e instanceof RoutesRecognized) {
          this.snapRoute = e.state.root.firstChild.params.lang;
        }
      });
  }

  add(message: string) {
    // this.messages.push(message);
    this.messages[0] = message;
    this.isConsole = true;
  }

  remove() {
    // this.messages.splice(0, 1);
    this.isConsole = false;
  }

  clear() {
    this.messages = [];
  }
}
