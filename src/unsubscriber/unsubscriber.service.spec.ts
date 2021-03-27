import { Component, Directive, OnDestroy, OnInit } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ReplaySubject } from 'rxjs';
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
    const logs$ = component.testLog$.pipe(toArray());

    fixture.detectChanges();
    expect(component).toBeTruthy();

    fixture.destroy();
    const logs = await logs$.toPromise();
    expect(logs).toEqual([
      'component ngOnInit',
      'service ngOnDestroy',
      'component ngOnDestroy',
    ]);
  });

  it('should be destroyed right before its provider directive', async () => {
    type TestLog =
      | 'directive ngOnInit'
      | 'directive ngOnDestroy'
      | 'service ngOnDestroy';

    @Directive({
      selector: '[appTest]',
      providers: [UnsubscriberService],
    })
    class TestDirective implements OnInit, OnDestroy {
      public readonly testLog$ = new ReplaySubject<TestLog>();

      constructor(unsubscriber: UnsubscriberService) {
        unsubscriber.destroy$.subscribe(() => {
          this.testLog$.next('service ngOnDestroy');
        });
      }

      public ngOnInit(): void {
        this.testLog$.next('directive ngOnInit');
      }

      public ngOnDestroy(): void {
        this.testLog$.next('directive ngOnDestroy');
        this.testLog$.complete();
      }
    }

    @Component({
      selector: 'app-test',
      template: '<p [appTest]>test</p>',
    })
    class TestComponent {}

    await TestBed.configureTestingModule({
      declarations: [TestDirective, TestComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(TestComponent);
    const component: TestComponent = fixture.componentInstance;
    const debugElement = fixture.debugElement.query(
      By.directive(TestDirective)
    );
    const directive = debugElement.injector.get(TestDirective);
    const logs$ = directive.testLog$.pipe(toArray());

    fixture.detectChanges();
    await fixture.whenStable();
    await fixture.whenRenderingDone();
    expect(component).toBeTruthy();
    expect(directive).toBeTruthy();

    fixture.destroy();
    const logs = await logs$.toPromise();
    expect(logs).toEqual([
      'directive ngOnInit',
      'service ngOnDestroy',
      'directive ngOnDestroy',
    ]);
  });

  it('should complete the obvervable when its provider component is destroyed');

  it('should complete the obvervable when its provider directive is destroyed');
});
