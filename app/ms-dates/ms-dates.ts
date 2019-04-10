import * as moment from 'moment';
import template from './template.html';

enum dateSetType {
    yesterday,
    today,
    twoWeeks,
    month,
    all,
};

class msDatesComponentController {

    private dateSetType = dateSetType;
    public dateFrom: string = null;
    public dateTo: string = null;

    private model: {
        from: Date
        to: Date
    };

    private mcChange: any;

    constructor() {

    }

    private setDates(setType) {
        switch (setType) {
            case dateSetType.yesterday: {
                this.model.from = this.model.to = moment().subtract(1, 'day').toDate();
                break;
            }
            case dateSetType.today: {
                this.model.from = this.model.to = new Date();
                break;
            }
            case dateSetType.twoWeeks: {
                let mDate = moment();
                this.model.to = mDate.toDate();
                this.model.from = mDate.add(-14, 'days').toDate();
                break;
            }
            case dateSetType.month: {
                let mDate = moment();
                this.model.to = mDate.toDate();
                this.model.from = mDate.add(-30, 'days').toDate();
                break;
            }
            case dateSetType.all: {
                this.model.from = this.model.to = null;
                break;
            }
        }

        this.onChange();
    }

    public $onInit() {

        let format = 'YYYYMMDD';
        this.model = this.newModel(this.dateFrom, this.dateTo);

        let isFromSame = moment(this.model.from).format(format) === moment(this.dateFrom).format(format);
        let isToSame = moment(this.model.to).format(format) === moment(this.dateTo).format(format);

        if (!isFromSame || !isToSame) {
            this.onChange();
        }

    }

    public $onChanges(changesObj) {

        !this.model && (this.model = this.newModel(this.dateFrom, this.dateTo));

        if (!changesObj) {
            return;
        }

        this.model = this.newModel(
            (changesObj.dateFrom && changesObj.dateFrom.currentValue && new Date(changesObj.dateFrom.currentValue)) || this.model.from,
            (changesObj.dateTo && changesObj.dateTo.currentValue && new Date(changesObj.dateTo.currentValue)) || this.model.to
        );

        console.log(this.model);
    }

    public onChange() {

        this.mcChange({
            from: this.model.from ? moment(this.model.from).format('YYYY-MM-DD') : null,
            to: this.model.to ? moment(this.model.to).format('YYYY-MM-DD') : null
        })
        ;
    }

    private newModel(fromDate, toDate) {

        let from = fromDate && new Date(fromDate);
        let to = toDate && new Date(toDate);

        if (to && from && to < from) {
            to = from;
        }

        return {from, to};
    }
}

export const msDatesComponent = {
    name: 'msDates',

    template: template,

    bindings: {
        dateFrom: '<',
        dateTo: '<',
        mcChange: '&'
    },
    controller: msDatesComponentController,
    controllerAs: 'vm'
};


