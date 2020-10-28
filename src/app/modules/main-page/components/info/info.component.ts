import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';

@Component({
    selector: 'app-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
    faMapMarkerAlt = faMapMarkerAlt;
    faBars = faBars;
    @Output() sideNavOpen = new EventEmitter();
    constructor() {}

    ngOnInit(): void {}
}
