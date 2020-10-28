import { Component, OnInit } from '@angular/core';
import {
    faInstagram,
    faTelegram,
    faFacebook,
} from '@fortawesome/free-brands-svg-icons';
@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
    socials = [faInstagram, faTelegram, faFacebook];
    constructor() {}

    ngOnInit(): void {}
}
