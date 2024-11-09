const formulario = document.getElementById('formulario');
const divResult = document.getElementById('result');
const divAtualizar = document.getElementById('atualizar');
const btnPesquisar = document.getElementById('btn_pesquisar');
const btnExibir = document.getElementById('btn_exibir');
const btnAtualizar = document.getElementById('btn_atualizar');
const btnRemover = document.getElementById('btn_remover');
const btnLimpar = document.getElementById('btn_limpar');
const btnVoltar = document.getElementById('btn_voltar');
const btnAtualizarDiv = document.getElementById('btn_atualizar_div');
const btnVoltarAtualizar = document.getElementById('btn_voltar_atualizar');
const nome = document.getElementById('nome');
const curso = document.getElementById('curso');
const ano = document.getElementById('ano');
const labelNome = document.getElementById('label_nome');
const labelCurso = document.getElementById('label_curso');
const labelAno = document.getElementById('label_ano');
let verificadorCheck = false;
let alunos = [];

const cadastrar = (e) => {
    e.preventDefault();
    
    check();
    if (verificadorCheck == true){
        verificadorCheck = false;
        return;
    }

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

const limparCamposAtualizar = () => {
    document.getElementById('nome_div').value = "";
    document.getElementById('nome_atualizado').value = "";
    document.getElementById('curso_div').value = "";
    document.getElementById('ano_div').value = "";
}

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

    if(document.getElementById('nome_div').value == ""
    || document.getElementById('nome_atualizado').value == ""
    || document.getElementById('curso_div').value == ""
    || document.getElementById('ano_div').value == ""
){
    limparCamposAtualizar();
    return;
}

    const arrayAlunos = JSON.parse(localStorage.getItem("alunos"));

    const indice = arrayAlunos.findIndex(a => a.nome == document.getElementById('nome_div').value);

    arrayAlunos[indice].nome = document.getElementById('nome_atualizado').value;
    arrayAlunos[indice].curso = document.getElementById('curso_div').value;
    arrayAlunos[indice].ano = document.getElementById('ano_div').value;

    alunos = arrayAlunos;

    localStorage.setItem("alunos", JSON.stringify(alunos));
    
    limparCamposAtualizar();
};

const remover = (e) => {
    e.preventDefault();

    if(document.getElementById('nome').value == null || document.getElementById('nome').value == ""){
        return;
    }
    const arrayAlunos = JSON.parse(localStorage.getItem("alunos"));

    const indice = arrayAlunos.findIndex(a => a.nome == document.getElementById('nome').value);

    arrayAlunos.splice(indice, 1);

    alunos = arrayAlunos;

    localStorage.setItem("alunos", JSON.stringify(alunos));
    limparCampos();
};

const limpar = (e) => {
    e.preventDefault();

    localStorage.clear();
    alunos = [];
};

const voltar = (e) => {
    e.preventDefault();

    document.getElementById('resultado').innerHTML = "";
    document.getElementById('result').children[0].innerHTML = "";

    formulario.style.display = 'flex';
    divResult.style.display = 'none';
};

const avancar = ()=> {
    formulario.style.display = 'none';
    divAtualizar.style.display = 'flex';
};

const voltarFormulario = () => {
    limparCamposAtualizar();
    formulario.style.display = 'flex';
    divAtualizar.style.display = 'none';
};

const check = () => {
    if (nome.value.trim().length == 0){
        verificadorCheck = true;
        labelNome.classList.add('erro');
        nome.classList.add('erro');
        nome.focus();
        return;
    }

    if (curso.value.trim().length == 0){
        verificadorCheck = true;
        labelCurso.classList.add('erro');
        curso.classList.add('erro');
        curso.focus();
        return;
    }

    if (ano.value.trim().length != 4 || ano.value.trim() < 1900 || ano.value.trim() > 2100){
        verificadorCheck = true;
        labelAno.classList.add('erro');
        ano.classList.add('erro');
        ano.focus();
        return;
    }
};

const limparErro = (e) =>{
    e.currentTarget.classList.remove('erro');
    formulario.querySelectorAll('label').forEach(l => l.classList.remove('erro'));
} 

const iniciar = () => {
    divResult.style.display = 'none';
    formulario.addEventListener('submit', cadastrar);
    formulario.querySelectorAll('input').forEach(i => i.addEventListener('input', limparErro));
    btnPesquisar.addEventListener('click', pesquisar);
    btnExibir.addEventListener('click', exibir);
    btnAtualizar.addEventListener('click', avancar);
    btnRemover.addEventListener('click', remover);
    btnLimpar.addEventListener('click', limpar);
    btnVoltar.addEventListener('click', voltar);
    btnAtualizarDiv.addEventListener('click', atualizar);
    btnVoltarAtualizar.addEventListener('click', voltarFormulario);
};

document.addEventListener('DOMContentLoaded', iniciar);