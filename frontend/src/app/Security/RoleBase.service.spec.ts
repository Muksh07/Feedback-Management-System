/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RoleBaseService } from './RoleBase.service';

describe('Service: RoleBase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoleBaseService]
    });
  });

  it('should ...', inject([RoleBaseService], (service: RoleBaseService) => {
    expect(service).toBeTruthy();
  }));
});
