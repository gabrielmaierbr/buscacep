let cepInput = document.getElementById('cepInput');
let endereco = document.getElementById('endereco');
let botao = document.getElementById('botao');
let link = document.getElementById('linkMapa');
var input = document.getElementById("cepInput");

input.addEventListener("keypress", function(event)
{
    if (event.key === "Enter")
    {
        event.preventDefault();
        document.getElementById("botao").click();
    }
});


function aumentarAltura()
{
    document.getElementById('conteudo').style.height = "550px";
    document.getElementById('endereco').style.display = "flex";
}

function voltarEstado()
{
    document.getElementById('conteudo').style.height = "360px";
    document.getElementById('endereco').style.display = "none";
}

botao.addEventListener("click", async function () {
    let cep = cepInput.value;
    let url = `https://viacep.com.br/ws/${cep}/json/`;

    try {
        let response = await fetch(url);
        let json = await response.json();

        if (cep.length == 9 && !json.erro)
        {
            let enderecoMaps = `${json.logradouro}, ${json.bairro}, ${json.localidade}, ${json.uf}`;
            let linkMaps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(enderecoMaps)}`;
            var a = document.createElement('a');
            var linkText = document.createTextNode("my title text");
            a.appendChild(linkText);
            a.title = "my title text";
            a.href = linkMaps;
            endereco.appendChild(a);
            endereco.innerText = `CEP: ${json.cep}\n\n ${json.logradouro}\n Bairro: ${json.bairro}\n ${json.localidade}, ${json.uf}\n\n ${a}`;
        }
        
        else
        {
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