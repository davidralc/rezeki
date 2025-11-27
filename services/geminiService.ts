
import { GoogleGenAI, Type } from "@google/genai";
import { Task } from '../types';

// Safely access process.env to prevent "process is not defined" errors in some browser environments
const getApiKey = () => {
  try {
    return process.env.API_KEY || '';
  } catch (e) {
    console.warn("Could not access process.env.API_KEY");
    return '';
  }
};

const apiKey = getApiKey();

// Initialize only if key exists
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const getTaskRecommendation = async (
  userQuery: string,
  availableTasks: Task[]
): Promise<{ recommendation: string; taskIds: string[] }> => {
  if (!ai) {
    return {
      recommendation: "AI tidak dikonfigurasi (Kunci API hilang).",
      taskIds: []
    };
  }

  const tasksContext = availableTasks.map(t => 
    `ID: ${t.id}, Title: ${t.title}, Reward: Rp ${t.reward}, Type: ${t.type}, Time: ${t.timeEstimate}, Difficulty: ${t.difficulty}`
  ).join('\n');

  const systemInstruction = `
    Anda adalah asisten penghasil uang cerdas untuk Rezeki.online.
    Tujuan Anda adalah merekomendasikan tugas terbaik dari daftar yang disediakan berdasarkan permintaan pengguna.
    Jawablah selalu dalam BAHASA INDONESIA.
    
    Catatan: Mata uang yang digunakan adalah Rupiah (Rp).
    Jika pengguna meminta tugas "cepat", prioritaskan perkiraan waktu yang rendah.
    Jika pengguna menginginkan "uang" atau "cuan", prioritaskan hadiah tinggi.
    
    Kembalikan objek JSON dengan:
    1. 'recommendation': Pesan singkat dan menyemangati dalam Bahasa Indonesia yang menjelaskan mengapa Anda memilih tugas-tugas ini.
    2. 'taskIds': Array ID tugas yang cocok dengan kriteria.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Available Tasks:\n${tasksContext}\n\nUser Query: "${userQuery}"`,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                recommendation: { type: Type.STRING },
                taskIds: { 
                    type: Type.ARRAY, 
                    items: { type: Type.STRING } 
                }
            }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text);

  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      recommendation: "Maaf, saya tidak dapat memproses permintaan Anda saat ini.",
      taskIds: []
    };
  }
};
