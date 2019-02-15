import store from '../store.js';

export async function searchJobs(searchKeywords) {
  const response = await fetch(store.apiBase + '/search', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: searchKeywords,
  });

  const body = await response.json();

  if (response.status !== 200) {
    throw Error(body.message);
  }

  console.log(body);
  body.result.map(result => (result.active = false));
  store.searchResults = body.result;
};