import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { EmployeeInterface } from './interface/employee';
import { InputTextModule } from 'primeng/inputtext';
import { EmployeeDispatcher } from '../../config/state/employee/employee.dispatcher';
import { Observable } from 'rxjs';
import { Actions, Select, Store } from '@ngxs/store';
import { EmployeeState } from '../../config/state/employee/employee.state';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TagModule } from 'primeng/tag';


@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    ButtonModule,
    TooltipModule,
    TableModule,
    ReactiveFormsModule,
    InputTextModule,
    CommonModule,
    TagModule
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent {
  @Select(EmployeeState) employees$!: Observable<any>;

  private router = inject(Router);

  private employeeDispatcher = inject(EmployeeDispatcher);
  private actions = inject(Actions);
  private store$ = inject(Store);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  form!: FormGroup;
  data: EmployeeInterface[] = [];
  selectedNode: EmployeeInterface | undefined;

  ngOnInit(): void {
    this.employees$.subscribe((data) => {
      this.data = data.data;
      if (this.store$.selectSnapshot(EmployeeState.data).length == 0) {
        this.employeeDispatcher._Get();
      }
    });
  }

  onModify(state: string) {
    if (state === 'Add') {
      this.router.navigate([`/home/employee/add`]);
    } else {
      this.router.navigate([`/home/employee/update/` + this.selectedNode?.id]);
    }
  }

  onDelete() {
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.employeeDispatcher._Delete(this.selectedNode?.id ?? '');
        this.messageService.add({
          severity: 'error',
          summary: 'Successful',
          detail: 'Data Deleted',
        });
        this.selectedNode = undefined;
      },
      reject: () => {},
    });
  }

  onDetailClicked(event: any) {
    this.router.navigate([`/home/employee/update/` + event.id]);
  }
}
