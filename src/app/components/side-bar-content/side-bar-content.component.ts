import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
    faFacebook,
    faInstagram,
    faTelegram,
} from '@fortawesome/free-brands-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-side-bar-content',
    templateUrl: './side-bar-content.component.html',
    styleUrls: ['./side-bar-content.component.scss'],
})
export class SideBarContentComponent implements OnInit {
    @Output() sideNavClose = new EventEmitter();
    socials = [faInstagram, faTelegram, faFacebook];
    faTimes = faTimes;

    constructor() {}

    ngOnInit(): void {}
}
