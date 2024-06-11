import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { EmployeeInterface } from '../../interface/employee';
import { EmployeeState } from '../../../../config/state/employee/employee.state';
import { Observable } from 'rxjs';
import { Actions, ofActionSuccessful, Select } from '@ngxs/store';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EmployeeService } from '../../../../config/state/employee/employee.service';
import { EmployeeDispatcher } from '../../../../config/state/employee/employee.dispatcher';
import { EmployeeAction } from '../../../../config/state/employee/employee.action';

@Component({
  selector: 'app-employee-modify-dialog',
  standalone: true,
  imports: [
    CardModule,
    ReactiveFormsModule,
    CalendarModule,
    CommonModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
  ],
  templateUrl: './employee-modify-dialog.component.html',
  styleUrl: './employee-modify-dialog.component.css',
  providers: [DatePipe],
})
export class EmployeeModifyDialogComponent {
  @Select(EmployeeState.data) employee$!: Observable<EmployeeInterface[]>;

  form!: FormGroup;
  maxSelectableDate!: Date;
  employeeId: string | null = null;
  employee!: EmployeeInterface;

  group = [
    { code: 1, name: 'A' },
    { code: 2, name: 'B' },
    { code: 3, name: 'C' },
    { code: 4, name: 'D' },
    { code: 5, name: 'E' },
    { code: 6, name: 'F' },
    { code: 7, name: 'G' },
    { code: 8, name: 'H' },
    { code: 9, name: 'I' },
    { code: 10, name: 'J' },
  ];

  status = [
    { code: true, name: 'Active' },
    { code: false, name: 'Not Active' },
  ];

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);
  private employeeDispatcher = inject(EmployeeDispatcher);
  private route = inject(ActivatedRoute);
  private datePipe = inject(DatePipe);

  ngOnInit(): void {
    this.maxSelectableDate = new Date();
    this.form = this.fb.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', Validators.required],
      status: ['', Validators.required],
      basicSalary: ['', Validators.required],
      group: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.route.params.subscribe((params) => {
      this.employeeId = params['id'] ? params['id'] : null;
      if (this.employeeId) {
        this.fetchEmployeeData(this.employeeId);
      }
    });

    if (this.employee) {
      this.form.get('username')?.setValue(this.employee.username);
      this.form.get('firstName')?.setValue(this.employee.firstName);
      this.form.get('lastName')?.setValue(this.employee.lastName);
      this.form.get('email')?.setValue(this.employee.email);
      this.form.get('birthDate')?.setValue(this.employee.birthDate);
      this.form
        .get('status')
        ?.setValue(this.status.find((v1) => v1.code === this.employee.status));
      this.form.get('basicSalary')?.setValue(this.employee.basicSalary);
      this.form
        .get('group')
        ?.setValue(this.group.find((v1) => v1.name === this.employee.group));
      this.form.get('description')?.setValue(this.employee.description);
    }
  }

  onCancel() {
    this.router.navigate(['home/employee']);
  }

  fetchEmployeeData(id: string) {
    this.employee$.subscribe((data) => {
      const value = data.find((e) => e.id === this.employeeId);
      if (value) {
        this.employee = value;
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Employee with ID ${this.employeeId} not found.`,
        });
      }
    });
  }

  onSave(data: any) {
    data.id = this.employeeId || String(Math.floor(Math.random() * 1000));
    data.status = data.status.code;
    data.group = data.group.name;
    data.birthDate = this.datePipe.transform(
      data.birthDate,
      'dd-MM-yyyy'
    ) as string;

    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (this.employee) {
          this.employeeDispatcher._Update(data);
          this.messageService.add({
            severity: 'success',
            summary: 'Confirmed',
            detail: 'You updated a data',
          });
        } else {
          this.employeeDispatcher._Add(data);
          this.messageService.add({
            severity: 'success',
            summary: 'Confirmed',
            detail: 'You add a data',
          });
        }

        this.router.navigate([`/home/employee`]);
      },
      reject: () => {},
    });
  }
}
