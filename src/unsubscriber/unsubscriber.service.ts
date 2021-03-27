/*************************************************************************
 * Copyright (c) 2021–present Lucas Paganini. All rights reserved.
 * Contact: <me@lucaspaganini.com>
 *
 * This software may be modified and distributed under the terms of the
 * MIT license. See the LICENSE file for details.
 **************************************************************************/

import { Injectable, OnDestroy } from '@angular/core'
import { Observable, Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

@Injectable()
export class UnsubscriberService implements OnDestroy {
  public readonly destroy$ = new Subject<void>()

  public readonly takeUntilDestroy = <T>(origin: Observable<T>): Observable<T> => origin.pipe(takeUntil(this.destroy$))

  public ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
