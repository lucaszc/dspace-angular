import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Store, StoreModule } from '@ngrx/store';

import { LogInComponent } from './log-in.component';
import { authReducer } from '../../core/auth/auth.reducer';
import { EPersonMock } from '../testing/eperson.mock';
import { EPerson } from '../../core/eperson/models/eperson.model';
import { TranslateModule } from '@ngx-translate/core';

import { LogInComponent } from './log-in.component';
import { AuthService } from '../../core/auth/auth.service';
import { authMethodsMock, AuthServiceStub } from '../testing/auth-service.stub';
import { AppState, storeModuleConfig } from '../../app.reducer';

describe('LogInComponent', () => {

  let component: LogInComponent;
  let fixture: ComponentFixture<LogInComponent>;
  const initialState = {
    core: {
      auth: {
        authenticated: false,
        loaded: false,
        loading: false,
        authMethods: authMethodsMock
      }
    }
  };

  beforeEach(async(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forRoot(authReducer, {
          runtimeChecks: {
            strictStateImmutability: false,
            strictActionImmutability: false
          }
        }),
        SharedModule,
        TranslateModule.forRoot()
      ],
      declarations: [
        TestComponent
      ],
      providers: [
        { provide: AuthService, useClass: AuthServiceStub },
        { provide: NativeWindowService, useFactory: NativeWindowMockFactory },
        { provide: Router, useValue: new RouterStub() },
        { provide: ActivatedRoute, useValue: new ActivatedRouteStub() },
        provideMockStore({ initialState }),
        LogInComponent
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
      .compileComponents();

  }));

  describe('', () => {
    let testComp: TestComponent;
    let testFixture: ComponentFixture<TestComponent>;

    // synchronous beforeEach
    beforeEach(() => {
      const html = `<ds-log-in [isStandalonePage]="isStandalonePage"> </ds-log-in>`;

      testFixture = createTestComponent(html, TestComponent) as ComponentFixture<TestComponent>;
      testComp = testFixture.componentInstance;
    });

    afterEach(() => {
      testFixture.destroy();
    });

    it('should create LogInComponent', inject([LogInComponent], (app: LogInComponent) => {

      expect(app).toBeDefined();

    }));
  });

  describe('', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(LogInComponent);
      component = fixture.componentInstance;

      fixture.detectChanges();
    });

    afterEach(() => {
      fixture.destroy();
      component = null;
    });

    it('should render a log-in container component for each auth method available', () => {
      const loginContainers = fixture.debugElement.queryAll(By.css('ds-log-in-container'));
      expect(loginContainers.length).toBe(2);

    });
  });

});

// declare a test component
@Component({
  selector: 'ds-test-cmp',
  template: ``
})
class TestComponent {

  isStandalonePage = true;

}
