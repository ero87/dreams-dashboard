import {SprintState} from './sprint-state';

export class Sprint {
  private _id: string;
  private _processId: string;
  private _name: string;
  private _startDate: any;
  private _states: SprintState[] = [];
  constructor(processId?: string, name?: string) {
    this._processId = processId;
    this._name = name;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get processId(): string {
    return this._processId;
  }

  set processId(value: string) {
    this._processId = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get startDate(): any {
    return this._startDate;
  }

  set startDate(value: any) {
    this._startDate = value;
  }
  get states(): SprintState[] {
    return this._states;
  }

  set states(value: SprintState[]) {
    this._states = value;
  }
}
