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
//request loading
//request succes
//request failed

async function getAllCourses() {
  try {
    let data = await api("/api/v1/course/all", "GET", null);
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
    throw new Error("error");
  } catch (error) {
    return {
      payload: "error occured",
      type: "error",
    };
  }
}

async function deleteEnrolment(id) {
  let data = await api(`/api/v1/enrolment/delete/${id}`, "DELETE");
  return data.json();
}

async function findEnrolmentByCourse(id) {
  let data = await api(`/api/v1/enrolment/find/course/id/${id}`);
  return data.json();
}

async function findEnrolmentById(id) {
  let data = await api(`/api/v1/enrolment/find/id/${id}`);
  return data.json();
}

async function verifyCourse(student_id, token) {
  try {
    let data = await api(
      `/api/v1/course/verify/${student_id}`,
      "GET",
      null,
      token
    );
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

export {
  getAllCourses,
  deleteEnrolment,
  findEnrolmentByCourse,
  findEnrolmentById,
  verifyCourse,
};
