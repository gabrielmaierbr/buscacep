let cepInput = document.getElementById('cepInput');
let endereco = document.getElementById('endereco');
let botao = document.getElementById('botao');

function aumentarAltura()
{
    document.getElementById('conteudo').style.height = "550px";
    document.getElementById('endereco').style.display = "flex";
}

function voltarEstado()
{
    document.getElementById('conteudo').style.height = "350px";
    document.getElementById('endereco').style.display = "none";
}

botao.addEventListener("click", async function () {
    let cep = cepInput.value;
    let url = `https://viacep.com.br/ws/${cep}/json/`;

    try {
        let response = await fetch(url);
        let json = await response.json();

        if (cep.length == 9 && !json.erro) {
            endereco.innerText = `CEP: ${json.cep}\n\n ${json.logradouro}\n Bairro: ${json.bairro}\n ${json.localidade}, ${json.uf}`;
        } else {
            endereco.innerText = "Insira um CEP válido";
            setTimeout(voltarEstado, 2300);
        }

        if(cep.length == 9 && json.erro)
        {
            endereco.innerText = "Insira um CEP existente";
            setTimeout(voltarEstado, 2300);
        }


    } catch (e) {
        console.error("Erro ao processar a requisição:", e);
        endereco.innerText = "Erro ao consultar o CEP\n Tente novamente";
        setTimeout(voltarEstado, 2300);
    }
});