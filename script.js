const transitionsUl = document.querySelector('#transactions')
const saldoAtual = document.querySelector('#balance')
const receitasDisplay = document.querySelector('#money-plus')
const despesasDisplay = document.querySelector('#money-minus')

const localStoregeTransactions = JSON.parse(localStorage.getItem('transactions'))
let transactions = localStorage.getItem('transactions') !== null ? localStoregeTransactions : []

const removeTransition = ID => {
    transactions = transactions.filter(transition => transition.id !== ID)
    updateLocalStorage()
    init()
}

const addTransitionIntoDOM = transition => {
    const operator = transition.amount < 0 ? '-' : '+'
    const CSSClass = transition.amount < 0 ? 'minus' : 'plus'
    const amountWithoutOperator = Math.abs(transition.amount)
    const li = document.createElement('li')

    li.classList.add(CSSClass)
    li.innerHTML = `
    ${transition.name} <span>${operator} R$${amountWithoutOperator}</span>
    <button
     class="delete-btn" onclick='removeTransition(${transition.id})'> 
     x
     </button>
    `
    console.log(transition.id)
    transitionsUl.prepend(li)
    console.log(li)
}

const updateBalanceValues = () => {
    //pega os amount da transactions     e joga em vetor
    const transitionAmounts = transactions.map(transition => transition.amount)
    console.log(transitionAmounts)

    //soma os valores das transações
    const sum = transitionAmounts.reduce((acumulator, number) => acumulator + number, 0)
    console.log(`valor do saldo atual: ${sum.toFixed(2)}`)
    saldoAtual.innerHTML = `R$ ${sum.toFixed(2)}`

    //soma somente as receitas
    const receitas = transitionAmounts.filter(transition => transition > 0)
    const totalReceitas = receitas
        .reduce((acumulator, receita) => acumulator + receita, 0)
        .toFixed(2)
    receitasDisplay.innerHTML = `+ R$ ${totalReceitas}`

    //soma somente as despesas
    const despesas = transitionAmounts.filter(transition => transition < 0)
    const totalDespesas = Math.abs(despesas
        .reduce((acumulator, despesas) => acumulator + despesas, 0))
        .toFixed(2)
    despesasDisplay.innerHTML = `- R$ ${Math.abs(totalDespesas)}`

    console.log(`valor das receitas: ${receitas}\nvalor das despesas: ${despesas}`)
    console.log(`valor total das receitas: ${totalReceitas}\nvalor total das despesas: ${totalDespesas}`)
}

const init = () => {
    transitionsUl.innerHTML = ''
    transactions.forEach(addTransitionIntoDOM)
    updateBalanceValues()
}

init()

const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

const form = document.querySelector('#form')
const inputTransitionName = document.getElementById('text')
const inputTransitionAmount = document.getElementById('amount')

const generateID = () => Math.round(Math.random() * 1000)

form.addEventListener('submit', (event) => {
    event.preventDefault()

    const transitionName = inputTransitionName.value.trim()
    const transitionAmount = inputTransitionAmount.value.trim()

    if (transitionName === "" || transitionAmount === "") {
        alert('erro')
        return
    }
    const transition = { id: generateID(), name: transitionName, amount: Number(transitionAmount) }

    transactions.push(transition)
    init()
    updateLocalStorage()
    console.log(transition)
    
})