/// <reference path="../node_modules/angular2/ts/typings/jasmine/jasmine.d.ts" />

import {
  TEST_BROWSER_PLATFORM_PROVIDERS,
  TEST_BROWSER_APPLICATION_PROVIDERS
} from 'angular2/platform/testing/browser';
import {setBaseTestProviders} from 'angular2/testing';

setBaseTestProviders(
  TEST_BROWSER_PLATFORM_PROVIDERS,
  TEST_BROWSER_APPLICATION_PROVIDERS
);
