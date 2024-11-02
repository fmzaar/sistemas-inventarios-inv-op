import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ConfigInventoryComponent} from './config-inventory.component';

describe('ConfigInventoryComponent', () => {
  let component: ConfigInventoryComponent;
  let fixture: ComponentFixture<ConfigInventoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigInventoryComponent]
    });
    fixture = TestBed.createComponent(ConfigInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
