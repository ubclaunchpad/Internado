export default class ResultData {
  EXCERPTLENGTH = 100;
  constructor(title, link, description, city, state, country, latitude, longitude, company_name, salary_min, start_date) {
    this.title = title;
    this.link = link;
    this.description = description;
    this.excerpt = excerpt = description.substring(0,EXCERPTLENGTH);
    this.city = city;
    this.state = state;
    this.country = country;
    this.latitude = latitude;
    this.longitude = longitude;
    this.company_name = company_name;
    this.location = "";
    this.salary_min = salary_min;
    this.start_date = start_date;
    this.link = link;
  }
}
