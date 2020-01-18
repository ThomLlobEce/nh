export default class User {
    public name: string
    public firstName: string
    public email: string
    public ufr: string
    public year: number
    public cm: string
    public password: string
    public ical: string

    constructor(name: string, firstName: string, email: string, ufr: string, year: number, cm: string, password: string) {
      this.name = name
      this.firstName = firstName
      this.email = email
      this.ufr = ufr
      this.year = year
      this.cm = cm
      this.password = password
      this.ical = ''
    }

    addIcal = (ical: string) => {
        this.ical = ical
    }
}