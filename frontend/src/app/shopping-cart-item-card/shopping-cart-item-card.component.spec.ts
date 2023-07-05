import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartItemCardComponent } from './shopping-cart-item-card.component';

describe('ShoppingCartItemCardComponent', () => {
  let component: ShoppingCartItemCardComponent;
  let fixture: ComponentFixture<ShoppingCartItemCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShoppingCartItemCardComponent]
    });
    fixture = TestBed.createComponent(ShoppingCartItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
