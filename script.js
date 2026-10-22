const zipCode = document.getElementById('cep');
const notice = document.getElementById('notice');

//dispara a função assim que o usuário sair do campo do CEP

zipCode.addEventListener('blur', async () => {
    const cep = zipCode.value.replace(/\D/g, ''); //remove traços, pontos ou letras

    //valida se tem exatamente 8 números
    if (cep.length !== 8) {
        notice.textContent = 'CEP inválido! Digite 8 dígitos.';
        notice.style.color = '#ff0000';
        return;
    }

    notice.textContent = 'Buscando endereço...';
    notice.style.color = '#007bff';

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        // A ViaCep retorna {erro: true} se o número não existir

        if (data.erro) {
            notice.textContent = 'CEP não encontrado!';
            notice.style.color = '#ff0000';
            clearForm();
            return;
        }

        //preencher os campos com os dados da API

        document.getElementById('street').value = data.logradouro;
        document.getElementById('district').value = data.bairro;
        document.getElementById('city').value = data.localidade;
        document.getElementById('state').value = data.uf;

        notice.textContent = 'Endereço encontrado!';
        notice.style.color = '#00ff80';

    } catch (error) {
        notice.textContent = 'Erro ao consultar o servidor.';
        notice.style.color = '#ff0000';
    }
});

function clearForm() {
    document.getElementById('street').value = '';
    document.getElementById('district').value = '';
    document.getElementById('city').value = '';
    document.getElementById('state').value = '';
}