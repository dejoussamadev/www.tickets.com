// shared/validators/station.validator.ts
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, finalize, switchMap } from 'rxjs';
import {StationsService} from '../../features/stations/stations.service';

export function createStationValidator(
  stationsService: StationsService,
  loadingStateCallback: (isLoading: boolean) => void
) {
  return function checkIfStationExists(control: AbstractControl): Observable<ValidationErrors | null> {
    if (!control.value) {
      return of(null);
    }

    loadingStateCallback(true);

    return stationsService.checkIfStationExists(control.value).pipe(
      debounceTime(500),
      switchMap(() => {
        loadingStateCallback(false);
        return of(null);
      }),
      catchError(() => {
        loadingStateCallback(false);
        return of({ alreadyExists: true });
      }),
      finalize(() => loadingStateCallback(false))
    );
  };
}
