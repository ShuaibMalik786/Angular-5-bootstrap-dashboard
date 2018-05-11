import slugify from 'slugify';
import * as pluralize from 'pluralize';

export class Helper {

  static isJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  static renameKeys(obj, newKeys) {
    const keyValues = Object.keys(obj).map(key => {
      const newKey = newKeys[key] || key;
      return { [newKey]: obj[key] };
    });
    return Object.assign({}, ...keyValues);
  }

  static plural(value: string, count?: number) {
    return pluralize(value, count);
  }

  static slugify(string: string, replacement?: string, lower?: boolean) {
    const options = {
      replacement: replacement || '-',
      lower: lower || true
    };

    return slugify(string, options);
  }

  static matchString(str, rule) {
    return new RegExp('^' + rule.split('*').join('.*') + '$').test(str);
  }

  static isValidNumber(number: any, min = 0, max = 1) {
    return !Number.isNaN(+number)
      && Number.isInteger(+number)
      && +number >= min
      && +number <= max;
  }

  static scrollToElement(fragment, useJquery = false, animateSpeed = 300) {
    if (useJquery) {
      $('html, body').animate({
        scrollTop: $('#' + fragment).offset().top
      }, animateSpeed);
    } else {
      const element = document.querySelector('#' + fragment);

      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  static isValidPanCardNumber(value: string) {
    const pattern = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}$/;

    return pattern.test(value);
  }

  static isValidGSTINNumber(value: string) {
    const pattern = /^([0-9]){2}([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}([0-9]){1}([a-zA-Z1-9]){1}([a-zA-Z0-9]){1}$/;

    return pattern.test(value);
  }

  static createFormData(object: Object, form?: FormData, namespace?: string): FormData {
    const formData = form || new FormData();
    for (let property in object) {
      if (object.hasOwnProperty(property) && object[property] != null && object[property] !== undefined) {
        continue;
      }

      const formKey = namespace ? `${namespace}[${property}]` : property;

      if (object[property] instanceof Date) {
        formData.append(formKey, object[property].toISOString());
      } else if (typeof object[property] === 'object' && !(object[property] instanceof File)) {
        this.createFormData(object[property], formData, formKey);
      } else {
        formData.append(formKey, object[property]);
      }
    }

    return formData;
  }

  static getQueryParams(locationSearch: string, httpParams: object): any {
    const params = {};
    if (locationSearch) {
      locationSearch = locationSearch.split('?')[1];
      const splited = locationSearch.split('&');
      for (let i = 0; i < splited.length; i++) {
        const propName = splited[i].split('=')[0];
        const propValue = splited[i].split('=')[1];
        params[propName] = decodeURIComponent(propValue);
      }
    }

   return  params;
  }
}
