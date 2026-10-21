const juegos = [
  { id: 1, nombre: 'God of War', plataforma: 'PlayStation', tema: 'Mitología', imagen: '/img/godofwar.jpg', posicion: 'center 15%' },
  { id: 2, nombre: 'Minecraft', plataforma: 'PC', tema: 'Construcción', imagen: '/img/minecraft.jpg', posicion: 'center' },
  { id: 3, nombre: 'FIFA 26', plataforma: 'Xbox', tema: 'Deportes', imagen: '/img/fifa26.jpg', posicion: 'center' },
  { id: 4, nombre: 'Resident Evil 4', plataforma: 'PlayStation', tema: 'Terror', imagen: '/img/residentevil4.jpg', posicion: 'center 38%' },
  { id: 5, nombre: 'Among Us', plataforma: 'Celular', tema: 'Misterio', imagen: '/img/amongus.jpg', posicion: 'center 10%' },
  { id: 6, nombre: 'Valorant', plataforma: 'PC', tema: 'Disparos tácticos', imagen: '/img/valorant.jpg', posicion: 'center' },
  { id: 7, nombre: 'Halo Infinite', plataforma: 'Xbox', tema: 'Ciencia ficción', imagen: '/img/halo.jpg', posicion: 'center' },
  { id: 8, nombre: 'Fortnite', plataforma: 'PC', tema: 'Battle royale', imagen: '/img/fortnite.jpg', posicion: 'center' },
  { id: 9, nombre: 'Rocket League', plataforma: 'PC', tema: 'Autos y fútbol', imagen: '/img/rocketleague.jpg', posicion: 'center' },
  { id: 10, nombre: 'Call of Duty', plataforma: 'PlayStation', tema: 'Guerra', imagen: '/img/callofduty.jpg', posicion: 'center 27%' }
]

let favoritos = JSON.parse(localStorage.getItem('favoritos')) || []

const listaJuegos = document.getElementById('lista-juegos')
const listaFavoritos = document.getElementById('lista-favoritos')
const contadorFavoritos = document.getElementById('contador-favoritos')
const contadorMenu = document.getElementById('contador-menu')
const mensajeVacio = document.getElementById('mensaje-vacio')

function esFavorito(id) {
  return favoritos.includes(id)
}

function guardarFavoritos() {
  localStorage.setItem('favoritos', JSON.stringify(favoritos))
}

function cambiarFavorito(id) {
  if (esFavorito(id)) {
    favoritos = favoritos.filter(function (favorito) {
      return favorito !== id
    })
  } else {
    favoritos.push(id)
  }
  guardarFavoritos()
  mostrarTodo()
}

function mostrarJuegos() {
  listaJuegos.innerHTML = ''

  juegos.forEach(function (juego) {
    const tarjeta = document.createElement('article')
    tarjeta.className = 'juego'

    const textoBoton = esFavorito(juego.id) ? '★ Favorito' : '☆ Favorito'
    const claseBoton = esFavorito(juego.id) ? 'boton-favorito activo' : 'boton-favorito'

    tarjeta.innerHTML =
      '<div class="juego-imagen">' +
        '<img src="' + juego.imagen + '" alt="' + juego.nombre + '" style="object-position: ' + juego.posicion + '">' +
      '</div>' +
      '<div class="juego-info">' +
        '<h3>' + juego.nombre + '</h3>' +
        '<p>Plataforma: <span>' + juego.plataforma + '</span></p>' +
        '<p>Tema: <span>' + juego.tema + '</span></p>' +
        '<button class="' + claseBoton + '">' + textoBoton + '</button>' +
      '</div>'

    tarjeta.querySelector('button').addEventListener('click', function () {
      cambiarFavorito(juego.id)
    })

    listaJuegos.appendChild(tarjeta)
  })
}

function mostrarFavoritos() {
  listaFavoritos.innerHTML = ''

  const juegosFavoritos = juegos.filter(function (juego) {
    return esFavorito(juego.id)
  })

  juegosFavoritos.forEach(function (juego) {
    const item = document.createElement('li')
    item.className = 'favorito'

    item.innerHTML =
      '<div class="favorito-datos">' +
        '<img class="favorito-imagen" src="' + juego.imagen + '" alt="' + juego.nombre + '" style="object-position: ' + juego.posicion + '">' +
        '<div>' +
          '<strong>' + juego.nombre + '</strong>' +
          '<small>' + juego.plataforma + ' · ' + juego.tema + '</small>' +
        '</div>' +
      '</div>' +
      '<button class="boton-quitar">Quitar</button>'

    item.querySelector('button').addEventListener('click', function () {
      cambiarFavorito(juego.id)
    })

    listaFavoritos.appendChild(item)
  })

  contadorFavoritos.textContent = juegosFavoritos.length
  contadorMenu.textContent = juegosFavoritos.length
  mensajeVacio.style.display = juegosFavoritos.length === 0 ? 'block' : 'none'
}

function mostrarTodo() {
  mostrarJuegos()
  mostrarFavoritos()
}

mostrarTodo()
