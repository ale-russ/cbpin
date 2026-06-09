import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialization function for GoogleGenAI with safe environment fallback
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("WARNING: GEMINI_API_KEY is not defined in environment variables.");
    return null;
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Full-Stack API Route for real-time Procurement AI Scanning & Scoring
app.post('/api/gemini/analyze', async (req: Request, res: Response) => {
  try {
    const { tenderTitle, tenderDescription, buyerName, country, requiredDocuments, sector, budget } = req.body;

    if (!tenderTitle || !tenderDescription) {
      res.status(400).json({ error: 'Tender title and description are strictly required for scanning.' });
      return;
    }

    const ai = getGeminiClient();
    if (!ai) {
      // Return a simulated, realistic response structure if the API Key is offline or not injected yet
      // This is dynamic, context-aware simulation so the UI remains highly functional and interactive.
      const simulatedScore = Math.floor(Math.random() * 21) + 65; // 65-85 range
      const simLocalContentRule = country === 'Uganda' && sector?.toLowerCase().includes('oil') ? 60 : 30;

      res.json({
        isMocked: true,
        scores: {
          winProbability: Math.floor(simulatedScore * 0.9),
          competitionLevel: Math.random() > 0.5 ? 'High' : 'Medium',
          capabilityMatch: Math.floor(simulatedScore * 0.95),
          localContentCompliance: simLocalContentRule,
          overallScore: simulatedScore,
        },
        keyTakeaways: `[DEMO MODE] Analyzed offline due to inactive API credentials: "${tenderTitle}" represents a high-priority contracting target for companies in ${country || 'East Africa'}. Its compliance barrier is heavy on regulatory local certifications.`,
        complianceThreats: [
          `Potential deficit in proving previous single-contract execution of similar magnitude (USD ${budget || '1M+'}).`,
          `Rigid local content thresholds requiring specific joint ventures in ${country}.`,
          `Required compliance certifications must be verified before bid submission.`
        ],
        strategicRecommendations: [
          `Form a localized joint venture with a specialist prime holding Class-1 credentials.`,
          `Perform a pre-bid site visit if scheduled to gain extra administrative score credits.`,
          `Separate technical and financial envelopes securely to avoid administrative disqualifications.`
        ],
        suggestedConsortiumStructure: `SME Subcontractor holds local logistics and community clearance licenses, while the prime foreign partner covers technical equipment import and capital bond backing.`,
        recommendedLocalPartners: [
          "Private Sector Foundation Uganda (PSFU) Member Firms",
          "East African Logistics Consortium Support",
          "Albertine Graben Logistics Partners"
        ],
        checklist: [
          { task: "Assemble PPDA/PPRA statutory registration documents.", completed: true },
          { task: "Draft joint-venture equity memorandum (minimum local content requirement).", completed: false },
          { task: "Request bank bid bond of 10% of bid value.", completed: false },
          { task: "Sustain structured technical reference letters from past clients.", completed: true },
          { task: "Validate double-envelope delivery packaging requirements.", completed: false }
        ]
      });
      return;
    }

    const promptMessage = `
      You are a world-class East African procurement strategist, advising an SME.
      Analyze this procurement opportunity and return a structured JSON evaluation.
      
      Opportunity Information:
      Title: ${tenderTitle}
      Buyer: ${buyerName || 'Unknown'}
      Country: ${country || 'Uganda'}
      Sector: ${sector || 'Infrastructure'}
      Budget Estimate (USD): ${budget || 'Unspecified'}
      Required Documents: ${JSON.stringify(requiredDocuments || [])}
      
      Tender Description:
      ${tenderDescription}
      
      Provide tailored strategy focusing on local procurement laws (e.g. PPDA in Uganda, PPRA in Kenya, National Content rules).
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: promptMessage,
      config: {
        systemInstruction: "You are a professional B2B procurement analyst specializing in East Africa. Always reply with perfectly compatible JSON structure matching the required schema.",
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          required: ['scores', 'keyTakeaways', 'complianceThreats', 'strategicRecommendations', 'suggestedConsortiumStructure', 'recommendedLocalPartners', 'checklist'],
          properties: {
            scores: {
              type: Type.OBJECT,
              required: ['winProbability', 'competitionLevel', 'capabilityMatch', 'localContentCompliance', 'overallScore'],
              properties: {
                winProbability: { type: Type.INTEGER, description: "Win probability score from 0 to 100." },
                competitionLevel: { type: Type.STRING, description: "Must be 'High', 'Medium', or 'Low'." },
                capabilityMatch: { type: Type.INTEGER, description: "Capability alignment score from 0 to 100." },
                localContentCompliance: { type: Type.INTEGER, description: "Score of compliance of user profile to the local laws from 0 to 100." },
                overallScore: { type: Type.INTEGER, description: "Overall opportunity score from 0 to 100." }
              }
            },
            keyTakeaways: { type: Type.STRING, description: "High-level summary of the opportunity." },
            complianceThreats: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of serious compliance hurdles or administrative pitfalls."
            },
            strategicRecommendations: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of strategic actions the bidder should execute."
            },
            suggestedConsortiumStructure: { type: Type.STRING, description: "How a Joint Venture should ideally be structured." },
            recommendedLocalPartners: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Specific names or categories of companies they should team up with."
            },
            checklist: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: ['task', 'completed'],
                properties: {
                  task: { type: Type.STRING },
                  completed: { type: Type.BOOLEAN }
                }
              },
              description: "Detailed checklist of operational tasks required before the deadline."
            }
          }
        }
      }
    });

    const textOutput = response.text;
    if (textOutput) {
      res.json(JSON.parse(textOutput));
    } else {
      throw new Error("No response output text yielded from the Gemini model.");
    }

  } catch (error: any) {
    console.error("Gemini Scan Error:", error);
    res.status(500).json({ error: error.message || 'Error occurred while running the AI scan.' });
  }
});

// Configure Vite middleware in development, and host static build in production
async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static frontend files from pre-compiled 'dist'
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CPIN Multi-service Fullstack Server successfully listening on http://0.0.0.0:${PORT}`);
  });
}

start();
