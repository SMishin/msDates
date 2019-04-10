import * as moment from 'moment';
import {IController} from "angular";

export class AppCtrl implements IController {

    private model: { dateTo: Date; dateFrom: Date };

    constructor() {

        this.model = {
            dateFrom: new Date(),//moment(new Date()).format('YYYY-MM-DD'),
            dateTo: moment(new Date()).add(2, "days",).toDate()//.format('YYYY-MM-DD')
        };

    }

    public onUpdate(from, to) {
        alert(`from: ${from}, to:${to}`);
    }

}
