import store from '../../store.js';

export async function userLogin(email, password) {
  var details = {
    'email': email,
    'password': password,
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

  const response = await fetch(store.authApiBase + '/user/login', {
      method: 'POST',
      headers: {
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

export default userLogin
