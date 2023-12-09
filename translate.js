import { pipeline } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.10.1';

const translator = await pipeline('translation', 'Xenova/nllb-200-distilled-600M');

export async function translate(text) {
  try {
    const output = await translator(text, {
      src_lang: 'eng_Latn',
      tgt_lang: 'jpn_Jpan',
    });
    return output[0].translation_text;
  } catch (error) {
    console.error('Error in translation:', error);
    return null;
  }
}