import * as angular from "angular";
import "angular-animate";
import "angular-aria";
import "angular-messages";
import "angular-material";

import {AppCtrl} from "./app-ctrl";
import {msDatesModule} from './ms-dates'

angular.module('myApp', [msDatesModule.name])
    .controller('appCtrl', AppCtrl)
;

