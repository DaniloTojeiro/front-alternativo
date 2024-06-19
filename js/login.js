document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const loginDTO = {
            email: emailInput.value,
            password: passwordInput.value
        };

        try {
            const response = await axios.post('http://localhost:8080/auth/login', loginDTO);

            if (response.status === 200) {
                window.location.href = 'main.html';
            } else {
                alert('Email ou senha incorretos.');
            }
        } catch (error) {
            console.error(error);
            alert('Ocorreu um erro ao tentar fazer login.');
        }
    });


    const createAccountForm = document.getElementById('createAccountForm');

    createAccountForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const createCustomerDTO = {
            firstName: document.getElementById('first-name').value,
            lastName: document.getElementById('last-name').value,
            occupation: { occupationId: document.getElementById('occupation').value }, 
            email: document.getElementById('new-email').value,
            password: document.getElementById('new-password').value,
            address: document.getElementById('address').value,
            neighborhood: document.getElementById('neighborhood').value,
            complement: document.getElementById('complement').value,
            city: document.getElementById('city').value,
            region: document.getElementById('region').value,
            zipcode: document.getElementById('zip-code').value,
            cellphone: document.getElementById('cellphone').value,
            telephoneNumber: document.getElementById('number2').value
        };

        try {
            const response = await axios.post('http://localhost:8080/auth/register', createCustomerDTO);
            if (response.status === 201) {
                alert('Conta criada com sucesso!');
            } else {
                alert('Erro ao criar conta!');
            }
        } catch (error) {
            alert('Erro ao criar conta!');
            console.error(error);
        }
    });
});
