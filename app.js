const cols = document.querySelectorAll(".col");

document.addEventListener("keydown", (event) => {
  event.preventDefault();
  if (event.code.toLowerCase() === "space") {
    setRandomColor();
  }
});

document.addEventListener("click", (event) => {
  const type = event.target.dataset.type;

  if (type === "lock") {
    const node =
      event.target.tagName.toLowerCase() === "i"
        ? event.target
        : event.target.children[0];
    node.classList.toggle("fa-lock-open");
    node.classList.toggle("fa-lock");
		if(node.classList.value === 'fa-solid fa-lock-open') {
			alert('Column color saved.');
		} else {
			alert('The color of the column will change.')
		}
	
  } else if (type === "copy") {
    copyToClickboard(event.target.textContent);
    alert("Text copied");
  }
});
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
    text.textContent = 'Color' + ' ' + color;
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

setRandomColor(true);
