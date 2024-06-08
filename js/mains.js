const mainCards = document.getElementById('main-cards');
const openModalButton = document.getElementById('openModalButton');
const modal = document.getElementById('myModal');
const closeModal = document.getElementsByClassName('close')[0];
const submitFormButton = document.getElementById('submitForm');
const jobForm = document.getElementById('jobForm');

document.addEventListener('DOMContentLoaded', () => {
  getAllOrders();

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
    try {
      const response = await axios.post('http://localhost:8080/order-history/create-order', formData);
      if (response.status === 201) {
        const cardData = response.data;
        renderCard(cardData);
      } else {
        console.error('Erro ao criar o pedido', response.status);
      }
    } catch (error) {
      console.error('Erro na requisição', error);
    }
  };

  submitFormButton.onclick = function() {
    const formData = {
      customerId: {
        customerId: 1
      },
      occupationId: {
        occupationId: 1
      },
      cityOffer: jobForm.cidade.value,
      dateTimeBegin: jobForm.dataComeco.value,
      dateTimeEnd: jobForm.dataTermino.value,
      descriptionOffer: jobForm.message.value
    };
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
function createCard(cityOffer, dateTimeBegin, dateTimeEnd, descriptionOffer) {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
      <h3>${cityOffer}</h3>
      <p>Horário: ${dateTimeBegin} - ${dateTimeEnd}</p>
      <p>${descriptionOffer}</p>
  `;
  return card;
}

function renderCard(cardData) {
  const card = createCard(cardData.cityOffer, cardData.dateTimeBegin, cardData.dateTimeEnd, cardData.descriptionOffer);
  mainCards.appendChild(card);
}