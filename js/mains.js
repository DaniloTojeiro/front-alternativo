const mainCards = document.getElementById('main-cards');
const openModalButton = document.getElementById('openModalButton');
const modal = document.getElementById('myModal');
const closeModal = document.getElementsByClassName('close')[0];
const submitFormButton = document.getElementById('submitForm');
const jobForm = document.getElementById('jobForm');

document.addEventListener('DOMContentLoaded', () => {
  getAllOrders();
  populateOccupations();

  openModalButton.onclick = function() {
    modal.style.display = 'block';
  };

  closeModal.onclick = function() {
    modal.style.display = 'none';
  };

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };

  const submitForm = async (formData) => {
    return await axios.post('http://localhost:8080/order-history/create-order', formData)
    .then(function(response) {
      Swal.fire({
        title: 'Sucesso!',
        text: 'Pedido cadastrado com sucesso!',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    })
    .catch(function(error) {
      console.error('Houve um erro ao cadastrar o pedido', error);
      Swal.fire({
        title: 'Erro!',
        icon: 'error',
        text: 'Erro ao cadastrar o pedido!',
        confirmButtonText: 'OK'
      });
    });

    // try {
    //   const response = await axios.post('http://localhost:8080/order-history/create-order', formData);
    //   if (response.status === 200) {
    //     const cardData = response.data;
    //     renderCard(cardData);
    //   } else {
    //     console.error('Erro ao criar o pedido', response.status);
    //   }
    // } catch (error) {
    //   console.error('Erro na requisição', error);
    // }
  };

  submitFormButton.onclick = function() {
    const orderDate = new Date().toISOString().split(".")[0];

    const formData = {
      customerId: { customerId: 1 },
      occupationId: { occupationId: document.getElementById('ocupacao').value },
      cityOffer: document.getElementById('cidade').value,
      neighborhoodOffer: document.getElementById('bairro').value,
      descriptionOffer: document.getElementById('descricao').value,
      descriptionDone: "",
      dateBegin: document.getElementById('dataComeco').value,
      dateEnd: document.getElementById('dataTermino').value,
      orderDate: orderDate
    };
    console.log(formData);
    submitForm(formData);
    modal.style.display = 'none';
  };
});

// GET METHODS
// USER
async function getAllUsers() {
  const getAllUsersEndPoint = 'http://localhost:8080/customer'; // Substitua caso necessário

  return axios.get(getAllUsersEndPoint)
      .then(response => {
          if (response.status !== 200 || response.status !== 204) {
              throw new Error('Erro ao buscar dados dos usuários');
          }
          const data = response.data;
          console.log(data);
          return data;
      })
      .catch(error => {
          console.error('Erro:', error.message);
      });
}

async function getUserById(userId) {
  const getUserByIdEndPoint = `http://localhost:8080/customer/${userId}`; // Substitua caso necessário

  return axios.get(getUserByIdEndPoint)
      .then(response => {
          if (response.status !== 200 || response.status !== 204) {
              throw new Error('Erro ao buscar os dados do usuário');
          }
          const data = response.data;
          console.log(data);
          return data;
      })
      .catch(error => {
          console.error('Erro:', error.message);
      });
}

// ORDER
async function getAllOrders() {
  const getAllOrdersEndPoint = 'http://localhost:8080/order-history'; // Substitua caso necessário

  return axios.get(getAllOrdersEndPoint)
      .then(response => {
          if (response.status !== 200 && response.status !== 204) {
              throw new Error('Erro ao buscar dados dos pedidos');
          }
          const data = response.data;
          console.log(data);

          // Gera os cards para cada order dentro de data
          data.forEach(order => {
            renderCard(order);
          });

          return data;
      })
      .catch(error => {
          console.error('Erro:', error.message);
      });
}

async function getOrderById(userId) {
  const getOrderByIdEndPoint = `http://localhost:8080/order-history/${userId}`; // Substitua caso necessário

  return axios.get(getOrderByIdEndPoint)
      .then(response => {
          if (response.status !== 200 || response.status !== 204) {
              throw new Error('Erro ao buscar os dados do pedido');
          }
          const data = response.data;
          console.log(data);
          return data;
      })
      .catch(error => {
          console.error('Erro:', error.message);
      });
}

async function getOrderSearch(url) {
  return axios.get(url)
      .then(response => {
          if (response.status !== 200 && response.status !== 204) {
              throw new Error('Erro ao buscar dados dos pedidos');
          }
          const data = response.data;
          console.log(data);

          // Gera os cards para cada order dentro de data
          data.forEach(order => {
            renderCard(order);
          });

          return data;
      })
      .catch(error => {
          console.error('Erro:', error.message);
      });
}

// OCCUPATION
async function getAllOccupations() {
  const getAllOccupationsEndPoint = 'http://localhost:8080/occupation';

  return axios.get(getAllOccupationsEndPoint)
    .then(response => {
      if (response.status !== 200 && response.status !== 204) {
        throw new Error('Erro ao buscar ocupações');
      }
      const data = response.data;
      console.log(data);
      return data;
    })
    .catch(error => {
      console.error('Erro:', error.message);
    });
}

console.log(getAllOccupations());

// DELETE METHODS
// USER
async function deleteUser(userId) {
  const deleteUserEndPoint = `http://localhost:8080/customer/delete/customer/${userId}`; // Substitua caso necessário

  return axios.delete(deleteUserEndPoint)
      .then(response => {
          if (response.status !== 200) {
              throw new Error('Erro ao deletar usuário');
          }
          console.log(`Usuário ID nº${userId} deletado com sucesso`);
          return response.data;
      })
      .catch(error => {
          console.error('Erro:', error.message);
      });
}

// ORDER
async function deleteOrder(orderId) {
  const deleteOrderEndPoint = `http://localhost:8080/customer/delete/customer/${orderId}`; // Substitua caso necessário

  return axios.delete(deleteOrderEndPoint)
      .then(response => {
          if (response.status !== 200) {
              throw new Error('Erro ao deletar pedido');
          }
          console.log(`Pedido ID nº${orderId} deletado com sucesso`);
          return response.data;
      })
      .catch(error => {
          console.error('Erro:', error.message);
      });
}

// CARDS SECTION
function createCard(cardData) {
  const card = document.createElement('div');
  card.className = 'card';
   const content = `
      <h3>Ocupação:${cardData.occupationId.occupationDescription}</h3>
      <p>Cidade:${cardData.cityOffer}</p><br>
      <p>Data de começo: ${cardData.dateBegin}</p>
      <p>Data de término:${cardData.dateEnd}</p>
      <p>${cardData.descriptionOffer}</p>
  `;
  card.innerHTML = content;

  const button = document.createElement('button');
  button.textContent = 'Aceitar';

  button.addEventListener('click', () => {
    const moreInfo = document.createElement('p');
    moreInfo.textContent = 'skdjfklsjdf';
    card.appendChild(moreInfo);
    button.remove();
  });

  card.appendChild(button);

  return card;
}

function renderCard(cardData) {
  const card = createCard(cardData);
  mainCards.appendChild(card);
}

function clearCards() {
  const mainCards = document.getElementById('main-cards');
  while (mainCards.firstChild) {
    mainCards.removeChild(mainCards.firstChild);
  }
}

// FILTER BAR SECTION
function populateOccupations() {
  getAllOccupations().then(data => {
      const select = document.getElementById('occupation-select');
      data.forEach(occupation => {
          const option = document.createElement('option');
          option.value = occupation.occupationId;
          option.textContent = occupation.occupationDescription;
          select.appendChild(option);
      });
  });
}

function buildSearchURL(baseURL, params) {
  const queryString = Object.keys(params)
      .filter(key => params[key])
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');
  return `${baseURL}?${queryString}`;
}

function searchOrders() {
  const occupationSelect = document.getElementById('occupation-select');
  const cityInput = document.getElementById('city-input');
  const fromDate = document.getElementById('from-date');
  const toDate = document.getElementById('to-date');

  const params = {
      occupationId: occupationSelect.value,
      city: cityInput.value,
      from: fromDate.value,
      to: toDate.value
  };

  const url = buildSearchURL('http://localhost:8080/order-history/search-orders', params);

  console.log('Generated URL:', url);

  if (url) {
    clearCards();
    getOrderSearch(url);
  }

  return url;
}