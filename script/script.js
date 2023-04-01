// seleciona o botão e adiciona um ouvinte de evento de clique
document.getElementById("theme-toggle").addEventListener("click", function() {
    // seleciona o body
    const body = document.querySelector("body");
    // Div das tarefas
    const tarefasContainer = document.querySelector('#tarefas-container');
  
    // verifica se o body tem a classe "dark"
    var isDark = body.classList.contains("dark");

    
  
    // se o body tem a classe "dark", remove ela, caso contrário, adiciona
    if (isDark) {
      body.classList.remove("dark");
      tarefasContainer.classList.remove("dark")
    } else {
      body.classList.add("dark");
      tarefasContainer.classList.add("dark")
    }
  });
  
  
  
  
  // JavaScript
// Seleciona os elementos do HTML
const form = document.querySelector('#form-tarefa');
const input = document.querySelector('#input-tarefa');
const lista = document.querySelector('#lista-tarefas');
const container = document.querySelector('#tarefas-container');

// Cria um array para armazenar as tarefas
let tarefas = [];

// Função para atualizar a lista de tarefas no HTML
function atualizarLista() {
  // Limpa a lista de tarefas
  lista.innerHTML = '';

  // Adiciona cada tarefa na lista
  tarefas.forEach((tarefa, indice) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${tarefa}</span>
      <div>
        <button class="editar" data-indice="${indice}">Editar</button>
        <button class="excluir" data-indice="${indice}">Excluir</button>
      </div>
    `;
    lista.appendChild(li);
  });
}

// Adiciona uma tarefa
function adicionarTarefa(tarefa) {
  tarefas.push(tarefa);
  atualizarLista();
}

// Edita uma tarefa
function editarTarefa(indice, tarefa) {
  tarefas[indice] = tarefa;
  atualizarLista();
}

// Exclui uma tarefa
function excluirTarefa(indice) {
  tarefas.splice(indice, 1);
  atualizarLista();
}

// Evento de submissão do formulário
form.addEventListener('submit', event => {
  event.preventDefault();
  const tarefa = input.value.trim();
  if (tarefa) {
    adicionarTarefa(tarefa);
    input.value = '';
    input.focus();
  }
});

// Evento de clique nos botões de editar e excluir tarefas
lista.addEventListener('click', event => {
  const elemento = event.target;
  if (elemento.classList.contains('editar')) {
    const indice = elemento.dataset.indice;
    const tarefa = prompt('Digite a nova tarefa:', tarefas[indice]);
    if (tarefa) {
      editarTarefa(indice, tarefa);
    }
  } else if (elemento.classList.contains('excluir')) {
    const indice = elemento.dataset.indice;
    const confirmacao = confirm(`Deseja excluir a tarefa "${tarefas[indice]}"?`);
    if (confirmacao) {
      excluirTarefa(indice);
    }
  }
});

// Inicializa a lista de tarefas com as tarefas salvas no localStorage (se houver)
const tarefasSalvas = localStorage.getItem('tarefas');
