import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { IData } from './app.model';
import { AppService } from './app.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public data: IData = {
    application: '',
    username: '',
    password: '',
    description: '',
  };
  public rowData: IData[] = [];
  public defaultColDef: any;
  public api: any;
  columnDefs: ColDef[] = [
    { field: 'application' },
    { field: 'username' },
    { field: 'password' },
    { field: 'description' },
    { field: 'delete', headerName: 'Delete' },
  ];
  constructor(private appService: AppService) {}
  ngOnInit(): void {
    this.loadData();
  }
  onGridReady = (params: any) => {
    console.log(params.data);
    this.api = params.api;
    this.defaultColDef = {
      filter: true,
      sortable: true,
      pagination: true,
    };
  };

  loadData(): void {
    this.appService.getData().subscribe({
      next: (data: any) => {
        this.rowData = data.data;
      },
      error: (e: any) => {
        console.log(e);
      },
    });
  }
  handleSave(): void {
    this.appService.addData(this.data).subscribe({
      next: (result: any) => {
        this.data = {
          application: '',
          username: '',
          password: '',
          description: '',
        };
        this.loadData();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
