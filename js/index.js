// Obtém os modais
const modal = document.getElementById("createAccountModal");
const modalTerms = document.getElementById("terms-modal");
const modalPolitics = document.getElementById("politics-modal");

// Obtém os links que abrem os modais
const link = document.getElementById("create-account-link");
const linkTerms = document.getElementById("terms-conditions-link");
const linkPolitics = document.getElementById("privacy-policy-link");

// Obtém os <span> que fecham os modais
const closeButtons = document.querySelectorAll(".close");
const span = document.getElementsByClassName("close")[0];
const btnCriarConta = document.querySelector('.btn-model');

// Quando o usuário clica no link, abre o modal
link.onclick = function(event) {
  event.preventDefault(); // Previne o comportamento padrão do link
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
  cleanModalInputs();
}

window.onclick = function(event) {
  if (event.target == modal || event.target == modalTerms || event.target == modalPolitics) {
    modal.style.display = "none";
    cleanModalInputs();
  }
}

linkTerms.onclick = function(event) {
  event.preventDefault();
  buildTermsModalBody(); // Constrói o conteúdo do modal
  modalTerms.style.display = "block";
  document.body.style.overflow = 'hidden';
}

linkPolitics.onclick = function(event) {
  event.preventDefault();
  buildPoliticsModalBody(); // Constrói o conteúdo do modal
  modalPolitics.style.display = "block";
  document.body.style.overflow = 'hidden';
}

// Quando o usuário clica no <span> (x), fecha o modal
closeButtons.forEach(button => {
  button.onclick = function() {
    const modal = this.closest(".modal");
    modal.style.display = "none";
    document.body.style.overflow = 'auto';
  }
});

// Quando o usuário clica fora do modal, fecha o modal
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  } else if (event.target === modalTerms) {
    modalTerms.style.display = "none";
    document.body.style.overflow = 'auto';
  } else if (event.target === modalPolitics) {
    modalPolitics.style.display = "none";
    document.body.style.overflow = 'auto';
  }
}

function buildTermsModalBody() {
  const divModalTermsBody = document.querySelector('.modal-terms-body');

  let htmlTerms = `
    <div class="terms-content">
      <p>Bem-vindo à AjudaAqui!</p>
      <p>Estes termos e condições descrevem as regras e regulamentos para o uso do site AjudaAqui.</p>
      <h2>1. Aceitação dos Termos</h2>
      <p>Ao acessar e utilizar a plataforma AjudaAqui, você concorda em cumprir e estar legalmente vinculado aos seguintes Termos e Condições de Uso. Se você não concordar com qualquer parte destes termos, não deverá utilizar a plataforma.</p>
      <h2>2. Descrição da Plataforma</h2>
      <p>AjudaAqui é uma plataforma que facilita a conexão entre usuários que procuram e oferecem oportunidades de trabalho informal. Os usuários podem se registrar, criar perfis, listar e buscar ofertas de trabalho em diversas áreas, tais como jardinagem, transporte, construção, entre outras.</p>
      <h2>3. Registro e Contas de Usuário</h2>
      <p>Para utilizar certos recursos da plataforma, você precisará criar uma conta, fornecendo informações precisas e completas. Você é responsável por manter a confidencialidade das credenciais da sua conta e por todas as atividades que ocorram sob sua conta. Notifique-nos imediatamente se suspeitar de qualquer uso não autorizado da sua conta.</p>
      <h2>4. Uso Aceitável</h2>
      <p>Você concorda em usar a plataforma somente para fins legais e de acordo com os presentes Termos e Condições. É proibido:</p>
      <ul>
        <li>Usar a plataforma para qualquer finalidade ilegal ou não autorizada.</li>
        <li>Fazer upload de conteúdo ofensivo, discriminatório ou prejudicial.</li>
        <li>Interferir no funcionamento da plataforma ou nos servidores e redes conectados a ela.</li>
      </ul>
      <h2>5. Cadastro de Usuário</h2>
      <p>Os usuários podem publicar conteúdos, tais como perfis, ofertas de trabalho e avaliações. Você é o único responsável pelo conteúdo que publica. Ao publicar conteúdo na plataforma, você concede à AjudaAqui uma licença não exclusiva, mundial, isenta de royalties, para usar, reproduzir, modificar e exibir tal conteúdo em conexão com a operação da plataforma.</p>
      <h2>6. Limitações de Responsabilidade</h2>
      <p>AjudaAqui não é responsável pela veracidade, precisão ou integridade do conteúdo gerado pelos usuários. A plataforma não se responsabiliza por quaisquer danos diretos, indiretos, incidentais, consequenciais ou punitivos decorrentes do uso ou da incapacidade de uso da plataforma.</p>
      <h2>7. Privacidade</h2>
      <p>Sua privacidade é importante para nós. Por favor, leia nossa Política de Privacidade para entender como coletamos, usamos e protegemos suas informações pessoais.</p>
      <h2>8. Modificações nos Termos</h2>
      <p>Reservamo-nos o direito de modificar estes Termos e Condições a qualquer momento. Notificaremos sobre alterações significativas, e o uso continuado da plataforma após tais modificações constitui sua aceitação dos novos termos.</p>
      <h2>9. Rescisão</h2>
      <p>Podemos suspender ou encerrar seu acesso à plataforma a qualquer momento, sem aviso prévio ou responsabilidade, se você violar estes Termos e Condições ou por qualquer outro motivo, a nosso exclusivo critério.</p>
      <h2>10. Disposições Gerais</h2>
      <p>Estes Termos e Condições constituem o acordo completo entre você e AjudaAqui em relação ao uso da plataforma. Se qualquer parte destes Termos for considerada inválida ou inexequível, as demais disposições permanecerão em pleno vigor e efeito.</p>
      <h2>11. Contato</h2>
      <p>Se você tiver dúvidas sobre estes Termos e Condições, entre em contato conosco através do email: suporte@ajudaaqui.com.</p>
    </div>
  `;

  divModalTermsBody.innerHTML = htmlTerms;
}

function buildPoliticsModalBody() {
  const divModalPoliticsBody = document.querySelector('.modal-privacy-body');

  let htmlPolitics = `
    <div class="privacy-policy">
      <p><strong>Última atualização:</strong> 30 de maio de 2024</p>
      <h2>1. Introdução</h2>
      <p>A sua privacidade é importante para nós. Esta Política de Privacidade explica como a AjudaAqui coleta, usa, compartilha e protege suas informações pessoais quando você usa a nossa plataforma. Ao utilizar a AjudaAqui, você concorda com as práticas descritas nesta política.</p>
      <h2>2. Informações que Coletamos</h2>
      <h3>2.1 Informações Fornecidas por Você</h3>
      <ul>
        <li><strong>Dados de Registro:</strong> Quando você cria uma conta na AjudaAqui, coletamos informações como seu nome, endereço de email, telefone e outros detalhes necessários para a criação do seu perfil.</li>
        <li><strong>Conteúdo Gerado pelo Usuário:</strong> Informações que você publica na plataforma, como ofertas de trabalho, avaliações e mensagens.</li>
      </ul>
      <h3>2.2 Informações Coletadas Automaticamente</h3>
      <ul>
        <li><strong>Dados de Uso:</strong> Coletamos informações sobre sua interação com a plataforma, como páginas visitadas, links clicados e outros dados relacionados ao uso.</li>
        <li><strong>Dados de Dispositivo:</strong> Informações sobre o dispositivo que você usa para acessar a plataforma, incluindo endereço IP, tipo de navegador, sistema operacional e identificadores de dispositivo.</li>
      </ul>
      <h2>3. Uso das Informações</h2>
      <p>Utilizamos as informações coletadas para:</p>
      <ul>
        <li><strong>Fornecer e Melhorar os Serviços:</strong> Para operar, manter e aprimorar a plataforma e os serviços oferecidos.</li>
        <li><strong>Comunicação:</strong> Para enviar notificações importantes, atualizações de serviço e materiais promocionais.</li>
        <li><strong>Segurança:</strong> Para monitorar e proteger a segurança da plataforma e dos usuários.</li>
        <li><strong>Personalização:</strong> Para personalizar sua experiência na plataforma com base em suas preferências e atividades.</li>
      </ul>
      <h2>4. Compartilhamento de Informações</h2>
      <p>Podemos compartilhar suas informações com:</p>
      <ul>
        <li><strong>Prestadores de Serviço:</strong> Terceiros que realizam serviços em nosso nome, como hospedagem de sites, análise de dados e suporte ao cliente.</li>
        <li><strong>Conformidade Legal:</strong> Autoridades legais, se necessário para cumprir com a legislação vigente, processos legais ou para proteger nossos direitos.</li>
        <li><strong>Parceiros Comerciais:</strong> Com seu consentimento, para fins de marketing ou ofertas promocionais.</li>
      </ul>
      <h2>5. Segurança das Informações</h2>
      <p>Implementamos medidas de segurança apropriadas para proteger suas informações contra acesso não autorizado, alteração, divulgação ou destruição. No entanto, nenhum sistema de segurança é infalível, e não podemos garantir a segurança absoluta das suas informações.</p>
      <h2>6. Retenção de Dados</h2>
      <p>Manteremos suas informações pessoais apenas pelo tempo necessário para cumprir os propósitos para os quais foram coletadas, incluindo qualquer obrigação legal, contábil ou de relatório.</p>
      <h2>7. Seus Direitos</h2>
      <p>Você tem o direito de:</p>
      <ul>
        <li><strong>Acessar e Corrigir:</strong> Solicitar acesso às suas informações pessoais e corrigir qualquer dado incorreto.</li>
        <li><strong>Excluir:</strong> Solicitar a exclusão das suas informações pessoais, salvo quando tivermos a obrigação legal de mantê-las.</li>
        <li><strong>Restringir ou Opor-se ao Processamento:</strong> Restringir ou se opor ao processamento dos seus dados pessoais em determinadas circunstâncias.</li>
      </ul>
      <h2>8. Cookies e Tecnologias Semelhantes</h2>
      <p>Usamos cookies e tecnologias semelhantes para coletar informações sobre o uso da nossa plataforma, melhorar sua experiência e analisar tendências. Você pode controlar o uso de cookies através das configurações do seu navegador.</p>
      <h2>9. Alterações na Política de Privacidade</h2>
      <p>Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos sobre quaisquer mudanças significativas, e a versão atualizada será publicada em nossa plataforma. O uso continuado da plataforma após tais alterações constitui sua aceitação da nova política.</p>
      <h2>10. Contato</h2>
      <p>Se você tiver dúvidas sobre esta Política de Privacidade, entre em contato conosco através do email: privacidade@ajudaaqui.com.</p>
    </div>
  `;

  divModalPoliticsBody.innerHTML = htmlPolitics;
}


// Função de formatação de CEP, celular e telefone
document.addEventListener("DOMContentLoaded", function() {
  const zipCodeInput = document.getElementById('zip-code');
  const cellphoneInput = document.getElementById('cellphone');
  const phoneInput = document.getElementById('number2');

  function applyMask(input, mask) {
    input.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        e.target.value = value.replace(mask.regex, mask.format);
    });
  }

  applyMask(zipCodeInput, {
    regex: /^(\d{5})(\d{1,3})$/,
    format: '$1-$2'
  });

  applyMask(cellphoneInput, {
    regex: /^(\d{2})(\d{5})(\d{0,4})$/,
    format: '($1) $2-$3'
  });

  applyMask(phoneInput, {
    regex: /^(\d{2})(\d{4})(\d{0,4})$/,
    format: '($1) $2-$3'
  });
});

function cleanModalInputs() {
  document.getElementById('new-email').value = '';
  document.getElementById('new-password').value = '';
  document.getElementById('confirm-password').value = '';
  document.getElementById('first-name').value = '';
  document.getElementById('last-name').value = '';
  document.getElementById('occupation').value = '';
  document.getElementById('address').value = '';
  document.getElementById('neighborhood').value = '';
  document.getElementById('complement').value = '';
  document.getElementById('city').value = '';
  document.getElementById('region').value = '';
  document.getElementById('zip-code').value = '';
  document.getElementById('cellphone').value = '';
  document.getElementById('number2').value = '';
}

btnCriarConta.addEventListener('click', function(event) {
  event.preventDefault();
  if(validadeCreateCustomerForm()) {
    createCustomer();
  }
});

function validadeCreateCustomerForm() {
  const firstName = document.getElementById('first-name').value;
  const lastName = document.getElementById('last-name').value;
  const occupation = document.getElementById('occupation').value;
  const email = document.getElementById('new-email').value;
  const password = document.getElementById('confirm-password').value;
  const address = document.getElementById('address').value;
  const neighborhood = document.getElementById('neighborhood').value;
  const city = document.getElementById('city').value;
  const region = document.getElementById('region').value;
  const zipcode = document.getElementById('zip-code').value;
  const cellphone = document.getElementById('cellphone').value;
  const telephoneNumber = document.getElementById('number2').value;

  if (!firstName || !lastName || !occupation || !email || !password || !address || !neighborhood || !city || !region || !zipcode || !cellphone || !telephoneNumber) {
    alert('Por favor, preencha todos os campos obrigatórios.');
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Por favor, insira um email válido.');
    return false;
  }

  const zipCodeRegex = /^\d{5}-?\d{3}$/;
  if (!zipCodeRegex.test(zipcode)) {
    alert('Por favor, insira um CEP válido (formato: XXXXX-XXX).');
    return false;
  }

  return true;
}

function createCustomer() {
  let customer = {
    firstName: document.getElementById('first-name').value,
    lastName: document.getElementById('last-name').value,
    occupation: {
      occupationId: document.getElementById('occupation').value
    },
    email: document.getElementById('new-email').value,
    password: document.getElementById('confirm-password').value,
    address: document.getElementById('address').value,
    neighborhood: document.getElementById('neighborhood').value,
    complement: document.getElementById('complement').value,
    city: document.getElementById('city').value,
    region: document.getElementById('region').value,
    zipcode: document.getElementById('zip-code').value,
    cellphone: document.getElementById('cellphone').value,
    telephoneNumber: document.getElementById('number2').value
  }

  console.log(customer);

  axios.post('http://localhost:8080/customer/create-customer', customer)
    .then(function(response) {
      alert('Cadastro realizado com sucesso!');
    })
    .catch(function(error) {
      console.error('Houve um erro ao cadastrar o usuário', error);
      alert('Erro ao realizar o cadastro!');
    })
}