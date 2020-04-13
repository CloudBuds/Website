import { Component, OnInit, ViewChild } from '@angular/core';
import { CommandsService } from '../services/commands.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.css']
})
export class CommandsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'module', 'summary', 'usage', 'permission'];
  dataSource: MatTableDataSource<any>;
  commands: any[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private service: CommandsService) {}

  async ngOnInit() { 
    this.commands = await this.service.get();
    this.commands.sort(a => a.name);
    
    this.dataSource = new MatTableDataSource(this.commands);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    document.title = '2PG - Commands';
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator)
      this.dataSource.paginator.firstPage();
  }
}
