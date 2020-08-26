import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-common-paging',
  templateUrl: './common-paging.component.html',
  styleUrls: ['./common-paging.component.css']
})
export class CommonPagingComponent implements OnInit, OnChanges {

  @Input() totalRecords: number = 0;
  @Input() recordsPerPage: number = 0;
  @Input() listArr: any[]=[];
  @Output() onPageChange: EventEmitter<any> = new EventEmitter();
  pages: number[] = [];
  activePage: number;


  constructor() { } 

  ngOnChanges(changes: SimpleChanges): void {
    console.log("ngOnChanges");
    console.log(changes);

    const pageCount = this.getPageCount();
    this.pages = this.getArrayOfPage(pageCount);
    this.activePage = 1;
    this.emitPagedRecords();
  }


  private getPageCount(): number {
    let totalPage: number = 0;

    if (this.totalRecords > 0 && this.recordsPerPage > 0) {
      const pageCount = this.totalRecords / this.recordsPerPage;
      totalPage = Math.ceil(pageCount);
      //totalPage = roundedPageCount < pageCount ? roundedPageCount + 1 : roundedPageCount;
    }
    return totalPage;
  }

  private getArrayOfPage(pageCount : number) : number [] {  
    let pageArray : number [] = [];  

    if(pageCount > 0){  
        for(var i=1 ; i<= pageCount ; i++){  
          pageArray.push(i);  
        }  
    }  

    return pageArray;  
  }  

  onPageClick(pageNumber: number) {
    this.activePage = pageNumber;
    this.emitPagedRecords();
  }

  emitPagedRecords() {
    const pagedList = this.listArr ? this.listArr.slice((this.activePage - 1) * this.recordsPerPage, this.activePage * this.recordsPerPage) : [];
    this.onPageChange.emit(pagedList);
  }

  ngOnInit(): void {
  }

} 
