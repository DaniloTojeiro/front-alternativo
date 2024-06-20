const editModal = document.getElementById("editProfileModal");
const btnEditModal = document.getElementById("profile-edit-link");
const spanClose = document.querySelector("#editProfileModal .close");
const btnDeleteProfile = document.getElementById("profile-delete-link");

document.addEventListener('DOMContentLoaded', async () => {
    const userId = 4;

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
            title: 'Tem certeza?',
            text: "Você não poderá reverter isso!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, deletar!',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteUserProfile(userId);
                    Swal.fire({
                        title: 'Deletado!',
                        text: 'Perfil deletado com sucesso!',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        window.location.href = 'index.html';
                    });
                } catch (error) {
                    Swal.fire({
                        title: 'Erro!',
                        text: 'Erro ao deletar o perfil: ' + error.message,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            }
        });
    }

});

// EDIT PROFILE MODAL EVENTS
btnEditModal.onclick = function(event) {
    event.preventDefault();
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

    try {
        const response = await axios.delete(deleteUserProfileEndPoint);
        if (response.status !== 200) {
            console.error('Status de resposta não é 200:', response.status);
            throw new Error('Erro ao deletar o perfil do usuário');
        }
    } catch (error) {
        console.error('Erro ao realizar a requisição:', error.message);
        throw new Error('Erro ao deletar o perfil do usuário');
    }
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

function fillEditProfileModal(data) {
    document.getElementById('new-email').value = data.email;
    document.getElementById('new-password').value = data.password;
    document.getElementById('first-name').value = data.firstName;
    document.getElementById('last-name').value = data.lastName;
    document.getElementById('occupation').value = data.occupation.occupationId;
    document.getElementById('address').value = data.address;
    document.getElementById('neighborhood').value = data.neighborhood;
    document.getElementById('complement').value = data.complement;
    document.getElementById('city').value = data.city;
    document.getElementById('region').value = data.region;
    document.getElementById('zip-code').value = data.zipcode;
    document.getElementById('cellphone').value = data.cellphone;
    document.getElementById('number2').value = data.telephoneNumber;
}
