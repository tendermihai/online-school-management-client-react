function api(path, method, body) {
  const url = "http://localhost:2020" + path;

  const options = {
    method,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "X-Requested-With": "XMLHttpRequest",
    },
  };

  if (body !== null) {
    options.body = JSON.stringify(body);
  }

  return fetch(url, options);
}

async function loginStudent(email, password) {
  const student = {
    email: email,
    password: password,
  };
  try {
    let data = await api("/api/v1/students/login", "POST", student);
    if (data.status == 200) {
      let rez = await data.json();
      return {
        payload: rez,
        type: "success",
      };
    } else if (data.status == 400) {
      let rez = await data.json();
      console.log(rez, "this is login rez");
      return {
        payload: rez.error.message,
        type: "error",
      };
    }
  } catch (error) {
    return {
      payload: "error occured",
      type: "error",
    };
  }
}

export { loginStudent };
