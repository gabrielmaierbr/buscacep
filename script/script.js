let cepInput = document.getElementById('cepInput');
let endereco = document.getElementById('endereco');
let botao = document.getElementById('botao');
let imgMap = document.getElementById('imagemMapa');
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
    document.getElementById('conteudo').style.height = "620px";
    document.getElementById('endereco').style.display = "flex";
    document.getElementById('imagemMapa').style.display = "flex";
}

function voltarEstado()
{
    document.getElementById('conteudo').style.height = "360px";
    document.getElementById('endereco').style.display = "none";
    document.getElementById('imagemMapa').style.display = "none";
}

botao.addEventListener("click", async function () {
    let cep = cepInput.value;
    let url = `https://viacep.com.br/ws/${cep}/json/`;

    try {
        let response = await fetch(url);
        let json = await response.json();

        if (cep.length == 9 && !json.erro)
        {
            const image = document.getElementById("imagemMapa");
            let enderecoMaps = `${json.logradouro}, ${json.bairro}, ${json.localidade}, ${json.uf}`;
            let linkMaps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(enderecoMaps)}`;
            endereco.innerText = `CEP: ${json.cep}\n\n ${json.logradouro}\n Bairro: ${json.bairro}\n ${json.localidade}, ${json.uf}\n\n`;
            endereco.append(image);
            $(image).wrap("<a href='" + linkMaps + "' target='_blank'></a>");
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