import { TestBed } from '@angular/core/testing';

import { TagNameService } from './tag-name.service';

describe('TagNameService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TagNameService = TestBed.get(TagNameService);
    expect(service).toBeTruthy();
  });
});
