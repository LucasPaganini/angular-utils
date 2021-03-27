import { Component, OnDestroy, OnInit } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReplaySubject, Subject } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { UnsubscriberService } from './unsubscriber.service';

describe('UnsubscriberService', () => {
  it('should be destroyed right before its provider component', async () => {
    type TestLog =
      | 'component ngOnInit'
      | 'component ngOnDestroy'
      | 'service ngOnDestroy';

    @Component({
      selector: 'app-test',
      providers: [UnsubscriberService],
    })
    class TestComponent implements OnInit, OnDestroy {
      public readonly testLog$ = new ReplaySubject<TestLog>();

      constructor(unsubscriber: UnsubscriberService) {
        unsubscriber.destroy$.subscribe(() => {
          this.testLog$.next('service ngOnDestroy');
        });
      }

      public ngOnInit(): void {
        this.testLog$.next('component ngOnInit');
      }

      public ngOnDestroy(): void {
        this.testLog$.next('component ngOnDestroy');
        this.testLog$.complete();
      }
    }

    await TestBed.configureTestingModule({
      declarations: [TestComponent],
    }).compileComponents();

    const fixture: ComponentFixture<TestComponent> = TestBed.createComponent(
      TestComponent
    );
    const component: TestComponent = fixture.componentInstance;
    fixture.detectChanges();

    expect(component).toBeTruthy();

    fixture.destroy();
    const logs = await component.testLog$.pipe(toArray()).toPromise();
    expect(logs).toEqual([
      'component ngOnInit',
      'service ngOnDestroy',
      'component ngOnDestroy',
    ]);
  });

  //  it('should be created when provided in a directive')
});
