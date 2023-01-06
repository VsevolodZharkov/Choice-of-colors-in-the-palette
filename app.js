const cols = document.querySelectorAll(".col");
const form = document.querySelector(".form");
const btn = form.querySelector(".form_btn");
const input = form.querySelector(".form_input-two");
const result = {};
let type;
let inputValue;
document.addEventListener("keydown", (event) => {
  event.preventDefault();
  if (event.code.toLowerCase() === "space") {
    setRandomColor();
  } else if (event.code.toLowerCase() === "enter") {
    setRandomColor();
  }
});

document.addEventListener("click", (event) => {
  type = event.target.dataset.type;

  if (type === "lock") {
    const node =
      event.target.tagName.toLowerCase() === "i"
        ? event.target
        : event.target.children[0];
    node.classList.toggle("fa-lock-open");
    node.classList.toggle("fa-lock");
    if (node.classList.value === "fa-solid fa-lock-open") {
      alert("The color of the column will change.");
    } else {
      alert("Column color saved.");
    }
  } else if (type === "copy") {
    copyToClickboard(event.target.textContent);
    alert("Text copied");
  }
});

document.addEventListener("submit", (e) => {
  e.preventDefault();

  if (e.target.elements[0].value === "" || e.target.elements[1].value === "") {
    alert("Введите данные для поиска");
    return;
  }
  const color = e.target.elements[0].value;
  const column = e.target.elements[1].value;
  result.color = color;
  result.column = column;
  // console.log(result);
  columnСheck(result);
  return result;
});

function columnСheck({ color, column }) {
  const col = document.getElementById(`${column}`);
  const isLocked = col.querySelector("i").classList.contains("fa-lock");

  if (isLocked) {
    alert("This column is disabled.");
  } else if (!isLocked) {
    col.style.background = color;
  }
}
// function generateRandomColor() {
// 	const hexCodes = '0123456789ABCDEF';
// 	let color = '';

// 	for (let index = 0; index < 6; index++) {
// 		color += hexCodes[Math.floor(Math.random() * hexCodes.length)]

// 	}
// 	return '#' + color;
// }
function setTextColor(text, color) {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > 0.5 ? "black" : "while";
}

function copyToClickboard(text) {
  return navigator.clipboard.writeText(text);
}

function setRandomColor(isInitial) {
  const colors = isInitial ? getColorsFromHash() : [];

  cols.forEach((col, index) => {
    const isLocked = col.querySelector("i").classList.contains("fa-lock");
    const text = col.querySelector("h2");
    const btn = col.querySelector("button");

    if (isLocked) {
      colors.push(text.textContent);
      return;
    }

    const color = isInitial
      ? colors[index]
        ? colors[index]
        : chroma.random()
      : chroma.random();
    if (!isInitial) {
      colors.push(color);
    }
    text.textContent = "Color" + " " + color;
    col.style.background = color;

    setTextColor(text, color);
    setTextColor(btn, color);
  });
  updateColorsHash(colors);
}

function updateColorsHash(colors = []) {
  document.location.hash = colors
    .map((col) => col.toString().substring(1))
    .join("-");
}

function getColorsFromHash() {
  if (document.location.hash.length > 1) {
    return document.location.hash
      .substring(1)
      .split("-")
      .map((col) => "#" + col);
  }
  return [];
}

input.addEventListener("keydown", (e) => {
  
  console.log(e.key.toLowerCase());
  if (
    e.key.toLowerCase() === "escape" ||
    e.code.toLowerCase() === "space" ||
		e.code.toLowerCase() === "enter"
  ) {
    return;
  }
	if ( e.key.toLowerCase() === "backspace" ) {
		inputValue.slice(0, Number(inputValue.length - 2));
		e.target.value = inputValue;
		return;
	}
  inputValue += e.key;
  e.target.value = inputValue;
});

setRandomColor(true);
