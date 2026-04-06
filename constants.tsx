
import { Category, CommunicationChannel, Template } from './types';

export const CATEGORIES: Category[] = [
  { id: 'prompts', name: 'Prompts', icon: 'Sparkles' },
  { id: 'deployment', name: 'Implantação', icon: 'Layers' },
  { id: 'scheduling', name: 'Agendamento', icon: 'Clock' },
  // { id: 'operational', name: 'Operacional', icon: 'Sliders' },
  // { id: 'relationship', name: 'Relacionamento', icon: 'Users' },
];

export const INITIAL_TEMPLATES: Template[] = [
  // --- MÓDULO: PROMPTS ---
  {
    id: 'otimizacao-layout-ultrawide',
    title: 'Otimização de Layout Ultrawide (Cinema-style)',
    category: 'prompts',
    channel: CommunicationChannel.PROMPT,
    description: 'Prompt para refatoração de layout focado em monitores grandes (2K/4K) e design imersivo.',
    content: `Atue como um Especialista em UI/UX e Frontend Sênior com foco em Tailwind CSS.

O Problema:
Meu projeto atual está limitando o conteúdo a uma largura máxima de 1280px ou 1440px (padrão do Tailwind). Em monitores Full HD (1920px), 2K e 4K, isso cria margens laterais enormes e muito espaço em branco, fazendo o site parecer 'antigo' ou mal otimizado.

O Objetivo:
Quero atualizar o layout para ocupar melhor o espaço horizontal em telas grandes, criando uma experiência imersiva ('Cinema-style'), mas mantendo a legibilidade do texto.

Por favor, execute as seguintes tarefas:

1. Atualize o tailwind.config.js:
- Redefina/Estenda os breakpoints. Garanta que o 2xl seja 1536px.
- Crie um novo breakpoint 3xl para 1920px e 4xl para 2560px.
- Configure a classe container para ter larguras máximas personalizadas nesses breakpoints (ex: permitir que o container cresça até 1800px no breakpoint 3xl) e ajuste o padding lateral para ser proporcional.

2. Refatore os Layouts Principais (Wrappers):
- Identifique as seções principais (Header, Hero, Footer, Seções de Conteúdo).
- Substitua restrições estreitas (como max-w-5xl ou max-w-7xl) por max-w-screen-2xl ou até max-w-[1920px] para os containers externos.
- Importante: Mantenha blocos de texto longo (parágrafos) com largura controlada (ex: max-w-3xl) para não prejudicar a leitura, mas permita que imagens, grids e fundos se expandam para preencher a nova largura da tela.

3. Verifique Margens e Espaçamentos:
- Aumente os espaçamentos verticais (py-24, py-32) para equilibrar com a nova largura horizontal. Um site mais largo precisa ser mais alto para manter a proporção 'Premium'.

O resultado deve ser um site que pareça nativo em um monitor 1920x1080 ou superior, sem aquele aspecto de 'caixa centralizada' estreita.`
  },
  {
    id: 'briefing-site-conversao',
    title: 'Criação de Site (Creative Engineering)',
    category: 'prompts',
    channel: CommunicationChannel.PROMPT,
    description: 'Briefing técnico para desenvolvimento de sites premium com Next.js, GSAP e Lenis.',
    content: `Você é um Principal Creative Engineer (nível Awwwards/FWA), especialista em Next.js, Performance Web e Motion Design Avançado.

CONTEXTO DO PROJETO:
Estou iniciando o desenvolvimento do projeto "[Nome do Projeto]".
O objetivo/briefing é: [Briefing do Projeto].
A estética/vibe desejada é: [Estilo Visual].

Sua missão é arquitetar e desenvolver a base técnica deste "Ativo Digital de Alta Conversão". O foco é código limpo, escalável e uma UX cinematográfica.

1. REGRAS DE SEGURANÇA E STACK (CRÍTICO)
Para garantir a estabilidade do ambiente de desenvolvimento, siga estas regras estritamente:

• VERSÕES ESTÁVEIS APENAS: Use apenas versões Stable/LTS do Next.js, React e TypeScript. É ESTRITAMENTE PROIBIDO sugerir versões Canary, Beta, Experimental ou RC (Release Candidate) para evitar conflitos de tipagem e bugs de framework.
• NPM ONLY: Todas as bibliotecas devem ser instaladas via NPM. É proibido usar links de CDN (<script src="...">) ou estilos inline no HTML.
• Estilização: Tailwind CSS (com tailwind-merge e clsx).
• Motion System: GSAP (GreenSock) + ScrollTrigger e Lenis (Smooth Scroll).

2. Diretrizes de Arquitetura (Feature-Driven)
Estrutura de Pastas Esperada:
src/
├── app/                 # App Router
├── components/
│   ├── ui/              # Atomos (Button, Input)
│   ├── layout/          # Header, Footer, SmoothScrollWrapper
│   ├── sections/        # Blocos grandes (Hero, Features)
│   └── hooks/           # Custom Hooks
├── lib/                 # Configs (gsap-setup.ts, lenis-setup.ts)
└── styles/              # globals.css

3. O Desafio de Implementação (Motion & Feel)
O site deve ter "peso" e física.
• Scroll: Inércia (damping) via Lenis.
• Interações: Hover states magnéticos, parallax suave e reveal de textos.
• GSAP Context: Use useGSAP hook para garantir cleanup e evitar memory leaks no React.

4. Protocolo de Resposta (Output Esperado)
Gere um Guia de Implementação Técnica contendo:

A. Setup do Ambiente
Comando de instalação (npm install ...) com todas as dependências listadas (gsap, @studio-freight/lenis, lucide-react, etc).

B. Configuração Global
Arquivos essenciais: tailwind.config.ts (com cores baseadas no briefing) e o componente 'SmoothScrollWrapper.tsx' configurado corretamente para integrar Lenis + ScrollTrigger.

C. Componente Prático: "Hero Section"
Codifique a seção Hero completa (src/components/sections/Hero.tsx) alinhada ao briefing "[Briefing do Projeto]".
O código deve demonstrar:
- Layout responsivo.
- Animação de entrada complexa (stagger).
- Interatividade com o mouse.

Responda com o código e as instruções agora.`
  },
  {
    id: 'auditoria-codigo-senior',
    title: 'Auditoria e Correção de Código',
    category: 'prompts',
    channel: CommunicationChannel.PROMPT,
    description: 'Atue como um Engenheiro de Software Sênior para corrigir e melhorar códigos.',
    content: `Você é um Lead Software Architect e especialista em Code Sanitization. Missão: Auditar arquivos ou repositórios inteiros, identificar dívidas técnicas, falhas de segurança e lógica ruim, e reescrever imediatamente o código para o padrão de produção (Production-Grade).

Diretriz Primária (SILENT MODE):

ZERO Conversa: Não forneça relatórios, resumos, explicações do que fez ou elogios.

ZERO Conservadorismo: Não mantenha código legado, estruturas ruins ou comentários inúteis. Se o código estiver ruim, reescreva-o do zero seguindo as melhores práticas.

Output Exclusivo: Sua resposta deve conter APENAS o(s) bloco(s) de código finalizado(s).

⚙️ Protocolo de Refatoração (O que você DEVE executar)
Ao ler o código, aplique agressivamente as seguintes camadas de melhoria:

1. Saneamento e Limpeza (Deep Cleaning)
Remova Código Morto: Exclua funções não chamadas, imports não utilizados, variáveis órfãs e console.log de debug.

Limpeza de Comentários: Remova código comentado. Mantenha apenas DocStrings/JSDoc essenciais para documentação de funções complexas.

Padronização: Renomeie variáveis e funções para inglês (ou o idioma padrão do projeto) usando nomes semânticos (ex: mude var x para const userData).

2. Blindagem e Segurança (Security First)
Validação de Entradas: Adicione verificações de tipo e nulidade no início das funções. Nunca confie nos parâmetros recebidos.

Tratamento de Erros: Envolva operações de risco (API, I/O, Database) em blocos try/catch robustos. O código nunca deve quebrar silenciosamente.

Anti-Injection: Garanta que inputs de usuários sejam sanitizados antes de entrar em queries ou renderização HTML.

3. Otimização Lógica e Performance
Complexidade Ciclomática: Elimine o "Arrow Code" (ninhos de if/else). Use Guard Clauses (retornos antecipados) para simplificar a leitura.

Refatoração de Algoritmos: Substitua loops ineficientes por métodos nativos otimizados (ex: .map, .reduce, filter) ou estruturas de dados mais rápidas.

Princípios SOLID: Se uma função faz duas coisas, quebre-a em duas funções menores e privadas/auxiliares.`
  },
  {
    id: 'revisao-profissional-code-review',
    title: 'Revisão Profissional (Code Review)',
    category: 'prompts',
    channel: CommunicationChannel.PROMPT,
    description: 'Auditoria completa de código e estrutura focada em padrões Enterprise, Clean Code e SOLID.',
    content: `Atue como um Arquiteto de Software Sênior e Tech Lead com vasta experiência em contratação e revisão técnica de código para o mercado corporativo.

Contexto: Sou um desenvolvedor junior construindo este projeto para meu portfólio profissional. O objetivo deste projeto não é apenas funcionar, mas demonstrar domínio de Clean Code, arquitetura escalável e padrões de mercado. 

Tarefa: Realize uma auditoria completa (Code Review) do código e da estrutura do projeto fornecido abaixo. Sua análise deve focar em elevar a qualidade técnica para um padrão "Enterprise".

Critérios de Análise:

Arquitetura e Estrutura de Pastas: A organização faz sentido? É escalável? Segue padrões da comunidade (ex: Feature-based, Clean Architecture)?

Clean Code e SOLID: Identifique funções muito longas, variáveis mal nomeadas, acoplamento excessivo ou violações dos princípios SOLID.

Performance e Otimização: Existem renderizações desnecessárias, gargalos de banco de dados ou código bloqueante?

Segurança: Há vulnerabilidades expostas? (ex: Validação de inputs, exposição de chaves, tratamento de erros).

Documentação e DX (Developer Experience): O projeto é fácil de rodar por outro dev? O README está profissional? O código está bem comentado onde necessário?

Git e Histórico: (Se aplicável) A granularidade dos commits e o fluxo de trabalho parecem profissionais?

Formato da Saída: Por favor, estruture sua resposta como um Relatório de Code Review, contendo:

Visão Geral: Uma nota de 0 a 10 para o estado atual e uma breve impressão geral.

Pontos Fortes: O que já está bom e deve ser mantido.

Lista de Melhorias (Priorizada):

Crítico: O que deve ser mudado imediatamente (bugs, falhas de segurança, erros graves de arquitetura).

Importante: Melhorias de legibilidade, refatoração e boas práticas.

Desejável: Sugestões de "ouro" que impressionariam um recrutador sênior.

Sugestão de Refatoração: Escolha o trecho de código mais crítico e reescreva-o aplicando as correções sugeridas para que eu veja o "antes e depois".`
  },
  {
    id: 'role-play-design-consultant',
    title: 'Analise de Referencia e Comparativo',
    category: 'prompts',
    channel: CommunicationChannel.PROMPT,
    description: 'Atue como especialista em UX/UI e Frontend para auditoria visual e técnica.',
    content: `Você atuará como um Consultor Sênior em Design Digital, UX Strategy & Engenharia Front-end. Você é um especialista renomado em desconstrução de interfaces digitais, com foco em unir estética de alto nível (padrão Awwwards/FWA) com viabilidade técnica. Sua análise deve ser clínica, baseada em dados, psicologia cognitiva e expertise em código. Suas competências principais incluem engenharia reversa visual, psicologia da Gestalt e cores, design systems atômicos e performance (Core Web Vitals).

O objetivo da sua missão é realizar uma auditoria comparativa profunda (Benchmarking Técnico-Visual) entre referências de mercado e o projeto atual, visando transformar o projeto em uma experiência digital memorável, premiável e de alta conversão.

Para isso, siga uma metodologia de análise em quatro etapas. Primeiro, realize a Decodificação das Referências (Deep Dive): para cada URL fornecida, execute uma autópsia detalhada focada no visual e técnico. Analise o DNA visual e atmosfera (psicologia cromática, tipografia avançada, direção de arte e morfologia), a coreografia de interação (microinterações, scroll experience, transições de página e engenharia de animação) e a estrutura e layout (breakpoints, fluidez e espaço negativo).

Em segundo lugar, faça o Diagnóstico do Projeto Atual. Analise os inputs sob a ótica de Gap Analysis, identificando onde a hierarquia visual falha, se existem inconsistências no Design System, se a "vibração" da marca está alinhada com o público-alvo e quais são as limitações técnicas (considerando se é React, Next.js, etc.).

A terceira etapa é a criação de uma Matriz Comparativa de Competitividade. Crie uma tabela comparando o projeto atual versus a média das referências (escala 0-10) nos critérios: sofisticação visual, interatividade e delight, clareza de navegação, identidade única e potencial de "Uau".

Por fim, a quarta etapa é o Plano de Ação Técnico-Criativo. Gere recomendações divididas por complexidade, mas focadas em solução técnica. Nível 1 (Quick Wins): ajustes CSS imediatos, correções de contraste e acessibilidade. Nível 2 (Refinamento Estratégico): introdução de novos componentes, sugestões de bibliotecas específicas e melhoria de texturas. Nível 3 (Gold Standard): sugestões de WebGL/Shaders, mudança radical de direção de arte e narrativa imersiva.

Dados para a análise:
1. URLs de Referência (Benchmarks): [Insira Lista Aqui]
2. Sobre o Meu Projeto: URL/Imagens: [Link ou Descrição] | Stack Tecnológica: [Ex: Next.js, Tailwind] | Objetivo de Negócio: [Ex: Vender consultoria] | Público-Alvo: [Ex: Classe A, Jovens Tech] | Vibe Desejada: [Ex: Elegante, Tons Pastéis]

Diretrizes Finais: Seja crítico (não elogie o medíocre, aponte onde o design é genérico), seja técnico (ao sugerir uma animação, mencione propriedades como transform ou backdrop-filter) e organize a resposta para facilitar a leitura.`
  },
  {
    id: 'painel-especialistas',
    title: 'Sugestão de Melhoria',
    category: 'prompts',
    channel: CommunicationChannel.PROMPT,
    description: 'Análise 360º de projetos digitais cobrindo Engenharia, UX e Estratégia de Negócio.',
    content: `Atue como um Conselho de Especialistas Sênior composto por três perfis distintos: um CTO/Arquiteto de Software focado em escalabilidade, performance e boas práticas; um Lead Product Designer especializado em UX/UI moderno e design systems; e um Product Strategist orientado a visão de mercado, inovação e proposta de valor.

Sua missão é realizar uma análise estratégica tridimensional do material fornecido, garantindo que o relatório final seja estruturado, prático e priorizado para tomada de decisão imediata.

Na dimensão de Engenharia de Software e Arquitetura, avalie a adequação do padrão arquitetural, a coesão e acoplamento entre módulos e a estratégia de gerenciamento de estado. Verifique a qualidade do código observando a aderência aos princípios SOLID, DRY e KISS, além da complexidade ciclomática e clareza nas nomenclaturas. Analise a performance (Big-O, otimizações de renderização, cache) e a segurança (validação de inputs, OWASP Top 10 e gestão de secrets).

Na dimensão de Experiência do Usuário e Design, analise a consistência e escalabilidade do Design System (tokens, componentes), a conformidade com WCAG 2.1 para acessibilidade e a navegação intuitiva. Avalie a estética e sofisticação visual (harmonia cromática, tipografia, microinterações) e mapeie a jornada do usuário, identificando pontos de fricção e oportunidades de otimização de conversão.

Na dimensão de Estratégia de Produto e Inovação, identifique o fit de mercado e a proposta de valor única, analisando diferenciais competitivos. Avalie a escalabilidade do negócio e estratégias de crescimento, bem como o roadmap tecnológico, considerando débitos técnicos e integrações estratégicas.

Para a análise, utilize metodologias específicas: para código, faça análises estruturais e estáticas, revisando padrões e simulando cenários de uso; para design, utilize análise heurística, visual e de fluxo.

O resultado deve ser um relatório unificado que equilibre perfeição técnica com pragmatismo de negócio. Cada recomendação deve ser específica, acionável e mensurável, priorizando problemas críticos antes de melhorias incrementais.`
  },
  {
    id: 'analise-solicitacao-cliente',
    title: 'Resposta Sugestão de Melhoria',
    category: 'prompts',
    channel: CommunicationChannel.PROMPT,
    description: 'Prompt para análise de impacto, riscos e redação de resposta formal a solicitações de clientes.',
    content: `Chat, analise o e-mail abaixo considerando:

• Contexto do cliente
• Impacto operacional da solicitação
• Possíveis impactos técnicos (sistema, banco de dados, integrações, layout, regras de negócio)
• Priorização frente a demandas legais e projetos já planejados
• Risco regulatório, se houver
• Tom adequado (formal, técnico, cordial e institucional)

E-mail:
[Colar E-mail Aqui]

Após a análise, elabore uma resposta:

• Profissional e bem estruturada
• Demonstrando compreensão do cenário apresentado
• Indicando que a solicitação será encaminhada para análise técnica
• Alinhando expectativas quanto a prazos e priorizações
• Evitando prometer implementação
• Mantendo postura consultiva e estratégica
• Com encerramento cordial e abertura para próximos contatos

Utilize esse e-mail como exemplo de tom e estrutura:

"Bom dia, Sra. Rafaela.
Espero que esteja bem.
Agradeço pelo detalhamento da demanda e pelos esclarecimentos quanto à atualização da NR-01 e à necessidade de incorporação da Análise Ergonômica ao PGR.
Já encaminhei a solicitação para nossa equipe de desenvolvimento realizar uma análise técnica quanto à possibilidade de ampliação do limite de caracteres no campo “Fontes e Circunstâncias”, avaliando impactos estruturais e de banco de dados e layout de documentos, para possível implementação em uma futura atualização.
É importante alinhar que nosso cronograma do primeiro trimestre já está direcionado à conclusão de projetos previamente planejados e a atualizações legais prioritárias (como emissão de NF e adequações do eSocial), estamos tratando sua solicitação com atenção devido ao contexto regulatório apresentado.
Retornarei com um posicionamento mais concreto sobre a viabilidade técnica e os possíveis prazos de implementação. Caso seja necessário, também avaliaremos alternativas provisórias que permitam mitigar impactos operacionais enquanto a análise é concluída.
Seguimos à disposição e manteremos você informado(a) sobre os próximos passos."

Observações adicionais:
• Primeira linha após a saudação deve conter a análise resumida do cenário apresentado pelo cliente.
• Linguagem clara, objetiva e institucional.
• Evitar repetições.
• Não utilizar emojis.
• Estrutura semelhante a um e-mail corporativo formal.`
  },
  {
    id: 'dev-frontend-senior-ux-ui',
    title: 'Responsividade',
    category: 'prompts',
    channel: CommunicationChannel.PROMPT,
    description: 'Especialista em análise estrutural, responsividade e consistência visual.',
    content: `Você é uma IA atuando como Desenvolvedor Frontend Sênior + Especialista em UX/UI e Design Responsivo, com profundo domínio de HTML, CSS moderno (Flexbox, Grid, Container Queries), tipografia fluida, design systems e comportamento cross-resolution.

Seu objetivo é analisar integralmente este repositório/projeto frontend, identificar inconsistências estruturais e corrigir o código, garantindo coerência visual, previsibilidade de layout e responsividade sólida em todas as resoluções.

🔍 1. Análise Estrutural do Layout

Analise profundamente:

Uso inconsistente de:

px vs rem vs em vs vw/vh

larguras fixas (width: 1200px, 100vw mal aplicado, etc.)

Containers que:

Quebram em resoluções menores

Mudam de posição inesperadamente

Dependem excessivamente de position: absolute

Falta de hierarquia clara entre:

Layout global (wrapper, sections, grids)

Componentes internos

📌 Aja assim:

Padronize a estrutura base do layout

Centralize a lógica de largura máxima (max-width)

Elimine dependências frágeis de posição

📐 2. Proporção Visual e Consistência Dimensional

Identifique e corrija:

Componentes com proporções diferentes sem justificativa de UX

Espaçamentos incoerentes entre seções

Alturas forçadas (height: 100vh) que causam cortes

Elementos que “pulam” de lugar entre resoluções

📌 Aja assim:

Normalize espaçamentos com uma escala consistente (ex: múltiplos de 4 ou 8)

Use min-height em vez de height quando aplicável

Garanta que elementos mantenham proporção estável em diferentes breakpoints

📱 3. Responsividade Real (Não Apenas Breakpoints)

Avalie o comportamento do site em:

Mobile (360px – 480px)

Tablet (768px – 1024px)

Desktop comum (1366px – 1440px)

Monitores grandes (1600px – 1920px+)

Identifique:

Elementos que mudam de lugar sem intenção clara

Layouts que “esticam” ou “afundam”

Dependência excessiva de media queries tradicionais

📌 Aja assim:

Priorize layouts fluidos

Use clamp() para tamanhos de fonte e espaçamento

Utilize CSS Grid e Flexbox de forma semântica

Aplique Container Queries, se fizer sentido

✍️ 4. Tipografia e Escala Fluida

Revise:

Tamanhos de fonte inconsistentes

Quebras de linha diferentes conforme resolução

Falta de relação entre título, subtítulo e corpo

📌 Aja assim:

Crie uma escala tipográfica fluida

Utilize clamp() para títulos e textos

Garanta legibilidade em qualquer viewport

🧠 5. Previsibilidade de Comportamento

Garanta que:

O layout não mude drasticamente ao trocar de monitor

A hierarquia visual permaneça clara

Componentes se comportem da mesma forma em contextos diferentes

📌 Aja assim:

Refatore componentes instáveis

Centralize regras de layout repetidas

Documente decisões estruturais importantes

🛠️ 6. Correção Direta no Código

⚠️ Não apenas aponte problemas.
Você deve:

Corrigir o código diretamente

Sugerir refatorações quando necessário

Manter o layout atual o mais próximo possível visualmente, melhorando sua estabilidade e consistência

📦 7. Entrega Esperada

Ao final, entregue:

Lista clara de problemas encontrados

Código corrigido/refatorado

Explicação objetiva do que foi alterado e por quê

Sugestões futuras de melhoria (opcional)`
  },
  {
    id: 'engenharia-reversa-ui-code',
    title: 'Engenharia Reversa de UI & Código',
    category: 'prompts',
    channel: CommunicationChannel.PROMPT,
    description: 'Transforma referências visuais em código React/Tailwind/Framer Motion otimizado.',
    content: `Você é um Arquiteto de Software Frontend & Diretor de Arte Digital Sênior, especializado em implementar interfaces de classe mundial (Awwwards/FWA) utilizando React, Tailwind CSS e Framer Motion. Sua habilidade única é a "Engenharia Reversa Visual": você olha para referências de design, extrai seus princípios fundamentais (física de movimento, glassmorphism, tipografia, grid) e os traduz imediatamente em código de produção limpo, performático e acessível.

Seu objetivo: Analisar uma lista de referências visuais (URLs/Descrições) e o meu código atual, identificar o "Gap de Sofisticação" e reescrever meu código para atingir aquele nível de qualidade visual e técnica.

---

### 🔬 FASE 1: Decodificação da Referência (O Olhar do Designer)
Para cada referência fornecida, não descreva apenas o que vê. Analise COMO foi feito tecnicamente.
1.  **DNA Visual:** Identifique a paleta (HSL/RGB), a tipografia (Serifa vs Sans, line-heights agressivos), e o uso de espaço negativo.
2.  **Física da Interface:** Analise as curvas de animação (Bezier curves), a profundidade (blur, shadows, camadas) e texturas (noise, gradients).
3.  **Estrutura DOM:** Como o layout se comporta? É um Bento Grid? Scroll Parallax? Sticky Headers complexos?

### 🧠 FASE 2: Análise de Gap Técnico (O Olhar do Engenheiro)
Compare as referências com o código do meu projeto atual (fornecido no contexto).
1.  **Onde meu código falha?** (Ex: "Suas sombras são padrão do Tailwind \`shadow-lg\`, mas a referência usa sombras coloridas difusas em camadas").
2.  **Inconsistências:** (Ex: "Você mistura \`px\` e \`rem\`, enquanto a referência usa uma escala fluida baseada em \`clamp()\`").
3.  **Oportunidades de Refatoração:** Onde podemos substituir \`useEffect\` complexos por animações declarativas do Framer Motion (\`layoutId\`, \`AnimatePresence\`)?

### 🛠️ FASE 3: Implementação & Código (A Mão na Massa)
Esta é a parte mais importante. Não me dê conselhos abstratos. **Escreva o código.**

**Regras de Implementação:**
*   **Stack:** Use estritamente React (Functional Components), Tailwind CSS (com utilitários arbitrários \`w-[32rem]\` se necessário para precisão) e Framer Motion para interações.
*   **Estética:** Se a referência é "Glassmorphism", implemente camadas reais de backdrop-blur, bordas translúcidas (\`border-white/20\`) e noise textures.
*   **Responsividade:** O código DEVE ser mobile-first. Use classes como \`lg:hover:...\` para evitar hover em touch devices.
*   **Acessibilidade:** Garanta contraste, \`aria-labels\` e foco visível.

---

### 📥 INPUTS PARA ANÁLISE:
1.  **Referências (Benchmarks):** [Cole aqui as URLs ou descreva o estilo desejado, ex: "Estilo Linear.app", "Estilo Apple Bento Grid"]
2.  **Contexto do Projeto:** O código atual já foi fornecido. O foco é melhorar [Especifique: "A Sidebar", "O Card de Edição", "A Tipografia Geral"].

### 📤 SAÍDA ESPERADA:
1.  **Diagnóstico Rápido:** 3 pontos cruciais que vamos mudar.
2.  **Código Refatorado:** Entregue o(s) componente(s) completo(s). Não use comentários como "// ...resto do código". Escreva o componente inteiro para que eu possa copiar e colar.
3.  **Explicação Técnica:** "Mudei de \`div\` absoluta para \`motion.div\` com \`layoutId\` para garantir que a transição entre abas seja fluida como na referência X".

**Aguardando suas referências para iniciar a transformação.**`
  },
  {
    id: 'dev-motion-revisao',
    title: 'Refinamento de Animações',
    category: 'prompts',
    channel: CommunicationChannel.PROMPT,
    description: 'Revisão completa de projeto focada em animação, física e microinterações.',
    content: `Você é um Lead Creative Technologist premiado (Awwwards/FWA), especializado em WebGL, Creative Coding e Sistemas de Design Interativos.

Objetivo: Transformar o projeto atual em uma experiência imersiva de alto nível. Você não vai apenas "animar", você vai implementar um Ecossistema de Movimento baseado em física.

Sua Missão (Execute nesta ordem):

🔍 FASE 1: Auditoria Cirúrgica e Limpeza
Scan de Dependências: Analise o package.json. Identifique bibliotecas de animação obsoletas ou conflitantes e marque para remoção.

Scan de Performance: Identifique CSS que causa Layout Thrashing (ex: animar top/left/width em vez de transform).

Verificação de Estrutura: Entenda como o layout é renderizado (SSR, SPA, Static) para escolher a estratégia de inicialização do scroll.

📦 FASE 2: Setup da Stack "Awwwards" (NPM Action)
Você tem autonomia para definir a stack. O padrão esperado para este nível de qualidade é:

Scroll Engine: Lenis (Prioridade máxima por ser leve e nativo) OU Locomotive Scroll v4 (apenas se precisar de efeitos de distorção específicos). Não use scroll nativo.

Animation Engine: GSAP (GreenSock). Instale o core + ScrollTrigger.

Text Reveal: Se houver textos de destaque, instale uma utilidade para separar caracteres/palavras (como splitting.js ou scripts customizados leves) para animações de texto.

AÇÃO: Gere e execute (ou forneça para eu executar) o comando único de instalação. Exemplo esperado: npm install gsap @studio-freight/lenis splitting

🧬 FASE 3: Arquitetura do "Smooth Wrapper"
Não anime componentes isoladamente ainda.

Crie/Refatore um componente global (ex: SmoothScrollLayout ou PageWrapper).

Inicialize o Lenis neste wrapper.

Crucial: Configure o loop de requestAnimationFrame (raf) para sincronizar o Lenis com o ScrollTrigger do GSAP. Sem isso, o ScrollTrigger quebra.

Defina um damping (amortecimento) entre 0.05 e 0.1 para criar aquela sensação de "peso" e luxo.

🎬 FASE 4: Implementação Coreográfica (Physics-Based)
Ao refatorar os componentes, siga estas leis:

Lei da Inércia: Nada para instantaneamente. Use ease: "power3.out" ou ease: "expo.out" para entradas.

Lei do Ritmo: Use stagger (0.1s a 0.2s) em listas e grids. O conteúdo deve "fluir" para a tela, não "aparecer".

Lei da Profundidade (Parallax): Imagens de fundo devem mover-se 10-20% mais devagar que o scroll (yPercent: 20).

Microinterações Magnéticas: Botões importantes devem ter uma área de atração ou escala suave baseada na posição do mouse.

🛡️ FASE 5: Polimento e Proteção
Mobile Guard: Desative efeitos pesados de WebGL ou Parallax excessivo em touch devices se a performance cair abaixo de 55fps.

Accessibility: Respeite prefers-reduced-motion. Se o usuário tiver isso ativo, desligue o smooth scroll e use opacity simples em vez de movimentos.

📝 Output Obrigatório
Não me pergunte o que fazer. Faça e me mostre.

Comando de Terminal: O script exato para limpar o lixo e instalar a nova stack.

Código do Provider/Wrapper: O arquivo onde o Lenis e o GSAP se conectam.

Exemplo de Componente Refatorado: Escolha a "Hero Section" ou um "Card Grid" atual e reescreva o código aplicando as regras de física acima.

Justificativa Técnica: Explique brevemente por que escolheu valores específicos de damping ou easing.

Inicie a auditoria agora.`
  },
  {
    id: 'navbar-inteligente-scroll',
    title: 'Navbar Inteligente (Scroll Aware)',
    category: 'prompts',
    channel: CommunicationChannel.PROMPT,
    description: 'Prompt para criar uma barra de navegação que se oculta ao rolar para baixo e reaparece ao subir.',
    content: `Atue como um Especialista em Frontend e UX Design com foco em React/Next.js e Tailwind CSS.

Objetivo: Criar uma experiência de navegação fluida e não intrusiva para um site moderno. Preciso de uma Navbar inteligente que maximize a área de leitura do usuário, mas mantenha a navegação acessível quando necessário.

Regras de Comportamento (UX/UI):
1. Ocultação Automática (Focus Mode): Quando o usuário demonstrar intenção de leitura rolando a página para baixo (scroll down), a barra de navegação deve deslizar suavemente para fora da tela (para cima, transform: translateY(-100%)) para limpar a visualização.
2. Recuperação Rápida (Navigation Mode): Assim que o usuário rolar minimamente para cima (intenção de voltar ou navegar), a barra deve deslizar de volta para a tela fixada no topo imediatamente.
3. Estado Inicial: No topo da página (scrollY = 0), a navbar deve estar sempre visível.

Instruções de Implementação Técnica:
- Framework: React ou Next.js.
- Estilização: Tailwind CSS.
- Animação: Use classes de transição (transition-transform duration-300 ease-in-out) para garantir suavidade na entrada e saída.
- Lógica de Estado: Crie um hook customizado (ex: useScrollDirection) que detecte a direção do scroll (UP/DOWN) e a posição atual para controlar a classe CSS de visibilidade.
- Performance: Otimize o listener de scroll (ex: throttle ou requestAnimationFrame) para evitar problemas de performance na thread principal.

Entregável:
Por favor, forneça o código completo do componente 'Navbar.tsx' e, se necessário, o hook auxiliar, prontos para copiar e colar.`
  },
  {
    id: 'footer-premium-dark',
    title: 'Criação de Footer (Premium Dark)',
    category: 'prompts',
    channel: CommunicationChannel.PROMPT,
    description: 'Prompt para criação de um rodapé sofisticado com textura de ruído e tipografia editorial.',
    content: `Atue como um Especialista em Front-end (React/Tailwind) e UI Design.

Objetivo: Crie um componente de Footer sofisticado, escuro e minimalista, replicando uma estética "premium" específica.

Stack Tecnológica:
- React (TypeScript)
- Tailwind CSS
- Lucide React (para ícones)

Requisitos Visuais e de Design:

1. Fundo e Textura:
- Use uma cor de fundo muito escura (quase preta), mas com tom quente (ex: stone-950 do Tailwind).
- CRUCIAL: Adicione uma camada absoluta (absolute inset-0) com uma textura de ruído (noise) usando um SVG inline (feTurbulence) e mix-blend-overlay com opacidade baixa (ex: 0.05 ou 0.07). Isso é essencial para o visual "orgânico".

2. Tipografia de Fundo (Background Typography):
- Adicione um texto decorativo gigante no fundo, alinhado na parte inferior.
- Deve usar uma fonte Serif elegante.
- Tamanho massivo (ex: text-[12vw] a text-[18vw]).
- Opacidade muito baixa e cor escura para se fundir ao fundo.
- pointer-events-none e select-none.

3. Layout (Grid):
- Container principal centralizado (max-w-screen-2xl).
- Grid responsivo: 1 coluna no mobile, 2 no tablet, 4 no desktop.
- Bordas sutis separando as colunas (cor escura, ex: stone-800).

4. Conteúdo das Colunas:
- Col 1 (Identidade): Título grande Serif ("Brand Name") + Subtítulo ou slogan itálico.
- Col 2 (Local/CTA): Texto descritivo e um botão/link com ícone (ex: seta) para contato.
- Col 3 (Social): Links com ícones (Instagram, WhatsApp, etc.) e hover que muda a cor para branco.
- Col 4 (Menu/Créditos): Links de navegação verticais com efeito de hover (translate-x) e créditos do desenvolvedor no final.

5. Tipografia:
- Use uma fonte Serif (como Playfair Display) para títulos e destaques.
- Use uma fonte Sans (como Inter) para textos de apoio e links.
- Use uppercase, tracking-widest e tamanhos pequenos (text-xs) para rótulos (labels).

Entregáveis:
- O código completo do componente Footer.tsx.
- Instruções de importação das fontes (Google Fonts) e instalação de ícones (npm install lucide-react).
- O trecho necessário do tailwind.config.js para estender as cores (palette stone) se necessário.`
  },

  // --- MÓDULO: TREINAMENTO ---

  /*
  {
    id: 'comunicado-manutencao-condicional',
    title: 'Comunicado de Manutenção (Dinâmico)',
    category: 'operational',
    channel: CommunicationChannel.EMAIL,
    subject: '[IF:Urgente=Sim]URGENTE: [/IF]Manutenção Programada - [Sistema]',
    description: 'E-mail de manutenção que muda o tom e conteúdo se for marcado como urgente.',
    content: `Prezados, [Saudação].

[IF:Urgente=Sim]**ESTE É UM COMUNICADO DE ALTA PRIORIDADE.**[/IF]

Informamos que o sistema [Sistema] passará por uma manutenção no dia [Data].

[IF:Urgente=Sim]Devido à natureza crítica desta atualização, o acesso será interrompido imediatamente após o horário de início.[/IF]
[IF:Urgente!=Sim]A manutenção será realizada fora do horário de pico para minimizar impactos.[/IF]

**Detalhes:**
• Início: [Horário Início]
• Previsão de Término: [Horário Fim]
• Duração Estimada: [Duração]

[IF:Urgente=Sim]Pedimos que salvem todos os trabalhos pendentes agora.[/IF]

Agradecemos a compreensão.
Atenciosamente,
Equipe de TI`,
    secondaryLabel: 'Aviso WhatsApp',
    secondaryContent: `[IF:Urgente=Sim]🚨 *URGENTE:* [/IF]Manutenção no [Sistema] hoje às [Horário Início]. Previsão de retorno: [Horário Fim].`
  },
  */
  {
    id: 'material-download-treinamento',
    title: 'Envio de Material (Download)',
    category: 'deployment',
    channel: CommunicationChannel.EMAIL,
    subject: '[Empresa] | Material para Download do Treinamento',
    description: 'E-mail para envio do link de gravação ou material de apoio.',
    content: `Prezados, bom dia.
Conforme alinhado, segue o link para download do material de treinamento: [Acesse o material completo do treinamento aqui]([Link do Material]). 

Pedimos, por gentileza, que confirmem o recebimento deste e-mail e nos avisem caso encontrem qualquer dificuldade para acessar o conteúdo.
Ficamos à disposição para quaisquer esclarecimentos adicionais.
Agradecemos a confiança e a escolha da Wise System como sua parceira em soluções tecnológicas.`
  },
  {
    id: 'boas-vindas-implantacao',
    title: 'Boas-Vindas (Implantação)',
    category: 'deployment',
    channel: CommunicationChannel.EMAIL,
    subject: '[Empresa] | Sejam Bem-Vindos',
    description: 'E-mail inicial de introdução do processo de implantação do sistema.',
    content: `[Empresa]
A/C: [Nome do Cliente]

[Saudação] Sr(a). [Nome do Cliente],

Espero que estejam bem.

Meu nome é [Seu Nome] e serei o responsável por iniciar as etapas de implantação do sistema Sigo na sua empresa.

Em nome de toda a equipe da Wise System, gostaria de dar as "Boas-Vindas" e expressar nosso desejo de que esta parceria seja duradoura e repleta de sucesso. Agradecemos pela preferência em escolher o sistema Sigo como a plataforma de gestão para sua empresa.

Nos próximos e-mails, tratarei com o senhor sobre as seguintes etapas:

*• Homologação de sua conta bancária no sistema para a geração de Boleto/CNAB;*
*• Agendamento dos treinamentos para o uso do sistema Sigo.*

Peço gentilmente que aguarde meu próximo contato, onde daremos continuidade ao processo de implantação.

Novamente, sejam bem-vindos e não hesite em me procurar para qualquer necessidade ou dúvida que possa surgir.`
  },
  {
    id: 'solicitacao-dados',
    title: 'Solicitação de Dados Cadastrais',
    category: 'deployment',
    channel: CommunicationChannel.EMAIL,
    subject: '[Empresa] | Cadastro de Supervisor e Suplente',
    description: 'Coleta de dados de novos supervisores ou suplentes durante a implantação.',
    content: `[Empresa]
A/C: [Nome do Cliente]

[Saudação], [Nome],

Para finalizarmos o cadastro no sistema, preciso dos dados do seu suplente/supervisor:

• Nome completo:
• Setor/Função:
• E-mail Corporativo:
• Telefone/WhatsApp:

É fundamental que ambos participem dos treinamentos agendados para garantir o uso correto da plataforma.

Atenciosamente,`
  },
  {
    id: 'resumo-treinamentos',
    title: 'Resumo de Treinamentos Realizados',
    category: 'deployment',
    channel: CommunicationChannel.EMAIL,
    subject: '[Empresa] | Resumo dos Treinamentos Realizados',
    description: 'E-mail de formalização das horas e conteúdos ministrados durante a implantação.',
    content: `[Saudação], Sra. [Nome do Cliente]!

Espero que estejam bem!

Gostaria de compartilhar um resumo do nosso treinamento. A grade de treinamentos foi personalizada de acordo com as necessidades específicas da equipe. Nosso principal objetivo foi garantir que a maioria das dúvidas fossem sanadas e que auxiliássemos no uso do sistema.

Abaixo, segue o detalhamento dos treinamentos realizados:

*Fase: Técnico*
Conteúdo: Psicossocial, Gerenciamento de Riscos
Data: [Data] | Horário: [Horário Início] às [Horário Fim]
Carga Horária: [Carga Horária]

*Fase: Atendimento*
Conteúdo: Módulo de Atendimentos
Data: [Data] | Horário: [Horário Início] às [Horário Fim]
Carga Horária: [Carga Horária]

*Fase: Financeiro*
Conteúdo: Comercial, Parametrização de Cobrança, Cadastro de Funcionários
Data: [Data] | Horário: [Horário Início] às [Horário Fim]
Carga Horária: [Carga Horária]

*Resumo Geral:*
• Total de horas utilizadas: [Total de Horas]

Para acessar as gravações dos treinamentos, clique no link abaixo:
[Link das Gravações]

Caso haja necessidade de novos treinamentos, seja para aprofundamento de conteúdo ou retirada de mais dúvidas, estamos à disposição.

Reforço ainda meu compromisso contínuo com a [Empresa]. Por favor, não hesite em me acionar sempre que precisar.`
  },

  // --- MÓDULO: AGENDAMENTO ---

  {
    id: 'agendamento-fase1-protocolo',
    title: 'Agendamento + Protocolo (Fase Variável)',
    category: 'scheduling',
    channel: CommunicationChannel.EMAIL,
    subject: '[Nome da Empresa] | Treinamento Online do Software Sigo (Fase [Fase])',
    description: 'Modelo ajustável para agendamento de treinamento e criação de protocolo interno.',
    content: `Prezados, [Saudação]!

Espero que estejam bem.

Conforme combinado, segue agendado o *Treinamento Online do Software Sigo (Fase [Fase])* para a empresa *[Nome da Empresa]*, conforme programação abaixo, o qual será ministrado pelo nosso Consultor: *[Nome do Consultor]*.

O treinamento será realizado através da plataforma Google Meet, pelo o seguinte link:
[Link da Reunião]

\t*[Data] » [Horário Início] às [Horário Fim] – Duração [Duração]*

\t*[Módulos]*

No anexo seguem os seguintes documentos:

\t*• Fase [Fase] - Cronograma de Treinamento Sigo*
\tRefere-se ao Cronograma com o conteúdo que será ministrado pelo nosso Consultor, com a recomendação dos departamentos de sua empresa que deverão ser envolvidos na capacitação.

\t*• Ordem de Serviço nº [Número OS] - A - Sigo*
\tApós conclusão do treinamento, peço gentilmente que imprima, preencha e me devolva essa Ordem de Serviço digitalizada, por e-mail.

\t*• Requisição de Dados para Cadastro - Fase [Fase] - Treinamento Sigo*
\tRefere-se aos dados importantes de serem reservados para serem utilizados no momento do treinamento.`,
    secondaryLabel: 'Protocolo Interno (W-GSC)',
    secondaryContent: `Olá, Prezados,
 
Para ciência e providências, informamos que foi criada no W-GSC uma tarefa para que seja ministrado o Treinamento Online do sistema Sigo à empresa *[Nome da Empresa]* (Fase [Fase]), conforme programação abaixo:
 
\t*[Data] » [Horário Início] às [Horário Fim] – Duração [Duração]* 

\t*[Módulos]*
 
O treinamento será realizado através da plataforma Google Meet, pelo o seguinte link: 

[Link da Reunião]
 
Após concluir o treinamento, é obrigatório preencher o campo de “providências” da Tarefa, dando os devidos feedbacks, bem como, encerrar a tarefa.`
  },
  {
    id: 'reuniao-boas-vindas',
    title: 'Reunião de Boas-Vindas (Kick-off)',
    category: 'scheduling',
    channel: CommunicationChannel.EMAIL,
    subject: '[Empresa] | Implantação do Software Sigo (Boas-Vindas)',
    description: 'Agendamento da reunião inicial de alinhamento e boas-vindas ao cliente.',
    content: `Sr(a). [Nome do Cliente], [Saudação],

Espero que esteja bem!

Serei o responsável por iniciar as etapas de implantação do sistema Sigo na [Empresa].

Em nome de toda a equipe da Wise System, gostaria de dar as "Boas-Vindas" e expressar nosso desejo de que esta parceria seja duradoura e repleta de sucesso. Agradecemos pela preferência em escolher o sistema Sigo como a plataforma de gestão para sua empresa.

Conforme solicitado, gostaria de confirmar o agendamento da data e horário marcados para a nossa Reunião por Videoconferência, que acontecerá na [Dia da Semana], [Data] às [Horário], horário de Brasília.

A reunião será realizada através da plataforma Google Meet, pelo o seguinte link: [Link da Reunião]

Nos próximos e-mails, tratarei com o senhor sobre a seguinte etapa:
•	Agendamento dos treinamentos para o uso do sistema Sigo.

Novamente, sejam bem-vindos e não hesite em me procurar para qualquer necessidade ou dúvida que possa surgir.`,
    secondaryLabel: 'E-mail Interno',
    secondaryContent: `Prezados, [Saudação].

Espero que estejam bem.

Conforme alinhado com nosso mais novo cliente, [Empresa], gostaria de notificá-los sobre a nossa reunião.

Segue orientação sobre os pontos importantes desta reunião de Boas-Vindas:
•	Ela deve ocorrer na sala de treinamento
•	Utilizar a TV e a câmera de ambiente disponível na sala
•	Todas as luzes da empresa devem estar ligadas
•	É necessário estarem bem trajados para causar uma boa impressão
•	Como a câmera transmitirá também a imagem do suporte técnico, recomendo que comunique à equipe para que haja cuidado em relação à postura no setor

Fico à disposição caso precise de qualquer apoio adicional.`
  },
  {
    id: 'reuniao-comum',
    title: 'Reunião de Alinhamento',
    category: 'scheduling',
    channel: CommunicationChannel.EMAIL,
    subject: '[Nome da Empresa] | Alinhamento da Reunião',
    description: 'Confirmação de videoconferências com data por extenso.',
    content: `[Saudação], [Nome do Cliente],

Espero que esteja bem!

Conforme combinado, gostaria de confirmar a data e horário marcados para a nossa *Reunião por Videoconferência*, que acontecerá na *[Data Extenso], às [Horário],* horário de Brasília.

Fico à disposição caso precise de qualquer apoio adicional.

A reunião será realizada através da plataforma Google Meet, pelo o seguinte link: 
[Link da Reunião]`
  },

  /*
  // --- MÓDULO: OPERACIONAL ---
  {
    id: 'planilha-desempenho',
    title: 'Planilha de Avaliação de Desempenho',
    category: 'operational',
    channel: CommunicationChannel.WHATSAPP,
    description: 'Frases padronizadas para preenchimento de avaliação de desempenho (Positivo, Negativo e Neutro).',
    content: `---
[CENÁRIO: Não houve fila de espera (Positivo)]
O colaborador manteve os atendimentos em fluxo contínuo, evitando interrupções e assegurando a ausência de fila de espera. Essa conduta contribuiu diretamente para a fluidez do atendimento e para a eficiência da operação.

---
[CENÁRIO: Clientes demoraram na fila (Negativo)]
A ausência de atuação efetiva resultou em aumento do tempo de espera dos clientes, impactando negativamente o fluxo operacional e comprometendo a fluidez e a eficiência do atendimento.

---
[CENÁRIO: Proatividade (Positivo)]
O colaborador demonstrou proatividade e comprometimento ao realizar contato para acompanhamento de um caso já em andamento, mesmo sem necessidade de cobrança, além de atender prontamente à solicitação recebida, contribuindo para a agilidade e qualidade do atendimento.

---
[CENÁRIO: Boa execução das tarefas (Positivo)]
O colaborador demonstrou comprometimento com suas atribuições, executando as tarefas com consistência, foco e responsabilidade. Essa postura contribui para a evolução das atividades e fortalece a confiança da equipe quanto à entrega e adaptação às demandas da operação.

---
[CENÁRIO: Auxílio a colegas (Positivo)]
O colaborador demonstrou iniciativa e colaboração ao auxiliar colegas de forma espontânea, com escuta ativa e orientações adequadas, contribuindo para a correta condução dos casos e evitando a disseminação de informações incorretas.

---
[CENÁRIO: Dia comum (Neutro)]
O colaborador executou as tarefas designadas de forma adequada, mantendo postura colaborativa e atendendo às demandas do dia conforme o esperado para a função.

---
[CENÁRIO: Descaso com atendimento (Negativo)]
O colaborador demonstrou baixo engajamento no esclarecimento das dúvidas do cliente, realizando uma sondagem insuficiente, o que gerou insegurança e frustração. Essa conduta impacta negativamente a experiência do cliente e não está alinhada às boas práticas operacionais.

---
[CENÁRIO: Feedback Negativo de Cliente]
O colaborador recebeu feedback negativo da cliente [Nome Cliente Negativo], da empresa [Empresa], relacionado à ausência de retorno durante o atendimento. A situação demonstra falha no acompanhamento e falta de alinhamento com as práticas da empresa, gerando impacto negativo na percepção do cliente e na reputação da organização.

---
[CENÁRIO: Feedback Positivo de Cliente]
O colaborador demonstrou excelência no atendimento prestado à [Nome Cliente Positivo], da empresa [Empresa Positiva], conforme protocolo nº [Protocolo]. O registro evidencia cordialidade, clareza nas orientações e eficiência na resolução da demanda, reforçando o alinhamento com os padrões de qualidade do atendimento ao cliente.

---
[CENÁRIO: Atraso Antes de 15(Negativa)]
O colaborador apresentou atraso de poucos minutos, inferior a 15 minutos; contudo, em razão da reincidência, o fato foi pontuado. Ressalta-se que esse tipo de conduta, se não devidamente tratado, pode gerar comportamentos inadequados, em desacordo com as políticas da empresa.

---
[CENÁRIO: Colaborador < 6 (Negativa)]
Referente ao protocolo nº [Protocolo], observa-se falta de conhecimento técnico e de iniciativa por parte do colaborador em buscar aprendizado. Ao longo do atendimento com a líder, foi perceptível o desinteresse do colaborador em sondar adequadamente a situação e em prestar suporte efetivo à cliente, limitando-se a repassar informações de forma inadequada. Diante disso, foi necessária minha intervenção no atendimento, a fim de assegurar que as informações fossem transmitidas com clareza.

---
[CENÁRIO: Orientação Incorreta Durante Atendimento]
A colaboradora forneceu uma série de orientações incorretas relacionadas ao caso da Meyer, o que tornou necessário o acionamento de um Analista N2 para prestar suporte na tratativa. Essa situação resultou em desperdício de recursos e aumento no tempo de atendimento.`
  },
  {
    id: 'aviso-atraso',
    title: 'Report de Atraso (WhatsApp)',
    category: 'operational',
    channel: CommunicationChannel.WHATSAPP,
    description: 'Mensagem rápida para informar atrasos de colaboradores.',
    content: `[Saudação], [Nome do Gestor],
Espero que esteja bem.

Para ciência, informo que o(a) colaborador(a) [Nome], chegou atrasado(a) nesta data [Data Hoje] por volta das [Horário Chegada]. O horário padrão é [Horário Padrão].

Justificativa apresentada: [Motivo].`,
    secondaryLabel: 'Registro de Ponto/Planilha',
    secondaryContent: `O colaborador chegou atrasado nesta data [Data Hoje] por volta das [Horário Chegada], o horário de entrada dele é as [Horário Padrão]. Me justificou informando que o atrasado devido [Motivo].`
  },
  {
    id: 'report-falta',
    title: 'Report de Falta (Ausência)',
    category: 'operational',
    channel: CommunicationChannel.WHATSAPP,
    description: 'Comunicado formal de ausência do colaborador para a gestão.',
    content: `[Saudação], [Nome do Gestor],
Espero que esteja bem.

Para sua ciência, informo que o(a) colaborador(a) [Nome do Colaborador] não compareceu ao trabalho na data de hoje [Data da Falta].

Segundo informações prestadas: [Motivo/Justificativa].

Dessa forma, o(a) colaborador(a) seguirá afastado(a), com previsão de retorno para [Data de Retorno].`,
    secondaryLabel: 'Registro de Ponto/RH',
    secondaryContent: `O(A) colaborador(a) [Nome do Colaborador] faltou na data de [Data da Falta].
Motivo: [Motivo/Justificativa].
Previsão de retorno: [Data de Retorno].`
  },
  {
    id: 'atencao-sincro-conversa',
    title: 'Aviso: Conversas Presas (Sincro)',
    category: 'operational',
    channel: CommunicationChannel.WHATSAPP,
    description: 'Alerta para a equipe não deixar conversas selecionadas/presas no sistema ao sair.',
    content: `Equipe, bom dia,

Espero que todos estejam bem!

Mais uma vez, gostaria de reforçar a importância da atenção ao deixar o posto de trabalho. Peço, por gentileza, que verifiquem sempre se não há nenhuma conversa selecionada no Sincro antes de se ausentarem.

Quando um colaborador sai do posto e deixa uma conversa aberta, os demais não conseguem prestar suporte ao cliente caso ele retorne com alguma dúvida ou solicitação.

Peço um pouco mais de atenção [Nome do Colaborador] e conto com a colaboração de todos para evitar esse tipo de situação.`
  },
  {
    id: 'homologacao-nf',
    title: 'Cobrança de Homologação (NF/Boleto)',
    category: 'operational',
    channel: CommunicationChannel.EMAIL,
    subject: 'Urgente | Homologação de Nota Fiscal - [Empresa]',
    description: 'Cobrança formal para agilizar processos financeiros pendentes.',
    content: `[Empresa]
A/C: [Nome do Responsável]

[Saudação],

Peço, por gentileza, prioridade na homologação da Nota Fiscal e Boleto Bancário referente à unidade [Unidade].

Geramos o Protocolo nº [Número] no sistema. Dado o prazo apertado, solicito que realize as etapas de validação o quanto antes.

Fico no aguardo da confirmação.`
  },

  // --- MÓDULO: RELACIONAMENTO ---
  {
    id: 'lembrete-reuniao',
    title: 'Lembrete Amigável (WhatsApp)',
    category: 'relationship',
    channel: CommunicationChannel.WHATSAPP,
    description: 'Mensagem curta e amigável para lembrar de compromissos.',
    content: `Olá [Nome], tudo bem?

Passando apenas para lembrar da nossa reunião de hoje às [Horário] sobre [Assunto].

Nos vemos em breve!`
  },
  {
    id: 'retorno-sugestao',
    title: 'Retorno sobre Sugestões de Melhoria',
    category: 'relationship',
    channel: CommunicationChannel.EMAIL,
    subject: '[Empresa] | Recebimento de Sugestões',
    description: 'Resposta padrão para sugestões de clientes, gerenciando expectativas de prazo.',
    content: `[Saudação], [Nome do Cliente].

Espero que esteja bem.

Agradeço o encaminhamento das sugestões. Já direcionei os pontos para nossa equipe técnica realizar a análise de viabilidade e, à medida que houver avanços na avaliação, retornarei com as atualizações.

É importante alinhar que, atualmente, nosso cronograma de desenvolvimento para o primeiro trimestre já está comprometido com a implementação de recursos iniciados no ano anterior, além de atualizações críticas (como emissão de NF e certificações do eSocial). Por este motivo, a aprovação de novas demandas pode não ocorrer de imediato.

Agradeço a compreensão e permaneço à disposição para receber novas contribuições.`
  },
  {
    id: 'feedback-negativo-candidato',
    title: 'Feedback Negativo (Processo Seletivo)',
    category: 'relationship',
    channel: CommunicationChannel.WHATSAPP,
    description: 'Retorno para candidatos não selecionados no processo seletivo.',
    content: `Olá, *[Nome do Candidato]*,
 
Agradecemos sinceramente por sua participação no processo seletivo para *Estagio* na vaga de *Atendente de Suporte Técnico* na Wise System.

 
Após uma análise criteriosa, informamos que, neste momento, *você não foi selecionado para a próxima etapa*. Sabemos que essa não é a notícia esperada, mas reforçamos que sua candidatura foi avaliada com atenção e respeito.
 
Reconhecemos seu potencial e incentivamos que continue se desenvolvendo, pois novas oportunidades certamente virão. Ficaremos felizes em considerar seu perfil em futuras seleções.
 
Desejamos muito sucesso em sua trajetória!`
  },
  {
    id: 'convite-entrevista',
    title: 'Convite para Entrevista (Presencial)',
    category: 'relationship',
    channel: CommunicationChannel.WHATSAPP,
    description: 'Mensagem de convite para entrevista presencial com detalhes da vaga.',
    content: `Olá, *[Nome do Candidato]*

Somos a *Wise System*, empresa líder no desenvolvimento de software para Saúde e Segurança do Trabalho. Buscamos *Estagiário(a)* para vaga de *Atendente de Suporte Técnico* para integrar nosso time de suporte e auxiliar clientes no uso do *Sigo – Sistema Integrado de Gestão Ocupacional*, um software inovador no mercado.

Se você é dinâmico, proativo e gosta de desafios, essa vaga é para você!

Caso tenha interesse em participar do processo seletivo e concorrer à vaga, solicitamos a gentileza de confirmar ainda hoje sua presença para a entrevista presencial que será realizada na data, horário e local abaixo:

• *Data:* [Data da Entrevista]
• *Horário:* [Horário da Entrevista]
• *Local:* Rua Ivaí, 266 – Tatuapé - São Paulo - SP - 03080-010

*Principais Responsabilidades:*

• Prestar suporte técnico a clientes via telefone, chat, e-mail e acesso remoto, solucionando dúvidas e orientando sobre as melhores práticas de uso do software.
• Registrar e documentar atendimentos em sistema interno, detalhando problemas, causas e soluções aplicadas.
• Manter-se atualizado com os processos e funcionalidades do sistema, participando e ministrando treinamentos para clientes e equipe interna.
• Colaborar com diferentes equipes para garantir respostas rápidas e soluções eficientes, garantindo a satisfação dos clientes.
• Executar testes em sistemas, registrar falhas, validar correções e apoiar a equipe no controle de qualidade das funcionalidades.

*Requisitos:*

• Estar cursando Análise e Desenvolvimento de Sistemas, Ciência da Computação, Engenharia da Computação, Engenharia de Software, Jogos Digitais, Sistemas de Informação ou áreas correlatas.
• Desejável experiência prévia em atendimento ao cliente.
• Boa comunicação verbal e escrita.
• Organização, proatividade e trabalho em equipe.
• Foco na excelência do atendimento e satisfação do cliente.

*O que oferecemos:*

• *Regime:* Estágio com possibilidade de efetivação
• *Bolsa:* Compatível com o mercado
• *Benefícios:* Vale Refeição e Vale Transporte

Atenciosamente,

[Nome do Recrutador]

Wise System

Rua Ivaí, 266 - Tatuapé
 
São Paulo - SP - 03080-010

Tel.: +55 11 2609-1029

www.wisesystem.com.br`
  },
  {
    id: 'email-biometria-lgpd',
    title: 'Esclarecimento sobre Biometria (LGPD)',
    category: 'relationship',
    channel: CommunicationChannel.EMAIL,
    subject: '[Empresa] | Esclarecimento sobre Coleta de Biometria',
    description: 'Explicação jurídica e técnica sobre o uso de biometria para assinatura eletrônica.',
    content: `[Saudação],
Em atenção à solicitação, esclarecemos que a biometria coletada no sistema possui finalidade exclusiva de assinatura eletrônica, não sendo utilizada para qualquer outro fim.

Do ponto de vista legal, o procedimento está devidamente respaldado pela Lei nº 13.709/2018 (Lei Geral de Proteção de Dados – LGPD). A biometria é classificada como dado pessoal sensível (art. 5º, II), e seu tratamento é permitido quando necessário para atender a finalidades legítimas e específicas, desde que observados os princípios previstos no art. 6º da referida lei, tais como finalidade, necessidade, adequação e segurança.

No caso em questão, o tratamento da biometria enquadra-se, especialmente, no art. 11, inciso II, alínea “a”, da LGPD, que autoriza o uso de dados pessoais sensíveis quando indispensáveis para o cumprimento de obrigação legal ou regulatória, bem como para garantir a autenticidade, integridade e não repúdio dos documentos assinados eletronicamente.

Ressaltamos ainda que:
• A biometria é armazenada de forma criptografada em banco de dados, utilizando técnicas de segurança da informação alinhadas às boas práticas de mercado;
• O acesso aos dados é restrito e controlado, prevenindo uso indevido, vazamentos ou tratamentos não autorizados;

Quanto à validade jurídica da assinatura eletrônica, destacamos que ela encontra respaldo na Medida Provisória nº 2.200-2/2001, bem como na Lei nº 14.063/2020, que reconhecem a validade de assinaturas eletrônicas desde que garantidos os requisitos de identificação do signatário e integridade do documento, critérios plenamente atendidos pela utilização da biometria como mecanismo de autenticação.

Dessa forma, entendemos que o procedimento adotado está juridicamente amparado, tecnicamente seguro e em conformidade com a legislação vigente, oferecendo respaldo suficiente para a formalização junto ao cliente e mitigação de eventuais questionamentos judiciais.`
  },
  */
  {
    id: 'faq-premium-layout',
    title: 'Seção Duvidas',
    category: 'prompts',
    channel: CommunicationChannel.PROMPT,
    description: 'Prompt para criação de seção de FAQ premium com layout assimétrico e animações.',
    content: `# Prompt Detalhado: Seção de FAQ Premium com Layout Assimétrico e Animações

Este prompt foi elaborado para replicar a seção de "Dúvidas Frequentes" com qualidade de design editorial, comportamento responsivo refinado e animações de alta fidelidade.

---

**Role:** Atue como um **Creative Developer Sênior** especializado em React, Tailwind CSS e Motion Design (GSAP).

**Objetivo:** Desenvolver um componente de **FAQ (Perguntas Frequentes)** com layout assimétrico, tipografia sofisticada e micro-interações fluidas. O componente deve transmitir uma sensação de "luxo" e organização.

### 1. Especificações de Layout (Grid & Responsividade)

*   **Mobile (< 1024px):** Layout de coluna única. O cabeçalho (título) fica no topo, seguido pela lista de perguntas logo abaixo.
*   **Desktop (≥ 1024px):** Utilize um **Grid de 12 colunas**.
    *   **Coluna Esquerda (Sticky):** Ocupa as colunas **1 a 4**. Deve conter o título, subtítulo e botão de contato. Use \`position: sticky\` (\`top-32\`) para que este conteúdo acompanhe o usuário enquanto ele rola a lista de perguntas.
    *   **Espaço Negativo (Gap):** A coluna 5 deve ficar vazia para criar respiro visual.
    *   **Coluna Direita (Lista):** Ocupa as colunas **6 a 12**. Contém a lista de perguntas (Accordion).

### 2. Estilo Visual e Tipografia (Tailwind CSS)

*   **Paleta de Cores:** Suporte a **Dark Mode**.
    *   Light: Fundo Off-White/Creme (\`bg-[#EBE9E4]\`), Texto Preto/Cinza Chumbo.
    *   Dark: Fundo Preto Suave (\`bg-[#0a0a0a]\`), Texto Branco/Cinza Claro.
    *   Bordas: Linhas muito sutis (\`border-black/10\` ou \`border-white/10\`).
*   **Tipografia:** Contraste entre "Editorial" e "Técnico".
    *   **Títulos:** Fonte Serifada (ex: \`font-serif\`), tamanhos grandes (6xl a 8xl), \`leading\` apertado (0.85).
    *   **Rótulos/Labels:** Fonte Sans-serif, tamanho pequeno (xs), caixa alta (\`uppercase\`), espaçamento entre letras largo (\`tracking-widest\`).
    *   **Corpo:** Fonte Sans-serif ou Serif de leitura, tamanho confortável, boa altura de linha.

### 3. Comportamento do Acordeão (Lógica React)

*   **Estado:** Apenas **um** item pode estar aberto por vez. Ao clicar em um novo item, o anterior deve fechar automaticamente.
*   **Interação (Clique):**
    *   O título da pergunta ativa deve deslizar levemente para a direita (\`translate-x-4\`).
    *   A cor do título deve mudar para indicar atividade (ex: de cinza para preto/branco).
    *   O ícone (seta ou +) deve rotacionar ou mudar de estado.
*   **Animação de Altura:** O conteúdo da resposta deve expandir/colapsar suavemente (use \`grid-template-rows\` transition ou uma biblioteca como \`framer-motion\` / \`gsap\` para altura \`auto\`).

### 4. Motion Design (GSAP ScrollTrigger)

Implemente animações de entrada acionadas pelo scroll:

1.  **Sticky Header Reveal:** O conteúdo da esquerda deve entrar vindo de baixo (\`y: 80\`), com opacidade, de forma lenta e elegante (\`duration: 1.4\`, \`ease: "power4.out"\`).
2.  **Waterfall List:** Os itens da lista de perguntas devem entrar em **cascata** (\`stagger: 0.15\`). Cada item entra vindo de baixo (\`y: 40\`) com fade-in.
3.  **Delay:** A lista deve começar a animar ligeiramente depois do cabeçalho para criar hierarquia visual.

### 5. Exemplo de Estrutura de Código (Skeleton)

\`\`\`tsx
import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Plus } from 'lucide-react';

// Dados mockados
const FAQ_ITEMS = [
  { id: 1, question: "Qual o valor da sessão?", answer: "..." },
  { id: 2, question: "Como funciona a criação?", answer: "..." },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const containerRef = useRef(null);

  // Lógica do Accordion
  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Animações GSAP
  useEffect(() => {
    // Implementar ScrollTrigger aqui:
    // 1. Animar .sticky-content (Esquerda)
    // 2. Animar .faq-item (Direita) com stagger
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-6 bg-[#EBE9E4] dark:bg-[#0a0a0a]">
      <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* COLUNA ESQUERDA (Sticky) */}
        <div className="lg:col-span-4 relative">
          <div className="sticky-content lg:sticky lg:top-32">
            <span className="text-xs font-bold tracking-widest uppercase mb-4 block">Suporte</span>
            <h2 className="font-serif text-7xl mb-8">Dúvidas <br/> <span className="italic opacity-50">Frequentes</span></h2>
            {/* Botão de Contato */}
          </div>
        </div>

        {/* COLUNA DIREITA (Lista) */}
        <div className="lg:col-span-7 lg:col-start-6">
          {FAQ_ITEMS.map((item, idx) => (
            <div key={item.id} className="faq-item border-b border-black/10 dark:border-white/10">
              <button 
                onClick={() => toggleItem(idx)}
                className="w-full py-10 flex justify-between items-center text-left group"
              >
                <h3 className={\`text-3xl font-serif transition-transform duration-500 \${openIndex === idx ? 'translate-x-4' : ''}\`}>
                  {item.question}
                </h3>
                <Plus className={\`transition-transform duration-500 \${openIndex === idx ? 'rotate-45' : ''}\`} />
              </button>
              
              {/* Área de Resposta (Expandable) */}
              <div className={\`overflow-hidden transition-all duration-500 \${openIndex === idx ? 'max-h-96 opacity-100 pb-10' : 'max-h-0 opacity-0'}\`}>
                <p className="text-lg opacity-80 max-w-2xl">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
\`\`\`

---

### Checklist de Qualidade

- [ ] O layout quebra graciosamente para coluna única no mobile?
- [ ] O conteúdo "Sticky" para de fixar quando a seção termina?
- [ ] As animações respeitam a preferência \`prefers-reduced-motion\`?
- [ ] A tipografia mantém a legibilidade em telas pequenas?`
  },
  {
    id: 'scroll-cinematico',
    title: 'Scroll',
    category: 'prompts',
    channel: CommunicationChannel.PROMPT,
    description: 'Prompt para implementação de scroll cinemático e interativo com Lenis e GSAP.',
    content: `# Prompt para Implementação de Scroll Cinemático e Interativo

Aqui está um prompt detalhado que você pode usar para solicitar este tipo de implementação em projetos futuros ou para refinar o atual.

---

**Role:** Atue como um Engenheiro Front-end Sênior especialista em Creative Coding, Motion Design e Performance Web.

**Contexto:** Estou desenvolvendo uma aplicação web "premium" utilizando **React**, **TypeScript** e **Tailwind CSS**. O objetivo é criar uma experiência de navegação fluida, sofisticada e com "peso" físico, similar a sites de awards (Awwwards/FWA).

**Objetivo Principal:** Implementar um sistema de **Smooth Scrolling (Rolagem Suave)** integrado com animações baseadas em scroll (**Scroll-Linked Animations**).

**Stack Tecnológica Obrigatória:**
1.  **Lenis** (para o smooth scroll - leve e performático).
2.  **GSAP (GreenSock)** + **ScrollTrigger** (para orquestrar as animações).

**Requisitos Detalhados da Implementação:**

### 1. Configuração do Smooth Scroll (Lenis)
-   Inicialize o **Lenis** no componente raiz (\`App.tsx\` ou layout principal).
-   Configure uma curva de inércia personalizada (\`easing\`) para que a rolagem pareça ter "peso" e não pare abruptamente.
-   **Importante:** Sincronize o Lenis com o \`GSAP Ticker\` para garantir que as animações do ScrollTrigger não fiquem "tremidas" (jittery) durante a rolagem. O Lenis deve atualizar o ScrollTrigger a cada frame.

### 2. Efeitos de Parallax (Profundidade)
-   Crie componentes onde elementos de fundo (imagens, títulos grandes) se movam em velocidades diferentes do scroll (\`yPercent\` ou \`y\`).
-   Use \`scrub: true\` ou um valor numérico (ex: \`scrub: 1\`) no ScrollTrigger para suavizar o movimento, criando uma sensação de "arrasto" físico.
-   *Exemplo:* Um título "Hero" que desce levemente e ganha \`blur\` conforme o usuário rola para baixo, desaparecendo suavemente.

### 3. Animações de Entrada (Reveal)
-   Implemente animações de "Reveal" para seções de texto e imagens.
-   Use \`stagger\` para animar listas ou grades (ex: itens de portfólio aparecendo um após o outro).
-   As animações devem ser acionadas quando o elemento entrar na viewport (\`start: "top 80%"\`).
-   Evite animações que rodam ao contrário (\`toggleActions\` ou \`onLeaveBack\`) para garantir que o conteúdo permaneça visível e acessível após ser lido.

### 4. Micro-interações Conectadas (Scrubbing)
-   Crie elementos gráficos (como linhas divisórias ou barras de progresso) que se desenham ou expandem (\`scaleX\` ou \`width\`) em sincronia direta com o scroll.
-   O movimento deve ser atrelado à posição da barra de rolagem: se o usuário para de rolar, a animação para.

### 5. Performance & Acessibilidade
-   Use \`will-change: transform\` em elementos pesados.
-   Certifique-se de que a rolagem nativa não seja completamente sequestrada (hijacked) de forma que impeça a navegação por teclado ou leitores de tela.
-   Desative animações pesadas se o usuário tiver a preferência \`prefers-reduced-motion\` ativada.

**Exemplo de Código Esperado (Snippet):**

\`\`\`typescript
// Exemplo de integração Lenis + GSAP
useEffect(() => {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Curva exponencial
    smoothWheel: true,
  });

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Conectar ao GSAP
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
}, []);
\`\`\``
  },
  {
    id: 'interacao-expansao-card',
    title: 'Interação de expansão de um card',
    category: 'prompts',
    channel: CommunicationChannel.PROMPT,
    description: 'Prompt para criar uma interação Master-Detail com expansão de card para modal usando Framer Motion e Lenis.',
    content: `Contexto: Estou desenvolvendo um portfólio React de alta fidelidade e preciso replicar uma interação específica de "Master-Detail" que já existe na seção de Projetos. Objetivo: Criar um novo componente de Lista/Grid (ex: para Artigos, Serviços ou Galeria) onde o clique em um item expande um Modal de tela cheia com transição contínua.

Requisitos Técnicos Estritos:

Tecnologias:

React 18+
Framer Motion (para layoutId, AnimatePresence, useScroll, useSpring).
Lenis (para scroll suave isolado dentro do modal).
Tailwind CSS.
Comportamento do Card (Lista):

Deve usar useScroll relativo ao container do card para animar propriedades conforme o item entra na viewport.
Animação de Scroll: Aplicar useSpring no progresso do scroll.
Transformações:
clipPath: De inset(15% 10% 15% 10% round 4px) para inset(0% ...) (efeito de expansão).
scale: De 0.95 para 1.05.
y (Parallax da imagem interna): De -30% para 30%.
Interação: Hover deve revelar um botão (seta) com scale e opacity.
Shared Element: A imagem deve ter layoutId="image-{id}" e o título layoutId="title-{id}".
Comportamento do Modal (Container):

Deve usar createPortal para renderizar no document.body.
Entrada: Animação tipo spring (damping: 30, stiffness: 300) vindo de baixo (y: 100% -> 0% ou 2%).
Saída: Animação tipo tween (ease: "easeInOut", duration: 0.4) para evitar "travamentos" no final.
Scroll: Deve instanciar um novo Lenis apenas para o container do modal (wrapper e content), travando o scroll da página principal.
Mobile: Deve suportar gesto de arrastar para fechar (drag="y").
Conteúdo do Modal (Detail):

Hero Section deve conter a imagem com o mesmo layoutId="image-{id}" para fechar a transição mágica.
Título com o mesmo layoutId="title-{id}".
Conteúdo subsequente deve usar animação de entrada escalonada (Reveal).
Por favor, implemente seguindo EXATAMENTE os padrões de código abaixo:

Trechos de Código Fonte (Source of Truth)
1. O Card (Com Física de Scroll e ClipPath)
// Padrão para o Card da Lista
const CardItem = ({ item, onClick }) => {
  const containerRef = useRef(null);
  const isMobile = window.innerWidth < 768;
  
  // 1. Detectar Scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.2"]
  });

  // 2. Suavizar Física
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 20, stiffness: 100, mass: 0.5
  });
  
  // 3. Transformações Visuais
  const clipPath = useTransform(
    smoothProgress,
    [0, 1],
    ["inset(15% 10% 15% 10% round 4px)", "inset(0% 0% 0% 0% round 0px)"]
  );
  const scale = useTransform(smoothProgress, [0, 1], [0.95, 1.05]);
  const yParallax = useTransform(smoothProgress, [0, 1], isMobile ? ["0%", "0%"] : ["-30%", "30%"]);

  return (
    <div ref={containerRef} onClick={onClick} className="group cursor-pointer py-12">
      {/* Wrapper com ClipPath Animado */}
      <motion.div style={{ clipPath: isMobile ? undefined : clipPath }} className="relative aspect-video overflow-hidden">
        
        {/* Imagem com Parallax e LayoutId */}
        <motion.div className="w-full h-full relative overflow-hidden">
           <motion.img 
              layoutId={\`image-\${item.id}\`}
              src={item.image} 
              style={{ scale: 1.35, y: yParallax }} 
              className="w-full h-full object-cover"
           />
        </motion.div>

        {/* Botão Hover */}
        <div className="absolute center-absolute opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500">
           <ArrowUpRight />
        </div>
      </motion.div>

      {/* Título com LayoutId */}
      <motion.h3 layoutId={\`title-\${item.id}\`} className="text-4xl font-serif mt-6">
         {item.title}
      </motion.h3>
    </div>
  );
};
2. O Modal (Com Lenis Isolado e Portal)
// Padrão para o Modal Wrapper
const ContentModal = ({ isOpen, onClose, children, layoutId }) => {
  const modalContainerRef = useRef(null);
  const modalContentRef = useRef(null);
  const scopedLenisRef = useRef(null);

  // Lógica de Scroll Isolado (Lenis)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Trava body
      
      // Inicia Lenis apenas no Modal após mount
      setTimeout(() => {
        if (modalContainerRef.current && modalContentRef.current) {
            const scopedLenis = new Lenis({
                wrapper: modalContainerRef.current,
                content: modalContentRef.current,
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Ease Out Quart
                orientation: 'vertical',
                touchMultiplier: 2,
            });
            scopedLenisRef.current = scopedLenis;
            
            function raf(time) {
                scopedLenis.raf(time);
                requestAnimationFrame(raf);
            }
            requestAnimationFrame(raf);
        }
      }, 300); // Delay para permitir animação de entrada
    } else {
      document.body.style.overflow = '';
      scopedLenisRef.current?.destroy();
    }
    return () => {
       document.body.style.overflow = '';
       scopedLenisRef.current?.destroy();
    };
  }, [isOpen]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div onClick={onClose} className="fixed inset-0 bg-black/90 z-[9998]" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} />
          
          <motion.div
            layoutId={layoutId ? \`modal-container-\${layoutId}\` : undefined}
            initial={{ y: "100%" }}
            animate={{ y: "2%", transition: { type: "spring", damping: 30, stiffness: 300 } }}
            exit={{ y: "100%", transition: { duration: 0.4, ease: "easeInOut" } }} // Tween na saída
            className="fixed inset-0 z-[9999] bg-[#F2F4F6] rounded-t-[2rem] h-[98vh]"
          >
            {/* Container de Scroll para o Lenis */}
            <div ref={modalContainerRef} className="h-full w-full overflow-y-auto">
               <div ref={modalContentRef}>
                  {children}
               </div>
            </div>
            
            {/* Botão Fechar Flutuante */}
            <button onClick={onClose} className="absolute top-8 right-8 z-50">
               <X />
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};`
  },
  {
    id: 'detalhamento-md-projeto',
    title: 'Detalhamento MD Projeto',
    category: 'prompts',
    channel: CommunicationChannel.PROMPT,
    description: 'Prompt para gerar a documentação detalhada (DOC-TEMPLATE.md) da arquitetura de projetos Front-end.',
    content: `Atue como um Engenheiro de Software Sênior e Tech Lead especializado em arquitetura e documentação de projetos Front-end.

Por favor, analise a base de código que estou fornecendo em anexo/contexto. Este projeto é um [INSERIR TIPO DE PROJETO, ex: Template multi-clientes / E-commerce / Landing Page White-label] voltado para o nicho de [INSERIR NICHO, ex: restaurantes / clínicas médicas / varejo].

Sua tarefa é gerar o conteúdo completo para um arquivo chamado \`DOC-TEMPLATE.md\`. Este arquivo será o meu manual de instruções particular, para que eu ou minha equipe possamos lembrar facilmente no futuro como o projeto funciona, qual a sua arquitetura e como adaptá-lo para novos clientes ou contextos.

⚠️ INSTRUÇÃO CRÍTICA CONTRA ALUCINAÇÕES:
- Baseie-se ESTRITAMENTE nos arquivos de código fornecidos. 
- NÃO invente bibliotecas, componentes, rotas ou funcionalidades que não estejam explicitamente no código.
- Se você não encontrar um arquivo mencionado, não presuma seu conteúdo. Limite-se ao que é visível no contexto.

O arquivo Markdown gerado deve ser rico visualmente e conter estritamente as seguintes seções, preenchidas com as informações extraídas da base de código:

1. Visão Geral e Propósito Comercial:
Explique o objetivo do projeto com base no nicho informado. Descreva qual problema ele resolve e quais os principais módulos ou páginas disponíveis (ex: site institucional, área logada, etc). Liste os diferenciais comerciais que o código entrega.

2. Stack Tecnológica e Comportamento Visual:
Liste as principais tecnologias encontradas no \`package.json\` (como frameworks, bundlers e bibliotecas de roteamento). Em seguida, identifique e explique o papel das bibliotecas de UI/UX e animações presentes no projeto. Descreva o tom e o comportamento visual atual (ex: minimalista, corporativo, fluido) baseado nos estilos e animações configuradas.

3. Arquitetura Orientada a Dados (Data-Driven):
Explique de forma detalhada como funciona a separação entre a interface (componentes) e os dados. Detalhe o papel do arquivo central de configuração (como \`[INSERIR NOME DO ARQUIVO DE DADOS, ex: clientConfig.ts ou data.json]\`) e mostre como ele alimenta os componentes dinamicamente (textos, links, imagens), evitando a necessidade de editar arquivos estruturais de código para cada alteração de conteúdo.

4. Tematização Dinâmica e Estilização:
Explique como a troca de design/cores do projeto funciona. Indique o arquivo onde os estilos ou variáveis globais estão definidos (ex: \`[INSERIR ARQUIVO DE ESTILO, ex: index.css ou tailwind.config.js]\`) e mostre um breve exemplo de código sobre como alterar a paleta de cores principal em minutos.

5. Guia Rápido de Customização (Passo a Passo):
Crie um tutorial enumerado de "Como adaptar este projeto para um novo cliente de forma rápida". Analise a arquitetura e diga exatamente:
- Quais pastas ou arquivos de dados/configuração eu devo abrir?
- O que devo alterar neles (com exemplos curtos de código baseados no projeto)?
- Onde altero logotipos e mídias?

Por favor, entregue APENAS o código Markdown completo da documentação. Não inclua saudações, conclusões fora do arquivo ou textos de bate-papo. Utilize cabeçalhos (H1, H2, H3), negritos para destacar arquivos importantes, listas com marcadores e blocos de código formatados para facilitar a leitura.`
  },
  {
    id: 'mapeamento-estrutura-projeto',
    title: 'Mapeamento de Estrutura do Projeto',
    category: 'prompts',
    channel: CommunicationChannel.PROMPT,
    description: 'Prompt para gerar um mapeamento de estrutura de diretórios e documentação de arquitetura.',
    content: `Atue como um Arquiteto de Software sênior especializado em documentação técnica.

Você receberá a estrutura de arquivos de um projeto. Sua tarefa é gerar um mapeamento completo da estrutura, porém com um detalhe crítico:

🎯 FORMATO DE SAÍDA OBRIGATÓRIO
A resposta deve ser 100% em um único bloco de código
A linguagem do bloco deve ser: go
O conteúdo deve ser escrito como comentários válidos em Go
O resultado deve ser utilizável como um arquivo na raiz do projeto: estrutura.go
⚠️ REGRAS CRÍTICAS
NÃO deixe a saída vazia
NÃO responda fora do bloco de código
NÃO use Markdown fora do bloco
NÃO invente arquivos ou pastas
Se não souber o que um arquivo faz:
descreva de forma genérica baseada no nome/extensão
🧱 ESTRUTURA DO CONTEÚDO

Você deve gerar comentários organizados assim:

1. Título
// 📁 Mapeamento de Estrutura do Projeto
2. Árvore de Diretórios (OBRIGATÓRIO)
Usar caracteres:
├──
└──
│
Cada arquivo deve ter descrição ao lado

Exemplo:

// project/
// ├── main.go        // Ponto de entrada da aplicação
// ├── config.json    // Arquivo de configuração
// └── utils/
//     └── helper.go  // Funções utilitárias
3. Explicação da Arquitetura
// 🏗️ Arquitetura
// - /utils: contém funções auxiliares reutilizáveis
// - /config: centraliza configurações
4. Ponto de Entrada e Configurações
// 🚀 Ponto de Entrada
// main.go é responsável por iniciar a aplicação

// ⚙️ Configurações
// config.json armazena parâmetros do sistema
🔒 REFORÇO FINAL (CRÍTICO)
Sua resposta DEVE conter conteúdo dentro do bloco \`\`\`go
Se a árvore não for gerada, a resposta será considerada inválida
NÃO retorne explicações fora do código
TODO o conteúdo deve ser comentário (//)

Em seguida crie um arquivo go na raiz do projeto com base no detalhamento da arquitetura realizada com base na instruções acima, o nome do arquivo deve ser " Arquitetura.go"`
  }
];
