import { Injectable } from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { EmployeeAction } from './employee.action';
import { EmployeeInterface } from '../../../feature/employee/interface/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeDispatcher {
  @Dispatch({ cancelUncompleted: true }) _Get = () => new EmployeeAction.Get();

  @Dispatch({ cancelUncompleted: true }) _Add = (payload: EmployeeInterface) =>
    new EmployeeAction.Add(payload);

  @Dispatch({ cancelUncompleted: true }) _Update = (
    payload: EmployeeInterface
  ) => new EmployeeAction.Update(payload);

  @Dispatch({ cancelUncompleted: true }) _Delete = (id: string) =>
    new EmployeeAction.Delete(id);
}
