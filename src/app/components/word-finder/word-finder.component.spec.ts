import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordFinderComponent } from './word-finder.component';

describe('WordFinderComponent', () => {
  let component: WordFinderComponent;
  let fixture: ComponentFixture<WordFinderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordFinderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
