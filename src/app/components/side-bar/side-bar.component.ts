import {
    Component,
    EventEmitter,
    OnInit,
    Output,
    ViewEncapsulation,
} from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-side-bar',
    templateUrl: './side-bar.component.html',
    styleUrls: ['./side-bar.component.scss'],
    // tslint:disable-next-line:use-component-view-encapsulation
    encapsulation: ViewEncapsulation.None,
})
export class SideBarComponent implements OnInit {
    @Output() sideNavOpen = new EventEmitter();
    faBars = faBars;
    constructor() {}

    ngOnInit(): void {}
}
