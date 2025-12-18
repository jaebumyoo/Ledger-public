import { NgModule } from '@angular/core';

import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarPreviousViewDirective, CalendarTodayDirective, CalendarNextViewDirective, CalendarMonthViewComponent, CalendarWeekViewComponent, CalendarDayViewComponent, CalendarDatePipe, DateAdapter, provideCalendar } from 'angular-calendar';

@NgModule({
    imports: [
        CalendarPreviousViewDirective,
        CalendarTodayDirective,
        CalendarNextViewDirective,
        CalendarMonthViewComponent,
        CalendarWeekViewComponent,
        CalendarDayViewComponent,
        CalendarDatePipe
    ],
    exports: [
        CalendarPreviousViewDirective,
        CalendarTodayDirective,
        CalendarNextViewDirective,
        CalendarMonthViewComponent,
        CalendarWeekViewComponent,
        CalendarDayViewComponent,
        CalendarDatePipe
    ],
    providers: [
        provideCalendar({
            provide: DateAdapter,
            useFactory: adapterFactory,
        })
    ]
})
export class CalendarModule { }