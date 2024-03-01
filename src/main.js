// const root = document.getElementById("root");
// const button = document.querySelector("#btn");
// const buttonClear = document.querySelector("#btn_clear");

// const generateCard = (data) => {
//   const card = document.createElement("div");
//   const image = document.createElement("img");
//   const name = document.createElement("p");
//   const email = document.createElement("p");
//   const phone = document.createElement("p");
//   const animameText = document.createElement("div");
//   card.classList.add("card");
//   image.classList.add("card_image");
//   name.classList.add("card_name");
//   email.classList.add("card_email");
//   phone.classList.add("card_phone");
//   animameText.classList.add("card_textbox");
//   image.setAttribute("src", data.results[0].picture?.large);
//   name.textContent = `${data.results[0].name.title} ${data.results[0].name.first} ${data.results[0].name.last}`;
//   email.textContent = data.results[0].email;
//   phone.textContent = data.results[0].phone;
//   card.append(image);
//   animameText.append(name);
//   animameText.append(email);
//   animameText.append(phone);
//   card.append(animameText);
//   root.append(card);
// };
// const series = async () => {
//   try {
//     for (let i = 0; i < 20; i++) {
//       const res = await fetch("https://randomuser.me/api/");
//       const data = await res.json();
//       if (data) {
//         generateCard(data);
//       }
//     }
//   } catch (err) {
//     alert("Fetch error");
//   }
// };

// button.addEventListener("click", () => {
//   root.innerHTML = "";
//   series();
// });

// buttonClear.addEventListener("click", () => {
//   if (root.childNodes.length) {
//     root.innerHTML = "";
//   } else {
//     alert("Данные очищены");
//   }
// });

////  2



//init tags
const root = document.getElementById("root");
const button = document.querySelector("#btn");
const buttonClear = document.querySelector("#btn_clear");
const buttonSearch = document.querySelector("#btn_search");
const input = document.querySelector("#input");
//loader
let isLoad = false;
const loading = document.createElement("div");

//card component
const generateCard = (data) => {
  const card = document.createElement("div");
  const image = document.createElement("img");
  const name = document.createElement("p");
  const email = document.createElement("p");
  const phone = document.createElement("p");
  const animameText = document.createElement("div");
  card.classList.add("card");
  image.classList.add("card_image");
  name.classList.add("card_name");
  email.classList.add("card_email");
  phone.classList.add("card_phone");
  animameText.classList.add("card_textbox");
  image.setAttribute("src", data.image);
  name.textContent = data.name;
  email.textContent = data.email;
  phone.textContent = data.phone;
  card.append(image);
  animameText.append(name);
  animameText.append(email);
  animameText.append(phone);
  card.append(animameText);
  root.append(card);
};

//users list
let users = [];

//generating data
const series = async () => {
  try {
    isLoad = true;
    if (isLoad) {
      loading.textContent = "loading...";
      root.append(loading);
    }
    for (let i = 0; i < 20; i++) {
      const res = await fetch("https://randomuser.me/api/");
      const data = await res.json();
      if (data) {
        users.push({
          image: data.results[0].picture?.large,
          name: `${data.results[0].name.title} ${data.results[0].name.first} ${data.results[0].name.last}`,
          email: data.results[0].email,
          phone: data.results[0].phone,
        });
      }
    }
    isLoad = false;
    if (!isLoad) {
      root.removeChild(loading);
    }
  } catch (err) {
    alert("Fetch error");
  }
};
//fetching button
button.addEventListener("click", async (e) => {
  e.preventDefault();

  root.innerHTML = "";
  users = [];
  await series();

  if (users) {
    users.map((el) => generateCard(el));
  }
});
//clear button
buttonClear.addEventListener("click", (e) => {
  e.preventDefault();
  if (root.childNodes.length) {
    root.innerHTML = "";
    users = [];
  } else {
    alert("Данные очищены");
  }
});
buttonSearch.addEventListener("click", (e) => {
  e.preventDefault();
  if (users && users.length) {
    root.innerHTML = "";
    users
      .filter((el) => el.name.includes(input.value))
      .map((el) => generateCard(el));
  } else {
    alert("Данных нет");
  }
});
