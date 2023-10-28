function api(path, method, body, token) {
  const url = "http://localhost:2020" + path;

  const options = {
    method,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "X-Requested-With": "XMLHttpRequest",
      Authorization: `Bearer ${token}`,
    },
  };

  if (body !== null) {
    options.body = JSON.stringify(body);
  }

  return fetch(url, options);
}

async function loginStudent(email, password, token) {
  const student = {
    email: email,
    password: password,
  };
  try {
    let data = await api("/api/v1/students/login", "POST", student, token);
    if (data.status === 202) {
      let rez = await data.json();
      console.log(rez, "this is my rez PAYLOAD");
      return {
        payload: rez,
        type: "success",
      };
    } else if (data.status === 401) {
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

async function registerStudent(
  firstName,
  lastName,
  age,
  email,
  password,
  confirmedPassword
) {
  const student = {
    firstName: firstName,
    lastName: lastName,
    age: age,
    email: email,
    password: password,
    confirmedPassword: confirmedPassword,
  };
  try {
    let data = await api("/api/v1/students/register", "POST", student);
    if (data.status === 200) {
      let rez = await data.json();
      return {
        payload: rez,
        type: "success",
      };
    } else if (data.status === 400) {
      let rez = await data.json();
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

export { loginStudent, registerStudent };
