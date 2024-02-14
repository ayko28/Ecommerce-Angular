import { TimepickerConfig } from 'ngx-bootstrap/timepicker';

export function getTimepickerConfig(): TimepickerConfig {
  return Object.assign(new TimepickerConfig(), {
    timeFormat: 'hh:mm A',
    showMeridian: true,
    containerClass: 'theme-default',
    hourStep: 1,
    minuteStep: 15,
    readonlyInput: false,
    mousewheel: true,
    arrowkeys: true
  });
}
