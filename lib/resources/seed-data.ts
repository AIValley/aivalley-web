import type { Category, Pricing, ResourceType, I18nMap } from "./types";

export interface SeedResource {
  type: ResourceType;
  nameEn: string;
  nameZh: string;
  descEn: string;
  descZh: string;
  url: string;
  category: Category;
  tags: string[];
  pricing: Pricing;
  logo?: string;
  featured?: boolean;
  i18n?: {
    name?: I18nMap;
    desc: I18nMap;
  };
}

export interface SeedPost {
  slug: string;
  titleEn: string;
  titleZh: string;
  contentEn: string;
  contentZh: string;
}

export const seedResources: SeedResource[] = [
  // ============ 工具 Tools ============
  {
    type: "tool",
    nameEn: "ChatGPT",
    nameZh: "ChatGPT",
    descEn: "OpenAI's flagship AI assistant for conversation, writing and coding.",
    descZh: "OpenAI 的旗舰 AI 助手，支持对话、写作与编程。",
    url: "https://chatgpt.com",
    category: "chat",
    tags: ["chatbot", "assistant", "openai", "gpt"],
    pricing: "freemium",
    logo: "chat",
    featured: true,
    i18n: {
      desc: {
        "zh-TW": "OpenAI 的旗艦 AI 助手，支援對話、寫作與程式設計。",
        ja: "OpenAI の主力 AI アシスタント。会話・文章作成・コーディングに対応。",
        ru: "Флагманский ИИ-ассистент OpenAI для диалогов, письма и кода.",
        ko: "OpenAI의 대표 AI 어시스턴트로 대화, 글쓰기, 코딩을 지원합니다.",
        es: "El asistente de IA insignia de OpenAI para conversar, escribir y programar.",
        fr: "L'assistant IA phare d'OpenAI pour la conversation, l'écriture et le code.",
        de: "OpenAIs führender KI-Assistent für Gespräche, Schreiben und Programmieren.",
      },
    },
  },
  {
    type: "tool",
    nameEn: "Claude",
    nameZh: "Claude",
    descEn: "Anthropic's AI assistant, known for thoughtful writing and long context.",
    descZh: "Anthropic 的 AI 助手，以高质量写作和超长上下文著称。",
    url: "https://claude.ai",
    category: "chat",
    tags: ["chatbot", "assistant", "anthropic"],
    pricing: "freemium",
    logo: "sparkles",
    featured: true,
    i18n: {
      desc: {
        "zh-TW": "Anthropic 的 AI 助手，以高品質寫作與超長上下文著稱。",
        ja: "Anthropic の AI アシスタント。質の高い文章と超長コンテキストが特長。",
        ru: "ИИ-ассистент Anthropic, известный качественным письмом и длинным контекстом.",
        ko: "Anthropic의 AI 어시스턴트로, 뛰어난 글쓰기와 긴 컨텍스트로 유명합니다.",
        es: "El asistente de IA de Anthropic, conocido por su escritura cuidada y su largo contexto.",
        fr: "L'assistant IA d'Anthropic, réputé pour son écriture soignée et son long contexte.",
        de: "Anthropics KI-Assistent, bekannt für durchdachtes Schreiben und langen Kontext.",
      },
    },
  },
  {
    type: "tool",
    nameEn: "Gemini",
    nameZh: "Gemini",
    descEn: "Google's multimodal AI assistant integrated across its ecosystem.",
    descZh: "谷歌的多模态 AI 助手，深度整合于谷歌生态。",
    url: "https://gemini.google.com",
    category: "chat",
    tags: ["chatbot", "multimodal", "google"],
    pricing: "freemium",
    logo: "star",
    i18n: {
      desc: {
        "zh-TW": "Google 的多模態 AI 助手，深度整合於 Google 生態系。",
        ja: "Google のマルチモーダル AI アシスタント。Google エコシステムに深く統合。",
        ru: "Мультимодальный ИИ-ассистент Google, интегрированный в его экосистему.",
        ko: "Google 생태계에 깊이 통합된 멀티모달 AI 어시스턴트입니다.",
        es: "El asistente de IA multimodal de Google, integrado en todo su ecosistema.",
        fr: "L'assistant IA multimodal de Google, intégré à son écosystème.",
        de: "Googles multimodaler KI-Assistent, tief in sein Ökosystem integriert.",
      },
    },
  },
  {
    type: "tool",
    nameEn: "Perplexity",
    nameZh: "Perplexity",
    descEn: "AI-powered answer engine that searches the web and cites sources.",
    descZh: "AI 驱动的问答引擎，联网搜索并标注来源。",
    url: "https://www.perplexity.ai",
    category: "search",
    tags: ["search", "qa", "research"],
    pricing: "freemium",
    logo: "search",
    featured: true,
    i18n: {
      desc: {
        "zh-TW": "AI 驅動的問答引擎，可聯網搜尋並標註來源。",
        ja: "AI 駆動の回答エンジン。ウェブ検索を行い出典を明示。",
        ru: "ИИ-поисковик ответов, который ищет в сети и указывает источники.",
        ko: "웹을 검색하고 출처를 표시하는 AI 기반 답변 엔진입니다.",
        es: "Motor de respuestas con IA que busca en la web y cita las fuentes.",
        fr: "Moteur de réponses IA qui recherche sur le web et cite ses sources.",
        de: "KI-gestützte Antwort-Engine, die das Web durchsucht und Quellen angibt.",
      },
    },
  },
  {
    type: "tool",
    nameEn: "Midjourney",
    nameZh: "Midjourney",
    descEn: "Renowned AI image generator producing stunning artistic visuals.",
    descZh: "著名的 AI 图像生成器，产出惊艳的艺术视觉。",
    url: "https://www.midjourney.com",
    category: "image",
    tags: ["image", "art", "generation"],
    pricing: "paid",
    logo: "palette",
    featured: true,
    i18n: {
      desc: {
        "zh-TW": "著名的 AI 圖像生成器，產出令人驚豔的藝術視覺。",
        ja: "有名な AI 画像生成ツール。美しいアートビジュアルを生成。",
        ru: "Известный генератор изображений на базе ИИ, создающий впечатляющие работы.",
        ko: "놀라운 예술적 비주얼을 만들어내는 유명한 AI 이미지 생성기입니다.",
        es: "Reconocido generador de imágenes con IA que crea impresionantes obras de arte.",
        fr: "Célèbre générateur d'images IA produisant de superbes visuels artistiques.",
        de: "Bekannter KI-Bildgenerator für atemberaubende künstlerische Bilder.",
      },
    },
  },
  {
    type: "tool",
    nameEn: "DALL·E",
    nameZh: "DALL·E",
    descEn: "OpenAI's text-to-image model for generating detailed images.",
    descZh: "OpenAI 的文生图模型，可生成精细图像。",
    url: "https://openai.com/index/dall-e-3/",
    category: "image",
    tags: ["image", "openai"],
    pricing: "freemium",
    logo: "image",
    i18n: {
      desc: {
        "zh-TW": "OpenAI 的文生圖模型，可生成精細圖像。",
        ja: "OpenAI のテキスト画像生成モデル。詳細な画像を生成。",
        ru: "Модель text-to-image от OpenAI для создания детализированных изображений.",
        ko: "정교한 이미지를 생성하는 OpenAI의 텍스트-이미지 모델입니다.",
        es: "Modelo de texto a imagen de OpenAI para generar imágenes detalladas.",
        fr: "Modèle texte-image d'OpenAI pour générer des images détaillées.",
        de: "OpenAIs Text-zu-Bild-Modell für detailreiche Bilder.",
      },
    },
  },
  {
    type: "tool",
    nameEn: "DreamStudio",
    nameZh: "DreamStudio",
    descEn: "Stability AI's web app for generating images with Stable Diffusion.",
    descZh: "Stability AI 基于 Stable Diffusion 的图像生成网页应用。",
    url: "https://dreamstudio.ai",
    category: "image",
    tags: ["image", "open-source"],
    pricing: "freemium",
    logo: "image",
    i18n: {
      desc: {
        "zh-TW": "Stability AI 基於 Stable Diffusion 的圖像生成網頁應用。",
        ja: "Stability AI の Stable Diffusion を使った画像生成 Web アプリ。",
        ru: "Веб-приложение Stability AI для генерации изображений на Stable Diffusion.",
        ko: "Stable Diffusion 기반의 Stability AI 이미지 생성 웹 앱입니다.",
        es: "Aplicación web de Stability AI para generar imágenes con Stable Diffusion.",
        fr: "Application web de Stability AI pour générer des images avec Stable Diffusion.",
        de: "Stability AIs Web-App zur Bildgenerierung mit Stable Diffusion.",
      },
    },
  },
  {
    type: "tool",
    nameEn: "Runway",
    nameZh: "Runway",
    descEn: "AI video generation and editing tools for creators.",
    descZh: "面向创作者的 AI 视频生成与编辑工具。",
    url: "https://runwayml.com",
    category: "video",
    tags: ["video", "editing"],
    pricing: "freemium",
    logo: "video",
    featured: true,
    i18n: {
      desc: {
        "zh-TW": "面向創作者的 AI 影片生成與編輯工具。",
        ja: "クリエイター向けの AI 動画生成・編集ツール。",
        ru: "Инструменты генерации и редактирования видео с ИИ для авторов.",
        ko: "크리에이터를 위한 AI 비디오 생성 및 편집 도구입니다.",
        es: "Herramientas de IA para generar y editar vídeo dirigidas a creadores.",
        fr: "Outils IA de génération et montage vidéo pour les créateurs.",
        de: "KI-Videoerstellung und -bearbeitung für Kreative.",
      },
    },
  },
  {
    type: "tool",
    nameEn: "Pika",
    nameZh: "Pika",
    descEn: "Easy-to-use AI video generator for short creative clips.",
    descZh: "易上手的 AI 视频生成器，适合创作短视频。",
    url: "https://pika.art",
    category: "video",
    tags: ["video"],
    pricing: "freemium",
    logo: "video",
    i18n: {
      desc: {
        "zh-TW": "易上手的 AI 影片生成器，適合創作短影音。",
        ja: "手軽な AI 動画生成ツール。短いクリエイティブ動画向け。",
        ru: "Простой генератор видео с ИИ для коротких креативных роликов.",
        ko: "짧은 창의적 클립을 만드는 쉬운 AI 비디오 생성기입니다.",
        es: "Generador de vídeo con IA fácil de usar para clips creativos cortos.",
        fr: "Générateur vidéo IA simple pour de courts clips créatifs.",
        de: "Einfacher KI-Videogenerator für kurze kreative Clips.",
      },
    },
  },
  {
    type: "tool",
    nameEn: "GitHub Copilot",
    nameZh: "GitHub Copilot",
    descEn: "AI pair programmer that autocompletes code in your editor.",
    descZh: "AI 结对编程助手，在编辑器里自动补全代码。",
    url: "https://github.com/features/copilot",
    category: "code",
    tags: ["code", "assistant", "github"],
    pricing: "paid",
    logo: "git",
    featured: true,
    i18n: {
      desc: {
        "zh-TW": "AI 結對程式設計助手，在編輯器裡自動補全程式碼。",
        ja: "エディター内でコードを自動補完する AI ペアプログラマー。",
        ru: "ИИ-напарник, который дополняет код прямо в редакторе.",
        ko: "편집기에서 코드를 자동 완성하는 AI 페어 프로그래머입니다.",
        es: "Programador de pares con IA que autocompleta código en tu editor.",
        fr: "Programmeur binôme IA qui complète le code dans votre éditeur.",
        de: "KI-Pair-Programmer, der Code im Editor vervollständigt.",
      },
    },
  },
  {
    type: "tool",
    nameEn: "Cursor",
    nameZh: "Cursor",
    descEn: "AI-first code editor built for pair-programming with AI.",
    descZh: "AI 优先的代码编辑器，为与 AI 结对编程而设计。",
    url: "https://cursor.com",
    category: "code",
    tags: ["code", "ide", "ai"],
    pricing: "freemium",
    logo: "code",
    featured: true,
    i18n: {
      desc: {
        "zh-TW": "AI 優先的程式碼編輯器，專為與 AI 結對程式設計而打造。",
        ja: "AI とペアプログラミングするために設計された AI ファーストなコードエディター。",
        ru: "ИИ-ориентированный редактор кода для парного программирования с ИИ.",
        ko: "AI와 페어 프로그래밍을 위해 설계된 AI 우선 코드 편집기입니다.",
        es: "Editor de código centrado en IA para programar en pareja con la IA.",
        fr: "Éditeur de code axé IA conçu pour la programmation en binôme avec l'IA.",
        de: "KI-zentrierter Code-Editor für Pair-Programming mit KI.",
      },
    },
  },
  {
    type: "tool",
    nameEn: "Notion AI",
    nameZh: "Notion AI",
    descEn: "AI assistant inside Notion for writing, summarizing and Q&A.",
    descZh: "内置于 Notion 的 AI 助手，支持写作、总结与问答。",
    url: "https://www.notion.so",
    category: "productivity",
    tags: ["productivity", "writing"],
    pricing: "freemium",
    logo: "writing",
    i18n: {
      desc: {
        "zh-TW": "內建於 Notion 的 AI 助手，支援寫作、摘要與問答。",
        ja: "Notion 内蔵の AI アシスタント。文章作成・要約・Q&A に対応。",
        ru: "ИИ-ассистент внутри Notion для письма, резюмирования и вопросов.",
        ko: "Notion에 내장된 AI 어시스턴트로 글쓰기, 요약, Q&A를 지원합니다.",
        es: "Asistente de IA integrado en Notion para escribir, resumir y preguntar.",
        fr: "Assistant IA intégré à Notion pour écrire, résumer et répondre.",
        de: "KI-Assistent in Notion für Schreiben, Zusammenfassen und Fragen.",
      },
    },
  },
  {
    type: "tool",
    nameEn: "ElevenLabs",
    nameZh: "ElevenLabs",
    descEn: "Realistic AI text-to-speech and voice cloning platform.",
    descZh: "逼真的 AI 语音合成与声音克隆平台。",
    url: "https://elevenlabs.io",
    category: "audio",
    tags: ["audio", "voice", "tts"],
    pricing: "freemium",
    logo: "mic",
    i18n: {
      desc: {
        "zh-TW": "逼真的 AI 語音合成與聲音複製平台。",
        ja: "リアルな AI 音声合成・ボイスクローニングプラットフォーム。",
        ru: "Реалистичный синтез речи и клонирование голоса на базе ИИ.",
        ko: "사실적인 AI 음성 합성 및 목소리 복제 플랫폼입니다.",
        es: "Plataforma de síntesis de voz y clonación de voz con IA realista.",
        fr: "Plateforme de synthèse vocale et clonage de voix IA réaliste.",
        de: "Realistische KI-Sprachsynthese und Stimmklonen.",
      },
    },
  },
  {
    type: "tool",
    nameEn: "Suno",
    nameZh: "Suno",
    descEn: "AI music generation — create full songs from a text prompt.",
    descZh: "AI 音乐生成，输入文字即可创作完整歌曲。",
    url: "https://suno.com",
    category: "audio",
    tags: ["audio", "music"],
    pricing: "freemium",
    logo: "music",
    i18n: {
      desc: {
        "zh-TW": "AI 音樂生成，輸入文字即可創作完整歌曲。",
        ja: "AI 音楽生成。テキスト入力からフルソングを作成。",
        ru: "Генерация музыки с ИИ — создавайте полные песни по текстовому запросу.",
        ko: "텍스트 프롬프트로 완성곡을 만드는 AI 음악 생성 도구입니다.",
        es: "Generación de música con IA: crea canciones completas a partir de texto.",
        fr: "Génération musicale IA — créez des chansons complètes à partir d'un texte.",
        de: "KI-Musikgenerierung — erstelle ganze Songs aus einem Text-Prompt.",
      },
    },
  },
  {
    type: "tool",
    nameEn: "Grammarly",
    nameZh: "Grammarly",
    descEn: "AI writing assistant for grammar, clarity and tone.",
    descZh: "AI 写作助手，帮助改进语法、清晰度与语气。",
    url: "https://www.grammarly.com",
    category: "writing",
    tags: ["writing", "grammar"],
    pricing: "freemium",
    logo: "writing",
    i18n: {
      desc: {
        "zh-TW": "AI 寫作助手，協助改進文法、清晰度與語氣。",
        ja: "文法・明瞭さ・トーンを改善する AI ライティングアシスタント。",
        ru: "ИИ-ассистент письма для грамматики, ясности и тона.",
        ko: "문법, 명확성, 어조를 개선하는 AI 글쓰기 어시스턴트입니다.",
        es: "Asistente de escritura con IA para gramática, claridad y tono.",
        fr: "Assistant d'écriture IA pour la grammaire, la clarté et le ton.",
        de: "KI-Schreibassistent für Grammatik, Klarheit und Ton.",
      },
    },
  },
  {
    type: "tool",
    nameEn: "Canva Magic Studio",
    nameZh: "Canva Magic Studio",
    descEn: "AI design tools inside Canva for images, video and text.",
    descZh: "内置于 Canva 的 AI 设计工具，覆盖图像、视频与文案。",
    url: "https://www.canva.com",
    category: "image",
    tags: ["image", "design", "productivity"],
    pricing: "freemium",
    logo: "palette",
    i18n: {
      desc: {
        "zh-TW": "內建於 Canva 的 AI 設計工具，涵蓋圖像、影片與文案。",
        ja: "Canva 内蔵の AI デザインツール。画像・動画・テキストをカバー。",
        ru: "ИИ-инструменты дизайна внутри Canva для изображений, видео и текста.",
        ko: "이미지, 비디오, 텍스트를 아우르는 Canva 내장 AI 디자인 도구입니다.",
        es: "Herramientas de diseño con IA dentro de Canva para imagen, vídeo y texto.",
        fr: "Outils de design IA intégrés à Canva pour l'image, la vidéo et le texte.",
        de: "KI-Design-Tools in Canva für Bild, Video und Text.",
      },
    },
  },

  // ============ 模型 Models ============
  {
    type: "model",
    nameEn: "GPT-4o",
    nameZh: "GPT-4o",
    descEn: "OpenAI's multimodal flagship model for text, vision and audio.",
    descZh: "OpenAI 的多模态旗舰模型，支持文本、视觉与语音。",
    url: "https://openai.com",
    category: "multimodal",
    tags: ["llm", "multimodal", "openai"],
    pricing: "freemium",
    logo: "brain",
    featured: true,
    i18n: {
      desc: {
        "zh-TW": "OpenAI 的多模態旗艦模型，支援文字、視覺與語音。",
        ja: "OpenAI のマルチモーダル主力モデル。テキスト・画像・音声に対応。",
        ru: "Флагманская мультимодальная модель OpenAI для текста, зрения и аудио.",
        ko: "텍스트, 비전, 오디오를 지원하는 OpenAI의 멀티모달 대표 모델입니다.",
        es: "Modelo multimodal insignia de OpenAI para texto, visión y audio.",
        fr: "Modèle multimodal phare d'OpenAI pour le texte, la vision et l'audio.",
        de: "OpenAIs multimodales Flaggschiff-Modell für Text, Bild und Audio.",
      },
    },
  },
  {
    type: "model",
    nameEn: "Claude",
    nameZh: "Claude",
    descEn: "Anthropic's model family, strong in reasoning and long-context tasks.",
    descZh: "Anthropic 的模型家族，擅长推理与长上下文任务。",
    url: "https://www.anthropic.com",
    category: "chat",
    tags: ["llm", "anthropic"],
    pricing: "freemium",
    logo: "sparkles",
    featured: true,
    i18n: {
      desc: {
        "zh-TW": "Anthropic 的模型家族，擅長推理與長上下文任務。",
        ja: "Anthropic のモデルファミリー。推論と長文コンテキストに強い。",
        ru: "Семейство моделей Anthropic, сильное в рассуждениях и длинном контексте.",
        ko: "추론과 긴 컨텍스트 작업에 강한 Anthropic의 모델 제품군입니다.",
        es: "Familia de modelos de Anthropic, fuerte en razonamiento y contexto largo.",
        fr: "Famille de modèles d'Anthropic, forte en raisonnement et long contexte.",
        de: "Anthropics Modellfamilie, stark bei logischem Denken und langem Kontext.",
      },
    },
  },
  {
    type: "model",
    nameEn: "Gemini",
    nameZh: "Gemini",
    descEn: "Google's natively multimodal model family powering its products.",
    descZh: "谷歌原生多模态模型家族，驱动其各类产品。",
    url: "https://deepmind.google",
    category: "multimodal",
    tags: ["llm", "multimodal", "google"],
    pricing: "freemium",
    logo: "star",
    i18n: {
      desc: {
        "zh-TW": "Google 原生多模態模型家族，驅動其各類產品。",
        ja: "Google のネイティブマルチモーダルモデルファミリー。",
        ru: "Нативно мультимодальное семейство моделей Google, лежащее в основе его продуктов.",
        ko: "Google 제품을 구동하는 네이티브 멀티모달 모델 제품군입니다.",
        es: "Familia de modelos nativamente multimodales de Google que impulsa sus productos.",
        fr: "Famille de modèles nativement multimodaux de Google qui alimente ses produits.",
        de: "Googles nativ multimodale Modellfamilie, die seine Produkte antreibt.",
      },
    },
  },
  {
    type: "model",
    nameEn: "Llama",
    nameZh: "Llama",
    descEn: "Meta's open-weight LLM family, popular for self-hosting.",
    descZh: "Meta 的开源权重大模型家族，广受自部署欢迎。",
    url: "https://www.llama.com",
    category: "chat",
    tags: ["llm", "open-source", "meta"],
    pricing: "free",
    logo: "brain",
    i18n: {
      desc: {
        "zh-TW": "Meta 的開源權重大模型家族，廣受自部署歡迎。",
        ja: "Meta のオープンウェイト LLM ファミリー。セルフホストで人気。",
        ru: "Семейство LLM с открытыми весами от Meta, популярное для самостоятельного хостинга.",
        ko: "자체 호스팅에 인기 있는 Meta의 오픈 웨이트 LLM 제품군입니다.",
        es: "Familia de LLM de pesos abiertos de Meta, popular para autohospedaje.",
        fr: "Famille de LLM à poids ouverts de Meta, prisée pour l'auto-hébergement.",
        de: "Metas LLM-Familie mit offenen Gewichten, beliebt für Self-Hosting.",
      },
    },
  },
  {
    type: "model",
    nameEn: "DeepSeek",
    nameZh: "DeepSeek",
    descEn: "Open-weight model known for strong reasoning and efficiency.",
    descZh: "以强大推理能力与高效率著称的开源权重模型。",
    url: "https://www.deepseek.com",
    category: "chat",
    tags: ["llm", "open-source", "reasoning"],
    pricing: "free",
    logo: "brain",
    featured: true,
    i18n: {
      desc: {
        "zh-TW": "以強大推理能力與高效率著稱的開源權重模型。",
        ja: "強力な推論と効率性で知られるオープンウェイトモデル。",
        ru: "Модель с открытыми весами, известная сильным мышлением и эффективностью.",
        ko: "강력한 추론 능력과 효율성으로 유명한 오픈 웨이트 모델입니다.",
        es: "Modelo de pesos abiertos conocido por su razonamiento y eficiencia.",
        fr: "Modèle à poids ouverts connu pour son raisonnement et son efficacité.",
        de: "Open-Weight-Modell, bekannt für starkes Denken und Effizienz.",
      },
    },
  },
  {
    type: "model",
    nameEn: "Qwen",
    nameZh: "通义千问",
    descEn: "Alibaba's open-weight model family spanning many sizes and modalities.",
    descZh: "阿里开源权重模型家族，覆盖多种规模与模态。",
    url: "https://qwen.ai",
    category: "chat",
    tags: ["llm", "open-source", "alibaba"],
    pricing: "free",
    logo: "brain",
    i18n: {
      name: { "zh-TW": "通義千問" },
      desc: {
        "zh-TW": "阿里巴巴開源權重模型家族，涵蓋多種規模與模態。",
        ja: "アリババのオープンウェイトモデルファミリー。多様な規模・モダリティを網羅。",
        ru: "Семейство моделей с открытыми весами от Alibaba разных размеров и модальностей.",
        ko: "다양한 크기와 모달리티를 아우르는 알리바바의 오픈 웨이트 모델 제품군입니다.",
        es: "Familia de modelos de pesos abiertos de Alibaba de muchos tamaños y modalidades.",
        fr: "Famille de modèles à poids ouverts d'Alibaba couvrant tailles et modalités variées.",
        de: "Alibabas Open-Weight-Modellfamilie über viele Größen und Modalitäten.",
      },
    },
  },
  {
    type: "model",
    nameEn: "Mistral",
    nameZh: "Mistral",
    descEn: "European open-weight model company focused on efficiency.",
    descZh: "欧洲的开源权重模型公司，专注高效模型。",
    url: "https://mistral.ai",
    category: "chat",
    tags: ["llm", "open-source"],
    pricing: "free",
    logo: "brain",
    i18n: {
      desc: {
        "zh-TW": "歐洲的開源權重模型公司，專注高效模型。",
        ja: "効率性に注力するヨーロッパのオープンウェイトモデル企業。",
        ru: "Европейская компания моделей с открытыми весами, ориентированная на эффективность.",
        ko: "효율적인 모델에 집중하는 유럽의 오픈 웨이트 모델 기업입니다.",
        es: "Compañía europea de modelos de pesos abiertos centrada en la eficiencia.",
        fr: "Entreprise européenne de modèles à poids ouverts axée sur l'efficacité.",
        de: "Europäisches Open-Weight-Modellunternehmen mit Fokus auf Effizienz.",
      },
    },
  },
  {
    type: "model",
    nameEn: "Whisper",
    nameZh: "Whisper",
    descEn: "OpenAI's open-source speech recognition model supporting many languages.",
    descZh: "OpenAI 的开源语音识别模型，支持多种语言。",
    url: "https://openai.com/index/whisper/",
    category: "audio",
    tags: ["audio", "speech", "open-source"],
    pricing: "free",
    logo: "audio",
    i18n: {
      desc: {
        "zh-TW": "OpenAI 的開源語音辨識模型，支援多種語言。",
        ja: "OpenAI のオープンソース音声認識モデル。多言語対応。",
        ru: "Открытая модель распознавания речи OpenAI с поддержкой многих языков.",
        ko: "여러 언어를 지원하는 OpenAI의 오픈소스 음성 인식 모델입니다.",
        es: "Modelo de reconocimiento de voz de código abierto de OpenAI, multilingüe.",
        fr: "Modèle de reconnaissance vocale open source d'OpenAI, multilingue.",
        de: "Open-Source-Spracherkennungsmodell von OpenAI für viele Sprachen.",
      },
    },
  },
  {
    type: "model",
    nameEn: "Stable Diffusion XL",
    nameZh: "Stable Diffusion XL",
    descEn: "Open-source text-to-image model from Stability AI.",
    descZh: "Stability AI 的开源文生图模型。",
    url: "https://stability.ai",
    category: "image",
    tags: ["image", "open-source"],
    pricing: "free",
    logo: "image",
    i18n: {
      desc: {
        "zh-TW": "Stability AI 的開源文生圖模型。",
        ja: "Stability AI のオープンソース テキスト画像生成モデル。",
        ru: "Модель text-to-image с открытым кодом от Stability AI.",
        ko: "Stability AI의 오픈소스 텍스트-이미지 모델입니다.",
        es: "Modelo de texto a imagen de código abierto de Stability AI.",
        fr: "Modèle texte-image open source de Stability AI.",
        de: "Open-Source-Text-zu-Bild-Modell von Stability AI.",
      },
    },
  },
  {
    type: "model",
    nameEn: "FLUX",
    nameZh: "FLUX",
    descEn: "High-quality open-weight image model from Black Forest Labs.",
    descZh: "Black Forest Labs 的高质量开源权重图像模型。",
    url: "https://blackforestlabs.ai",
    category: "image",
    tags: ["image", "open-source"],
    pricing: "free",
    logo: "image",
    i18n: {
      desc: {
        "zh-TW": "Black Forest Labs 的高品質開源權重圖像模型。",
        ja: "Black Forest Labs の高品質オープンウェイト画像モデル。",
        ru: "Высококачественная модель изображений с открытыми весами от Black Forest Labs.",
        ko: "Black Forest Labs의 고품질 오픈 웨이트 이미지 모델입니다.",
        es: "Modelo de imagen de pesos abiertos de alta calidad de Black Forest Labs.",
        fr: "Modèle d'image à poids ouverts de haute qualité de Black Forest Labs.",
        de: "Hochwertiges Open-Weight-Bildmodell von Black Forest Labs.",
      },
    },
  },
  {
    type: "model",
    nameEn: "Sora",
    nameZh: "Sora",
    descEn: "OpenAI's text-to-video model for cinematic generation.",
    descZh: "OpenAI 的文生视频模型，可生成电影级画面。",
    url: "https://openai.com/sora",
    category: "video",
    tags: ["video", "openai"],
    pricing: "paid",
    logo: "video",
    i18n: {
      desc: {
        "zh-TW": "OpenAI 的文生影片模型，可生成電影級畫面。",
        ja: "OpenAI のテキスト動画生成モデル。映画的な映像を生成。",
        ru: "Модель text-to-video от OpenAI для кинематографичной генерации.",
        ko: "영화 같은 장면을 생성하는 OpenAI의 텍스트-비디오 모델입니다.",
        es: "Modelo de texto a vídeo de OpenAI para generación cinematográfica.",
        fr: "Modèle texte-vidéo d'OpenAI pour une génération cinématographique.",
        de: "OpenAIs Text-zu-Video-Modell für filmische Erzeugung.",
      },
    },
  },
  {
    type: "model",
    nameEn: "Veo",
    nameZh: "Veo",
    descEn: "Google's video generation model producing high-quality clips.",
    descZh: "谷歌的视频生成模型，产出高质量片段。",
    url: "https://deepmind.google",
    category: "video",
    tags: ["video", "google"],
    pricing: "freemium",
    logo: "video",
    i18n: {
      desc: {
        "zh-TW": "Google 的影片生成模型，產出高品質片段。",
        ja: "Google の動画生成モデル。高品質なクリップを生成。",
        ru: "Модель генерации видео от Google, создающая качественные ролики.",
        ko: "고품질 클립을 만드는 Google의 비디오 생성 모델입니다.",
        es: "Modelo de generación de vídeo de Google que produce clips de alta calidad.",
        fr: "Modèle de génération vidéo de Google produisant des clips de haute qualité.",
        de: "Googles Videogenerierungsmodell für hochwertige Clips.",
      },
    },
  },

  // ============ Agent / 框架 ============
  {
    type: "agent",
    nameEn: "LangChain",
    nameZh: "LangChain",
    descEn: "Popular framework for building LLM-powered applications and agents.",
    descZh: "流行的 LLM 应用与智能体开发框架。",
    url: "https://www.langchain.com",
    category: "framework",
    tags: ["framework", "open-source", "llm"],
    pricing: "free",
    logo: "link",
    featured: true,
    i18n: {
      desc: {
        "zh-TW": "流行的 LLM 應用與智慧體開發框架。",
        ja: "LLM アプリとエージェント開発で人気のフレームワーク。",
        ru: "Популярный фреймворк для приложений и агентов на базе LLM.",
        ko: "LLM 기반 애플리케이션과 에이전트를 만드는 인기 프레임워크입니다.",
        es: "Popular framework para crear aplicaciones y agentes con LLM.",
        fr: "Framework populaire pour créer des applications et agents basés sur les LLM.",
        de: "Beliebtes Framework für LLM-Anwendungen und Agenten.",
      },
    },
  },
  {
    type: "agent",
    nameEn: "LangGraph",
    nameZh: "LangGraph",
    descEn: "Low-level framework for stateful, graph-based agent workflows.",
    descZh: "面向有状态、图式智能体工作流的底层框架。",
    url: "https://www.langchain.com/langgraph",
    category: "framework",
    tags: ["framework", "open-source"],
    pricing: "free",
    logo: "workflow",
    i18n: {
      desc: {
        "zh-TW": "面向有狀態、圖式智慧體工作流的底層框架。",
        ja: "状態を持つグラフ型エージェントワークフローの低レベルフレームワーク。",
        ru: "Низкоуровневый фреймворк для графовых агентных рабочих процессов с состоянием.",
        ko: "상태 기반 그래프형 에이전트 워크플로를 위한 저수준 프레임워크입니다.",
        es: "Framework de bajo nivel para flujos de agentes con estado basados en grafos.",
        fr: "Framework bas niveau pour des workflows d'agents à états, basés sur des graphes.",
        de: "Low-Level-Framework für zustandsbehaftete, graphbasierte Agenten-Workflows.",
      },
    },
  },
  {
    type: "agent",
    nameEn: "CrewAI",
    nameZh: "CrewAI",
    descEn: "Framework for orchestrating role-playing multi-agent teams.",
    descZh: "编排角色扮演式多智能体团队的框架。",
    url: "https://www.crewai.com",
    category: "framework",
    tags: ["framework", "multi-agent"],
    pricing: "free",
    logo: "users",
    i18n: {
      desc: {
        "zh-TW": "編排角色扮演式多智慧體團隊的框架。",
        ja: "ロールプレイ型マルチエージェントチームを編成するフレームワーク。",
        ru: "Фреймворк для оркестрации ролевых мультиагентных команд.",
        ko: "역할극 방식의 멀티 에이전트 팀을 구성하는 프레임워크입니다.",
        es: "Framework para orquestar equipos de múltiples agentes con roles.",
        fr: "Framework pour orchestrer des équipes multi-agents en jeu de rôle.",
        de: "Framework zur Orchestrierung rollenbasierter Multi-Agenten-Teams.",
      },
    },
  },
  {
    type: "agent",
    nameEn: "AutoGPT",
    nameZh: "AutoGPT",
    descEn: "Autonomous agent platform that chains tasks toward a goal.",
    descZh: "自主智能体平台，串联任务直至达成目标。",
    url: "https://agpt.co",
    category: "framework",
    tags: ["agent", "autonomous"],
    pricing: "free",
    logo: "bot",
    i18n: {
      desc: {
        "zh-TW": "自主智慧體平台，串聯任務直至達成目標。",
        ja: "目標達成までタスクをつなぐ自律エージェントプラットフォーム。",
        ru: "Платформа автономных агентов, связывающая задачи для достижения цели.",
        ko: "목표 달성까지 작업을 연결하는 자율 에이전트 플랫폼입니다.",
        es: "Plataforma de agentes autónomos que encadena tareas hacia un objetivo.",
        fr: "Plateforme d'agents autonomes qui enchaîne les tâches vers un but.",
        de: "Plattform für autonome Agenten, die Aufgaben bis zum Ziel verketten.",
      },
    },
  },
  {
    type: "agent",
    nameEn: "Dify",
    nameZh: "Dify",
    descEn: "Open-source LLM app platform with visual agent and workflow builders.",
    descZh: "开源 LLM 应用平台，提供可视化智能体与工作流搭建。",
    url: "https://dify.ai",
    category: "framework",
    tags: ["platform", "low-code", "open-source"],
    pricing: "free",
    logo: "puzzle",
    featured: true,
    i18n: {
      desc: {
        "zh-TW": "開源 LLM 應用平台，提供視覺化智慧體與工作流搭建。",
        ja: "オープンソース LLM アプリプラットフォーム。ビジュアルなエージェント/ワークフロー構築。",
        ru: "Открытая платформа LLM-приложений с визуальной сборкой агентов и рабочих процессов.",
        ko: "시각적 에이전트 및 워크플로 빌더를 갖춘 오픈소스 LLM 앱 플랫폼입니다.",
        es: "Plataforma de apps LLM de código abierto con creadores visuales de agentes y flujos.",
        fr: "Plateforme d'apps LLM open source avec création visuelle d'agents et de workflows.",
        de: "Open-Source-LLM-App-Plattform mit visuellen Agenten- und Workflow-Buildern.",
      },
    },
  },
  {
    type: "agent",
    nameEn: "Coze",
    nameZh: "扣子 Coze",
    descEn: "ByteDance's low-code platform for building and publishing bots.",
    descZh: "字节跳动的低代码平台，用于构建和发布智能体。",
    url: "https://www.coze.com",
    category: "framework",
    tags: ["platform", "low-code"],
    pricing: "free",
    logo: "bot",
    i18n: {
      desc: {
        "zh-TW": "位元組跳動的低程式碼平台，用於構建和發佈智慧體。",
        ja: "ByteDance のローコードプラットフォーム。ボットの構築・公開向け。",
        ru: "Low-code платформа ByteDance для создания и публикации ботов.",
        ko: "봇을 만들고 게시하는 바이트댄스의 로우코드 플랫폼입니다.",
        es: "Plataforma low-code de ByteDance para crear y publicar bots.",
        fr: "Plateforme low-code de ByteDance pour créer et publier des bots.",
        de: "Low-Code-Plattform von ByteDance zum Erstellen und Veröffentlichen von Bots.",
      },
    },
  },
  {
    type: "agent",
    nameEn: "OpenAI Assistants API",
    nameZh: "OpenAI Assistants API",
    descEn: "API for building assistants with tools, files and function calling.",
    descZh: "用于构建带工具、文件与函数调用能力的助手的 API。",
    url: "https://platform.openai.com",
    category: "framework",
    tags: ["platform", "api", "openai"],
    pricing: "freemium",
    logo: "plug",
    i18n: {
      desc: {
        "zh-TW": "用於構建帶工具、檔案與函式呼叫能力的助手的 API。",
        ja: "ツール・ファイル・関数呼び出しを備えたアシスタントを構築する API。",
        ru: "API для создания ассистентов с инструментами, файлами и вызовами функций.",
        ko: "도구, 파일, 함수 호출 기능을 갖춘 어시스턴트를 만드는 API입니다.",
        es: "API para crear asistentes con herramientas, archivos y llamadas a funciones.",
        fr: "API pour créer des assistants avec outils, fichiers et appels de fonctions.",
        de: "API zum Erstellen von Assistenten mit Tools, Dateien und Funktionsaufrufen.",
      },
    },
  },
  {
    type: "agent",
    nameEn: "Claude Code",
    nameZh: "Claude Code",
    descEn: "Anthropic's terminal agent that writes and edits code with you.",
    descZh: "Anthropic 的终端智能体，协助编写与修改代码。",
    url: "https://www.anthropic.com/claude-code",
    category: "code",
    tags: ["agent", "coding", "anthropic"],
    pricing: "freemium",
    logo: "terminal",
    featured: true,
    i18n: {
      desc: {
        "zh-TW": "Anthropic 的終端智慧體，協助編寫與修改程式碼。",
        ja: "Anthropic のターミナルエージェント。コードの作成・編集を支援。",
        ru: "Терминальный агент Anthropic, который пишет и редактирует код вместе с вами.",
        ko: "코드를 작성하고 편집하는 Anthropic의 터미널 에이전트입니다.",
        es: "Agente de terminal de Anthropic que escribe y edita código contigo.",
        fr: "Agent de terminal d'Anthropic qui écrit et modifie du code avec vous.",
        de: "Anthropics Terminal-Agent, der mit Ihnen Code schreibt und bearbeitet.",
      },
    },
  },
  {
    type: "agent",
    nameEn: "Manus",
    nameZh: "Manus",
    descEn: "General-purpose autonomous agent that completes tasks end-to-end.",
    descZh: "通用自主智能体，端到端完成任务。",
    url: "https://manus.im",
    category: "framework",
    tags: ["agent", "autonomous"],
    pricing: "freemium",
    logo: "bot",
    i18n: {
      desc: {
        "zh-TW": "通用自主智慧體，端到端完成任務。",
        ja: "汎用自律エージェント。タスクを端から端まで完遂。",
        ru: "Универсальный автономный агент, выполняющий задачи от начала до конца.",
        ko: "작업을 처음부터 끝까지 완수하는 범용 자율 에이전트입니다.",
        es: "Agente autónomo de propósito general que completa tareas de principio a fin.",
        fr: "Agent autonome généraliste qui exécute des tâches de bout en bout.",
        de: "Universeller autonomer Agent, der Aufgaben vollständig erledigt.",
      },
    },
  },
  {
    type: "agent",
    nameEn: "n8n",
    nameZh: "n8n",
    descEn: "Workflow automation platform with native AI agent nodes.",
    descZh: "带原生 AI 智能体节点的工作流自动化平台。",
    url: "https://n8n.io",
    category: "framework",
    tags: ["automation", "workflow", "open-source"],
    pricing: "free",
    logo: "workflow",
    i18n: {
      desc: {
        "zh-TW": "帶原生 AI 智慧體節點的工作流自動化平台。",
        ja: "ネイティブ AI エージェントノードを備えたワークフロー自動化プラットフォーム。",
        ru: "Платформа автоматизации рабочих процессов с нативными ИИ-агентными узлами.",
        ko: "네이티브 AI 에이전트 노드를 갖춘 워크플로 자동화 플랫폼입니다.",
        es: "Plataforma de automatización de flujos con nodos nativos de agentes de IA.",
        fr: "Plateforme d'automatisation de workflows avec des nœuds d'agents IA natifs.",
        de: "Workflow-Automatisierungsplattform mit nativen KI-Agenten-Knoten.",
      },
    },
  },

  // ============ 学习 Learning ============
  {
    type: "learning",
    nameEn: "Fast.ai",
    nameZh: "Fast.ai",
    descEn: "Free practical deep learning courses for coders of all levels.",
    descZh: "面向各类水平程序员的免费实用深度学习课程。",
    url: "https://www.fast.ai",
    category: "research",
    tags: ["course", "deep-learning"],
    pricing: "free",
    logo: "graduation",
    featured: true,
    i18n: {
      desc: {
        "zh-TW": "面向各類水平程式設計師的免費實用深度學習課程。",
        ja: "あらゆるレベルのプログラマ向け無料実践的ディープラーニング講座。",
        ru: "Бесплатные практические курсы глубокого обучения для программистов любого уровня.",
        ko: "모든 수준의 프로그래머를 위한 무료 실용 딥러닝 강좌입니다.",
        es: "Cursos gratuitos y prácticos de aprendizaje profundo para todos los niveles.",
        fr: "Cours de deep learning gratuits et pratiques pour tous les niveaux.",
        de: "Kostenlose praktische Deep-Learning-Kurse für alle Kenntnisstufen.",
      },
    },
  },
  {
    type: "learning",
    nameEn: "DeepLearning.AI",
    nameZh: "DeepLearning.AI",
    descEn: "Andrew Ng's platform with courses and specializations in AI.",
    descZh: "吴恩达创办的 AI 课程与专项平台。",
    url: "https://www.deeplearning.ai",
    category: "research",
    tags: ["course", "andrew-ng"],
    pricing: "free",
    logo: "graduation",
    featured: true,
    i18n: {
      desc: {
        "zh-TW": "吳恩達創辦的 AI 課程與專項平台。",
        ja: "Andrew Ng が創設した AI コース・専門講座プラットフォーム。",
        ru: "Платформа курсов и специализаций по ИИ от Эндрю Ына.",
        ko: "앤드류 응이 설립한 AI 강좌 및 스페셜리제이션 플랫폼입니다.",
        es: "Plataforma de Andrew Ng con cursos y especializaciones en IA.",
        fr: "Plateforme d'Andrew Ng avec cours et spécialisations en IA.",
        de: "Andrew Ngs Plattform mit KI-Kursen und Spezialisierungen.",
      },
    },
  },
  {
    type: "learning",
    nameEn: "Hugging Face Learn",
    nameZh: "Hugging Face Learn",
    descEn: "Hands-on tutorials for transformers, NLP and diffusion models.",
    descZh: "面向 Transformers、NLP 与扩散模型的实践教程。",
    url: "https://huggingface.co/learn",
    category: "research",
    tags: ["tutorial", "nlp", "transformers"],
    pricing: "free",
    logo: "book",
    i18n: {
      desc: {
        "zh-TW": "面向 Transformers、NLP 與擴散模型的實踐教學。",
        ja: "Transformers・NLP・拡散モデルの実践チュートリアル。",
        ru: "Практические руководства по трансформерам, NLP и диффузионным моделям.",
        ko: "트랜스포머, NLP, 확산 모델에 대한 실습 튜토리얼입니다.",
        es: "Tutoriales prácticos de transformers, NLP y modelos de difusión.",
        fr: "Tutoriels pratiques sur les transformers, le NLP et les modèles de diffusion.",
        de: "Praktische Tutorials zu Transformern, NLP und Diffusionsmodellen.",
      },
    },
  },
  {
    type: "learning",
    nameEn: "Kaggle Learn",
    nameZh: "Kaggle Learn",
    descEn: "Free micro-courses on ML, data and practical AI skills.",
    descZh: "机器学习与数据技能的免费微课程。",
    url: "https://www.kaggle.com/learn",
    category: "data",
    tags: ["course", "data"],
    pricing: "free",
    logo: "chart",
    i18n: {
      desc: {
        "zh-TW": "機器學習與資料技能的免費微課程。",
        ja: "機械学習・データスキルの無料マイクロコース。",
        ru: "Бесплатные микрокурсы по машинному обучению и работе с данными.",
        ko: "머신러닝과 데이터 기술에 대한 무료 마이크로 강좌입니다.",
        es: "Microcursos gratuitos sobre ML, datos y habilidades prácticas de IA.",
        fr: "Micro-cours gratuits sur le ML, les données et les compétences IA.",
        de: "Kostenlose Mikrokurse zu ML, Daten und praktischen KI-Fähigkeiten.",
      },
    },
  },
  {
    type: "learning",
    nameEn: "Papers with Code",
    nameZh: "Papers with Code",
    descEn: "Research papers linked with their code and benchmark results.",
    descZh: "关联代码与基准结果的研究论文索引。",
    url: "https://paperswithcode.com",
    category: "research",
    tags: ["papers", "research"],
    pricing: "free",
    logo: "file",
    i18n: {
      desc: {
        "zh-TW": "關聯程式碼與基準結果的研究論文索引。",
        ja: "コードとベンチマーク結果を紐付けた研究論文の索引。",
        ru: "Индекс научных статей с привязкой к коду и результатам бенчмарков.",
        ko: "코드와 벤치마크 결과를 연결한 연구 논문 색인입니다.",
        es: "Índice de artículos de investigación vinculados a su código y resultados.",
        fr: "Index d'articles de recherche liés à leur code et résultats de référence.",
        de: "Index von Forschungsarbeiten, verknüpft mit Code und Benchmark-Ergebnissen.",
      },
    },
  },
  {
    type: "learning",
    nameEn: "arXiv cs.AI",
    nameZh: "arXiv cs.AI",
    descEn: "Open-access preprint archive for the latest AI research.",
    descZh: "最新 AI 研究的开放获取预印本库。",
    url: "https://arxiv.org/list/cs.AI/recent",
    category: "research",
    tags: ["papers", "research"],
    pricing: "free",
    logo: "book",
    i18n: {
      desc: {
        "zh-TW": "最新 AI 研究的開放取得預印本庫。",
        ja: "最新 AI 研究のオープンアクセスプレプリントアーカイブ。",
        ru: "Открытый архив препринтов новейших исследований по ИИ.",
        ko: "최신 AI 연구를 위한 오픈 액세스 프리프린트 아카이브입니다.",
        es: "Archivo de preprints de acceso abierto para la investigación más reciente en IA.",
        fr: "Archive de prépublications en accès libre pour les dernières recherches en IA.",
        de: "Offen zugängliches Preprint-Archiv für aktuelle KI-Forschung.",
      },
    },
  },
  {
    type: "learning",
    nameEn: "Prompt Engineering Guide",
    nameZh: "Prompt 工程指南",
    descEn: "Comprehensive guide to prompting techniques for LLMs.",
    descZh: "面向大语言模型的 Prompt 技巧综合指南。",
    url: "https://www.promptingguide.ai",
    category: "writing",
    tags: ["prompt", "guide"],
    pricing: "free",
    logo: "writing",
    i18n: {
      desc: {
        "zh-TW": "面向大語言模型的 Prompt 技巧綜合指南。",
        ja: "LLM のプロンプト技法を網羅した総合ガイド。",
        ru: "Подробное руководство по техникам промптинга для LLM.",
        ko: "LLM을 위한 프롬프트 기법 종합 가이드입니다.",
        es: "Guía completa de técnicas de prompting para LLM.",
        fr: "Guide complet des techniques de prompt pour les LLM.",
        de: "Umfassender Leitfaden zu Prompting-Techniken für LLMs.",
      },
    },
  },
  {
    type: "learning",
    nameEn: "OpenAI Cookbook",
    nameZh: "OpenAI Cookbook",
    descEn: "Example code and guides for building with OpenAI's APIs.",
    descZh: "使用 OpenAI API 构建应用的示例代码与指南。",
    url: "https://cookbook.openai.com",
    category: "code",
    tags: ["tutorial", "openai", "code"],
    pricing: "free",
    logo: "book",
    i18n: {
      desc: {
        "zh-TW": "使用 OpenAI API 構建應用的範例程式碼與指南。",
        ja: "OpenAI API を使ったアプリ構築のサンプルコードとガイド。",
        ru: "Примеры кода и руководства по созданию приложений с API OpenAI.",
        ko: "OpenAI API로 애플리케이션을 만드는 예제 코드와 가이드입니다.",
        es: "Códigos de ejemplo y guías para crear con las APIs de OpenAI.",
        fr: "Exemples de code et guides pour construire avec les API d'OpenAI.",
        de: "Beispielcode und Anleitungen zum Bauen mit den APIs von OpenAI.",
      },
    },
  },
  {
    type: "learning",
    nameEn: "Learn Prompting",
    nameZh: "Learn Prompting",
    descEn: "Free, structured course on prompt engineering and AI safety.",
    descZh: "免费的 Prompt 工程与 AI 安全结构化课程。",
    url: "https://learnprompting.org",
    category: "writing",
    tags: ["prompt", "guide"],
    pricing: "free",
    logo: "flask",
    i18n: {
      desc: {
        "zh-TW": "免費的 Prompt 工程與 AI 安全結構化課程。",
        ja: "Prompt エンジニアリングと AI 安全性の無料体系講座。",
        ru: "Бесплатный структурированный курс по промпт-инжинирингу и безопасности ИИ.",
        ko: "프롬프트 엔지니어링과 AI 안전에 대한 무료 체계적 강좌입니다.",
        es: "Curso gratuito y estructurado de ingeniería de prompts y seguridad de IA.",
        fr: "Cours structuré gratuit sur le prompt engineering et la sécurité de l'IA.",
        de: "Kostenloser strukturierter Kurs zu Prompt-Engineering und KI-Sicherheit.",
      },
    },
  },
  {
    type: "learning",
    nameEn: "MIT OpenCourseWare AI",
    nameZh: "MIT 公开课 AI",
    descEn: "MIT's free university-level AI and ML course materials.",
    descZh: "MIT 的免费大学级 AI 与机器学习课程资料。",
    url: "https://ocw.mit.edu",
    category: "research",
    tags: ["course", "mit"],
    pricing: "free",
    logo: "landmark",
    i18n: {
      name: { "zh-TW": "MIT 公開課 AI" },
      desc: {
        "zh-TW": "MIT 的免費大學級 AI 與機器學習課程資料。",
        ja: "MIT の無料大学レベルの AI・機械学習コース教材。",
        ru: "Бесплатные университетские материалы MIT по ИИ и машинному обучению.",
        ko: "MIT의 무료 대학 수준 AI 및 머신러닝 강좌 자료입니다.",
        es: "Materiales gratuitos de cursos universitarios de IA y ML del MIT.",
        fr: "Supports de cours universitaires gratuits du MIT sur l'IA et le ML.",
        de: "Kostenlose universitäre Kursmaterialien des MIT zu KI und ML.",
      },
    },
  },
  {
    type: "learning",
    nameEn: "Anthropic Prompt Engineering",
    nameZh: "Anthropic Prompt 工程",
    descEn: "Official interactive guide to prompting Claude effectively.",
    descZh: "官方交互式指南，教你高效使用 Claude。",
    url: "https://docs.anthropic.com",
    category: "writing",
    tags: ["prompt", "guide", "anthropic"],
    pricing: "free",
    logo: "book",
    i18n: {
      desc: {
        "zh-TW": "官方互動式指南，教你高效使用 Claude。",
        ja: "Claude を効果的に使うための公式インタラクティブガイド。",
        ru: "Официальное интерактивное руководство по эффективному промптингу Claude.",
        ko: "Claude를 효과적으로 사용하는 방법을 알려주는 공식 인터랙티브 가이드입니다.",
        es: "Guía interactiva oficial para usar Claude de forma eficaz.",
        fr: "Guide interactif officiel pour utiliser efficacement Claude.",
        de: "Offizieller interaktiver Leitfaden für effektives Prompting von Claude.",
      },
    },
  },
  {
    type: "learning",
    nameEn: "GitHub ML Topics",
    nameZh: "GitHub 机器学习专题",
    descEn: "Curated list of popular open-source ML repositories.",
    descZh: "精选的热门开源机器学习仓库列表。",
    url: "https://github.com/topics/machine-learning",
    category: "code",
    tags: ["github", "resources", "open-source"],
    pricing: "free",
    logo: "git",
    i18n: {
      name: { "zh-TW": "GitHub 機器學習專題" },
      desc: {
        "zh-TW": "精選的熱門開源機器學習倉庫列表。",
        ja: "人気オープンソース ML リポジトリの厳選リスト。",
        ru: "Курируемый список популярных репозиториев ML с открытым кодом.",
        ko: "인기 오픈소스 ML 저장소를 모아둔 큐레이션 목록입니다.",
        es: "Lista curada de repositorios populares de ML de código abierto.",
        fr: "Liste organisée de dépôts ML open source populaires.",
        de: "Kuratierte Liste beliebter Open-Source-ML-Repositories.",
      },
    },
  },

  // ============ 工具 Tools（第二批） ============
  {
    type: "tool",
    nameEn: "Luma Dream Machine",
    nameZh: "Luma Dream Machine",
    descEn: "Fast, high-quality AI video generator from Luma Labs.",
    descZh: "Luma Labs 推出的高速高质量 AI 视频生成器。",
    url: "https://lumalabs.ai/dream-machine",
    category: "video",
    tags: ["video", "generation"],
    pricing: "freemium",
    logo: "video",
    i18n: {
      desc: {
        "zh-TW": "Luma Labs 推出的高速高品質 AI 影片生成器。",
        ja: "Luma Labs の高速・高品質 AI 動画生成ツール。",
        ru: "Быстрый и качественный генератор видео с ИИ от Luma Labs.",
        ko: "Luma Labs의 빠르고 고품질인 AI 비디오 생성기입니다.",
        es: "Generador de vídeo con IA rápido y de alta calidad de Luma Labs.",
        fr: "Générateur vidéo IA rapide et de haute qualité de Luma Labs.",
        de: "Schneller, hochwertiger KI-Videogenerator von Luma Labs.",
      },
    },
  },
  {
    type: "tool",
    nameEn: "Kling AI",
    nameZh: "可灵 Kling",
    descEn: "Kuaishou's AI video and image generation platform.",
    descZh: "快手推出的 AI 视频与图像生成平台。",
    url: "https://klingai.com",
    category: "video",
    tags: ["video", "image", "generation"],
    pricing: "freemium",
    logo: "video",
    i18n: {
      name: { "zh-TW": "可靈 Kling" },
      desc: {
        "zh-TW": "快手推出的 AI 影片與圖像生成平台。",
        ja: "Kuaishou の AI 動画・画像生成プラットフォーム。",
        ru: "Платформа генерации видео и изображений с ИИ от Kuaishou.",
        ko: "콰이쇼우의 AI 비디오 및 이미지 생성 플랫폼입니다.",
        es: "Plataforma de generación de vídeo e imagen con IA de Kuaishou.",
        fr: "Plateforme de génération vidéo et image IA de Kuaishou.",
        de: "KI-Video- und Bildgenerierungsplattform von Kuaishou.",
      },
    },
  },
  {
    type: "tool",
    nameEn: "HeyGen",
    nameZh: "HeyGen",
    descEn: "AI avatar video generation for talking-head and localization.",
    descZh: "AI 数字人视频生成，用于口播与视频本地化。",
    url: "https://www.heygen.com",
    category: "video",
    tags: ["video", "avatar", "localization"],
    pricing: "freemium",
    logo: "video",
    i18n: {
      desc: {
        "zh-TW": "AI 數位人影片生成，用於口播與影片本地化。",
        ja: "AI アバター動画生成。ナレーション動画とローカライズ向け。",
        ru: "Генерация видео с ИИ-аватарами для озвучки и локализации.",
        ko: "토킹헤드와 현지화를 위한 AI 아바타 비디오 생성 도구입니다.",
        es: "Generación de vídeo con avatares de IA para locución y localización.",
        fr: "Génération de vidéos d'avatars IA pour la voix off et la localisation.",
        de: "KI-Avatar-Videoerzeugung für Sprechervideos und Lokalisierung.",
      },
    },
  },
  {
    type: "tool",
    nameEn: "Ideogram",
    nameZh: "Ideogram",
    descEn: "AI image generator with strong text-rendering in images.",
    descZh: "擅长在图像中精准渲染文字的 AI 图像生成器。",
    url: "https://ideogram.ai",
    category: "image",
    tags: ["image", "typography"],
    pricing: "freemium",
    logo: "image",
    i18n: {
      desc: {
        "zh-TW": "擅長在圖像中精準渲染文字的 AI 圖像生成器。",
        ja: "画像内のテキスト描画に強い AI 画像生成ツール。",
        ru: "Генератор изображений с ИИ, точно отображающий текст на картинках.",
        ko: "이미지 안에 텍스트를 정확히 렌더링하는 AI 이미지 생성기입니다.",
        es: "Generador de imágenes con IA con gran renderizado de texto.",
        fr: "Générateur d'images IA avec un excellent rendu du texte.",
        de: "KI-Bildgenerator mit starker Textdarstellung in Bildern.",
      },
    },
  },
  {
    type: "tool",
    nameEn: "NotebookLM",
    nameZh: "NotebookLM",
    descEn: "Google's AI research assistant grounded in your documents.",
    descZh: "谷歌基于你上传文档的 AI 研究助手。",
    url: "https://notebooklm.google.com",
    category: "research",
    tags: ["research", "notes", "google"],
    pricing: "free",
    logo: "book",
    i18n: {
      desc: {
        "zh-TW": "Google 基於你上傳文件的 AI 研究助手。",
        ja: "あなたの文書に基づく Google の AI リサーチアシスタント。",
        ru: "ИИ-ассистент Google для исследований на основе ваших документов.",
        ko: "사용자의 문서를 기반으로 하는 Google의 AI 연구 어시스턴트입니다.",
        es: "Asistente de investigación con IA de Google basado en tus documentos.",
        fr: "Assistant de recherche IA de Google fondé sur vos documents.",
        de: "Googles KI-Rechercheassistent, der auf Ihren Dokumenten basiert.",
      },
    },
  },
  {
    type: "tool",
    nameEn: "Consensus",
    nameZh: "Consensus",
    descEn: "AI search engine that answers questions with academic papers.",
    descZh: "基于学术论文回答问题的 AI 搜索引擎。",
    url: "https://consensus.app",
    category: "search",
    tags: ["search", "research", "papers"],
    pricing: "freemium",
    logo: "search",
    i18n: {
      desc: {
        "zh-TW": "基於學術論文回答問題的 AI 搜尋引擎。",
        ja: "学術論文に基づいて質問に答える AI 検索エンジン。",
        ru: "ИИ-поисковик, отвечающий на вопросы на основе научных статей.",
        ko: "학술 논문을 바탕으로 질문에 답하는 AI 검색 엔진입니다.",
        es: "Motor de búsqueda con IA que responde con artículos académicos.",
        fr: "Moteur de recherche IA qui répond à partir d'articles académiques.",
        de: "KI-Suchmaschine, die Fragen mit wissenschaftlichen Arbeiten beantwortet.",
      },
    },
  },
  {
    type: "tool",
    nameEn: "Gamma",
    nameZh: "Gamma",
    descEn: "AI-powered tool for generating presentations and documents.",
    descZh: "AI 驱动的演示文稿与文档生成工具。",
    url: "https://gamma.app",
    category: "productivity",
    tags: ["presentation", "productivity"],
    pricing: "freemium",
    logo: "chart",
    i18n: {
      desc: {
        "zh-TW": "AI 驅動的簡報與文件生成工具。",
        ja: "AI でプレゼン資料や文書を生成するツール。",
        ru: "Инструмент на базе ИИ для создания презентаций и документов.",
        ko: "프레젠테이션과 문서를 생성하는 AI 기반 도구입니다.",
        es: "Herramienta con IA para generar presentaciones y documentos.",
        fr: "Outil IA pour générer des présentations et des documents.",
        de: "KI-gestütztes Tool zum Erstellen von Präsentationen und Dokumenten.",
      },
    },
  },
  {
    type: "tool",
    nameEn: "v0 by Vercel",
    nameZh: "v0（Vercel）",
    descEn: "AI tool that generates UI code from text prompts.",
    descZh: "通过文字描述生成界面代码的 AI 工具。",
    url: "https://v0.dev",
    category: "code",
    tags: ["code", "ui", "generation"],
    pricing: "freemium",
    logo: "code",
    i18n: {
      desc: {
        "zh-TW": "透過文字描述生成介面程式碼的 AI 工具。",
        ja: "テキストから UI コードを生成する AI ツール。",
        ru: "ИИ-инструмент, генерирующий код интерфейса по текстовым запросам.",
        ko: "텍스트 프롬프트로 UI 코드를 생성하는 AI 도구입니다.",
        es: "Herramienta de IA que genera código de interfaz a partir de texto.",
        fr: "Outil IA qui génère du code d'interface à partir de texte.",
        de: "KI-Tool, das UI-Code aus Text-Prompts erzeugt.",
      },
    },
  },
  {
    type: "tool",
    nameEn: "Bolt.new",
    nameZh: "Bolt.new",
    descEn: "Prompt-based AI tool for building full-stack web apps in the browser.",
    descZh: "在浏览器里通过提示词构建全栈应用的 AI 工具。",
    url: "https://bolt.new",
    category: "code",
    tags: ["code", "web", "generation"],
    pricing: "freemium",
    logo: "zap",
    i18n: {
      desc: {
        "zh-TW": "在瀏覽器裡透過提示詞構建全端應用的 AI 工具。",
        ja: "ブラウザ内でプロンプトからフルスタック Web アプリを構築する AI ツール。",
        ru: "ИИ-инструмент для создания фулстек-приложений в браузере по промптам.",
        ko: "브라우저에서 프롬프트로 풀스택 웹 앱을 만드는 AI 도구입니다.",
        es: "Herramienta de IA para crear apps web full-stack en el navegador con prompts.",
        fr: "Outil IA pour créer des apps web full-stack dans le navigateur via des prompts.",
        de: "KI-Tool zum Erstellen von Full-Stack-Web-Apps im Browser per Prompt.",
      },
    },
  },
  {
    type: "tool",
    nameEn: "Windsurf",
    nameZh: "Windsurf",
    descEn: "Agentic AI code editor built for collaborative coding.",
    descZh: "面向协作编程的智能体式 AI 代码编辑器。",
    url: "https://windsurf.com",
    category: "code",
    tags: ["code", "ide", "ai"],
    pricing: "freemium",
    logo: "waves",
    i18n: {
      desc: {
        "zh-TW": "面向協作程式設計的智慧體式 AI 程式碼編輯器。",
        ja: "共同コーディング向けのエージェント型 AI コードエディター。",
        ru: "Агентный ИИ-редактор кода для совместной разработки.",
        ko: "협업 코딩을 위해 설계된 에이전트형 AI 코드 편집기입니다.",
        es: "Editor de código con IA agéntica para programación colaborativa.",
        fr: "Éditeur de code IA agentique conçu pour le codage collaboratif.",
        de: "Agentischer KI-Code-Editor für kollaboratives Programmieren.",
      },
    },
  },

  // ============ 模型 Models（第二批） ============
  {
    type: "model",
    nameEn: "Grok",
    nameZh: "Grok",
    descEn: "xAI's model family with real-time access to the X platform.",
    descZh: "xAI 的模型家族，可实时访问 X 平台信息。",
    url: "https://grok.com",
    category: "chat",
    tags: ["llm", "xai"],
    pricing: "freemium",
    logo: "rocket",
    i18n: {
      desc: {
        "zh-TW": "xAI 的模型家族，可即時存取 X 平台資訊。",
        ja: "xAI のモデルファミリー。X プラットフォームへリアルタイムアクセス。",
        ru: "Семейство моделей xAI с доступом к платформе X в реальном времени.",
        ko: "X 플랫폼 정보에 실시간 접근하는 xAI의 모델 제품군입니다.",
        es: "Familia de modelos de xAI con acceso en tiempo real a la plataforma X.",
        fr: "Famille de modèles de xAI avec accès en temps réel à la plateforme X.",
        de: "xAIs Modellfamilie mit Echtzeitzugriff auf die X-Plattform.",
      },
    },
  },
  {
    type: "model",
    nameEn: "Kimi",
    nameZh: "Kimi",
    descEn: "Moonshot AI's model with strong long-context reasoning.",
    descZh: "月之暗面推出的长上下文推理模型。",
    url: "https://kimi.com",
    category: "chat",
    tags: ["llm", "long-context"],
    pricing: "free",
    logo: "brain",
    i18n: {
      desc: {
        "zh-TW": "月之暗面推出的長上下文推理模型。",
        ja: "Moonshot AI の長文コンテキスト推論モデル。",
        ru: "Модель Moonshot AI с сильным мышлением на длинном контексте.",
        ko: "강력한 긴 컨텍스트 추론 능력을 갖춘 Moonshot AI의 모델입니다.",
        es: "Modelo de Moonshot AI con gran razonamiento de contexto largo.",
        fr: "Modèle de Moonshot AI avec un fort raisonnement à long contexte.",
        de: "Moonshot-AI-Modell mit starker Langkontext-Argumentation.",
      },
    },
  },
  {
    type: "model",
    nameEn: "GLM",
    nameZh: "智谱 GLM",
    descEn: "Zhipu AI's open model family spanning language and multimodal.",
    descZh: "智谱 AI 的开源模型家族，覆盖语言与多模态。",
    url: "https://bigmodel.cn",
    category: "chat",
    tags: ["llm", "open-source", "zhipu"],
    pricing: "free",
    logo: "brain",
    i18n: {
      name: { "zh-TW": "智譜 GLM" },
      desc: {
        "zh-TW": "智譜 AI 的開源模型家族，涵蓋語言與多模態。",
        ja: "Zhipu AI のオープンウェイトモデルファミリー。言語とマルチモーダルを網羅。",
        ru: "Открытое семейство моделей Zhipu AI, охватывающее язык и мультимодальность.",
        ko: "언어와 멀티모달을 아우르는 Zhipu AI의 오픈 모델 제품군입니다.",
        es: "Familia de modelos abiertos de Zhipu AI que abarca lenguaje y multimodal.",
        fr: "Famille de modèles ouverts de Zhipu AI couvrant langage et multimodal.",
        de: "Offene Modellfamilie von Zhipu AI für Sprache und Multimodalität.",
      },
    },
  },

  // ============ Agent（第二批） ============
  {
    type: "agent",
    nameEn: "Devin",
    nameZh: "Devin",
    descEn: "Cognition's autonomous AI software engineer.",
    descZh: "Cognition 推出的自主 AI 软件工程师。",
    url: "https://www.cognition.ai",
    category: "code",
    tags: ["agent", "coding", "autonomous"],
    pricing: "paid",
    logo: "code",
    i18n: {
      desc: {
        "zh-TW": "Cognition 推出的自主 AI 軟體工程師。",
        ja: "Cognition の自律型 AI ソフトウェアエンジニア。",
        ru: "Автономный ИИ-инженер-программист от Cognition.",
        ko: "Cognition의 자율 AI 소프트웨어 엔지니어입니다.",
        es: "Ingeniero de software autónomo con IA de Cognition.",
        fr: "Ingénieur logiciel IA autonome de Cognition.",
        de: "Autonomer KI-Softwareentwickler von Cognition.",
      },
    },
  },
  {
    type: "agent",
    nameEn: "Operator",
    nameZh: "Operator",
    descEn: "OpenAI's agent that browses the web and completes tasks for you.",
    descZh: "OpenAI 的智能体，可浏览网页并替你完成任务。",
    url: "https://openai.com/index/introducing-operator/",
    category: "framework",
    tags: ["agent", "browser", "openai"],
    pricing: "freemium",
    logo: "terminal",
    i18n: {
      desc: {
        "zh-TW": "OpenAI 的智慧體，可瀏覽網頁並替你完成任務。",
        ja: "OpenAI のエージェント。ウェブを閲覧し、あなたの代わりにタスクを実行。",
        ru: "Агент OpenAI, который просматривает веб и выполняет задачи за вас.",
        ko: "웹을 탐색하고 대신 작업을 완료하는 OpenAI의 에이전트입니다.",
        es: "Agente de OpenAI que navega por la web y completa tareas por ti.",
        fr: "Agent d'OpenAI qui navigue sur le web et accomplit des tâches pour vous.",
        de: "OpenAIs Agent, der im Web surft und Aufgaben für Sie erledigt.",
      },
    },
  },
  {
    type: "agent",
    nameEn: "Zapier Agents",
    nameZh: "Zapier Agents",
    descEn: "Build AI agents that automate tasks across thousands of apps.",
    descZh: "构建 AI 智能体，在数千款应用间自动化任务。",
    url: "https://zapier.com/agents",
    category: "framework",
    tags: ["automation", "agent", "no-code"],
    pricing: "freemium",
    logo: "workflow",
    i18n: {
      desc: {
        "zh-TW": "構建 AI 智慧體，在數千款應用間自動化任務。",
        ja: "数千のアプリ間でタスクを自動化する AI エージェントを構築。",
        ru: "Создавайте ИИ-агентов для автоматизации задач в тысячах приложений.",
        ko: "수천 개의 앱에서 작업을 자동화하는 AI 에이전트를 만듭니다.",
        es: "Crea agentes de IA que automatizan tareas en miles de aplicaciones.",
        fr: "Créez des agents IA qui automatisent des tâches entre des milliers d'apps.",
        de: "Erstellen Sie KI-Agenten, die Aufgaben über Tausende Apps automatisieren.",
      },
    },
  },

  // ============ 学习 Learning（第二批） ============
  {
    type: "learning",
    nameEn: "Andrej Karpathy",
    nameZh: "Andrej Karpathy",
    descEn: "Legendary AI educator; his 'Neural Networks: Zero to Hero' is a must-watch.",
    descZh: "传奇AI教育者，其《Neural Networks: Zero to Hero》必看。",
    url: "https://karpathy.ai",
    category: "research",
    tags: ["course", "deep-learning", "video"],
    pricing: "free",
    logo: "video",
    featured: true,
    i18n: {
      desc: {
        "zh-TW": "傳奇 AI 教育者，其《Neural Networks: Zero to Hero》必看。",
        ja: "伝説の AI 教育者。『Neural Networks: Zero to Hero』は必見。",
        ru: "Легендарный преподаватель ИИ; его курс «Neural Networks: Zero to Hero» обязателен к просмотру.",
        ko: "전설적인 AI 교육자로, 'Neural Networks: Zero to Hero'가 필수 시청작입니다.",
        es: "Educador legendario de IA; su \"Neural Networks: Zero to Hero\" es imprescindible.",
        fr: "Éducateur IA légendaire ; son « Neural Networks: Zero to Hero » est incontournable.",
        de: "Legendärer KI-Vermittler; sein \"Neural Networks: Zero to Hero\" ist ein Muss.",
      },
    },
  },
  {
    type: "learning",
    nameEn: "3Blue1Brown",
    nameZh: "3Blue1Brown",
    descEn: "Beautiful visual explanations of math, neural networks and transformers.",
    descZh: "用精美动画讲解数学、神经网络与 Transformer。",
    url: "https://www.3blue1brown.com",
    category: "research",
    tags: ["video", "math", "neural-networks"],
    pricing: "free",
    logo: "palette",
    i18n: {
      desc: {
        "zh-TW": "用精美動畫講解數學、神經網路與 Transformer。",
        ja: "数学・ニューラルネットワーク・Transformer を美しいアニメで解説。",
        ru: "Красивые визуальные объяснения математики, нейросетей и трансформеров.",
        ko: "수학, 신경망, 트랜스포머를 아름다운 애니메이션으로 설명합니다.",
        es: "Bellas explicaciones visuales de matemáticas, redes neuronales y transformers.",
        fr: "Magnifiques explications visuelles des mathématiques, réseaux de neurones et transformers.",
        de: "Wunderschöne visuelle Erklärungen zu Mathematik, neuronalen Netzen und Transformern.",
      },
    },
  },
  {
    type: "learning",
    nameEn: "Stanford CS224N",
    nameZh: "斯坦福 CS224N",
    descEn: "Stanford's classic NLP with deep learning course.",
    descZh: "斯坦福经典课程：深度学习与自然语言处理。",
    url: "https://web.stanford.edu/class/cs224n/",
    category: "research",
    tags: ["course", "nlp", "stanford"],
    pricing: "free",
    logo: "landmark",
    i18n: {
      name: { "zh-TW": "史丹佛 CS224N" },
      desc: {
        "zh-TW": "史丹佛經典課程：深度學習與自然語言處理。",
        ja: "スタンフォードの定番 NLP 深層学習コース。",
        ru: "Классический курс Стэнфорда по NLP с глубоким обучением.",
        ko: "스탠퍼드의 고전적인 딥러닝 기반 NLP 강좌입니다.",
        es: "Curso clásico de Stanford sobre NLP con aprendizaje profundo.",
        fr: "Cours classique de Stanford sur le NLP avec deep learning.",
        de: "Stanfords klassischer Kurs zu NLP mit Deep Learning.",
      },
    },
  },

  // ============ Skill ============
  {
    type: "skill",
    nameEn: "Claude Skills",
    nameZh: "Claude Skills",
    descEn: "Anthropic's system for packaging reusable instructions and capabilities for Claude Code agents.",
    descZh: "Anthropic 的可复用能力封装系统，为 Claude Code 智能体提供即插即用的技能。",
    url: "https://docs.anthropic.com/en/docs/claude-code/skills",
    category: "framework",
    tags: ["skill", "claude", "agent"],
    pricing: "free",
    logo: "wand",
    featured: true,
  },
  {
    type: "skill",
    nameEn: "OpenAI GPTs",
    nameZh: "OpenAI GPTs",
    descEn: "Custom versions of ChatGPT tailored to specific tasks, shareable with others.",
    descZh: "针对特定任务定制的 ChatGPT 版本，可分享给他人使用。",
    url: "https://openai.com/chatgpt/use-cases/gpts/",
    category: "framework",
    tags: ["skill", "gpt", "openai"],
    pricing: "freemium",
    logo: "bot",
  },
  {
    type: "skill",
    nameEn: "Gemini Gems",
    nameZh: "Gemini Gems",
    descEn: "Google's custom Gemini assistants for specific tasks, with reusable instructions.",
    descZh: "谷歌的自定义 Gemini 助手，针对特定任务并提供可复用的指令。",
    url: "https://gemini.google.com/gems",
    category: "framework",
    tags: ["skill", "gemini", "google"],
    pricing: "freemium",
    logo: "gem",
  },
  {
    type: "skill",
    nameEn: "Poe Bots",
    nameZh: "Poe Bots",
    descEn: "Create and share custom AI bots powered by many models on the Poe platform.",
    descZh: "在 Poe 平台上创建并分享由多种模型驱动的自定义 AI 机器人。",
    url: "https://poe.com",
    category: "framework",
    tags: ["skill", "bot", "platform"],
    pricing: "freemium",
    logo: "bot",
  },
  {
    type: "skill",
    nameEn: "Microsoft Copilot Studio",
    nameZh: "Microsoft Copilot Studio",
    descEn: "Microsoft's low-code platform for building custom copilots and agent skills.",
    descZh: "微软的低代码平台，用于构建自定义 Copilot 与智能体技能。",
    url: "https://www.microsoft.com/microsoft-copilot/copilot-studio",
    category: "framework",
    tags: ["skill", "microsoft", "low-code"],
    pricing: "freemium",
    logo: "wand",
  },
];

export const seedPosts: SeedPost[] = [
  {
    slug: "welcome-to-ai-valley",
    titleEn: "Welcome to AI Valley",
    titleZh: "欢迎来到 AI Valley",
    contentEn: `AI Valley is a hand-curated hub for the best AI resources.

We bring together **tools**, **models**, **agents** and **learning materials** in one place, so you can spend less time searching and more time building.

## What you'll find

- **Tools** — the apps you use every day, from ChatGPT to Midjourney.
- **Models** — the underlying models that power them.
- **Agents** — frameworks and platforms for building autonomous systems.
- **Learning** — courses, papers and guides to level up your AI skills.

Happy exploring!`,
    contentZh: `AI Valley 是一个精心整理的 AI 资源中心。

我们把 **工具**、**模型**、**Agent** 和 **学习资料** 汇集到一处，让你少花时间搜索、多花时间创造。

## 你能找到什么

- **工具** —— 你每天都在用的应用，从 ChatGPT 到 Midjourney。
- **模型** —— 驱动这些应用的底层模型。
- **Agent** —— 构建自主系统的框架与平台。
- **学习** —— 助你提升 AI 技能的课程、论文与指南。

祝你探索愉快！`,
  },
  {
    slug: "how-to-choose-an-ai-tool",
    titleEn: "How to choose an AI tool",
    titleZh: "如何选择一款 AI 工具",
    contentEn: `The AI landscape moves fast. Here's a simple framework for choosing the right tool.

## 1. Define your task

Are you writing, coding, generating images, or automating a workflow? Start from the job, not the tool.

## 2. Check the pricing

Many tools are **freemium** — free to start, paid for power use. Match the plan to how often you'll actually use it.

## 3. Test quickly

Give the tool a real task and judge the output. If it doesn't feel right in five minutes, move on.

There's no single best tool — only the one that fits your workflow.`,
    contentZh: `AI 领域变化很快。这里有一个简单的框架，帮你选出合适的工具。

## 1. 明确你的任务

你是要写作、编程、生成图像，还是自动化工作流？从任务出发，而不是从工具出发。

## 2. 看清价格

很多工具是 **部分免费**——先免费入门，深度使用再付费。让套餐匹配你的真实使用频率。

## 3. 快速试用

给工具一个真实任务，检验输出质量。五分钟内感觉不对，就换下一个。

没有唯一最好的工具——只有最适合你工作流的那个。`,
  },
  {
    slug: "what-is-an-ai-agent",
    titleEn: "What is an AI agent?",
    titleZh: "什么是 AI Agent？",
    contentEn: `An **agent** is an AI system that can plan and act toward a goal, not just answer a question.

## Key ingredients

- **Reasoning** — the ability to break a goal into steps.
- **Tools** — calling APIs, running code, or browsing the web.
- **Memory** — remembering context across a task.

Frameworks like LangChain and CrewAI make it easier to build agents, while platforms like Dify and Coze let you build them with little code.

Agents are still evolving, but they point toward AI that gets things *done*.`,
    contentZh: `**Agent（智能体）** 是能够为达成目标而规划并行动的 AI 系统，而不只是回答问题。

## 关键要素

- **推理** —— 把目标拆解成步骤的能力。
- **工具** —— 调用 API、运行代码或浏览网页。
- **记忆** —— 在任务中记住上下文。

像 LangChain、CrewAI 这样的框架让构建智能体更简单，而 Dify、Coze 等平台让你几乎不用写代码就能搭建。

智能体仍在进化，但它们指向了能真正 *办事* 的 AI。`,
  },
  {
    slug: "getting-started-with-ai-tools",
    titleEn: "Getting started with AI tools",
    titleZh: "AI 工具入门指南",
    contentEn: `New to AI? Here's a no-nonsense path to getting productive fast.

## Start with a chatbot

Pick **one** general assistant — ChatGPT, Claude or Gemini — and use it daily. Ask it to write emails, summarize text, explain concepts, and brainstorm ideas.

## Try one specialist tool

Once comfortable, add a tool for a specific job:

- **Writing** → Grammarly or an AI writing assistant.
- **Images** → Midjourney or Ideogram.
- **Code** → GitHub Copilot or Cursor.

## Build a habit

The people who get the most from AI are those who use it consistently. Block 10 minutes a day to solve a real problem with AI.

You don't need to learn every tool — just the ones that fit *your* work.`,
    contentZh: `刚接触 AI？这是一条能让你快速上手、少走弯路的路径。

## 先从一个聊天助手开始

选**一个**通用助手——ChatGPT、Claude 或 Gemini——每天使用。让它帮你写邮件、总结文本、解释概念、头脑风暴。

## 再尝试一个专业工具

熟练之后，为具体任务加一个专用工具：

- **写作** → Grammarly 或 AI 写作助手。
- **图像** → Midjourney 或 Ideogram。
- **编程** → GitHub Copilot 或 Cursor。

## 养成习惯

从 AI 中获益最多的人，是持续使用它的人。每天抽出 10 分钟，用 AI 解决一个真实问题。

你不需要学会每个工具——只需要掌握适合*你*工作的那几个。`,
  },
  {
    slug: "open-source-vs-closed-ai-models",
    titleEn: "Open-source vs closed AI models",
    titleZh: "开源模型 vs 闭源模型",
    contentEn: `When choosing an AI model, one of the first questions is: open or closed?

## Closed models

**Examples:** GPT-4o, Claude, Gemini.

- ✅ Best performance out of the box.
- ✅ Hosted and easy to use via API.
- ❌ You can't see the weights or self-host.

## Open-weight models

**Examples:** Llama, DeepSeek, Qwen, Mistral.

- ✅ You can download, fine-tune and self-host.
- ✅ Full control over data and cost.
- ❌ Usually requires more setup and hardware.

## Which should you choose?

Start with a **closed** model for quality and speed. Move to an **open** model when you need privacy, customisation or lower cost at scale.

Many teams use both — closed models for prototyping, open models for production.`,
    contentZh: `选择 AI 模型时，第一个问题往往是：开源还是闭源？

## 闭源模型

**代表：** GPT-4o、Claude、Gemini。

- ✅ 开箱即用，性能最佳。
- ✅ 托管服务，通过 API 轻松使用。
- ❌ 无法查看权重，也不能自部署。

## 开源权重模型

**代表：** Llama、DeepSeek、Qwen、Mistral。

- ✅ 可下载、微调、自部署。
- ✅ 对数据与成本拥有完全控制权。
- ❌ 通常需要更多配置与硬件。

## 该怎么选？

先用**闭源**模型，获得质量与速度；当你需要隐私、定制或规模化低成本时，再转向**开源**模型。

很多团队两者都用——闭源做原型，开源上生产。`,
  },
];
