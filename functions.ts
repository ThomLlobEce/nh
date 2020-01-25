const ical = require('node-ical');

import Event from './event'

const colors = ["#ADBF94",  "#E1EEF3", "#E4C4D0", "#DFCAD6", "#BF94A2", "#EFE5EC", "#CC9188"]

/** Load a list of event from an ICAL url */
export async function parseICALdata(icalUrl: string){
    let events:Event[] = []
    let i = 0

    events = await new Promise(
        (resolve, reject) => {
            let eventsTab:Event[] = []
            ical.fromURL(icalUrl, {}, function (err, data) {
                for (let k in data) {
                    i++
                    if (data.hasOwnProperty(k)) {
                        const ev = data[k];
                        if (data[k].type == 'VEVENT' && ev.summary && ev.location) {
                            eventsTab.push(new Event(ev.summary.val || ev.summary, ev.location.val || ev.location, ev.start.getMinutes(), ev.start.getHours(), ev.start.getDate(), ev.start.getMonth(), 1900+ev.start.getYear(), 
                            ev.end.getMinutes(), ev.end.getHours(), ev.end.getDate(), ev.end.getMonth(), 1900+ev.end.getYear()))
                        }
                    }
                    if(i === Object.keys(data).length ){
                        resolve(eventsTab)
                    }
                }
                resolve(eventsTab)
            })
            
        }).then( (eventsTab:Event[]):Event[] => {
            
            let eventsToReturn:Event[] = onlyUpcomingEvents(eventsTab)

            return eventsToReturn
        }
    )

    return addColors(events)
}

/** Prevent from showing events that already happened & sort the remaining items*/
function onlyUpcomingEvents(ev: Event[]) {
    let date:string
    let eventsToReturn:Event[] = []
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    ev.forEach( (value) => {
        date = months[parseInt(value.endMonth)] + '-' + value.endDay + ', ' + value.endYear + ' ' + value.endHours + ':' + value.endMinutes + ':00'
        
        if(Date.parse(date) > Date.now()){
            eventsToReturn.push(value)
        }
        
    })

    eventsToReturn.sort(function(a, b) {
        let first = new Date(months[parseInt(a.startMonth)] + '-' + a.startDay + ', ' + a.startYear + ' ' + a.startHours + ':' + a.startMinutes + ':00')
        let second = new Date(months[parseInt(b.startMonth)] + '-' + b.startDay + ', ' + b.startYear + ' ' + b.startHours + ':' + b.startMinutes + ':00')

        return first > second ? 1 : first < second ? -1 : 0
    })

    return eventsToReturn
}

function addColors(events: Event[]):Event[]{
    
    let last_color = -1
    let r = -2

    events.forEach( (value) => {
        do{
            r = Math.floor(Math.random()*colors.length)
        }while(last_color === r)
        last_color = r

        value.addColor(colors[r])
    })

    return events



}