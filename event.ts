export default class Event {
    title: String
    location: String
    startMinutes: String
    startHours: String
    startDay: String
    startMonth: String
    startYear: String
    endMinutes: String
    endHours: String
    endDay: String
    endMonth: String
    endYear: String

    constructor(title: String, location: String, startMinutes: String, startHours: String, startDay: String, startMonth: String, startYear: String, 
                                                    endMinutes: String, endHours: String, endDay: String, endMonth: String, endYear: String){
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