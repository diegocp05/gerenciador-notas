const novaNota = document.getElementById('novaNota');
const btnAdicionar = document.getElementById('adicionarNota');
const listaNotas = document.getElementById('listaNotas');

let notas = JSON.parse(localStorage.getItem('notas')) || [];

function salvarNotas() {
  localStorage.setItem('notas', JSON.stringify(notas));
}

function renderizarNotas() {
  listaNotas.innerHTML = '';

  notas.forEach((nota, index) => {
    const divNota = document.createElement('div');
    divNota.className = 'nota';

    const textoNota = document.createElement('textarea');
    textoNota.value = nota.texto;
    textoNota.rows = 4;
    textoNota.readOnly = true;

    const botoesDiv = document.createElement('div');
    botoesDiv.className = 'botoes';

    const btnEditar = document.createElement('button');
    btnEditar.textContent = 'Editar';
    btnEditar.addEventListener('click', () => {
      textoNota.readOnly = false;
      textoNota.focus();
    });

    const btnSalvar = document.createElement('button');
    btnSalvar.textContent = 'Salvar';
    btnSalvar.addEventListener('click', () => {
      notas[index].texto = textoNota.value;
      salvarNotas();
      textoNota.readOnly = true;
    });

    const btnRemover = document.createElement('button');
    btnRemover.textContent = 'Remover';
    btnRemover.style.backgroundColor = '#f44336';
    btnRemover.addEventListener('click', () => {
      if(confirm('Tem certeza que deseja remover esta nota?')) {
        notas.splice(index, 1);
        salvarNotas();
        renderizarNotas();
      }
    });

    botoesDiv.appendChild(btnEditar);
    botoesDiv.appendChild(btnSalvar);
    botoesDiv.appendChild(btnRemover);

    divNota.appendChild(textoNota);
    divNota.appendChild(botoesDiv);

    listaNotas.appendChild(divNota);
  });
}

btnAdicionar.addEventListener('click', () => {
  const texto = novaNota.value.trim();
  if (texto !== '') {
    notas.push({ texto });
    salvarNotas();
    renderizarNotas();
    novaNota.value = '';
  } else {
    alert('Digite algum texto para adicionar uma nota.');
  }
});

renderizarNotas();
