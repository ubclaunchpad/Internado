export default class ResultData {
  constructor(title, link, description, excerpt, city, state, country, latitude, longitude, companyName, minSalary, startDate) {
    this.title = title;
    this.link = link;
    this.description = description;
    this.excerpt = excerpt;
    this.city = city;
    this.state = state;
    this.country = country;
    this.latitude = latitude;
    this.longitude = longitude;
    this.companyName = companyName;
    this.location = "";
    this.minSalary = minSalary;
    this.startDate = startDate;
    this.postUrl = link;
    this.applyUrl = link;
  }
}
