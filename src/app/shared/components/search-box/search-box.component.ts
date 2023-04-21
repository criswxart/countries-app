import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit, OnDestroy{
  
  
  private debouncer: Subject<string> = new Subject<string>;
  private debouncerSuscription? : Subscription; 
  @Input() public placeholder: string = '';
  @Input() public initialValue: string = '';
  @Output() public onValue = new EventEmitter<string>();
  @Output() public onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
    .pipe(
      debounceTime(1000)
      )
      .subscribe( term => {

        this.onDebounce.emit( term );
      })
    }

    ngOnDestroy(): void {
      this.debouncerSuscription?.unsubscribe();
    }

    onKeyPress( searchTerm: string ){
      this.debouncer.next( searchTerm );
    }
    emitValue( valor:string ){
      this.onValue.emit(valor);
    }
  }
  