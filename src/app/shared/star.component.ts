import { Component, OnChanges, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector:'pm-star',
    templateUrl:'./star.component.html',
    styleUrls: ['./star.component.scss']
})

export class StarComponent implements OnChanges{
    @Input() rating : number;
    starWidth : number;
    @Output() notify: EventEmitter<string> = new EventEmitter<string>();
    
    ngOnChanges():void{
        this.starWidth= this.rating*86/5;
    }

    onClick(){
        console.log(`Star clicked ${this.rating}`)
        this.notify.emit('Clicked!');
    }
}