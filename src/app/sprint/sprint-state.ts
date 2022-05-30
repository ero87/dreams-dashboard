export class SprintState {
  private _name: string;
  private _startDate: any;
  private _endDate: any;
  private _color: string;
  private _sprintId: string;
  private _order: number;


  constructor(name: string) {
    this._name = name;
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

  get endDate(): any {
    return this._endDate;
  }

  set endDate(value: any) {
    this._endDate = value;
  }

  get color(): string {
    return this._color;
  }

  set color(value: string) {
    this._color = value;
  }

  get order(): number {
    return this._order;
  }

  set order(value: number) {
    this._order = value;
  }

  get sprintId(): string {
    return this._sprintId;
  }

  set sprintId(value: string) {
    this._sprintId = value;
  }
}
