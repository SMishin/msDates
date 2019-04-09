import * as moment from 'moment';

const dateSetType = {
    yesterday: 1,
    today: 2,
    twoWeeks: 3,
    month: 4,
    all: 5,
};

export class msDatesComponent {

    public static config = {
        name: 'msDates',

        template: '<div> ' +
            'From  <md-datepicker ng-model="vm.model.from" ng-change="vm.onChange()" ></md-datepicker>  ' +
            'To <md-datepicker ng-model="vm.model.to" ng-change="vm.onChange()" md-min-date="vm.model.form"></md-datepicker>  ' +
            '</div>' +
            '<div>' +
            '<button ng-click="vm.setDates(vm.dateSetType.yesterday)">yesterday</button>' +
            '<button ng-click="vm.setDates(vm.dateSetType.today)">today</button>' +
            '<button ng-click="vm.setDates(vm.dateSetType.twoWeeks)">2 weeks</button>' +
            '<button ng-click="vm.setDates(vm.dateSetType.month)">month</button>' +
            '<button ng-click="vm.setDates(vm.dateSetType.all)">all</button>' +
            '</div>',

        bindings: {
            dateFrom: '<',
            dateTo: '<',
            mcChange: '&'
        },
        controller: msDatesComponent,
        controllerAs: 'vm'
    };
    private dateSetType = dateSetType;
    public dateFrom: string;
    public dateTo: string;

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
                this.model.from = this.model.to = moment().subtract(1, 'days').toDate();
                break;
            }
            case dateSetType.today: {
                this.model.from = this.model.to = new Date();
                break;
            }
            case dateSetType.twoWeeks: {
                let mDate = moment();
                this.model.from = mDate.toDate();
                this.model.to = mDate.add(14, 'days').toDate();
                break;
            }
            case dateSetType.month: {
                let mDate = moment();
                this.model.from = mDate.toDate();
                this.model.to = mDate.add(30, 'days').toDate();
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
        this.model = this.newModel(this.dateFrom, this.dateTo);
    }

    public $onChanges(changesObj) {

        !this.model && (this.model = this.newModel(this.dateFrom, this.dateTo));

        if (!changesObj) {
            return;
        }

        // changesObj.dateTo && (this.model.to = new Date(changesObj.dateTo.currentValue));
        //changesObj.dateFrom && (this.model.from = new Date(changesObj.dateFrom.currentValue));

        this.model = this.newModel(
            (changesObj.dateFrom && new Date(changesObj.dateFrom.currentValue)) || this.model.from,
            (changesObj.dateTo && new Date(changesObj.dateTo.currentValue)) || this.model.to
        );

    }

    public onChange() {

        console.log('onChange');

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
            to = null;
        }

        return {from, to};
    }
}


