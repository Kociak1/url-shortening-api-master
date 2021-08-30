const Toggle = document.querySelector('.toggle')
const menu = document.querySelector('.menu')

Toggle.addEventListener('click', ()=> {
    menu.classList.toggle('active')
})

const tp1 = document.querySelector('#tp1')

const frm = document.querySelector('form')
const Grid = document.querySelector('.section2 .grid')

frm.addEventListener('submit', e => {
    e.preventDefault()
    const txt = frm.querySelector('input[type="text"')
    txt.classList.remove('error')
    frm.querySelector('p').classList.remove('error')
    const val = txt.value
    if(val == '') {
        txt.classList.add('error')
        frm.querySelector('p').classList.add('error')
    } else {
        loadData(val)
                .then(res => {
                renderObject(val, res)
                })
                .catch(err => {
                    console.log(err)
                    txt.classList.add('error')
                    frm.querySelector('p').classList.remove('error')
                })
    }
})

async function loadData(url) {
    const senddata = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`)
    const stringify = await senddata.json()
    return stringify.result.full_short_link
    
}

function renderObject(url, link) {
    const card = document.importNode(tp1.content, true)
    card.querySelector('.source').textContent = url
    card.querySelector('.short').textContent = link
    card.querySelector('input[type="submit"]').addEventListener('click', e => {
        navigator.clipboard.writeText(link)
        e.target.classList.add('copied')
        e.target.value = 'Copied!'
    }) 
    Grid.appendChild(card)
}