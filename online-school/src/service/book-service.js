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

async function getBooks(token) {
  try {
    let data = await api("/api/v1/book/all", "GET", null, token);
    if (data.status === 200) {
      let rez = await data.json();
      return {
        payload: rez,
        type: "succes",
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

async function getBooksByStudentId(student_id, token) {
  try {
    let response = await api(
      `/api/v1/book/find/${student_id}`,
      "GET",
      null,
      token
    );
    // if (!response.ok) {
    //   throw new Error("HTTP error !");
    // }

    const data = await response.json();
    return {
      type: "success",
      payload: data,
    };
  } catch (error) {
    console.log("error while fetching books", error);

    return {
      type: "error",
      payload: "An error occured",
    };
  }
}

async function addNewBook(book) {
  try {
    let data = await api("/api/v1/book/add", "POST", book);

    if (data.status === 200) {
      let rez = await data.json();
      return {
        type: "success",
        payload: rez,
      };
    } else if (data.status === 400) {
      let rez = await data.json();
      return {
        payload: rez.error.message,
        type: "error",
      };
    } else if (data.status === 500) {
      let rez = await data.json();
      return {
        payload: rez.error,
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

async function deleteBook(id) {
  try {
    let data = await api(`/api/v1/book/delete/${id}`, "DELETE");
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
    } else if (data.status === 500) {
      let rez = await data.json();
      return {
        payload: rez.error,
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

async function updateBook(book, id) {
  try {
    let data = await api(`/api/v1/book/update/${id}`, "PUT", book);
    if (data.status === 20) {
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
    } else if (data.status === 500) {
      let rez = await data.json();
      return {
        payload: rez.error,
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

async function getBookById(id) {
  try {
    let data = await api(`/api/v1/book/find/by/bookId/${id}`, "GET", null);
    console.log(data, "this is data getBookById");
    if (data.status === 200) {
      let rez = await data.json();
      console.log(rez, "this is rez from getbookbyid");
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
      return {
        payload: rez.error,
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
  getBooks,
  getBooksByStudentId,
  addNewBook,
  deleteBook,
  updateBook,
  getBookById,
};
