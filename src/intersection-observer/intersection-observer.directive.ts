/*************************************************************************
 * Copyright (c) 2021–present Lucas Paganini. All rights reserved.
 * Contact: <me@lucaspaganini.com>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core'
import { Observable } from 'rxjs'
import { UnsubscriberService } from '../unsubscriber'

@Directive({
  selector: '[lpIntersection]',
  providers: [UnsubscriberService],
})
export class IntersectionObserverDirective implements OnInit, OnDestroy {
  @Input() public lpIntersectionOptions: IntersectionObserverInit = {}

  @Output() public readonly lpIntersection = new EventEmitter<boolean>()

  constructor(private readonly _hostRef: ElementRef, private readonly _unsubscriber: UnsubscriberService) {}

  public ngOnInit(): void {
    // TODO: Update the intersection observable everytime there's a change to the intersection options
    const hostIntersection$ = new Observable<IntersectionObserverEntry>(observer => {
      const intersectionObserver = new IntersectionObserver(entries => {
        observer.next(entries[0])
      }, this.lpIntersectionOptions)
      const hostEl = this._hostRef.nativeElement
      intersectionObserver.observe(hostEl)
      return () => intersectionObserver.unobserve(hostEl)
    })

    hostIntersection$.pipe(this._unsubscriber.takeUntilDestroy).subscribe(entry => {
      this.lpIntersection.emit(entry.isIntersecting)
    })
  }

  public ngOnDestroy(): void {
    this.lpIntersection.emit(false)
  }
}
