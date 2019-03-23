/**
 *   Registers a user with the given email, password, first and last name.
 *   If either first_name or last_name are undefined, the user will be registered
 *   without a first or last name respectively.
 */

import store from '../../store.js';

export async function registerUser(email, password, first_name, last_name) {
  var details = {
    'email': email,
    'password': password,
    'first_name': first_name,
    'last_name': last_name
  }

  var formBody = [];
  for (var property in details) {
    if (details[property] === undefined) {
      continue;
    }
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  formBody = formBody.join('&');

  const response = await fetch(store.authApiBase + '/user', {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formBody,
    });

    const body = await response.json();

    console.log(body);
    if (response.status !== 201) {
      if (body.error) {
        return body.error;
      }
      else {
        return JSON.stringify(body);
      }
    } else {
        return 200;
    }
}

export default registerUser
