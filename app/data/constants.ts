
export const LANGS = [
  { code:"lug", name:"Luganda",    native:"Luganda",    region:"Uganda",       caps:["Translate","STT","TTS"] as string[], provider:"Sunbird" },
  { code:"ach", name:"Acholi",     native:"Acholi",     region:"Uganda",       caps:["Translate","STT","TTS"] as string[], provider:"Sunbird" },
  { code:"teo", name:"Ateso",      native:"Ateso",      region:"Uganda",       caps:["Translate","STT","TTS"] as string[], provider:"Sunbird" },
  { code:"nyn", name:"Runyankore", native:"Runyankore", region:"Uganda",       caps:["Translate","STT","TTS"] as string[], provider:"Sunbird" },
  { code:"lgg", name:"Lugbara",    native:"Lugbara",    region:"Uganda",       caps:["Translate","STT","TTS"] as string[], provider:"Sunbird" },
  { code:"yo",  name:"Yoruba",     native:"Yoruba",     region:"Nigeria",      caps:["Translate"] as string[],             provider:"Khaya"   },
  { code:"tw",  name:"Twi",        native:"Twi",        region:"Ghana",        caps:["Translate"] as string[],             provider:"Khaya"   },
  { code:"ee",  name:"Ewe",        native:"Ewe",        region:"Ghana/Togo",   caps:["Translate"] as string[],             provider:"Khaya"   },
  { code:"gaa", name:"Ga",         native:"Ga",         region:"Ghana",        caps:["Translate"] as string[],             provider:"Khaya"   },
  { code:"dag", name:"Dagbani",    native:"Dagbani",    region:"Ghana",        caps:["Translate"] as string[],             provider:"Khaya"   },
  { code:"ki",  name:"Kikuyu",     native:"Gikuyu",     region:"Kenya",        caps:["Translate"] as string[],             provider:"Khaya"   },
  { code:"luo", name:"Luo",        native:"Dholuo",     region:"Kenya",        caps:["Translate"] as string[],             provider:"Khaya"   },
  { code:"mer", name:"Kimeru",     native:"Kimeru",     region:"Kenya",        caps:["Translate"] as string[],             provider:"Khaya"   },
  { code:"kus", name:"Kusaal",     native:"Kusaal",     region:"Ghana",        caps:["Translate"] as string[],             provider:"Khaya"   },
  { code:"sw",  name:"Swahili",    native:"Kiswahili",  region:"East Africa",  caps:["Translate","STT"] as string[],       provider:"HuggingFace" },
  { code:"fr",  name:"French",     native:"Français",   region:"Francophone",  caps:["Translate"] as string[],             provider:"HuggingFace" },
  { code:"ar",  name:"Arabic",     native:"العربية",    region:"North Africa", caps:["Translate"] as string[],             provider:"HuggingFace" },
  { code:"af",  name:"Afrikaans",  native:"Afrikaans",  region:"South Africa", caps:["Translate"] as string[],             provider:"HuggingFace" },
] as const;

export const CAP_STYLE: Record<string, string> = {
  Translate: "cap-translate",
  STT:       "cap-stt",
  TTS:       "cap-tts",
};

export const PROVIDERS = [
  {
    name:   "Sunbird AI",
    icon:   "🌻",
    iconBg: "#f0fdf4",
    desc:   "Built specifically for Ugandan languages. Powers translation, speech-to-text, and text-to-speech for Luganda, Acholi, Ateso, Runyankore, and Lugbara.",
    caps:   ["Translation", "Speech-to-Text", "Text-to-Speech"],
    langs:  ["lug","ach","teo","nyn","lgg"],
    url:    "https://sunbird.ai",
  },
  {
    name:   "Khaya AI",
    icon:   "🌍",
    iconBg: "#fffbeb",
    desc:   "Purpose-built for West and East African languages. GhanaNLP's translation API v2 covering Yoruba, Twi, Ewe, Ga, Dagbani, Kikuyu, Luo, and more.",
    caps:   ["Translation"],
    langs:  ["yo","tw","ee","gaa","dag","ki","luo","mer","kus"],
    url:    "https://translation.ghananlp.org",
  },
  {
    name:   "HuggingFace",
    icon:   "🤗",
    iconBg: "#eff6ff",
    desc:   "Helsinki-NLP opus-mt models for Swahili, French, Arabic, and Afrikaans. Acts as the universal fallback layer when primary providers are unavailable.",
    caps:   ["Translation"],
    langs:  ["sw","fr","ar","af"],
    url:    "https://huggingface.co/Helsinki-NLP",
  },
] as const;

export const CODE_EXAMPLES: Record<string, string> = {
  Python: `from fasiri import Fasiri

client = Fasiri(api_key="fsri_...")

# Translate English → Luganda
result = client.translate(
    "Good morning, how are you?",
    target="lug",
)
print(result.translated_text)
# "Wasuze otya, oli otya?"
print(result.provider)       # "sunbird"
print(result.quality_score)  # 0.92

# Batch translate
batch = client.translate_batch([
    {"id":"1", "text":"Thank you", "target":"yo"},
    {"id":"2", "text":"Welcome",   "target":"sw"},
    {"id":"3", "text":"Hello",     "target":"tw"},
])
for item in batch.successful():
    print(item.translated_text)`,

  cURL: `curl -X POST https://api.fasiri-ai.com/api/v1/translate \\
  -H "Authorization: Bearer fsri_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "Good morning, how are you?",
    "target_lang": "lug",
    "source_lang": "en",
    "provider": "auto"
  }'

# Response:
# {
#   "translated_text": "Wasuze otya, oli otya?",
#   "provider": "sunbird",
#   "quality_score": 0.92,
#   "latency_ms": 1823
# }`,

  JavaScript: `const response = await fetch(
  "https://api.fasiri-ai.com/api/v1/translate",
  {
    method: "POST",
    headers: {
      Authorization: "Bearer fsri_...",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: "Good morning, how are you?",
      target_lang: "lug",
      provider: "auto",
    }),
  }
);

const data = await response.json();
console.log(data.translated_text);
// "Wasuze otya, oli otya?"
console.log(data.provider);
// "sunbird"`,
};