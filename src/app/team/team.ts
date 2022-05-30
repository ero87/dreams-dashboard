import {Process} from '../process/process';

export class Team {
  private _name: string;
  private _id: string;
  private _processes: Process[];

  constructor(id: string, name: string) {
    this._name = name;
    this._id = id;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get processes(): Process[] {
    return this._processes;
  }

  set processes(value: Process[]) {
    this._processes = value;
  }
}
