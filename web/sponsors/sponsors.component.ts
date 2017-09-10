import { Component } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'sponsors',
    templateUrl: 'sponsors.component.html',

})

export class SponsorsComponent {
    public sponsors: any;

    constructor(private http: Http) {
        this.http
            .get(`./assets/data/sponsors.json`)
            .subscribe(p => this.sponsors = p.json());
    }
}

export class Sponsor {
    index: number;
    title: string;
    website?: string;
    logo?: string;
    phone?: string;
    contact?: string;
    width: number;
    height: number;
}