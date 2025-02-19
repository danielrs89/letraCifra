import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LongestWordComponent } from './longest-word.component';

describe('LongestWordComponent', () => {
  let component: LongestWordComponent;
  let fixture: ComponentFixture<LongestWordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LongestWordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LongestWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
