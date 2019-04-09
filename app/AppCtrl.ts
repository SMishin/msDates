import * as moment from 'moment';
import {IController} from "angular";

export class AppCtrl implements IController {

    // public static $inject = [
    //     '$scope'
    // ];
    //
    private model: { dateTo: string; dateFrom: string };

    constructor() {

        this.model = {
          //  dateFrom: moment(new Date()).format('YYYY-MM-DD'),
            dateFrom: null,
            dateTo: moment(new Date()).format('YYYY-MM-DD')
        };

    }

    public onUpdate(from, to) {
        this.model.dateFrom = from;
        this.model.dateTo = to;
    }

}
