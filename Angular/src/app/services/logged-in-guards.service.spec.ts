import { TestBed } from '@angular/core/testing';

import { LoggedInGuardsService } from './logged-in-guards.service';

describe('LoggedInGuardsService', () => {
  let service: LoggedInGuardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggedInGuardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
