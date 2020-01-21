export default class Event {
    title: string
    location: string
    startMinutes: string
    startHours: string
    startDay: string
    startMonth: string
    startYear: string
    endMinutes: string
    endHours: string
    endDay: string
    endMonth: string
    endYear: string

    constructor(title: string, location: string, startMinutes: string, startHours: string, startDay: string, startMonth: string, startYear: string, 
                                                    endMinutes: string, endHours: string, endDay: string, endMonth: string, endYear: string){
        this.title=title
        this.location=location
        this.startMinutes = startMinutes
        this.startHours = startHours
        this.startDay=startDay
        this.startMonth=startMonth
        this.startYear=startYear
        this.endDay=endDay
        this.endMonth=endMonth
        this.endYear=endYear
        this.endMinutes = endMinutes
        this.endHours = endHours
    }
}