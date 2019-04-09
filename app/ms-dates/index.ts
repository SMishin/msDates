import {msDatesComponent} from "./ms-dates";
import * as angular from "angular";
import * as moment from 'moment';


let module = angular.module('msDatesModule', ['ngMaterial'])
    .config(['$mdDateLocaleProvider', function ($mdDateLocaleProvider) {
        $mdDateLocaleProvider.formatDate = function (date) {
            let m = moment(date);
            return m.isValid() ? m.format('YYYY-MM-DD') : '';
        };
    }])
    .component(msDatesComponent.config.name, msDatesComponent.config)
;

export {module}

