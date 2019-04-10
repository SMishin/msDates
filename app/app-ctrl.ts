import * as moment from 'moment';
import {IController} from "angular";

export class AppCtrl implements IController {

    private model: { dateTo: string; dateFrom: string };

    constructor() {

        this.model = {
            dateFrom: moment(new Date()).format('YYYY-MM-DD'),
            dateTo: moment(new Date()).add(2, "days",).format('YYYY-MM-DD')
        };
    }

    public onUpdate(from, to) {
        this.model.dateFrom = from;
        this.model.dateTo = to;

        alert(`from: ${from}, to: ${to}`);
    }
}
