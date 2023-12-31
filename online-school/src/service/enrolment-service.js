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

async function getEnrolments() {
  try {
    let data = await api("/api/v1/enrolment/all", "GET", null);
    console.log(data, "data");
    if (data.status === 200) {
      let rez = await data.json();
      console.log(rez, "payload undefined");
      return {
        payload: rez,
        type: "success",
      };
    } else if (data.status === 400) {
      let rez = await data.json();
      console.log(rez, "this is my new rez");
      return {
        payload: rez.error.message,
        type: "error",
      };
    }
    throw new Error("error");
  } catch (error) {
    return {
      payload: "error occurred",
      type: "error",
    };
  }
}

async function addEnrolment(enrolment, token) {
  try {
    let data = await api("/api/v1/enrolment/add", "POST", enrolment, token);
    if (data.status === 200) {
      let rez = await data.json();
      console.log(rez, "this is rez for succes");
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
    } else if (data.status === 500) {
      let rez = await data.json();
      console.log(rez.error, "this is rez for 500");
      return {
        payload: rez.error,

        type: "error",
      };
    }
    // throw new Error("error");
  } catch (error) {
    console.log(error, "500 error");
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

async function unEnrollment(student_id, course_id) {
  const queryParams = {
    student_id: student_id,
    course_id: course_id,
  };

  const queryString = new URLSearchParams(queryParams).toString();

  console.log(queryString, "queryString");
  try {
    let data = await api(
      `/api/v1/enrolment/delete/enrolment?${queryString}`,
      "DELETE"
    );
    console.log(data.status, "this is data");
    if (data.status === 200) {
      let rez = await data.json();

      console.log(rez);
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
    console.log(error);
    return {
      payload: "Error occured",
      type: "error",
    };
  }
}

export {
  getEnrolments,
  addEnrolment,
  deleteEnrolment,
  findEnrolmentByCourse,
  findEnrolmentById,
  unEnrollment,
};
