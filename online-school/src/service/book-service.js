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
} // metoda asta returneaza un promise si tb sa faci cu async await sau cu .then

async function getBooks() {
  try {
    let data = await api("/api/v1/book/all", "GET", null); // ca aici
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

async function getBooksByStudentId(student_id) {
  try {
    let response = await api(`/api/v1/book/find/${student_id}`, "GET", null);
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
    let response = await api("/api/v1/book/add", "POST", book);

    const data = await response.json();
    return {
      type: "success",
      payload: data,
    };
  } catch (error) {
    return {
      type: "error",
      payload: "An error occured",
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

export { getBooks, getBooksByStudentId, addNewBook, deleteBook };
