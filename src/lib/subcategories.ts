export type SubGroup = { group: string; items: string[] };

/** Valor salvo na oferta: "Grupo / Item" ou só "Grupo". */
export const subValue = (group: string, item?: string) => (item ? `${group} / ${item}` : group);

export const SUBCATEGORIES: Record<string, SubGroup[]> = {
  casa: [
    { group: "🛋️ Decoração", items: [] },
    { group: "🍳 Cozinha", items: [] },
    { group: "🔌 Eletroportáteis", items: [] },
    { group: "🏠 Eletrodomésticos", items: [] },
    { group: "🧹 Limpeza", items: [] },
    { group: "📦 Organização", items: [] },
  ],
  informatica: [
    { group: "Computadores", items: ["Desktops", "Notebooks"] },
    { group: "Acessórios", items: ["Teclados", "Mouses", "Headsets"] },
    { group: "Componentes", items: ["Placas de vídeo", "Memória RAM", "SSD / HD"] },
    { group: "Periféricos", items: ["Monitores", "Impressoras"] },
  ],
  celulares: [
    { group: "Capinhas", items: [] },
    { group: "Películas", items: [] },
    { group: "Carregadores", items: [] },
    { group: "Cabos", items: [] },
    { group: "Power banks", items: [] },
    { group: "Suportes", items: [] },
    { group: "Fones Bluetooth", items: [] },
    { group: "Smartwatch", items: [] },
  ],
  games: [
    { group: "Consoles", items: ["PlayStation", "Xbox", "Nintendo"] },
    { group: "Jogos", items: ["Ação", "Aventura", "Esportes"] },
    { group: "Acessórios", items: ["Controles", "Headsets gamer", "Cadeiras gamer"] },
    { group: "PC Gamer", items: ["Peças", "Kits gamer"] },
  ],
  diversao: [
    { group: "🧸 Brinquedos Infantis", items: [] },
    { group: "🦸 Action Figures", items: [] },
    { group: "⭐ Funko & Figuras", items: [] },
    { group: "🚗 Miniaturas", items: [] },
    { group: "🧩 Jogos & Quebra-Cabeças", items: [] },
    { group: "🎲 Jogos de Tabuleiro", items: [] },
    { group: "🏎️ Colecionáveis", items: [] },
    { group: "🦖 Bonecos e Personagens", items: [] },
  ],
  roupas: [
    { group: "Masculino", items: ["Camisetas", "Calças", "Jaquetas"] },
    { group: "Feminino", items: ["Vestidos", "Blusas", "Calças"] },
    { group: "Infantil", items: ["Meninos", "Meninas"] },
    { group: "Acessórios", items: ["Bonés", "Cintos", "Óculos"] },
  ],
  fitness: [
    { group: "Equipamentos", items: ["Halteres", "Esteiras", "Bicicletas ergométricas"] },
    { group: "Acessórios", items: [] },
    { group: "Roupas Fitness", items: ["Masculino", "Feminino"] },
    { group: "Suplementos", items: [] },
  ],
  pet: [
    {
      group: "Cachorros",
      items: ["Ração", "Petiscos", "Brinquedos", "Camas e casinhas", "Coleiras e guias", "Higiene (shampoo, escovas)"],
    },
    { group: "Gatos", items: ["Ração", "Petiscos", "Brinquedos", "Arranhadores", "Areia sanitária", "Higiene"] },
    { group: "Outros Animais", items: ["Aves", "Peixes", "Roedores"] },
    { group: "Acessórios", items: ["Comedouros e bebedouros", "Transportes (caixas, bolsas)", "Roupas pet"] },
    { group: "Saúde", items: ["Vitaminas", "Antipulgas", "Cuidados gerais"] },
  ],
  cursos: [
    { group: "Desenvolvimento Pessoal", items: ["Produtividade", "Comunicação", "Finanças pessoais"] },
    { group: "Fitness e Saúde", items: ["Treinos", "Nutrição", "Emagrecimento"] },
    { group: "Tecnologia", items: ["Programação", "Design", "Informática básica"] },
    { group: "Negócios e Marketing", items: ["Empreendedorismo", "Marketing digital", "Vendas"] },
    { group: "Cursos Profissionais", items: ["Excel", "Administração", "Idiomas"] },
  ],
  livros: [
    { group: "Ficção", items: ["Romance", "Fantasia", "Suspense"] },
    { group: "Não Ficção", items: ["Desenvolvimento pessoal", "Negócios", "Educação financeira"] },
    { group: "Tecnologia", items: ["Programação", "UX/UI"] },
    { group: "Saúde e Bem-estar", items: ["Fitness", "Alimentação"] },
    { group: "Infantil", items: ["Educativos", "Histórias"] },
  ],
  extras: [
    { group: "Ofertas", items: [] },
    { group: "Mais vendidos", items: [] },
    { group: "Lançamentos", items: [] },
    { group: "Blog (artigos e reviews)", items: [] },
  ],
};
