// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
  //save token as so_token
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = true
) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlString = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlString.join(""));
}

export async function renderWithTemplate(
  templateFn,
  parentElement,
  data,
  callback,
  position = "afterbegin",
  clear = true
) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlString = await templateFn(data);
  parentElement.insertAdjacentHTML(position, htmlString);
  if(callback) {
    callback(data);
  }
}

function loadTemplate(path) {
  return async function () {
      const res = await fetch(path);
      if (res.ok) {
      const html = await res.text();
      return html;
      }
  };
} 

export async function loadHeaderFooter() {
  const headerTemplateFn = loadTemplate("/partials/header.html");
  const footerTemplateFn = loadTemplate("/partials/footer.html");
  const headerEl = document.getElementById("main-header");
  const footerEl = document.getElementById("main-footer");
  renderWithTemplate(headerTemplateFn, headerEl);
  renderWithTemplate(footerTemplateFn, footerEl);
}

//newsletter

export function initializeNewsletter() {
  // Create the newsletter sign-up form
  var newsletterDiv = document.getElementById("newsletter");

  var newslettersignup = document.createElement("p");
  newslettersignup.textContent = "Sign up for our newsletter!";
  newslettersignup.classList.add("signup-heading");
  var form = document.createElement("form");
  form.id = "newsletterForm";

  var emailInput = document.createElement("input");
  emailInput.type = "email";
  emailInput.id = "emailInput";
  emailInput.placeholder = "Enter your email address";
  emailInput.required = true;

  var submitButton = document.createElement("input");
  submitButton.type = "submit";
  submitButton.value = "Subscribe";

  form.appendChild(emailInput);
  form.appendChild(submitButton);

  newsletterDiv.appendChild(newslettersignup);
  newsletterDiv.appendChild(form);

  // Create the popup message
  var popupDiv = document.getElementById("popup");

  var closeButton = document.createElement("button");
  closeButton.textContent = "OK";
  closeButton.classList.add("close-button");

  var thanksMessage = document.createElement("p");
  thanksMessage.textContent = "Thanks for subscribing!";
  
  popupDiv.appendChild(thanksMessage);
  popupDiv.appendChild(closeButton);
  

  form.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    popupDiv.style.display = "block";
  });

  closeButton.addEventListener("click", function() {
    popupDiv.style.display = "none";
  });
}

export function alertMessage(message, scroll = true, duration = 3000) {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerHTML = `<p>${message}</p><span>X</span>`;

  alert.addEventListener("click", function (e) {
    if (e.target.tagName == "SPAN") {
      main.removeChild(this);
    }
  });
  const main = document.querySelector("main");
  main.prepend(alert);
  if (scroll) window.scrollTo(0, 0); 
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => document.querySelector("main").removeChild(alert));
}
