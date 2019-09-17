import { TestBed } from '@angular/core/testing';

import { DataModelsService } from './data-models.service';

describe('DataModelsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataModelsService = TestBed.get(DataModelsService);
    expect(service).toBeTruthy();
  });
});
