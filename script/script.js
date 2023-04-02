// TEMA DARK


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

////////////////////////////////////////////////////////////////////////////////

// LÓGCA DE GERENCIA DAS TAREFAS


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
      <div class="editar-tarefa oculto">
        <input type="text" value="${tarefa}" />
        <button class="salvar-tarefa" data-indice="${indice}">Salvar</button>
        <button class="cancelar-edicao" data-indice="${indice}">Cancelar</button>
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

      // Oculta o botão "Editar" clicado
      elemento.classList.add('oculto');

      // Exibe a área de edição da tarefa correspondente
      const indice = elemento.dataset.indice;
      const editarTarefaDiv = lista.querySelectorAll('.editar-tarefa')[indice];
      editarTarefaDiv.classList.remove('oculto');
    } 
    
    else if (elemento.classList.contains('excluir')) {

        // excluir tarefa editada
      const indice = elemento.dataset.indice;
      const confirmacao = confirm(`Deseja excluir a tarefa "${tarefas[indice]}"?`);
      if (confirmacao) {
        excluirTarefa(indice);
      }
    } 
    
    else if (elemento.classList.contains('salvar-tarefa')) {

      // Salva a tarefa editada e exibe novamente o botão "Editar"
      const indice = elemento.dataset.indice;
      const input = lista.querySelectorAll('input')[indice];
      editarTarefa(indice, input.value);
      const editarButton = lista.querySelectorAll('.editar')[indice];
      editarButton.classList.remove('oculto');
      const editarTarefaDiv = lista.querySelectorAll('.editar-tarefa')[indice];
      editarTarefaDiv.classList.add('oculto');
    } 
    
    else if (elemento.classList.contains('cancelar-edicao')) {

      // Cancela a edição e exibe novamente o botão "Editar"
      const indice = elemento.dataset.indice;
      const editarButton = lista.querySelectorAll('.editar')[indice];
      editarButton.classList.remove('oculto');
      const editarTarefaDiv = lista.querySelectorAll('.editar-tarefa')[indice];
      editarTarefaDiv.classList.add('oculto');
    }
  });

// Inicializa a lista de tarefas com as tarefas salvas no localStorage (se houver)
const tarefasSalvas = localStorage.getItem('tarefas');
