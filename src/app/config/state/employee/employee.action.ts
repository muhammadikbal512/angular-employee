import { EmployeeInterface } from "../../../feature/employee/interface/employee";

export namespace EmployeeAction {
    export class Get {
        static readonly type = '[Employee] Get';
    }

    export class Add {
        static readonly type = '[Employee] Add';
        constructor(public payload: EmployeeInterface) {}
    }

    export class Update {
        static readonly type = '[Employee] Update';
        constructor(public payload: EmployeeInterface) {}
    }

    export class Delete {
        static readonly type = '[Employee] Delete';
        constructor(public id: string) {}
    }
}