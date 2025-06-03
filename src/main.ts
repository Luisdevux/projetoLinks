import './style.css';

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const app = document.querySelector<HTMLDivElement>("#app")!;

const resultado = await fetch(`http://localhost:3000/usuarios/${id}`);
const perfil = await resultado.json();

const linksHTML = perfil.links.map((link: any) => `
  <a href="${link.url}" target="_blank" style="
      background-color: ${perfil["cor-link"]};
      color: ${perfil["cor-texto"]};
      border-radius: ${perfil.border_radius};
    ">
    <img src="${link.icone}" alt="${link.texto}" style="width: 20px; height: 20px;" />
    ${link.texto}
  </a>
`).join('');

app.innerHTML = `
  <div class="container" style="background-image: url('${perfil.fundo}');">
    <div class="profile">
      <img src="${perfil.url_foto}" alt="Foto de ${perfil.nome}" />
      <p style="color: ${perfil["cor-texto"]};">${perfil.nome}</p>
    </div>
    <div class="links">
      ${linksHTML}
    </div>
  </div>
`;