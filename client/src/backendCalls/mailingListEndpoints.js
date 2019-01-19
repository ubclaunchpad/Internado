import store from '../store.js';

export async function addEmail(email) {
  const response = await fetch(store.apiBase + `/mailing_list?email=${email}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
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