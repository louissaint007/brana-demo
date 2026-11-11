const PRODUCTS = {
  prestige: {
    id: "prestige",
    number: "01",
    name: "Prestige",
    category: "BIÈRE LAGER",
    description: "Bière lager en bouteille. Les détails ci-dessous sont repris de l’emballage photographié.",
    image: "assets/prestige-side.jpg",
    alt: "Photographie de la bouteille Prestige fournie en référence",
    views: [{ src: "assets/prestige-side.jpg", alt: "Bouteille Prestige photographiée de biais" }, { src: "assets/prestige-label.jpg", alt: "Autre photo de référence de la bouteille Prestige et de son étiquette" }],
    facts: [["Format visible", "341 ml"], ["Degré indiqué", "5,6 % vol."]],
    note: "L’étiquette présente aussi la mention « Lager Beer ». Consultez la bouteille pour les informations à jour."
  },
  guinness: {
    id: "guinness",
    number: "02",
    name: "Guinness Foreign Extra Stout",
    category: "STOUT",
    description: "Bouteille de Foreign Extra Stout. Les mentions lisibles sur l’emballage indiquent 341 ml et 7,5 % vol.",
    image: "assets/guinness-reference.HEIC",
    alt: "Photographie de la bouteille Guinness Foreign Extra Stout fournie en référence",
    views: [{ src: "assets/guinness-reference.HEIC", alt: "Bouteille Guinness Foreign Extra Stout photographiée en référence" }],
    facts: [["Format visible", "341 ml"], ["Degré indiqué", "7,5 % vol."]],
    note: "Les mentions sont reprises de la bouteille photographiée; elles peuvent varier selon les formats."
  },
  malta: {
    id: "malta",
    number: "03",
    name: "Malta H",
    category: "BOISSON MALTÉE",
    description: "Boisson maltée non alcoolisée. L’emballage affiche aussi la mention « avec vitamines ».",
    image: "assets/malta-front.jpg",
    alt: "Photographie de la bouteille Malta H, avec les mentions « avec vitamines » et « non-alcoolisée »",
    views: [{ src: "assets/malta-front.jpg", alt: "Face avant de la bouteille Malta H avec les mentions visibles" }, { src: "assets/malta-back.jpg", alt: "Face arrière de la bouteille Malta H, photographiée en référence" }],
    facts: [["Format visible", "341 ml"], ["Mention visible", "Non alcoolisée"]],
    note: "La mention « avec vitamines » apparaît sur l’étiquette fournie. Consultez l’emballage pour les détails."
  }
};

const state = { active: "prestige", view: 0, paused: false, queuedProduct: null };
const $ = (id) => document.getElementById(id);
const photo = $("heroProductImage");
const fallback = $("imageFallback");
const choices = Array.from(document.querySelectorAll(".product-choice"));

function setProduct(id) {
  const item = PRODUCTS[id];
  if (!item) return;
  state.active = id;
  photo.style.opacity = "0";
  fallback.hidden = true;
  state.view = 0;
  const view = item.views ? item.views[0] : { src: item.image, alt: item.alt };
  photo.src = view.src;
  photo.alt = view.alt;
  const viewButton = $("viewToggle");
  viewButton.disabled = !item.views || item.views.length < 2;
  viewButton.setAttribute("aria-label", item.views && item.views.length > 1 ? "Afficher une autre photo de " + item.name : "Une seule photo de référence disponible pour " + item.name);
  $("sceneProductName").textContent = item.name;
  $("sceneCounter").textContent = item.number + " / 03";
  $("detailIndex").textContent = item.number + " — 03";
  $("detailCategory").textContent = item.category;
  $("detailTitle").textContent = item.name;
  $("detailDescription").textContent = item.description;
  $("detailNote").textContent = item.note;
  const facts = $("productFacts");
  facts.replaceChildren(...item.facts.map(([label, value]) => {
    const row = document.createElement("div");
    row.className = "fact";
    const title = document.createElement("span");
    title.textContent = label;
    const text = document.createElement("strong");
    text.textContent = value;
    row.append(title, text);
    return row;
  }));
  choices.forEach((button) => {
    const active = button.dataset.product === id;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  document.querySelectorAll(".scene-indicator b").forEach((dot, index) => {
    dot.classList.toggle("active", index === Number(item.number) - 1);
  });
  $("photoWrap").classList.remove("switching");
  requestAnimationFrame(() => $("photoWrap").classList.add("switching"));
}

photo.addEventListener("load", () => {
  photo.style.opacity = "1";
  fallback.hidden = true;
});
photo.addEventListener("error", () => {
  photo.style.opacity = "0";
  fallback.hidden = false;
});

choices.forEach((button) => button.addEventListener("click", () => {
  if (button.dataset.product !== "malta" && !sessionStorage.getItem("brana-age-ok")) {
    state.queuedProduct = button.dataset.product;
    $("ageGate").classList.remove("hidden");
    $("ageYes").focus();
    return;
  }
  setProduct(button.dataset.product);
}));

$("motionToggle").addEventListener("click", () => {
  state.paused = !state.paused;
  document.body.classList.toggle("is-paused", state.paused);
  $("motionToggle").setAttribute("aria-pressed", String(state.paused));
  $("motionToggle").setAttribute("aria-label", state.paused ? "Reprendre les animations" : "Mettre les animations en pause");
  $("motionLabel").textContent = state.paused ? "Reprendre" : "Mettre en pause";
});

const gate = $("ageGate");
$("ageYes").addEventListener("click", () => {
  sessionStorage.setItem("brana-age-ok", "yes");
  gate.classList.add("hidden");
  const queued = state.queuedProduct;
  if (queued) { setProduct(queued); state.queuedProduct = null; }
  else $("products").scrollIntoView({ behavior: "smooth", block: "start" });
});
$("ageNo").addEventListener("click", () => {
  $("ageTitle").textContent = "Accès non disponible";
  $("ageDescription").textContent = "Les contenus de cette maquette sont réservés aux adultes. Vous pouvez fermer cette fenêtre.";
  $("ageYes").hidden = true;
  $("ageNo").textContent = "Accès réservé aux adultes";
  $("ageNo").disabled = true;
});

if (sessionStorage.getItem("brana-age-ok")) gate.classList.add("hidden");
setProduct("prestige");

$("viewToggle").addEventListener("click", () => {
  const views = PRODUCTS[state.active].views || [];
  if (views.length < 2) return;
  state.view = (state.view + 1) % views.length;
  const view = views[state.view];
  photo.style.opacity = "0";
  photo.src = view.src;
  photo.alt = view.alt;
  $("viewToggle").setAttribute("aria-label", "Afficher une autre photo de " + PRODUCTS[state.active].name);
});

// Keep the photo plane readable: only a restrained pointer tilt is used.
const stage = document.querySelector(".hero-visual");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
if (stage && !reduceMotion.matches) {
  stage.addEventListener("pointermove", (event) => {
    if (state.paused) return;
    const rect = stage.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    stage.style.setProperty("--pointer-x", (x * 5).toFixed(2) + "deg");
    stage.style.setProperty("--pointer-y", (y * -4).toFixed(2) + "deg");
    const frame = stage.querySelector(".photo-frame");
    frame.style.transform = "rotateY(" + (-4 + x * 7).toFixed(2) + "deg) rotateX(" + (1 + y * -5).toFixed(2) + "deg)";
  });
  stage.addEventListener("pointerleave", () => {
    stage.querySelector(".photo-frame").style.transform = "";
    stage.style.removeProperty("--pointer-x");
    stage.style.removeProperty("--pointer-y");
  });
}
