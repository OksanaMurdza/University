window.onload = () => {
  const buttonSubmit = document.getElementById("saveButton");
  const input = document.getElementsByTagName("input");
  const prevCookie = document.getElementById("prevCookie");

  const cookie = document.cookie.split(";");

  prevCookie.innerHTML = cookie;

  buttonSubmit.addEventListener("click", () => {
    const data = Object.values(input).map(({ value }) => value);

    set_cookie(...data);
  });
};

function set_cookie(name, value, path, domain, exp_y, exp_m, exp_d) {
  console.log(arguments);
  var cookie_string = name + "=" + escape(value);

  if (exp_y) {
    var expires = new Date(+exp_y, +exp_m, +exp_d);
    cookie_string += "; expires=" + expires.toGMTString();
  }

  if (domain) cookie_string += "; domain=" + `'${escape(domain)}'`;

  if (path) cookie_string += "; path=" + escape(path);

  console.log(cookie_string);
  document.cookie = cookie_string;
}
