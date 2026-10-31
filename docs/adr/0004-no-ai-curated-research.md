# ADR 0004: Human-Curated Empirical Research Over Generative AI Synthetics

- **Status:** Accepted
- **Deciders:** Founding Product, Engineering & Editorial Team
- **Date:** 2025-10-29
- **Technical Context:** Content Integrity, Field Research Methodology, LLM Limitations

---

## 1. Context and Problem Statement

With the rapid emergence of generative artificial intelligence (OpenAI GPT-4, Anthropic Claude, Google Gemini), many software startups are launching "AI Market Research" platforms that dynamically generate market analysis, TAM estimations, and sector advice via LLM prompt chaining.

While integrating a conversational AI chatbot or automated LLM content generator would be trivial from an engineering perspective, adopting this approach for African and Nigerian market intelligence introduces severe structural, factual, and strategic hazards:

1. **Western Training Bias & Hallucination in Emerging Markets:** Frontier LLMs are trained predominantly on digital English-language text indexed from North American and European websites. Their understanding of Sub-Saharan Africa is notoriously prone to hallucinations: inventing fictitious roads, misquoting Central Bank circulars, and hallucinating startup funding rounds.
2. **The 90% Offline Economy Blind Spot:** Over 85%–90% of economic transactions in Nigeria occur in informal, offline physical markets (Mile 12, Balogun, Computer Village, Alaba). LLMs have zero visibility into this offline reality because no digitized APIs record street-level union levies ("agbero tickets") or informal wholesale cash credit terms.
3. **Platitudinous, Generic Advice:** LLMs consistently generate polite, generic business advice (*"focus on customer-centric value propositions and agile pivoting"*) that fails to warn founders about real fatal failure modes (such as involuntary card churn, fuel price shocks, or biological covariance in agriculture).
4. **Erosion of User Trust:** African entrepreneurs are weary of superficial advice from foreign consultants and automated chatbots. They demand hard, verified ground-truth from researchers who have physically audited the market and interviewed operators.

---

## 2. Decision

We have decided to explicitly **ban generative AI chatbots and automated synthetic text generation** from the core intelligence engine of OneSearch:

1. **100% Human-Curated Research:** Every word, failure autopsy, unit economics table, and market gap on OneSearch is investigated, synthesized, and written by human researchers and seasoned operators.
2. **Primary Field Research & Audit Pipelines:** Content is grounded in physical market visits, verified corporate filings, regulatory circulars from the CBN/SEC/NCC, and off-the-record post-mortem interviews with former startup founders and executives.
3. **Academic Bibliographic Grounding:** All macro statistics and sector conclusions are tied directly to an annotated compendium of **105 peer-reviewed academic studies, World Bank reports, and IMF working papers** (cataloged in `docs/RESEARCH_PAPERS.md`).
4. **Transparent Author Attribution:** The founder's research identity is prominently displayed on the platform, and every sector dossier links directly to the founder's investigative Substack publication where the complete research notes are published.

---

## 3. Decision Drivers

- **100% Empirical Accuracy:** Zero hallucinations, zero fictitious data points, and zero misleading startup advice.
- **Defensible Brand Moat:** Anyone can build an OpenAI API wrapper in an afternoon. Deep, proprietary, human-verified field intelligence cannot be cloned by a generic prompt.
- **High User Trust & Authority:** Builders respect and pay for research that reflects the harsh, authentic realities of the Nigerian economic battlefield.
- **Philosophical Alignment:** Our mission is to prevent startup failure, not to generate conversational entertainment.

---

## 4. Considered Alternatives

### Alternative A: AI-Powered Interactive Chatbot ("Ask OneSearch Copilot")
- **Description:** A floating chatbot in the bottom right corner allowing users to ask conversational questions about sectors.
- **Why Rejected:** 
  - Chatbots frequently hallucinate specific numbers when answering edge-case queries.
  - Adds expensive token API costs billed in USD.
  - Distracts from reading the structured, authoritative sector dossiers.

### Alternative B: Hybrid AI-Generated Drafts with Human Review
- **Description:** Using LLMs to generate first-draft sector overviews and having humans lightly edit the text.
- **Why Rejected:** 
  - Produces bland, corporate prose devoid of authentic local flavor and forensic edge.
  - Slower than having an expert researcher write direct ground-truth from field notes.

---

## 5. Consequences and Technical Trade-offs

### Positive Consequences:
- **Zero API Ingestion Costs:** We pay $0.00 in OpenAI or Anthropic token billing.
- **Immunity to Hallucination:** Every cited regulation, startup closure date, and financial metric is verified.
- **Elevated Editorial Standing:** Establishes OneSearch as the definitive, credible research institution for African market intelligence.

### Negative Consequences / Mitigations:
- **Content Creation Does Not Scale Infinitely:** We cannot generate 500 sector pages overnight with an automated script.
  - *Mitigation:* We do not need 500 low-quality pages. We focus on the **18 primary economic sectors** that represent 95% of all venture and commercial activity in Nigeria, ensuring each dossier is extraordinarily deep and authoritative.

---

## 6. Implementation References

- `docs/RESEARCH_PAPERS.md` — Compendium of 105 foundational empirical studies.
- `docs/SECTOR_RESEARCH.md` — Human-curated intelligence dossiers for all 18 sectors.
- `docs/PRODUCT_VISION.md` — Product philosophy and rejection of synthetic AI.
