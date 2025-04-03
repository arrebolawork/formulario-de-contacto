const userName = document.getElementById("name");
const email = document.getElementById("email");
const message = document.getElementById("message");
const imageUrl = document.getElementById("imageUrl");
const btn = document.querySelector("input[type='submit']");
const section = document.getElementById("table");
const btnRemoveAll = document.getElementById("removeAll");
// ['https://cdn.pixabay.com/photo/2015/04/10/01/41/fox-715588_1280.jpg',
// 'https://cdn.pixabay.com/photo/2023/06/28/12/32/chameleon-8094345_1280.jpg',
//'https://cdn.pixabay.com/photo/2017/10/18/16/08/wolves-2864647_1280.jpg']
document.addEventListener("DOMContentLoaded", () => {
  btn.addEventListener("click", verifyUser);

  const users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.length !== 0) {
    userRender();
  }
});
btnRemoveAll.addEventListener("click", removeLocalStorage);
function verifyUser(event) {
  event.preventDefault();
  const users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.length === 0) {
    return send(users);
  }
  const findUser = users.find((user) => user.email === email.value);
  if (!findUser) {
    return send(users);
  }
  return console.error("Ese usuario con ese email,ya está registrado");
}

function send(users) {
  const newUser = {
    name: userName.value,
    email: email.value,
    message: message.value,
    imageUrl: imageUrl.value,
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  resetInput();
  userRender();
}
function resetInput() {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("message").value = "";
  document.getElementById("imageUrl").value = "";
}
function removeItem(num) {
  const arrayUser = JSON.parse(localStorage.getItem("users")) || [];
  arrayUser.splice(num, 1);
  localStorage.setItem("users", JSON.stringify(arrayUser));
  userRender();
}
function removeLocalStorage() {
  localStorage.removeItem("users");
  userRender();
}
function userRender() {
  const existingTable = document.getElementById("userTable");
  const arrayUser = JSON.parse(localStorage.getItem("users")) || [];
  if (arrayUser.length === 0) {
    existingTable.remove();
    return;
  }

  if (existingTable) {
    existingTable.remove();
  }

  const table = document.createElement("table");
  table.id = "userTable";
  const thead = document.createElement("thead");
  const tr = document.createElement("tr");
  const thName = document.createElement("th");
  const thEmail = document.createElement("th");
  const thMessage = document.createElement("th");
  const thImageUrl = document.createElement("th");
  const thButton = document.createElement("th");
  const tbody = document.createElement("tbody");

  thName.innerText = "Name";
  thEmail.innerText = "Email";
  thMessage.innerText = "Message";
  thImageUrl.innerText = "ImageUrl";

  tr.appendChild(thName);
  tr.appendChild(thEmail);
  tr.appendChild(thMessage);
  tr.appendChild(thImageUrl);
  tr.appendChild(thButton);

  thead.appendChild(tr);

  table.appendChild(thead);
  table.appendChild(tbody);

  arrayUser.forEach((user, index) => {
    const tr = document.createElement("tr");
    const userName = document.createElement("td");
    const userEmail = document.createElement("td");
    const userMessage = document.createElement("td");
    const userImageUrl = document.createElement("td");
    const btnRemoveUser = document.createElement("td");
    const btn = document.createElement("button");
    if (index % 2 === 0) {
      tr.style.backgroundColor = "lightGrey";
    } else {
      tr.style.backgroundColor = "#F0F0F0";
    }
    btn.className = "customButton delete";
    btn.textContent = "Remove User";
    btn.onclick = () => removeItem(index);
    btnRemoveUser.appendChild(btn);
    const img = document.createElement("img");
    userName.innerText = user.name;
    userEmail.innerText = user.email;
    userMessage.innerText = user.message;
    img.src = user.imageUrl;
    img.alt = "user image";
    img.style.width = "50px";
    img.style.height = "50px";
    img.style.borderRadius = "50%";
    userImageUrl.appendChild(img);
    tr.appendChild(userName);
    tr.appendChild(userEmail);
    tr.appendChild(userMessage);
    tr.appendChild(userImageUrl);
    tr.appendChild(btnRemoveUser);
    tbody.appendChild(tr);
  });
  section.appendChild(table);
}

console.log(JSON.parse(localStorage.getItem("users")));
