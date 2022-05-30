import {SprintState} from '../sprint/sprint-state';


export class Process {
  private _id: string;
  private _name: string;
  private _states: SprintState[] = [];
  private _teamId: string;
  private _startDate: number;
  private _hints: string[] = [];


  constructor(id?: string, name?: string, states?: SprintState[]) {
    this._id = id;
    this._name = name;
    this._states = states;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get states(): SprintState[] {
    return this._states;
  }

  set states(value: SprintState[]) {
    this._states = value;
  }

  get teamId(): string {
    return this._teamId;
  }

  set teamId(value: string) {
    this._teamId = value;
  }
  get hints(): string[] {
    return this._hints;
  }

  set hints(value: string[]) {
    this._hints = value;
  }

  get startDate(): number {
    return this._startDate;
  }

  set startDate(value: number) {
    this._startDate = value;
  }
}
