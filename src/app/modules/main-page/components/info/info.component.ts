import { Component } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';

@Component({
    selector: 'app-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.scss'],
})
export class InfoComponent{
    faBars = faBars;
    constructor() {}

}
