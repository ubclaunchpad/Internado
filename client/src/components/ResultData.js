export default class ResultData {
  constructor(id, job_title, link, description, city, state, country, latitude, longitude, company_name, salary_min, start_date) {
    this.id = id;
    this.job_title = job_title;
    this.link = link;
    this.description = description;
    this.city = city;
    this.state = state;
    this.country = country;
    this.latitude = latitude;
    this.longitude = longitude;
    this.company_name = company_name;
    this.salary_min = salary_min;
    this.start_date = start_date;
  }
}
