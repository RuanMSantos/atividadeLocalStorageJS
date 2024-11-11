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
const nomeDiv = document.getElementById('nome_div');
const nomeAtualizado = document.getElementById('nome_atualizado');
const cursoDiv = document.getElementById('curso_div');
const anoDiv = document.getElementById('ano_div');

const labelNome = document.getElementById('label_nome');
const labelCurso = document.getElementById('label_curso');
const labelAno = document.getElementById('label_ano');
const labelNomeDiv = document.getElementById('label_nome_div');
const labelNomeAtualizado = document.getElementById('label_nome_atualizado');
const labelCursoDiv = document.getElementById('label_curso_div');
const labelAnoDiv = document.getElementById('label_ano_div');

const pResultado = document.getElementById('resultado');

let verificadorCheck = false;
let verificadorAtualizarPressionado = false;
let alunos = [];

const cadastrar = (e) => {
    e.preventDefault();

    if (verificadorAtualizarPressionado || verificadorAtualizarPressionado == 1){
        verificadorAtualizarPressionado = false;
        return;
    }

    check();
    if (verificadorCheck == true){
        verificadorCheck = false;
        return;
    }

    const arrayAlunos = JSON.parse(localStorage.getItem("alunos"));
    
    if (arrayAlunos){
        const result = arrayAlunos.find(a => a.nome == nome.value);

        if (result){
            alert('Esse aluno já foi cadastrado.');
            limparCampos();
            return;
        }
    }
    
    let aluno = {
        nome: nome.value,
        curso: curso.value,
        ano: ano.value,
    };
    alunos.push(aluno);

    localStorage.setItem("alunos", JSON.stringify(alunos));

    limparCampos();
};

const limparCampos = () => {
    nome.value = "";
    curso.value = "";
    ano.value = "";
};

const limparCamposAtualizar = () => {
    nomeDiv.value = "";
    nomeAtualizado.value = "";
    cursoDiv.value = "";
    anoDiv.value = "";
}

const pesquisar = (e) => {
    e.preventDefault();

    const arrayAlunos = JSON.parse(localStorage.getItem("alunos"));
    
    if (!arrayAlunos || !arrayAlunos[0]){
        alert('Sem registros.');
        limparCampos();
        limparErro();
        return;
    }

    if (nome.value.trim().length == 0){
        verificadorCheck = true;
        labelNome.classList.add('erro');
        nome.classList.add('erro');
        nome.focus();
        return;
    }
    
    const result = arrayAlunos.find(a => a.nome == nome.value);

    if (!result){
        verificadorCheck = true;
        labelNome.classList.add('erro');
        nome.classList.add('erro');
        nome.focus();
        return;
    }

    divResult.children[0].innerHTML = "Aluno";
    formulario.style.display = 'none';
    divResult.style.display = 'flex';


    pResultado.innerHTML = result.nome + ' - ' + result.curso + ' - ' + result.ano;
    limparCampos();
};

const exibir = (e) => {
    e.preventDefault();

    let joinAlunos = "";
    const arrayAlunos = JSON.parse(localStorage.getItem("alunos"));

    if (!arrayAlunos || !arrayAlunos[0]){
        alert('Sem registros.');
        limparCampos();
        limparErro();
        return;
    }

    arrayAlunos.forEach(a => joinAlunos += (a.nome + ' - ' + a.curso + ' - ' + a.ano + '<br>'));
    
    divResult.children[0].innerHTML = "Lista de alunos";
    formulario.style.display = 'none';
    divResult.style.display = 'flex';


    pResultado.innerHTML = joinAlunos;
    limparCampos();
};

const atualizar = (e) => {
    e.preventDefault();

    if (nomeDiv.value.trim().length == 0){
        labelNomeDiv.classList.add('erro');
        nomeDiv.classList.add('erro');
        nomeDiv.focus();
        return;
    }

    const arrayAlunos = JSON.parse(localStorage.getItem("alunos"));

    const indice = arrayAlunos.findIndex(a => a.nome == nomeDiv.value);

    if (indice == -1){
        labelNomeDiv.classList.add('erro');
        nomeDiv.classList.add('erro');
        nomeDiv.focus();
        return;
    }

    if (nomeAtualizado.value.trim().length != 0){
        arrayAlunos[indice].nome = nomeAtualizado.value;
    }

    if (cursoDiv.value.trim().length != 0){
        arrayAlunos[indice].curso = cursoDiv.value;
    }

    if (anoDiv.value.length == 4 && anoDiv.value >= 1900 && anoDiv.value <= 2100){
        arrayAlunos[indice].ano = anoDiv.value;

    }

    alunos = arrayAlunos;

    localStorage.setItem("alunos", JSON.stringify(alunos));
    
    limparCamposAtualizar();
};

const remover = (e) => {
    e.preventDefault();

    const arrayAlunos = JSON.parse(localStorage.getItem("alunos"));

    if (!arrayAlunos || !arrayAlunos[0]){
        alert('Sem registros.');
        limparCampos();
        limparErro();
        return;
    }

    if (nome.value.trim().length == 0){
        verificadorCheck = true;
        labelNome.classList.add('erro');
        nome.classList.add('erro');
        nome.focus();
        return;
    }

    const indice = arrayAlunos.findIndex(a => a.nome == nome.value);

    if (indice == -1){
        verificadorCheck = true;
        labelNome.classList.add('erro');
        nome.classList.add('erro');
        nome.focus();
        return;
    }

    arrayAlunos.splice(indice, 1);

    alunos = arrayAlunos;

    localStorage.setItem("alunos", JSON.stringify(alunos));
    limparCampos();
};

const limpar = (e) => {
    e.preventDefault();
    
    const arrayAlunos = JSON.parse(localStorage.getItem("alunos"));
    
    if (!arrayAlunos){
        alert('Sem registros.');
        limparCampos();
        limparErro();
        return;
    }
    
    const validacao = confirm('Ao confirmar todos os dados serão excluídos!');
    limparErro();

    if (validacao){
        limparCampos();
        limparErro();
        localStorage.clear();
        alunos = [];
    }
};

const voltar = (e) => {
    e.preventDefault();

    pResultado.innerHTML = "";
    divResult.children[0].innerHTML = "";

    formulario.style.display = 'flex';
    divResult.style.display = 'none';
};

const avancar = () => {
    verificadorAtualizarPressionado = true;

    const arrayAlunos = JSON.parse(localStorage.getItem("alunos"));

    if (!arrayAlunos || !arrayAlunos[0]){
        alert('Sem registros.');
        limparCampos();
        limparErro();
        return;
    }

    formulario.style.display = 'none';
    divAtualizar.style.display = 'flex';
    limparCampos();
};

const voltarFormulario = () => {
    verificadorAtualizarPressionado = false;
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

    if (ano.value.length != 4 || ano.value < 1900 || ano.value > 2100){
        verificadorCheck = true;
        labelAno.classList.add('erro');
        ano.classList.add('erro');
        ano.focus();
        return;
    }
};

const limparErroInput = (e) =>{
    e.currentTarget.classList.remove('erro');
    document.querySelector(`label[for=${e.currentTarget.name}]`).classList.remove('erro');
}

const limparErro = () => {
    document.querySelectorAll('label,input').forEach(l => l.classList.remove('erro'));
}

const iniciar = () => {
    divResult.style.display = 'none';
    divAtualizar.style.display = 'none';
    formulario.addEventListener('submit', cadastrar);
    document.querySelectorAll('input').forEach(i => i.addEventListener('input', limparErroInput));
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