import { Directive, Input, ElementRef, Renderer2, HostListener, OnInit } from '@angular/core';
import { Sort} from '../util/sort';

@Directive({
  selector: '[appSort]'
})



export class SortDirective implements OnInit{


  @Input()
  appSort: Array<any> = [];
  sortService: any;

  constructor(private renderer: Renderer2, private targetElem: ElementRef) { }
 @HostListener("click")
  sortData() {
   // Create object of Sort Class
    const sort = new Sort();
   // Get Reference of current clicked Element
    const elem = this.targetElem.nativeElement;
  // Get In WHich Order list should be sorted by default it should be set to desc on element attribute
    const order = elem.getAttribute("data-order");
    // Get The Property Type specially set [data-type%-Ddate] if it is date field
    const type = elem.getAttribute("data-type");
   // Get The Property Name from Element Attribute
    const property = elem.getAttribute("data-name");
    if (order === "desc") {
      this.appSort.sort(sort.startSort(property, order, type));
      elem.setAttribute("data-order", "asc");

    }
    else {
     this.appSort.sort(sort.startSort(property, order, type));
      elem.setAttribute("data-order", "desc");
    }
  }

  ngOnInit(): void { 
    this.sortData();
      }
      
}
  
  
