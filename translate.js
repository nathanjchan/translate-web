import { pipeline } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.10.1';

const translator = await pipeline('translation', 'Xenova/nllb-200-distilled-600M');

export async function translate(text) {
  if (!text) {
    return null;
  }
  try {
    const output = await translator(text, {
      src_lang: 'jpn_Jpan',
      tgt_lang: 'eng_Latn',
    });
    return output[0].translation_text;
  } catch (error) {
    console.error('Error in translation:', error);
    return null;
  }
}