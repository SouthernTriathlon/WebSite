import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, ParamMap } from '@angular/router';

import * as _ from "lodash";
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'results',
    templateUrl: 'results.component.html',
    styleUrls: ['results.component.css']
})

export class ResultsComponent implements OnInit {
    public years = _.range(2016, 2012); // years = [start, finish)

    public year: number;

    public ageGroups: string[];

    public scores: { [year: number]: _.Dictionary<IResult[]> } = {};

    public results: _.Dictionary<IResult[]> = null;

    public group: string;// = "M";

    public category: string;// = "I";

    public groupLabel: string;

    constructor(private http: Http, private route: ActivatedRoute) {
        if (!this.year && this.years.length > 0)
            this.year = this.year || this.years[0];

        this.getResults(this.year);
    }

    public ngOnInit(): void {
        this.route.paramMap
            .subscribe((params: ParamMap) => {
                this.year = +params.get('year') || this.years[0];
                this.category = params.get('category') || "I";
                this.group = params.get('group') || "M";

                this.groupLabel = this.categoryGroup();

                this.getResults(this.year);

                return this;
            });
    }

    public categoryGroup(category?: string, group?: string) {
        category = category || this.category;
        group = group || this.group;

        group = group === "M" ? "Male" : (group === "F" ? "Female" : "Mixed");

        if (category === "R")
            return group + " Relay";

        if (category === 'A')
            return group + " Age Group";

        if (category === 'O')
            return group + " Overall";

        return "Male Age Group";
    }

    public filter(result: IResult) {
        var category = this.category;

        return ((category === 'I' || category === 'A' || category === 'O') && result.category === 'I' && result.gender === this.group)
            || (category === 'R' && result.category === category && result.ageGroup === this.groupLabel);
    }

    private setResults(year: number, results: _.Dictionary<IResult[]>) {
        this.scores[year] = results;

        if (this.category === 'O') {
            var flattened = _.flatten(_.values(results));
            var overallResults = _.groupBy(flattened, p => this.categoryGroup(p.category, p.gender));
            var keys = _.keys(overallResults);
            for (var i = 0; i < keys.length; i++) {
                overallResults[keys[i]] = _.sortBy(overallResults[keys[i]], p => p.overallRank);
            }
            this.results = overallResults;
        }
        else {
            this.results = results;
        }

        this.ageGroups = _.sortBy(_.keys(this.results));
    }

    private searching: { [year: number]: boolean } = {};

    public getResults(year: number) {
        if (this.scores[year]) {
            this.setResults(year, this.scores[year]);
            return;
        }

        if (this.searching[year])
            return;

        this.searching[year] = true;

        this.http
            .get(`./assets/data/results/${year}.json`)
            .subscribe(p => this.setResults(year, _.groupBy(p.json(), (p: IResult) => {
                return `${p.sortOrder}::${p.ageGroup}`;
            })));
    }
}

export class IResult {
    category: string;
    sortOrder: number;
    ageGroup: string;
    bibNumber: number;
    name: string;
    gender: string;
    age: number;
    swimRank?: number;
    swimTime?: Date;
    T1?: Date;
    bikeRank?: number;
    bikeTime?: Date;
    T2?: Date;
    runRank?: number;
    runTime?: Date;
    ageGroupRank: number;
    overallRank: number;
    total: Date;
}