import { pipeline } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.10.1';

export async function translate(text) {
  try {
    const en_ja_translator = await pipeline('translation_en_to_ja');
    const translated = await en_ja_translator(text);
    return translated[0]['translation_text'];
  } catch (error) {
    console.error('Error in translation:', error);
    return null; // or handle the error as appropriate
  }
}