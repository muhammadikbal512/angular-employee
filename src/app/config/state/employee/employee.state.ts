import { Action, Selector, State, StateContext } from '@ngxs/store';
import { EmployeeInterface } from '../../../feature/employee/interface/employee';
import { inject, Injectable } from '@angular/core';
import { EmployeeService } from './employee.service';
import { EmployeeAction } from './employee.action';
import { tap } from 'rxjs';

export class EmployeeStateModel {
  data: EmployeeInterface[] = [];
}

@State<EmployeeStateModel>({
  name: 'employee',
  defaults: {
    data: [],
  },
})
@Injectable()
export class EmployeeState {
  private employeeService = inject(EmployeeService);

  @Selector()
  static data(state: EmployeeStateModel) {
    return state.data;
  }

  @Action(EmployeeAction.Get, { cancelUncompleted: true }) GetData(
    ctx: StateContext<EmployeeStateModel>
  ) {
    return this.employeeService.Get().pipe(
      tap((response) => {
        ctx.setState({
          ...ctx.getState(),
          data: response,
        });
      })
    );
  }

  @Action(EmployeeAction.Add, { cancelUncompleted: true }) addData(
    ctx: StateContext<EmployeeStateModel>,
    { payload }: EmployeeAction.Add
  ) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      data: [payload, ...state.data],
    });
  }

  @Action(EmployeeAction.Update, { cancelUncompleted: true })
updateData(
  ctx: StateContext<EmployeeStateModel>,
  { payload }: EmployeeAction.Update
) {
  const state = ctx.getState();
  const updatedData = [...state.data];
  const index = updatedData.findIndex((item) => item.id === payload.id);

  console.log(payload.id)
  if (index !== -1) {
    const newData = [...updatedData];
    newData[index] = payload;

    ctx.setState({
      ...state,
      data: newData,
    });
  }
}


  @Action(EmployeeAction.Delete, { cancelUncompleted: true }) deleteData(
    ctx: StateContext<EmployeeStateModel>,
    { id }: EmployeeAction.Delete
  ) {
    const state = ctx.getState();
    const deletedData = state.data.filter((item) => item.id !== id);

    ctx.setState({
      data: deletedData,
    });
  }
}
