function questionMarkClickHandler(index) {
  let hiddenDetails = document.querySelectorAll(".hiddenDetails");

  hiddenDetails.forEach((comp, i) => {
    if (i !== index) {
      comp.style.display = "none";
    }
    i++;
  });

  let hiddenDetail = hiddenDetails[index];

  if (!hiddenDetail.style.display || hiddenDetail.style.display == "none") {
    hiddenDetail.style.display = "flex";
  } else {
    hiddenDetail.style.display = "none";
  }
}

document.getElementById("form").addEventListener("submit", fromSubmitHandler);
document.querySelectorAll(".input-item").forEach((ele) => {
  ele.addEventListener("input", inputChangeHandler);
});
document
  .getElementById("result-box-close-btn")
  .addEventListener("click", closeBtnClickHandler);

let inputData = {
  "annual-income": "",
  "extra-income": "",
  "age-group": "",
  "total-deductions": "",
};

const isNumeric = (string) => /^[+-]?\d+(\.\d+)?$/.test(string);

function inputChangeHandler(e) {
  const exclamation_icon = document.querySelectorAll(".fa-circle-exclamation");
  const string_data = document.querySelectorAll(".string-data");
  inputData = { ...inputData, [e.target.name]: e.target.value };

  if (
    !isNumeric(inputData["annual-income"]) &&
    inputData["annual-income"] != ""
  ) {
    exclamation_icon[0].style.display = "flex";
  } else {
    exclamation_icon[0].style.display = "none";
    string_data[0].classList.remove('flex');
  }

  if (
    !isNumeric(inputData["extra-income"]) &&
    inputData["extra-income"] != ""
  ) {
    exclamation_icon[1].style.display = "flex";
  } else {
    exclamation_icon[1].style.display = "none";
    string_data[1].classList.remove('flex');
  }

  if (
    !isNumeric(inputData["total-deductions"]) &&
    inputData["total-deductions"] != ""
  ) {
    exclamation_icon[2].style.display = "flex";
  } else {
    exclamation_icon[2].style.display = "none";
    string_data[2].classList.remove('flex');
  }
}

function fromSubmitHandler(e) {
  e.preventDefault();

  const exclamation_icon = document.querySelectorAll(".fa-circle-exclamation");
  const string_data = document.querySelectorAll(".string-data");

  let flag = 0;
  exclamation_icon.forEach((item, index) => {
    if (item.style.display == "flex") {
      string_data[index].classList.add('flex');
      flag = 1;
      return;
    } 
  });

  if (flag == 0) {
    e.target.style.visibility = "hidden";
    e.target.reset();
    document.querySelector(".result-box").style.display = "flex";

    let overallIncome =
      parseFloat(inputData["annual-income"]) +
      parseFloat(inputData["extra-income"]) -
      parseFloat(inputData["total-deductions"]);

    let tax = 0;
    if (overallIncome > 800000) {
      let x = parseFloat(inputData["annual-income"]) - 800000;

      if (inputData["age-group"] == "lessthan40") {
        tax = x * 0.3;
      }
      if (inputData["age-group"] == "between40and60") {
        tax = x * 0.4;
      }
      if (inputData["age-group"] == "greaterthan60") {
        tax = x * 0.1;
      }
    }

    overallIncome = parseFloat(overallIncome) - parseFloat(tax);
    
    document.getElementById(
      "overall-income"
    ).innerHTML = `₹${overallIncome.toLocaleString("en-IN")}`;
  }
}

function closeBtnClickHandler() {
  document.querySelector(".result-box").style.display = "none";
  document.getElementsByTagName("form")[0].style.visibility = "visible";
}
