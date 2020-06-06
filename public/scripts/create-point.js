function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res =>  res.json())
    .then(states => {
        for(const state of states) {
        ufSelect.innerHTML += `<option value ="${state.id}">${state.nome}</option>`
        }
    } )
}
populateUFs()

function getCities(event){
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")
    const ufValue = event.target.value
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    citySelect.innerHTML = ""
    citySelect.disabled = false

    fetch(url)
    .then(res =>  res.json())
    .then(cities => {
        for(const city of cities) {
        citySelect.innerHTML += `<option value ="${city.nome}">${city.nome}</option>`
        }
    } )
}

document
.querySelector("select[name=uf]")
.addEventListener("change", getCities )

//coleta


const itemsToCollet = document.querySelectorAll(".item-grid li")
for(const item of itemsToCollet){
    item.addEventListener("click", handleSelectedItem)
}
const collectedItems = document.querySelector("input[name=items]")
let selectedItems = []
function handleSelectedItem (event){
    const itemLi = event.target
    const itemId = event.target.dataset.id
    itemLi.classList.toggle("selected") //adiciona ou remove uma classe em js
    //verificar se existem items selecionar
    //se sim, pegar os items selecionados.
    const alreadySelected = selectedItems.findIndex(item =>{
        const itemFound = item == itemId
        return itemFound 
    } )
//se já estiver selecionado, 
if(alreadySelected >= 0){
    //tirar da seleção.
    const filteredItems = selectedItems.filter (item => {
        const itemIsDifferent = item != itemId //tira a seleção, false
        //se é diferente, retornando verdadeiro, então pode adicionar no novo array
        //-1 = nenhum elemento selecionado
        //>=0 || !=-1 = algum elemento está selecionado.
        return false
    })
    selectedItems = filteredItems;
    }
    else {
    //se nao estiver selecionado, adicionar a seleção.
    selectedItems.push(itemId)
    }
    collectedItems.value = selectedItems
}

//atualizar o campo escondido com os dados selecionados.