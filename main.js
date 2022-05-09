"use strict"
// --------------------------------------------------------------

const container = document.querySelector(".container")
const billInput = document.querySelector(".input__bill-bill")
const numberOfPeopleInput = document.querySelector(".input__num-of-ppl-number")
const tips = document.querySelectorAll(".input__tip-item")
const tipsCustom = document.querySelector(".input__tip-custom")

const tipAmount = document.querySelector(".output__result-tip")
const tipTotal = document.querySelector(".output__result-total")

const resetBtn = document.querySelector(".btn-reset")
const errMsg = document.querySelectorAll(".err-msg")

let tipRate = 0

// --------------------------------------------------------------

const showErrMsg = function (target) {
  target
    .closest(".input-group")
    .previousElementSibling.querySelector(".err-msg")
    .classList.remove("hidden")
}

const chooseTipRate = function () {
  //since adding new class to target CSS can't apply, change to set id
  tips.forEach((tip) => tip.removeAttribute("id"))
  tipsCustom.value = ""
  this.setAttribute("id", "active")
  tipRate = +this.textContent.slice(0, -1) / 100
}

tips.forEach((tip) => tip.addEventListener("click", chooseTipRate))

const checkInputValid = function (target) {
  if (target.value.trim().length === 0 || +target.value <= 0) {
    showErrMsg(target)
    target.value = ""
  }
}

const render = function () {
  checkInputValid(billInput)
  checkInputValid(numberOfPeopleInput)

  if (
    billInput.value.trim().length === 0 ||
    +billInput.value <= 0 ||
    numberOfPeopleInput.value.trim().length === 0 ||
    +numberOfPeopleInput.value <= 0
  )
    return

  if (tipsCustom.value.trim().length !== 0) tipRate = +tipsCustom.value / 100

  if (tipRate === 0) return

  // 2) calculation
  const bill = +billInput.value
  const numberOfPeople = +numberOfPeopleInput.value

  const tip = +((bill * tipRate) / numberOfPeople)
  const total = +(bill / numberOfPeople + tip)

  // 3) render result
  tipAmount.textContent = tip.toFixed(2)
  tipTotal.textContent = total.toFixed(2)
  errMsg.forEach((err) => err.classList.add("hidden"))
  resetBtn.classList.remove("btn__empty")
}

const reset = function () {
  billInput.value = ""
  numberOfPeopleInput.value = ""
  tipsCustom.value = ""
  tipAmount.textContent = "$0.00"
  tipTotal.textContent = "$0.00"
  errMsg.forEach((err) => err.classList.add("hidden"))
  tips.forEach((tip) => tip.removeAttribute("id"))
  resetBtn.classList.add("btn__empty")
}

resetBtn.addEventListener("click", reset)

container.addEventListener("keyup", function (e) {
  if (e.which === 13) {
    render()
  }
})
