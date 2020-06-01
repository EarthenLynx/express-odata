// TODO: This class is currently non - functional
class oFilter {
  constructor(url, option, key, value, contains) {
    this.url = url;
    this.option = option;
    this.key = key;
    this.value = value;
    this.contains = contains;
  }

  query() {
    if (this.contains) {
      let request =
        this.url +
        this.option +
        "contains(" +
        this.key +
        ", " +
        `\'${this.value}\'` +
        ")";
      console.log(request);

      return request;
    } else {
      return this.url + this.option + this.key + " eq " + `\'${this.value}\'`;
    }
  }
}

module.exports = oFilter;
