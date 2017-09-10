import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'event-info',
    templateUrl: 'event-info.component.html',
    styleUrls: ['event-info.component.css']
})

export class EventInfoComponent {
    public information = {} as IInformation;

    constructor(private http: Http, private sanitizer: DomSanitizer) {
        this.getBlurbs();
    }

    public sceResource(url: string) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    private getBlurbs() {
        this.http
            .get("./assets/data/events.json")
            .subscribe(p => {
                this.information = p.json();
            });
    }
}

export interface IInformation {
    headers: string[]
    directions: IDirections;
    protocols: IProtocols;
    course: ICourse;
}

export interface IDirections {
    address: string[];
    iframe: string;
    sections: IDetail;
}

export interface IDetail {
    title: string;
    detail: string;
}

export interface IProtocols {
    sections: IDetail;
}

export interface ICourse {
    text: string;
    map: string;
}