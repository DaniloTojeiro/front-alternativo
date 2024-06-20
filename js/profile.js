const editModal = document.getElementById("editProfileModal");
const btnEditModal = document.getElementById("profile-edit-link");
const spanClose = document.querySelector("#editProfileModal .close");
const btnDeleteProfile = document.getElementById("profile-delete-link");
const userId = 2
btnConfirmEdit = document.getElementById("confirmEdit");

document.addEventListener('DOMContentLoaded', async () => {
    
    if (userId) {
        const userData = await getUserById(userId);
        console.log(userData);
        if (userData) {
            fillUserProfile(userData);
        }
    }

    // DELETE PROFILE EVENT
    btnDeleteProfile.onclick = async function(event) {
        event.preventDefault();
        Swal.fire({
            title: 'Tem certeza que deseja deletar o perfil?',
            text: "Esta ação não pode ser desfeita!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, deletar!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteUserProfile(userId);
            }
        });
    }

});

// CONFIRM EDIT EVENTS
btnConfirmEdit.addEventListener('click', function(event) {
    event.preventDefault();
    if(validadeEditCustomerForm()) {
        editCustomer();
      }
});

function validadeEditCustomerForm() {
    const firstName = document.getElementById('edit-first-name').value;
    const lastName = document.getElementById('edit-last-name').value;
    const occupation = document.getElementById('edit-user-occupation').value;
    const email = document.getElementById('new-email').value;
    const password = document.getElementById('new-password').value;
    const address = document.getElementById('edit-address').value;
    const neighborhood = document.getElementById('edit-neighborhood').value;
    const city = document.getElementById('edit-city').value;
    const region = document.getElementById('edit-region').value;
    const zipcode = document.getElementById('edit-zip-code').value;
    const cellphone = document.getElementById('edit-cellphone').value;
    const telephoneNumber = document.getElementById('edit-telephone').value;
  
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

// EDIT PROFILE MODAL
btnEditModal.onclick = async function(event) {
    event.preventDefault();

    if (userId) {
        const userData = await getUserById(userId);
        console.log('Edit modal click: ',userData);
        if (userData) {
            populateOccupations();
            fillEditProfileModal(userData);
        }
    }
    
    editModal.style.display = "block";
}

spanClose.onclick = function() {
    editModal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target === editModal) {
        editModal.style.display = "none";
    }
}

function populateOccupations() {
  getAllOccupations().then((data) => {
    const select = document.getElementById("edit-user-occupation");
    data.forEach((occupation) => {
      const option = document.createElement("option");
      option.value = occupation.occupationId;
      option.textContent = occupation.occupationDescription;
      select.appendChild(option);
    });
  });
}

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

function fillEditProfileModal(data) {
    document.getElementById('new-email').value = data.email;
    document.getElementById('new-password').value = data.password;
    document.getElementById('edit-first-name').value = data.firstName;
    document.getElementById('edit-last-name').value = data.lastName;
    document.getElementById('edit-user-occupation').value = data.occupation.occupationId;
    document.getElementById('edit-address').value = data.address;
    document.getElementById('edit-neighborhood').value = data.neighborhood;
    document.getElementById('edit-complement').value = data.complement;
    document.getElementById('edit-city').value = data.city;
    document.getElementById('edit-region').value = data.region;
    document.getElementById('edit-zip-code').value = data.zipcode;
    document.getElementById('edit-cellphone').value = data.cellphone;
    document.getElementById('edit-telephone').value = data.telephoneNumber;
}

// USER RELATED FUNCTIONS
async function getUserById(userId) {
    const getUserByIdEndPoint = `http://localhost:8080/customer/${userId}`;

    try {
        const response = await axios.get(getUserByIdEndPoint);
        if (response.status !== 200) {
            console.error('Status de resposta não é 200:', response.status);
            throw new Error('Erro ao buscar os dados do usuário');
        }
        const data = response.data;
        return data;
    } catch (error) {
        console.error('Erro ao realizar a requisição:', error.message);
        throw new Error('Erro ao buscar os dados do usuário');
    }
}

async function deleteUserProfile(userId) {
    const deleteUserProfileEndPoint = `http://localhost:8080/customer/delete/${userId}`;

    axios.delete(deleteUserProfileEndPoint)
        .then(() => {
            Swal.fire({
                title: 'Deletado!',
                text: 'Perfil deletado com sucesso!',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                window.location.href = 'index.html';
            });
        })
        .catch((error) => {
            Swal.fire({
                title: 'Erro!',
                text: 'Erro ao deletar o perfil: ' + error.message,
                icon: 'error',
                confirmButtonText: 'OK'
            });
            console.log('Erro ao deletar usuário', error);
        });
}

function fillUserProfile(data) {
    const profilePhoto = document.querySelector('.profile-photo');
    profilePhoto.textContent = data.firstName.charAt(0) + data.lastName.charAt(0);

    const profileName = document.getElementById('h1-profile-name');
    profileName.textContent = `${data.firstName} ${data.lastName}`;

    const profileOccupation = document.querySelector('.profile-info p');
    profileOccupation.textContent = data.occupation.occupationId;

    document.getElementById('cep').innerHTML = `<span>CEP:</span> ${data.zipcode}`;
    document.getElementById('address').innerHTML = `<span>Endereço:</span> ${data.address}`;
    document.getElementById('region').innerHTML = `<span>Estado:</span> ${data.region}`;
    document.getElementById('complement').innerHTML = `<span>Complemento:</span> ${data.complement}`;
    document.getElementById('neighborhood').innerHTML = `<span>Bairro:</span> ${data.neighborhood}`;
    document.getElementById('city').innerHTML = `<span>Cidade:</span> ${data.city}`;
    document.getElementById('cellphone').innerHTML = `<span>Celular:</span> ${data.cellphone}`;
    document.getElementById('email').innerHTML = `<span>Email:</span> ${data.email}`;
    document.getElementById('telephoneNumber').innerHTML = `<span>Telefone:</span> ${data.telephoneNumber}`;
}

function editCustomer() {
    const editCustomerEndPoint = `http://localhost:8080/customer/${userId}`;
    let customer = {
      id: userId,
      firstName: document.getElementById("edit-first-name").value,
      lastName: document.getElementById("edit-last-name").value,
      occupation: {
        occupationId: document.getElementById("edit-user-occupation").value,
      },
      email: document.getElementById("new-email").value,
      password: document.getElementById("confirm-new-password").value,
      address: document.getElementById("edit-address").value,
      neighborhood: document.getElementById("edit-neighborhood").value,
      complement: document.getElementById("edit-complement").value,
      city: document.getElementById("edit-city").value,
      region: document.getElementById("edit-region").value,
      zipcode: document.getElementById("edit-zip-code").value,
      cellphone: document.getElementById("edit-cellphone").value,
      telephoneNumber: document.getElementById("edit-telephone").value,
    };

    console.log(customer);

    axios
      .post(editCustomerEndPoint, customer)
      .then(function (response) {
        Swal.fire({
          title: "Sucesso!",
          text: "Edição realizada com sucesso!",
          icon: "success",
          confirmButtonText: "OK",
        });
      })
      .catch(function (error) {
        console.error("Houve um erro ao editar seu perfil", error);
        Swal.fire({
          title: "Erro!",
          text: "Erro ao realizar a edição!",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  }

// Função de formatação de CEP, celular e telefone
document.addEventListener("DOMContentLoaded", function() {
    const zipCodeInput = document.getElementById('edit-zip-code');
    const cellphoneInput = document.getElementById('edit-cellphone');
    const phoneInput = document.getElementById('edit-telephone');
  
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