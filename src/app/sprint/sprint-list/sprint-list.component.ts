import {Component, OnInit, Output} from '@angular/core';
import {Sprint} from '../sprint';
import {Team} from '../../team/team';
import {Process} from '../../process/process';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-sprint-list',
  templateUrl: 'sprint-list.component.html',
  styleUrls: ['sprint-list.component.scss']
})

export class SprintListComponent implements OnInit {
  sprints: Sprint[] = [];
  teams: Team[] = [];
  processes: Process[] = [];
  selectedProcess: Process;
  @Output()
  selectedSprint: Sprint;
  showBuilder: boolean;

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.http.get('http://localhost:8080/api/team').subscribe((data: Team[]) => {
      this.teams = data;
    });
  }

  initProcesses(selectedTeamName: any) {
    const selectedTeam = this.teams.find(team => {
      return team.name === selectedTeamName.target.value;
    });
    this.processes = selectedTeam.processes;
  }

  initSprint(processName: any) {
    const selectedProcess = this.processes.find(process => {
      return process.name === processName.target.value;
    });
    this.selectedProcess = selectedProcess;
    const body = {
      'processId': selectedProcess.id,
      'limit': 1000,
      'skip': 0
    };
    // const req = new HttpRequest('GET', 'http://localhost:8080/api/Sprint', body);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: body
    };
    this.http.post('http://localhost:8080/api/Sprint/get', body).subscribe((data: Sprint[]) => {
      this.sprints = data;
    });
  }
  onSprintChange(selectedSprintName: any) {
    this.selectedSprint = this.sprints.find(sprint => {
      return sprint.name === selectedSprintName.target.value;
    });
  }

  onEditSprint(showBuilder: boolean) {
    this.showBuilder = showBuilder;
  }
}
