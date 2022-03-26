import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Item, ItemStatus } from './model';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css'],
})
export class HelloComponent implements OnInit {
  displayedColumns = ['id', 'name', 'status'];
  dataSource: MatTableDataSource<Item>;

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.setFilter();
  }

  constructor() {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: KeyboardEvent) {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  onChange($event: any) {
    let filteredData = ELEMENT_DATA.filter((item: Item) => {
      return item.status == ItemStatus[$event.value];
    });
    this.dataSource = new MatTableDataSource(filteredData);
    this.dataSource.sort = this.sort;
    this.setFilter();
  }

  private setFilter() {
    this.dataSource.filterPredicate = (data: Item, filter: string) => {
      return data.name.toLocaleLowerCase().indexOf(filter) >= 0;
    };
  }
}

const ELEMENT_DATA: Item[] = [
  {
    id: '1',
    name: 'Get Dog Food',
    status: ItemStatus.Todo,
  },
  {
    id: '2',
    name: 'Fetch Water',
    status: ItemStatus.Todo,
  },
  {
    id: '3',
    name: 'Go On a Walk',
    status: ItemStatus.Complete,
  },
  {
    id: '4',
    name: 'Cook Dinner',
    status: ItemStatus.Todo,
  },
  {
    id: '5',
    name: 'Watch a Movie',
    status: ItemStatus.InProgress,
  },
  {
    id: '6',
    name: 'Till the Field',
    status: ItemStatus.Complete,
  },
  {
    id: '7',
    name: 'Plant Crops',
    status: ItemStatus.Complete,
  },
  {
    id: '8',
    name: 'Harvest Crops',
    status: ItemStatus.InProgress,
  },
];
