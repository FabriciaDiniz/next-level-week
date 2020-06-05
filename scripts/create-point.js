function getUFs() {
  const ufSelect = document.querySelector("select[name=uf]")
  const url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados"

  fetch(url)
    .then(res => res.json())
    .then(states => {
      for(state of states) {
        ufSelect.innerHTML += `<option value=${state.id}>${state.nome}</option>`
      }
    })
}

function getCities(event) {
  const citySelect = document.querySelector("[name=city]")
  const stateInput = document.querySelector("[name=state]")

  const uf = event.target.value

  const indexOfSelectedState = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfSelectedState].text

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`

  fetch(url)
    .then(res => res.json())
    .then(cities => {
      for(city of cities) {
        citySelect.innerHTML += `<option value=${city.id}>${city.nome}</option>`
      }
      citySelect.disabled = false
    })
}

getUFs()

document
  .querySelector("select[name=uf]")
  .addEventListener("change", getCities)