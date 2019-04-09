import * as angular from "angular";
import "angular-animate";
import "angular-aria";
import "angular-messages";
import "angular-material";

import {AppCtrl} from "./AppCtrl";
import {module} from './ms-dates'

angular.module('myApp', [module.name])
    .controller('appCtrl', AppCtrl)

;

