import { pipeline } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.10.1';

export function translate(text) {
  en_ja_translator = pipeline('translation_en_to_ja');
  const translated = en_ja_translator(text);
  return translated[0]['translation_text'];
}