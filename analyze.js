import Anthropic from "@anthropic-ai/sdk";

const SYSTEM = `أنت خبير قانوني متخصص في العقود التجارية السعودية والخليجية.
حلّل العقد وأرجع JSON فقط بدون أي نص خارجه ولا backticks.
الهيكل المطلوب:
{
  "risk_score": <رقم 0-100>,
  "overall_assessment": "<تقييم شامل>",
  "contract_type": "<نوع العقد>",
  "contract_value_exposure": "<التعرض المالي المقدّر>",
  "critical_issues": [
    {"title":"<عنوان>","description":"<وصف>","financial_impact":"<تأثير مالي>","severity":"critical|high|medium|low"}
  ],
  "missing_clauses": [
    {"clause":"<اسم البند>","importance":"critical|high|medium","recommendation":"<توصية>"}
  ],
  "compliance_issues": [
    {"regulation":"<النظام>","issue":"<المشكلة>","penalty":"<العقوبة>"}
  ],
  "positive_aspects": ["<جانب إيجابي>"],
  "recommendations": [
    {"priority":"urgent|high|medium","action":"<الإجراء>","impact":"<التأثير>"}
  ]
}`;

export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { text, password } = req.body || {};

  // Password check
  const correctPwd = process.env.ACCESS_PASSWORD || "lexai2025";
  if (password !== correctPwd) {
    return res.status(401).json({ error: "كلمة المرور غير صحيحة" });
  }

  if (!text || text.trim().length < 20) {
    return res.status(400).json({ error: "نص العقد قصير جداً" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "لم يتم ضبط مفتاح API في الخادم" });
  }

  try {
    const client = new Anthropic({ apiKey });
    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2000,
      system: SYSTEM,
      messages: [{ role: "user", content: `حلّل هذا العقد:\n\n${text}` }],
    });

    const raw = response.content[0]?.text || "";
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("تعذّر استخراج نتائج التحليل");

    const data = JSON.parse(match[0]);
    return res.status(200).json(data);
  } catch (err) {
    console.error("Analysis error:", err);
    return res.status(500).json({ error: err.message || "خطأ في التحليل" });
  }
}
