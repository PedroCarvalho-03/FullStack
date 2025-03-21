//API       
const API_URL = 'https://localhost:3000/usuarios';

//carregar usuarios
function carregarUsuarios(){
    fetch(API_URL)
    .then(response => response.json())
    .then(usuarios => {
        const lista = document.createElement('li');
       lista.innerHTML = `
        <div>
          <span id="user-${usuario.id}">${usuario.nome}</span>
          <input type="text" id="edit-${usuario.id}" value="${usuario.nome}" style="display:none"/>
          <div>
            <button class="btn-editar" onclick="editarUsuario(${usuario.id})">Editar</button>
            <button class="btn-salvar" onclick="salvarUsuario(${usuario.id})" style="display:none">Salvar</button>
            <button class="btn-deletar" onclick="deletarUsuario(${usuario.id})">Deletar</button>
            <button class="btn-cancelar" onclick="cancelarEdicao(${usuario.id})" style="display:none">Cancelar</button>
          </div>
          ;
        </div>
        `;

//adiciona elemento ao html 
 lista.appendChild(li);
    })
    .catch(erro => console.error('erro ao carregar usuários', erro));
}

//adicionar usuario
function adicionarUsuario(){
    const nome = document.getElementById('nome').value;
   if (!nome) {
         alert('Digite um nome!');
         return;
   }

   // Recebe o conteudo da API para ser inserido e envia para o SERVIDOR 
   fetch(API_URL, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ nome })
   })
   .then(() => {
         document.getElementById('nome').value = '';
         carregarUsuarios(); // Atualiza a lista
   })
   .catch(error => console.error('Erro ao adicionar usuário:', error));
}

// Editar usuário, cada elemento foi criado com o ID do usuario
function editarUsuario(id) {
   document.getElementById(`user-${id}`).style.display = "none";
   document.getElementById(`edit-${id}`).style.display = "inline";
   document.getElementById(`salvar-${id}`).style.display = "inline";
   document.getElementById(`cancelar-${id}`).style.display = "inline";
}

// Cancelar edição, cada elemento foi criado com o ID do usuario
function cancelarEdicao(id) {
   document.getElementById(`user-${id}`).style.display = "inline";
   document.getElementById(`edit-${id}`).style.display = "none";
   document.getElementById(`salvar-${id}`).style.display = "none";
   document.getElementById(`cancelar-${id}`).style.display = "none";
}

// Salvar edição do usuário
function salvarEdicao(id) {
   console.log("EDITAR")
   const novoNome = document.getElementById(`edit-${id}`).value;
   if (!novoNome) return;

   // Recebe o conteudo da API para ser inserido e envia para o SERVIDOR 
   fetch(`${API_URL}/${id}`, {
         method: 'PUT',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ nome: novoNome })
   })
   .then(() => carregarUsuarios() )
   .catch(error => console.error('Erro ao editar usuário:', error));
}

// Excluir usuário
function excluirUsuario(id) {
   console.log("EXCLUIR")
   if (!confirm('Tem certeza que deseja excluir este usuário?')) return;
// Recebe o conteudo da API para ser inserido e envia para o SERVIDOR 
   fetch(`${API_URL}/${id}`, {
         method: 'DELETE'
   })
   .then(() => carregarUsuarios())
   .catch(error => console.error('Erro ao excluir usuário:', error));
}

// Carrega os usuários quando a página abre
carregarUsuarios();
