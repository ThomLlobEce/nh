let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

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
    color: string
    helper: string

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

    addColor(color:string) {
        this.color = color
    }

    addHelper(name:string){
        this.helper=name
    }

    equals(object):boolean{
        if(object.title === this.title && object.location === this.location){
            let beginThis = new Date(months[parseInt(this.startMonth)] + '-' + this.startDay + ', ' + this.startYear + ' ' + this.startHours + ':' + this.startMinutes + ':00')
            let endThis = new Date(months[parseInt(this.endMonth)] + '-' + this.endDay + ', ' + this.endYear + ' ' + this.endHours + ':' + this.endMinutes + ':00')
            let beginObject = new Date(object.start._seconds*1000)
            let endObject = new Date(object.end._seconds*1000)

            if(beginObject.getTime() === beginThis.getTime() && endObject.getTime() === endThis.getTime()){
                return true
            }
            else
                return false
        }
        else
            return false
    }
}