import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
    tiles: any[] = [
        { text: 'One', cols: 3, rows: 3, color: 'lightblue' },
        { text: 'Two', cols: 1, rows: 1, color: 'lightgreen' },
        { text: 'Four', cols: 1, rows: 3, color: '#DDBDF1' },
    ];

    constructor() {}

    ngOnInit(): void {}
}
