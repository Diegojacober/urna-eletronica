let seuVotoPara = document.querySelector('.d-1-1 span')
let cargo = document.querySelector('.d-1-2 span')
let descricao = document.querySelector('.d-1-4')
let aviso = document.querySelector('.d2')
let lateral = document.querySelector('.d-1__right')
let numeros = document.querySelector('.d-1-3')

let etapaAtual = 0;
let numero = '';
let branco = false;
let votos = []

function comecarEtapa() {
    let etapa = etapas[etapaAtual];

    let numeroHtml = '';
    numero = '';
    branco = false;

    for (let i = 1; i < etapa.numeros; i++) {
        if (i === 1) {
            numeroHtml += '<div class="numero pisca"></div>'

        }
        numeroHtml += '<div class="numero"></div>'
    }

    seuVotoPara.style.display = 'none'
    cargo.innerHTML = etapa.titulo
    descricao.innerHTML = ''
    aviso.style.display = 'none'
    lateral.innerHTML = ''
    numeros.innerHTML = numeroHtml

}

function atualizaInterface() {
    let etapa = etapas[etapaAtual]
    let candidato = etapa.candidatos.filter((item) => {
        if (item.numero == numero) {
            return true
        }
        else {
            return false
        }
    })

    if (candidato.length > 0) {
        candidato = candidato[0]
        aviso.style.display = 'flex'
        seuVotoPara.style.display = 'block'
        descricao.innerHTML = `Nome: ${candidato.nome}<br>Partido: ${candidato.partido}`

        let fotosHtml = ''
        for (let i in candidato.fotos) {
            fotosHtml +=
                `<div class="d-1-img"> <img src="./images/${candidato.fotos[i].url}"> ${candidato.fotos[i].legenda} </div>`
        }
        lateral.innerHTML = fotosHtml
    }
    else {
        aviso.style.display = 'flex'
        seuVotoPara.style.display = 'block'
        descricao.innerHTML = '<div class="aviso-grande pisca">VOTO NULO<div>'
    }

}

function clique(n) {
    let elNumero = document.querySelector('.numero.pisca')
    if (elNumero !== null) {
        elNumero.innerHTML = n
        numero = `${numero}${n}`

        elNumero.classList.remove('pisca')
        if (elNumero.nextElementSibling !== null) {
            elNumero.nextElementSibling.classList.add('pisca')
        }
        else {
            atualizaInterface()
        }

    }
}

function voto_branco() {
    if (numero === '') {
        branco = true
        aviso.style.display = 'flex'
        seuVotoPara.style.display = 'block'
        descricao.innerHTML = '<div class="aviso-grande pisca">VOTO EM BRANCO<div>'
        numeros.innerHTML = ''
        lateral.innerHTML = ''
    }
    else {
        alert('APERTE EM CORRIGE')
    }
}

function corrige() {
    numero = ''
    comecarEtapa()
}

function confirma() {
    var etapa = etapas[etapaAtual]
    let votoConfirmado = false
    let candidato = etapa.candidatos.filter((item) => {
        if (item.numero == numero) {
            return true
        }
        else {
            return false
        }
    })

    if (branco === true) {
        votoConfirmado = true
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'BRANCO'
        })
    }
    else if (numero.length === etapa.numeros) {
        votoConfirmado = true
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        })
    }

    if (votoConfirmado == true) {
           document.querySelector('.tela').innerHTML = '<div class="aviso-gigante pisca">FIM<div>'
           numero = ''
    }
}

comecarEtapa()

