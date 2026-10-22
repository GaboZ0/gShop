
"use client";

import { useMemo, useState } from "react";

const products = [
  {
    id: 1,
    name: "Auriculares Bluetooth",
    category: "Tecnología",
    price: 24990,
    oldPrice: 32990,
    emoji: "🎧",
    color: "#e8e1ff",
    tag: "MÁS VENDIDO",
  },
  {
    id: 2,
    name: "Lámpara de escritorio LED",
    category: "Hogar",
    price: 18990,
    oldPrice: 24990,
    emoji: "💡",
    color: "#fff0d6",
    tag: "OFERTA",
  },
  {
    id: 3,
    name: "Teclado mecánico RGB",
    category: "Gaming",
    price: 45990,
    oldPrice: null,
    emoji: "⌨️",
    color: "#dce9ff",
    tag: "DESTACADO",
  },
  {
    id: 4,
    name: "Botella térmica",
    category: "Accesorios",
    price: 15990,
    oldPrice: 19990,
    emoji: "🥤",
    color: "#dff5e8",
    tag: "OFERTA",
  },
  {
    id: 5,
    name: "Parlante portátil",
    category: "Tecnología",
    price: 28990,
    oldPrice: null,
    emoji: "🔊",
    color: "#ffe1e8",
    tag: "",
  },
  {
    id: 6,
    name: "Organizador de escritorio",
    category: "Hogar",
    price: 12990,
    oldPrice: null,
    emoji: "🗂️",
    color: "#f8e4d6",
    tag: "",
  },
  {
    id: 7,
    name: "Mouse gamer RGB",
    category: "Gaming",
    price: 21990,
    oldPrice: 27990,
    emoji: "🖱️",
    color: "#e4e5ff",
    tag: "OFERTA",
  },
  {
    id: 8,
    name: "Mochila urbana",
    category: "Accesorios",
    price: 34990,
    oldPrice: null,
    emoji: "🎒",
    color: "#e4eddf",
    tag: "",
  },
];

const categories = [
  { name: "Todos", emoji: "✦" },
  { name: "Tecnología", emoji: "🎧" },
  { name: "Hogar", emoji: "🏠" },
  { name: "Gaming", emoji: "🎮" },
  { name: "Accesorios", emoji: "✨" },
];

const money = (value: number) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value);

export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");
  const [cart, setCart] = useState<Record<number, number>>({});
  const [showCart, setShowCart] = useState(false);
  const [notice, setNotice] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        category === "Todos" || product.category === category;
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase().trim());

      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  const cartCount = Object.values(cart).reduce(
    (total, quantity) => total + quantity,
    0
  );

  const cartTotal = products.reduce(
    (total, product) =>
      total + product.price * (cart[product.id] || 0),
    0
  );

  function addToCart(id: number) {
    setCart((current) => ({
      ...current,
      [id]: (current[id] || 0) + 1,
    }));
    setNotice("¡Producto agregado al carrito!");
    window.setTimeout(() => setNotice(""), 2200);
  }

  function changeQuantity(id: number, amount: number) {
    setCart((current) => {
      const next = { ...current };
      const quantity = (next[id] || 0) + amount;

      if (quantity <= 0) {
        delete next[id];
      } else {
        next[id] = quantity;
      }

      return next;
    });
  }

  return (
    <main className="min-h-screen bg-[#faf9f7] text-[#24212b]">
      {/* Barra superior */}
      <div className="bg-[#292333] px-4 py-2.5 text-center text-xs font-medium tracking-wide text-white sm:text-sm">
        ✨ Descubrí algo nuevo. Encontrá tus favoritos en gShop.
      </div>

      {/* Encabezado */}
      <header className="sticky top-0 z-30 border-b border-[#eeebf0] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <a href="#" className="shrink-0 text-2xl font-black tracking-tight">
            g<span className="text-[#8058d8]">Shop</span>
            <span className="ml-1 text-xs font-medium text-[#898391]">
              AR
            </span>
          </a>

          <div className="relative mx-auto hidden max-w-xl flex-1 sm:block">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-[#898391]">
              ⌕
            </span>
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                document.getElementById("catalogo")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
              placeholder="¿Qué estás buscando?"
              aria-label="Buscar productos"
              className="w-full rounded-xl border border-[#e9e5ed] bg-[#faf9fb] py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#8058d8] focus:ring-2 focus:ring-[#8058d8]/10"
            />
          </div>

          <button
            onClick={() => setShowCart(true)}
            className="ml-auto flex shrink-0 items-center gap-2 rounded-xl border border-[#e9e5ed] px-3 py-2.5 text-sm font-semibold transition hover:border-[#8058d8] hover:bg-[#f5f0ff] sm:ml-0 sm:px-4"
            aria-label={`Abrir carrito, ${cartCount} productos`}
          >
            <span className="text-lg">🛒</span>
            <span className="hidden sm:inline">Mi carrito</span>
            <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#8058d8] px-1.5 text-xs text-white">
              {cartCount}
            </span>
          </button>
        </div>

        <div className="px-4 pb-3 sm:hidden">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="⌕  Buscar productos..."
            aria-label="Buscar productos"
            className="w-full rounded-xl border border-[#e9e5ed] bg-[#faf9fb] px-4 py-3 text-sm outline-none focus:border-[#8058d8]"
          />
        </div>
      </header>

      {/* Portada */}
      <section className="mx-auto max-w-7xl px-4 pb-8 pt-6 sm:px-6 sm:pt-10 lg:px-8">
        <div className="relative overflow-hidden rounded-[28px] bg-[#e9e1ff]">
          <div className="absolute -right-16 -top-20 h-72 w-72 rounded-full bg-white/40 blur-2xl" />
          <div className="absolute -bottom-32 right-1/3 h-64 w-64 rounded-full bg-[#c7b5ff]/50 blur-2xl" />

          <div className="relative grid min-h-[340px] items-center gap-6 px-6 py-10 sm:px-12 sm:py-12 lg:grid-cols-[1.15fr_0.85fr] lg:px-16">
            <div className="max-w-xl">
              <span className="inline-flex rounded-full border border-[#8058d8]/20 bg-white/70 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-[#6945bb]">
                Tu próxima compra empieza acá
              </span>

              <h1 className="mt-5 text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                Cosas que te gustan.
                <span className="mt-1 block text-[#8058d8]">
                  Precios que te cierran.
                </span>
              </h1>

              <p className="mt-5 max-w-md text-sm leading-6 text-[#51475f] sm:text-base sm:leading-7">
                Explorá productos para tu día a día, tu casa y tus momentos
                de juego. Encontrá tu próximo favorito.
              </p>

              <a
                href="#catalogo"
                className="mt-7 inline-flex items-center gap-3 rounded-xl bg-[#292333] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#292333]/10 transition hover:-translate-y-0.5 hover:bg-[#453851]"
              >
                Explorar productos <span>→</span>
              </a>

              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-[#51475f]">
                <span>✓ Compra simple</span>
                <span>✓ Productos seleccionados</span>
              </div>
            </div>

            <div className="relative hidden min-h-[260px] items-center justify-center lg:flex">
              <div className="absolute right-8 top-5 h-52 w-52 rounded-full border border-white/70" />
              <div className="absolute right-14 top-11 h-40 w-40 rounded-full border border-white/70" />
              <div className="relative flex h-52 w-52 rotate-[-7deg] items-center justify-center rounded-[42px] border border-white/70 bg-white/60 shadow-2xl shadow-[#7854bd]/15 backdrop-blur">
                <span className="text-[112px] drop-shadow-md">🛍️</span>
              </div>
              <div className="absolute bottom-3 left-0 rotate-[-5deg] rounded-2xl bg-white px-4 py-3 shadow-xl">
                <p className="text-xs text-[#898391]">Tu próximo favorito</p>
                <p className="mt-1 text-sm font-extrabold">Está en gShop ✦</p>
              </div>
              <div className="absolute right-0 top-8 rotate-6 rounded-xl bg-white px-3 py-2 text-sm font-bold shadow-lg">
                💜 Elegí el tuyo
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categorías */}
      <section className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8058d8]">
              Explorá
            </p>
            <h2 className="mt-1 text-2xl font-extrabold tracking-tight">
              ¿Qué te interesa?
            </h2>
          </div>
          <span className="hidden text-sm text-[#898391] sm:block">
            Encontrá tu categoría
          </span>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2">
          {categories.map((item) => (
            <button
              key={item.name}
              onClick={() => setCategory(item.name)}
              className={`flex shrink-0 items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                category === item.name
                  ? "border-[#8058d8] bg-[#8058d8] text-white shadow-md shadow-[#8058d8]/15"
                  : "border-[#e9e5ed] bg-white text-[#51475f] hover:border-[#c5b3f1] hover:bg-[#f7f3ff]"
              }`}
            >
              <span>{item.emoji}</span>
              {item.name}
            </button>
          ))}
        </div>
      </section>

      {/* Catálogo */}
      <section
        id="catalogo"
        className="mx-auto max-w-7xl scroll-mt-36 px-4 pb-16 pt-5 sm:scroll-mt-28 sm:px-6 lg:px-8"
      >
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8058d8]">
              La selección gShop
            </p>
            <h2 className="mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl">
              Productos destacados
            </h2>
            <p className="mt-2 text-sm text-[#898391]">
              Productos de ejemplo para nuestra primera versión.
            </p>
          </div>
          <span className="shrink-0 rounded-lg bg-white px-3 py-2 text-xs font-semibold text-[#6f687a]">
            {filteredProducts.length} productos
          </span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#d9d0e6] bg-white px-5 py-16 text-center">
            <p className="text-4xl">🔎</p>
            <h3 className="mt-4 text-lg font-bold">
              No encontramos productos
            </h3>
            <p className="mt-2 text-sm text-[#898391]">
              Probá con otra búsqueda o categoría.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setCategory("Todos");
              }}
              className="mt-5 rounded-xl bg-[#8058d8] px-5 py-3 text-sm font-bold text-white"
            >
              Ver todos los productos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="group overflow-hidden rounded-2xl border border-[#eeebf0] bg-white transition duration-300 hover:-translate-y-1 hover:border-[#d9cafa] hover:shadow-xl hover:shadow-[#292333]/5"
              >
                <div
                  className="relative flex aspect-square items-center justify-center overflow-hidden"
                  style={{ backgroundColor: product.color }}
                >
                  {product.tag && (
                    <span className="absolute left-2 top-2 z-10 rounded-md bg-white/90 px-2 py-1 text-[9px] font-extrabold tracking-wide text-[#6945bb] sm:left-3 sm:top-3 sm:text-[10px]">
                      {product.tag}
                    </span>
                  )}
                  <span className="select-none text-7xl transition duration-300 group-hover:scale-110 sm:text-8xl">
                    {product.emoji}
                  </span>
                  <span className="absolute bottom-3 right-3 rounded-full bg-white/80 px-2 py-1 text-[10px] font-medium text-[#51475f] backdrop-blur">
                    {product.category}
                  </span>
                </div>

                <div className="p-3 sm:p-4">
                  <h3 className="min-h-10 text-sm font-bold leading-5 sm:text-base">
                    {product.name}
                  </h3>

                  <div className="mt-2 flex min-h-5 flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="text-lg font-extrabold tracking-tight">
                      {money(product.price)}
                    </span>
                    {product.oldPrice && (
                      <span className="text-xs text-[#a39baa] line-through">
                        {money(product.oldPrice)}
                      </span>
                    )}
                  </div>

                  {product.oldPrice && (
                    <p className="mt-1 text-xs font-semibold text-[#43845e]">
                      Ahorrás {money(product.oldPrice - product.price)}
                    </p>
                  )}

                  <button
                    onClick={() => addToCart(product.id)}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#292333] px-2 py-3 text-xs font-bold text-white transition hover:bg-[#8058d8] sm:text-sm"
                  >
                    <span>+</span> Agregar al carrito
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Beneficios */}
      <section className="border-y border-[#eeebf0] bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-9 sm:grid-cols-3 sm:px-6 lg:px-8">
          {[
            {
              icon: "🛍️",
              title: "Compra fácil",
              text: "Una experiencia simple para encontrar lo que buscás.",
            },
            {
              icon: "🔎",
              title: "Productos seleccionados",
              text: "Una tienda que busca ofrecer opciones interesantes.",
            },
            {
              icon: "📦",
              title: "Envíos a coordinar",
              text: "Las condiciones de entrega se definirán con el proveedor.",
            },
          ].map((benefit) => (
            <div key={benefit.title} className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f1ebff] text-xl">
                {benefit.icon}
              </div>
              <div>
                <h3 className="font-bold">{benefit.title}</h3>
                <p className="mt-1 text-sm leading-6 text-[#898391]">
                  {benefit.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pie de página */}
      <footer className="bg-[#292333] text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div>
            <p className="text-2xl font-black">
              g<span className="text-[#bba2ff]">Shop</span>
            </p>
            <p className="mt-1 text-sm text-white/60">
              Tu próxima compra empieza acá.
            </p>
          </div>
          <p className="text-xs text-white/50">
            © 2026 gShop · Argentina
          </p>
        </div>
      </footer>

      {/* Aviso de producto agregado */}
      {notice && (
        <div
          role="status"
          className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-[#292333] px-5 py-3 text-sm font-semibold text-white shadow-xl"
        >
          ✓ {notice}
        </div>
      )}

      {/* Panel del carrito */}
      {showCart && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/40"
          onClick={() => setShowCart(false)}
        >
          <aside
            role="dialog"
            aria-modal="true"
            aria-label="Mi carrito"
            onClick={(event) => event.stopPropagation()}
            className="flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[#eeebf0] p-5">
              <div>
                <h2 className="text-xl font-extrabold">Mi carrito</h2>
                <p className="mt-1 text-xs text-[#898391]">
                  {cartCount} unidades seleccionadas
                </p>
              </div>
              <button
                onClick={() => setShowCart(false)}
                className="rounded-xl px-3 py-2 text-xl hover:bg-[#f5f2f8]"
                aria-label="Cerrar carrito"
              >
                ×
              </button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto p-5">
              {cartCount === 0 ? (
                <div className="py-16 text-center">
                  <p className="text-5xl">🛒</p>
                  <h3 className="mt-4 font-bold">Tu carrito está vacío</h3>
                  <p className="mt-2 text-sm text-[#898391]">
                    Agregá algo que te guste.
                  </p>
                  <button
                    onClick={() => setShowCart(false)}
                    className="mt-5 rounded-xl bg-[#8058d8] px-5 py-3 text-sm font-bold text-white"
                  >
                    Seguir explorando
                  </button>
                </div>
              ) : (
                products
                  .filter((product) => cart[product.id])
                  .map((product) => (
                    <div
                      key={product.id}
                      className="flex gap-3 border-b border-[#eeebf0] pb-4"
                    >
                      <div
                        className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl text-3xl"
                        style={{ backgroundColor: product.color }}
                      >
                        {product.emoji}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-bold">{product.name}</h3>
                        <p className="mt-1 font-extrabold">
                          {money(product.price * cart[product.id])}
                        </p>
                        <div className="mt-2 flex items-center gap-3">
                          <button
                            onClick={() => changeQuantity(product.id, -1)}
                            className="flex h-7 w-7 items-center justify-center rounded-lg border"
                            aria-label={`Quitar una unidad de ${product.name}`}
                          >
                            −
                          </button>
                          <span className="text-sm font-semibold">
                            {cart[product.id]}
                          </span>
                          <button
                            onClick={() => changeQuantity(product.id, 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-lg border"
                            aria-label={`Agregar una unidad de ${product.name}`}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
              )}
            </div>

            {cartCount > 0 && (
              <div className="border-t border-[#eeebf0] p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#898391]">Subtotal</span>
                  <span className="text-xl font-extrabold">
                    {money(cartTotal)}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-5 text-[#898391]">
                  Envío y medios de pago se configurarán en la próxima etapa.
                  Este carrito es una demostración.
                </p>
                <button
                  onClick={() => {
                    setShowCart(false);
                    setNotice("El checkout todavía está en desarrollo.");
                    window.setTimeout(() => setNotice(""), 2800);
                  }}
                  className="mt-4 w-full rounded-xl bg-[#8058d8] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#6945bb]"
                >
                  Continuar compra →
                </button>
              </div>
            )}
          </aside>
        </div>
      )}
    </main>
  );
}
