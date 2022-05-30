import {Component, Input, OnInit} from '@angular/core';
import {Sprint} from '../sprint';
import {Process} from '../../process/process';
import {SprintState} from '../sprint-state';
import {Team} from '../../team/team';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-sprint-builder',
  templateUrl: 'sprint-builder.component.html',
  styleUrls: ['sprint-builder.component.scss']
})
export class SprintBuilderComponent implements OnInit {
  @Input()
  sprint: Sprint;
  processes: Process[] = [
    new Process('1', 'Backlog', [
      new SprintState('Development'),
      new SprintState('Testing')]),
    new Process('2', 'LTS', [
      new SprintState('Development'),
      new SprintState('Testing')])];
  process: Process;
  newState: SprintState;

  // deleteHint(state: SprintState, hintToDelete: string) {
  //   const index = state.hints.indexOf(hintToDelete);
  //   if (index !== -1) {
  //     state.hints.splice(index, 1);
  //   }
  // }
  constructor(private http: HttpClient) {
  }
  ngOnInit(): void {
    this.process = this.processes.find((proc) => {
      return proc.id === this.sprint.processId;
    });
  }
  initStates(process: any) {
    console.log(process);
    const processName = process.target.value;
    const currentProcess = this.processes.find((proc) => {
      return proc.name === processName;
    });
    this.sprint.processId = currentProcess.id;
    // this.sprint.states = currentProcess.states;
  }

  saveState(state: SprintState) {
    state.sprintId = this.sprint.id;
    console.log(state);
  }
  saveData() {
    this.http.post('http://localhost:8080/api/Sprint', {
      'name': this.sprint.name,
      'processId': this.sprint.processId,
      'startDate': this.sprint.startDate
    });
  }

  initNewState() {
    this.newState = new SprintState('');
  }

  saveNewState() {
    console.log(this.newState);
  }
}
