import { Component } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'home-page',
    templateUrl: 'home-page.component.html',
    styleUrls: ['home-page.component.css']
})

export class HomePageComponent {
    public blurbs: IBlurb[];

    constructor(private http: Http) {
        this.getBlurbs();
    }

    private getBlurbs() {
        this.http
            .get("./assets/data/blurbs.json")
            .subscribe(p => {
                this.blurbs = p.json();
            });
    }
}

export class IBlurb {
    paragraph: IText | ILink[];
}

export interface IText {
    text: string;
}

export interface ILink {
    protocol: string;
    link: string;
}