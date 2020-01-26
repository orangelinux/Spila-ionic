import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CoinComponent } from './coin.component';

describe('CoinComponent', () => {
  let component: CoinComponent;
  let fixture: ComponentFixture<CoinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoinComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
