function login() {
  const us = document.querySelector("#nomeusuario")
  const sh = document.querySelector("#senha")


  if (us.value.trim() == "" || sh.value.trim() == "") {
    return alert("Você deve preecher os campos")
  }

  fetch("http://127.0.0.1:4000/api/v1/users/login", {
    method: "POST",
    headers: {
      "accept": "application/json",
      "content-type": "application/json"
    },
    body: JSON.stringify({
      nomeusuario: us.value,
      senha: sh.value
    })
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result)
    })
    .catch((error) => console.log(`Erro ao tentar acessar a api ${error}`))

}

function cadastrarusuario() {
  const us = document.querySelector("#txtusuario")
  const sh = document.querySelector("#txtsenha")
  const ft = document.querySelector("#txtfotoperfil")

  if (us.value.trim() == "" || sh.value.trim() == "" || ft.value.trim() == "") {
    return alert("Você deve preecher os campos")
  }

  fetch("http://127.0.0.1:4000/api/v1/users/cadastrar", {
    method: "POST",
    headers: {
      "accept": "application/json",
      "content-type": "application/json"
    },
    body: JSON.stringify({
      nomeusuario: us.value,
      senha: sh.value,
      foto: ft.value
    })
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result)
    })
    .catch((error) => console.error(`Erro na api ${error}`))
}

function carregarLivros() {
  const conteudo = document.querySelector(".conteudo")
  fetch("http://127.0.0.1:4001/api/v1/livros/detalhes")
    .then((res) => res.json())
    .then((dados) => {
      dados.payload.map((rs) => {
        let card = `<div class="card" style="width: 18rem;">
                <img src=${rs.foto1} class="card-img-top" alt="...">
                <div class="card-body">
                <h3>${rs.nometitulo}</h3>
                  <p class="card-text">Autor: ${rs.autor}</p>
                  <p class="card-text" id="precoBook">De R$ ${rs.precoatual}</p>
                  <p class="card-text">Por R$ ${rs.precodesconto}</p>
                  <a class="btn btn-warning" href="detalhes.html?idlivro=${rs.idtitulo}">Saiba mais</a>
                </div>
              </div>`

        conteudo.innerHTML += card
      })

    })
    .catch((error) => console.log(`erro na api ${error}`))
}

function detalhes() {
  let id_url = window.location.search.split('=')
  const conteudo = document.querySelector(".conteudo")

  fetch("http://127.0.0.1:4001/api/v1/livros/detalhes/" + id_url[1])
    .then((res) => res.json())
    .then((dados) => {
      dados.payload.map((rs) => {

        document.querySelector("h2").innerHTML = "Detalhes do livro: " + rs.nometitulo

        let card = `<div class="card mb-3 col-md-12 borda">
                <div class="row g-0">
                  <div class="col-md-3">
                  <div id="carouselExampleFade" class="carousel slide carousel-fade">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="${rs.foto1}" class="d-block w-100" alt="Livro1" id="detalheFoto">
    </div>
    <div class="carousel-item">
      <img src="${rs.foto2}" class="d-block w-100" alt="Livro2" id="detalheFoto">
    </div>
    <div class="carousel-item">
      <img src="${rs.foto3}" class="d-block w-100" alt="Livro3" id="detalheFoto">
    </div>
    <div class="carousel-item">
      <img src="${rs.foto4}" class="d-block w-100" alt="Livro4" id="detalheFoto">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
                   
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h2 class="card-title">${rs.nometitulo}</h2>
                      <h5 class="card-title">Autor: ${rs.autor}</h5>
                      <p class="card-text" id="texto">${rs.sinopse}</p>
                      <p class="card-text" id="precoBook">De R$ ${rs.precoatual}</p>
                      <p class="card-text precoatual">Por R$ ${rs.precodesconto}</p>
                      <a href=carrinho.html?idlivro=${rs.idtitulo}>
                      <img src=img/cart.png class="cartPhoto"> Adicionar no carrinho </a>
                    </div>
                  </div>
                </div>
              </div>`

        conteudo.innerHTML += card
      })

    })
    .catch((error) => console.log(`erro na api ${error}`))

}

function buscar() {
  const conteudo = document.querySelector(".conteudo")

  // limpar todo o conteudo
  conteudo.innerHTML = ""

  // obtendo o texto escrito na caixa de busca
  let palavra = document.querySelector("input").value
  document.querySelector("h2").innerHTML = `Resultado de: ${palavra}`
  fetch("http://127.0.0.1:4001/api/v1/livros/detalhes/titulo/" + palavra)
    .then((res) => res.json())
    .then((dados) => {
      dados.payload.map((rs) => {
        let card = `<div class="card mb-3 col-md-12 borda">
        <div class="row g-0">
          <div class="col-md-3">
          <div id="carouselExampleFade" class="carousel slide carousel-fade">
<div class="carousel-inner">
<div class="carousel-item active">
<img src="${rs.foto1}" class="d-block w-100" alt="Livro1" id="detalheFoto">
</div>
<div class="carousel-item">
<img src="${rs.foto2}" class="d-block w-100" alt="Livro2" id="detalheFoto">
</div>
<div class="carousel-item">
<img src="${rs.foto3}" class="d-block w-100" alt="Livro3" id="detalheFoto">
</div>
<div class="carousel-item">
<img src="${rs.foto4}" class="d-block w-100" alt="Livro4" id="detalheFoto">
</div>
</div>
<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
<span class="carousel-control-prev-icon" aria-hidden="true"></span>
<span class="visually-hidden">Previous</span>
</button>
<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
<span class="carousel-control-next-icon" aria-hidden="true"></span>
<span class="visually-hidden">Next</span>
</button>
</div>
           
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h2 class="card-title">${rs.nometitulo}</h2>
              <h5 class="card-title">Autor: ${rs.autor}</h5>
              <p class="card-text" id="precoBook">De R$ ${rs.precoatual}</p>
              <p class="card-text precoatual">Por R$ ${rs.precodesconto}</p>
              <a class="btn btn-warning" href="detalhes.html?idlivro=${rs.idtitulo}">Saiba mais</a>
            </div>
          </div>
        </div>
      </div>`

        conteudo.innerHTML += card
      })

    })
    .catch((error) => console.log(`erro na api ${error}`))
}

function carregarCarrinho() {

  const conteudo = document.querySelector(".conteudo")

  fetch("http://127.0.0.1:4002/api/v1/carrinho/listar/" + 1)
    .then((res) => res.json())
    .then((dados) => {
      dados.payload.map((rs) => {
        `<div class="card mb-3">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${rs.foto1}" class="img-fluid rounded-start" alt="Livro">
    </div>
    <div class="col-md-8">
    <div class="card-body">
      <h2 class="card-title">${rs.nometitulo}</h2>
      <h5 class="card-title">Autor: ${rs.autor}</h5>
      <p class="card-text" id="texto">${rs.sinopse}</p>
      <p class="card-text" id="precoBook">De R$ ${rs.precoatual}</p>
      <p class="card-text precoatual">Por R$ ${rs.total}</p>
      <a href=carrinho.html?idlivro=${rs.idtitulo}>
      <img src=img/cart.png class="cartPhoto"> Adicionar no carrinho </a>
    </div>
  </div>
  </div>
</div>`


        conteudo.innerHTML += card
      })

    })
    .catch((error) => console.log(`erro na api ${error}`))

}