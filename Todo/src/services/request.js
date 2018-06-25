const BASE_URL = 'http://localhost:8081/';

export const request = (url = '', type = 'get', obj = null) => {
  const types = ['post', 'put'];
  let contentType = 'application/x-www-form-urlencoded; charset=UTF-8';
  let data = obj;

  if (types.includes(type) && obj) {
    contentType = 'application/json; charset=utf-8';
    data = JSON.stringify(obj);
  }

  return $.ajax({
    type,
    url: `${BASE_URL}${url}`,
    data,
    contentType,
    xhrFields: {
      withCredentials: true
    }
  });
};
