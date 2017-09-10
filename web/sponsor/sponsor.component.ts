import { Component, Input } from '@angular/core';
import { Sponsor } from './../sponsors/sponsors.component'

@Component({
    selector: '[sponsor]',
    templateUrl: 'sponsor.component.html',
    styleUrls: ['sponsor.component.css']
})

export class SponsorComponent {
    @Input() public sponsor: Sponsor;

    public singleBlockSize = 115;

    constructor() { }
}