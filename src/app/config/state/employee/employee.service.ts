import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EmployeeInterface } from '../../../feature/employee/interface/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private http = inject(HttpClient);

  Get() {
    return this.http.get<any>('assets/employee.json');
  }
}
