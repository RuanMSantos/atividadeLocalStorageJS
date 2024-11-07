const formulario = document.getElementById('formulario');
const divResult = document.getElementById('result');
const btnPesquisar = document.getElementById('btn_pesquisar');
const btnExibir = document.getElementById('btn_exibir');
const btnAtualizar = document.getElementById('btn_atualizar');
const btnRemover = document.getElementById('btn_remover');
const btnLimpar = document.getElementById('btn_limpar');
const btnVoltar = document.getElementById('btn_voltar');
let alunos = [];

const cadastrar = (e) => {
    e.preventDefault();
    
    let aluno = {
        nome: document.getElementById('nome').value,
        curso: document.getElementById('curso').value,
        ano: document.getElementById('ano').value,
    };
    alunos.push(aluno);

    localStorage.setItem("alunos", JSON.stringify(alunos));

    limparCampos();
};

const limparCampos = () => {
    document.getElementById('nome').value = "";
    document.getElementById('curso').value = "";
    document.getElementById('ano').value = "";
};

const pesquisar = (e) => {
    e.preventDefault();

    document.getElementById('result').children[0].innerHTML = "Aluno";
    formulario.style.display = 'none';
    divResult.style.display = 'flex';

    const arrayAlunos = JSON.parse(localStorage.getItem("alunos"));
    
    const result = arrayAlunos.find(arrayAlunos => arrayAlunos.nome == document.getElementById('nome').value);

    document.getElementById('resultado').innerHTML = result.nome + ' - ' + result.curso + ' - ' + result.ano;
    limparCampos();
};

const exibir = (e) => {
    e.preventDefault();

    document.getElementById('result').children[0].innerHTML = "Lista de alunos";
    formulario.style.display = 'none';
    divResult.style.display = 'flex';

    const arrayAlunos = JSON.parse(localStorage.getItem("alunos"));
    let joinAlunos = "";

    arrayAlunos.forEach(a => joinAlunos += (a.nome + ' - ' + a.curso + ' - ' + a.ano + '<br>'));

    document.getElementById('resultado').innerHTML = joinAlunos;
};

const atualizar = (e) => {
    e.preventDefault();

    const arrayAlunos = JSON.parse(localStorage.getItem("alunos"));

    const indice = arrayAlunos.findIndex(a => a.nome == document.getElementById('nome').value);

    arrayAlunos[indice].nome = document.getElementById('nome').value;
    arrayAlunos[indice].curso = document.getElementById('curso').value;
    arrayAlunos[indice].ano = document.getElementById('ano').value;

    localStorage.setItem("alunos", JSON.stringify(arrayAlunos));
    limparCampos();
};

const remover = (e) => {
    e.preventDefault();

    const arrayAlunos = JSON.parse(localStorage.getItem("alunos"));

    const indice = arrayAlunos.findIndex(a => a.nome == document.getElementById('nome').value);

    arrayAlunos.splice(indice, 1);

    localStorage.setItem("alunos", JSON.stringify(arrayAlunos));
    limparCampos();
};

const limpar = (e) => {
    e.preventDefault();

    localStorage.clear();
};

const voltar = (e) => {
    e.preventDefault();

    document.getElementById('resultado').innerHTML = "";
    document.getElementById('result').children[0].innerHTML = "";

    formulario.style.display = 'flex';
    divResult.style.display = 'none';
}

const iniciar = () => {
    divResult.style.display = 'none';
    formulario.addEventListener('submit', cadastrar);
    btnPesquisar.addEventListener('click', pesquisar);
    btnExibir.addEventListener('click', exibir);
    btnAtualizar.addEventListener('click', atualizar);
    btnRemover.addEventListener('click', remover);
    btnLimpar.addEventListener('click', limpar);
    btnVoltar.addEventListener('click', voltar);
};

document.addEventListener('DOMContentLoaded', iniciar);