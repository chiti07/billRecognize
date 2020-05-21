import { TestBed } from '@angular/core/testing';

import { CargarArchivoService } from './cargar-archivo.service';

describe('CargarArchivoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CargarArchivoService = TestBed.get(CargarArchivoService);
    expect(service).toBeTruthy();
  });
});
