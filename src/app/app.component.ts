import { Component, OnInit } from '@angular/core';
import { AppService } from './service/app.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Folder } from './adapters/folder';

import {TreeNode} from 'primeng/api';
import moment from 'moment';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  public treeData = [];
  public timeForm: FormGroup;
  public activePage: number = 1;
  public data: Array<any> = [];
  public choice = 'time';
  public selectedTab: number = 0;
  public tabList = [1, 2, 3, 4, 5];
  public formTime = '2020-09-09 12:12:04-2021-09-19 12:12:02';
  public dateError: string;
  public dateClass: string;
  public content = [
    'Content 1',
    'Content 2',
    'Content 3',
    'Content 4',
    'Content 5'
  ];
  public responseArray = [];
  constructor(private readonly service: AppService, private fb: FormBuilder) {
    this.timeForm = this.fb.group({
      time: ['']
    });
    
  }

  ngOnInit() {
    this.getData(this.activePage);
    // this.forkJoinExample();
    this.sequentialCallExample();
    this.getTreeData();
  }

  public getData(page): void {
    this.service.getData(this.activePage).subscribe(resp => {
      this.data = resp;
    });
  }

  public getNextPage(event): void {
    this.activePage = event.activePage;
    this.service.getData(this.activePage).subscribe(resp => {
      this.data = this.data.concat(resp);
    });
  }

  test($event): void {
    this.selectedTab = $event.index;
  }

  next(): void {
    if (this.selectedTab  < this.tabList.length-1) {
    this.selectedTab = this.selectedTab + 1;
    }
  }

  prev(): void {
   if (this.selectedTab  > 0) {
    this.selectedTab = this.selectedTab - 1;
    }
  }

 public changeChoice(choice) {
   this.choice = choice;
 }

 public forkJoinExample(): void {
   const data = [
     {id: 1, name: 'Test'},
     {id: 2, name: 'Best'},
     {id: 3, name: 'Rest'}
   ];
   this.service.forkJoinExample(data).subscribe(resp => {
    //  console.log(resp);
   });
 }

 public sequentialCallExample(): void {
   const data = [
     {id: 1, name: 'Data 9'},
     {id: 2, name: 'Data 2'},
     {id: 3, name: 'Data 3'},
     {id: 4, name: 'Data 49'}
   ];
  this.processData(0, data);
  //  this.service.forkJoinExample(data).subscribe(resp => {
  //    console.log(resp);
  //  });
 }

 public processData(index, data): void {
    if (index >= data.length) {
    } else {
    this.service.sequentialCallExample(data[index])
      .subscribe(resp => {
        if (resp) {
          this.responseArray.push(resp);
          this.processData(parseInt(index, 10) + 1, data);
        }
      }, err => {
        console.log(err);
      }); 
    }
  }

  public onBlur(): void {
    const time = this.formTime;

    let s = time && time.split('-');
    let now;
    let then;
    let now1 = s && s.slice(0, s.length/2).join().
    replace(/,/g, '-');
    s = time.split('-');
    let then1 = s && s.splice(s.length/2, s.length).join().
      replace(/,/g, '-');

    const regex = new RegExp('[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]');
    if (regex.test(now1)) {
      if (regex.test(then1)) {
        now  = moment(now1);
        then = moment(then1);
        const a = then.diff(now, 'days');
        if (a < 0) {
          this.dateClass = 'invalid';
          this.dateError = 'Invalid date.Start date should be less than end date';
        } else {
          this.dateClass = 'valid';
          this.dateError = '';
        }
      } else {
        this.dateError = 'Invalid end date';
        this.dateClass = 'invalid';
      }
       
    } else {
      this.dateClass = 'invalid';
      this.dateError = 'Invalid start date';
    }
  }

  public getTreeData(): void {
    this.service.getTreeData().subscribe(resp => {
      resp.map(data => {
        this.treeData.push(new Folder(data));
      });
    });
  }

  public getChildNode($event): void {
    const node = $event.node;
    this.service.getChildData(node).subscribe(resp => {
      resp.map(data => {
        node.children.push(new Folder(data));
      });
    });
  }
}
