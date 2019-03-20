/**
 *   Registers a user with the given email, password, first and last name.
 *   If either first_name or last_name are undefined, the user will be registered
 *   without a first or last name respectively.
 */
export async function userLogin(email, password) {
  var details = {
    "email": email,
    "password": password,
  }

  var formBody = [];
  for (var property in details) {
    if (details[property] === undefined) {
      continue;
    }
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  const response = await fetch("http://localhost:5050/user/login", {
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
