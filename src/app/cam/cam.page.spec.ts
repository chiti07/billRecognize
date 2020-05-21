import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CamPage } from './cam.page';

describe('CamPage', () => {
  let component: CamPage;
  let fixture: ComponentFixture<CamPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CamPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
