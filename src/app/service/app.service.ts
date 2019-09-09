import { throwError as observableThrowError, Observable, of, forkJoin } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

export interface LogCriteria {
  id: number;
  name: string;
}
@Injectable()
export class AppService {

  constructor(private readonly _http: HttpClient) { }

  public getData(i): Observable<any> {
    return of([
      {id: ((i - 1) * 10) + 1, name: 'Mark', email: '@mdo'},
      {id: ((i - 1) * 10) + 2, name: 'Mark', email: '@mdo'},
      {id: ((i - 1) * 10) + 3, name: 'Mark', email: '@mdo'},
      {id: ((i - 1) * 10) + 4, name: 'Mark', email: '@mdo'},
      {id: ((i - 1) * 10) + 5, name: 'Mark', email: '@mdo'},
      {id: ((i - 1) * 10) + 6, name: 'Mark', email: '@mdo'},
      {id: ((i - 1) * 10) + 7, name: 'Mark', email: '@mdo'},
      {id: ((i - 1) * 10) + 8, name: 'Mark', email: '@mdo'},
      {id: ((i - 1) * 10) + 9, name: 'Mark', email: '@mdo'},
      {id: ((i - 1) * 10) + 10, name: 'Mark', email: '@mdo'}
    ]);
  }

  public forkJoinExample(criteria: Array<LogCriteria>): Observable<any> {
    const resp = [];
    criteria.map((c, i) => {
      resp.push(of ({id: c.id, name: c.name}));
    });
    return forkJoin(resp);
  }

  public sequentialCallExample(criteria): Observable<any> {
    return of ({id: criteria && criteria.id, name: criteria && criteria.name});
  }

  public getTreeData(): Observable<any> {
    return of([
      {id: 1, name: 'Processess', type: 'FOLDER'},
      {id: 2, name: 'Triggers', type: 'FOLDER'},
      {id: 3, name: 'Database', type: 'FOLDER'},
      {id: 4, name: 'Integrations', type: 'FOLDER'}
    ]);
  }

  public getChildData(data): Observable<any> {
    return of([{
      id: data.id + 0.1,
      name: data.label + ' ' + 'Child',
      type: 'LEAVE'
    }, {
      id: data.id + 0.2,
      name: data.label + ' ' + 'Child 2',
      type: 'LEAVE'
    }]);
  }
}
