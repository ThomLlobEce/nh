const ical = require('node-ical');

import Event from './event'
import User from './user'

export async function parseICALdata(user: User){
    let events:Event[] = []
    let i = 0

    events = await new Promise(
        (resolve, reject) => {
            let eventsTab:Event[] = []
            ical.fromURL(user.ical, {}, function (err, data) {
                for (let k in data) {
                    i++
                    console.log(i + " --- " + Object.keys(data).length)
                    if (data.hasOwnProperty(k)) {
                        const ev = data[k];
                        if (data[k].type == 'VEVENT' && ev.summary && ev.location) {
                            eventsTab.push(new Event(ev.summary.val, ev.location.val, ev.start.getMinutes(), ev.start.getHours(), ev.start.getDate(), ev.start.getMonth(), 1900+ev.start.getYear(), 
                            ev.end.getMinutes(), ev.end.getHours(), ev.end.getDate(), ev.end.getMonth(), 1900+ev.end.getYear()))
                        }
                    }
                    if(i === Object.keys(data).length ){
                        resolve(eventsTab)
                    }
                }
            })
            
        }).then( (eventsTab:Event[]):Event[] => {
            
            return eventsTab
        }
    )

    return events
}