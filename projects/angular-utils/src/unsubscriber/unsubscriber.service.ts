import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable()
export class UnsubscriberService implements OnDestroy {
  public readonly destroy$ = new Subject<void>();

  public readonly takeUntilDestroy = <T>(
    origin: Observable<T>
  ): Observable<T> => origin.pipe(takeUntil(this.destroy$));

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
