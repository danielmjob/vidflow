const containerVideos = document.querySelector(".videos__container");
// função assincrona
// buscar - retorna uma Promise - função assincrona
async function buscarEMostrarVideos() {
    try{
    const buscaApi = await fetch("http://localhost:3000/videos");
    const videos = await buscaApi.json();

        videos.forEach((video)=>{
            // o if abaixo foi usado apenas como exemplo, uma forma de prevenir um erro especifico da regra de negócio
            if(video.categoria ==""){
                throw new Error('Video não tem categoria'); 
            }
            containerVideos.innerHTML += `
                <li class="videos__item">
                    <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                    <div class="descricao-video">
                        <img class="img-canal" src="${video.imagem}" alt="logo do Canal">
                        <h3 class="titulo-video">${video.titulo}</h3>
                        <p class="titulo-canal">${video.descricao}</p>
                        <p class="categoria" hidden>${video.categoria}</p>
                    </div>
                </li>
            `;
        })
    }catch(error){
        containerVideos.innerHTML = ` <p>Houve um erro ao carregar os vídeos: ${error}</p>`
    } finally{
        // alert('Isso sempre acontece'); //recurso que sempre aparecera independente de erro ou não
    }
}
buscarEMostrarVideos();
const barraDePesquisa = document.querySelector(".pesquisar__input");

barraDePesquisa.addEventListener("input", filtrarPesquisa);

function filtrarPesquisa(){
    const videos = document.querySelectorAll(".videos__item")

    if(barraDePesquisa.value != ""){
        for(let video of videos){
            let titulo = video.querySelector(".titulo-video").textContent.toLocaleLowerCase();
            let valorFiltro = barraDePesquisa.value.toLocaleLowerCase();

            if(!titulo.includes(valorFiltro)){
                video.style.display = "none"; //faz os videos sumirem se não forem o da pesquisa
            }else{
                video.style.display = "block"; // exibe os videos pesquisados
            }


        }
    }else{
        video.style.display = "block";
    }
}

const botaoCategoria = document.querySelectorAll(".superior__item");

botaoCategoria.forEach((botao) => {
    let nomeCategoria = botao.getAttribute("name");
    botao.addEventListener("click",() => filtrarPorCategoria(nomeCategoria));
})

function filtrarPorCategoria(filtro){
    const videos = document.querySelectorAll(".videos__item");
    for(let video of videos){
        let categoria = video.querySelector(".categoria").textContent.toLocaleLowerCase();
        let valorFiltro = filtro.toLocaleLowerCase();

        if(!categoria.includes(valorFiltro) && valorFiltro != "tudo"){
            video.style.display = "none";
        }else{
            video.style.display = "block";
        }
    }
}



