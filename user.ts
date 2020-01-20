export default class User {
    public name: string // The last name of the user
    public firstName: string // The first name of the user
    public email: string // The e-mail of the user. It used to identiy uniquely him
    public ufr: string //
    public year: number // 
    public cm: string // 
    public password: string // contains the password -- UNSECURED
    public ical: string // contains the url of an ical source for loading upcomming events
    public need: Boolean // true = Person looking for help, false = Person looking for helping

    constructor(name: string, firstName: string, email: string, ufr: string, year: number, cm: string, password: string, need: Boolean) {
      this.name = name
      this.firstName = firstName
      this.email = email
      this.ufr = ufr
      this.year = year
      this.cm = cm
      this.password = password
      this.ical = ''
      this.need = need
    }

    // SETTERS
    addIcal = (ical: string) => {
        this.ical = ical
    }
}