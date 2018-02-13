window.onload = () => {
  const select = document.getElementById("select");
  const buttonSubmit = document.getElementById("saveButton");
  const nameInput = document.getElementById("nameInput");
  const valueInput = document.getElementById("valueInput");
  const pathInput = document.getElementById("pathInput");
  const domainInput = document.getElementById("domainInput");

  buttonSubmit.addEventListener("click", () => {
    const name = nameInput.value;
    const value = valueInput.value;

    const options = {
      expires: +select.value,
      domain: domainInput.value
      //   path: pathInput.value
    };

    setCookie(name, value, options);
  });
};

function setCookie(name, value, options) {
  console.log(options);
  options = options || {};

  var expires = options.expires;

  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  var updatedCookie = name + "=" + value;

  for (var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  console.log(updatedCookie);
  document.cookie = updatedCookie;
  console.log(document.cookie);
}
