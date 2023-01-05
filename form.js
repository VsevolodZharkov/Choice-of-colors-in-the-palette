const form = document.querySelector(".form");
const btn = form.querySelector(".form_btn");
const input = form.querySelector(".form_input-two");

// клик при отправки формы
const result = {};
document.addEventListener("submit", e => {
  e.preventDefault();
	// console.log(e.target[1].value === "");
  if ( e.target[1].value === ""  ) {
    alert("Введите данные для поиска");
    return;
  }
  const color = e.target.elements[0].value;
  const column = e.target.elements[1].value;
  result.color = color;
  result.column = column;
  // form.reset();
	columnСheck(result)
  return result;
});

function columnСheck({color, column}) {
	
}