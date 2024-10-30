const loginData = {
  username: "example_user",
  password: "example_password",
};

fetch("https://example.com/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(loginData),
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    console.log(data); // 处理从服务器返回的数据
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });
