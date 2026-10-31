import { ProAnalysis } from '@/types/sector'

export const proAnalyses: Record<string, ProAnalysis> = {
  fintech: {
    sectorId: '1',
    fullAnalysis:
      'Fintech remains the premier funding powerhouse in Nigerian tech, but the era of burning venture cash on zero-fee consumer wallet acquisitions has ended. The structural winners in this space have established deep offline footprints (monopolizing agency banking POS terminals) or entrenched themselves as indispensable B2B infrastructure rails processing mission-critical corporate payments.',
    failureCaseStudies: [
      {
        company: 'Lidya',
        founded: '2016',
        died: '2023 (Exited Eastern Europe / Restructured in Nigeria)',
        raised: '$16.5M',
        causeOfDeath:
          'Expanded to Eastern Europe (Poland and Czech Republic) in 2020 but was forced to shut down European operations in December 2023 due to high capital burn and debt overhead. Retrenched back to Nigeria to focus on local debt recovery software (Lidya Collect) amid soaring SME non-performing loans.',
        lessons: [
          'Expanding geographically before achieving sustainable unit economics in the home market accelerates cash burn.',
          'Uncollateralized digital credit to informal Nigerian SMEs without Global Standing Instruction (GSI) direct debit garnishment fails during inflationary shocks.',
          'Underwriting based purely on bank statement turnovers overestimates genuine business solvency.',
        ],
      },
      {
        company: 'Kippa Pay (Kippa)',
        founded: '2021',
        died: '2023 (Product Shut Down)',
        raised: '$8.4M',
        causeOfDeath:
          'Hardware subsidy bleed. Subsidized thousands of Android POS terminals to agents without enforcing strict daily transaction volume minimums, burning cash against 0.5% capped switching fees.',
        lessons: [
          'Agency banking hardware must be paid for upfront by the agent or tied to strict daily revenue clawbacks.',
          'POS acquiring alone without high-margin merchant loan cross-selling is unprofitable.',
        ],
      },
      {
        company: 'Dash',
        founded: '2019',
        died: '2023 (Insolvency / Governance Collapse)',
        raised: '$86.1M',
        causeOfDeath:
          'Executive fraud, fabricated financial transactions, and phantom user metrics hidden behind aggressive marketing campaigns.',
        lessons: [
          'Cross-border African consumer payment reconciliation requires real-time regulatory compliance and independent financial audits.',
        ],
      },
    ],
    winningPlaybooks: [
      {
        title: 'The Moniepoint Offline Hardware Flywheel',
        steps: [
          'Deploy hardened Android POS terminals directly to vetted physical neighborhood retailers.',
          'Charge ₦85,000 upfront hardware cost or lease with mandatory daily active float thresholds.',
          'Use real-time terminal cash flow velocity to underwrite pre-approved 14-day working capital merchant loans at 3.5% monthly interest.',
          'Cross-sell commercial business bank accounts, payroll disbursement, and utility bill collections.',
        ],
        successExample: 'Moniepoint reached unicorn status ($1B+ valuation) processing $17B+ monthly.',
      },
    ],
    unitEconomics: {
      avgCAC: '₦4,500 – ₦12,000 per active transacting merchant',
      avgLTV: '₦180,000+ (over 24 months through merchant lending interest)',
      paybackPeriod: '3 to 5 months',
      grossMarginRange: '65% – 82% (blended across payments and loan interest)',
      burnRate: 'Moderate; heavily offset by net interest margin (NIM)',
      notes:
        'Pure payment switching yields ~0.15% net margin after NIBSS and switching fees. Real profitability is driven by 3.5%-5% monthly merchant overdrafts.',
    },
    regulatoryLandmines: [
      'CBN capital requirements: PSSP license requires ₦100M capital; Mobile Money Operator (MMO) requires ₦2B capital.',
      'Mandatory Tier-1, Tier-2, Tier-3 KYC verification linking customer BVN and NIN under strict penalty.',
      'CBN FX circulars restricting unauthorized cross-border foreign currency settlements.',
    ],
    marketGapsDetailed: [
      {
        gap: 'Cross-Border AfCFTA SME Trade Settlement',
        size: '$18B Regional Market',
        difficulty: 'hard',
        why: 'Informal traders moving goods between Lagos, Cotonou, and Accra still rely on dangerous physical cash transit.',
      },
      {
        gap: 'Automated Withholding Tax (WHT) Deductions at Point of Sale',
        size: '₦400B Annual Processing Potential',
        difficulty: 'medium',
        why: 'State revenue agencies are pressuring formal merchants; automated tax deduction at checkout eliminates audit penalties.',
      },
    ],
  },

  agritech: {
    sectorId: '27',
    fullAnalysis:
      'Agritech in Nigeria has transitioned from the discredited era of retail crowdfunding into hard, asset-backed commodity aggregation, mechanization sharing, and decentralized cold storage. Agricultural companies that succeed in Nigeria operate close to the physical earth, controlling logistics and commodity grading rather than trying to build consumer smartphone apps.',
    failureCaseStudies: [
      {
        company: 'Farmcrowdy',
        founded: '2016',
        died: '2021 (Insolvent)',
        raised: '$2.4M',
        causeOfDeath:
          'Promised fixed 15%–25% returns to retail sponsors to finance poultry and cassava farms. Biological disease outbreaks (bird flu), weather shocks, and COVID supply chain halts wiped out harvests with no liquidity buffer.',
        lessons: [
          'Agriculture is fundamentally variable; financing biological crops with fixed-return retail debt is fatal.',
          'Insurance payouts take 6-12 months, whereas retail crowdsourcing depositors demand instant liquidation.',
        ],
      },
      {
        company: 'Agropartnerships',
        founded: '2018',
        died: '2022 (Collapsed / SEC Ban)',
        raised: '$10M+ (Crowdfunded)',
        causeOfDeath:
          'Promised 30%+ annual returns on cashew nut processing and commodity storage. Off-taker defaults and alleged fund diversion triggered a catastrophic bank run, resulting in SEC closure and founder arrest.',
        lessons: [
          'SEC now prohibits unregistered crowdsourced investment pools under the Investment and Securities Act.',
        ],
      },
    ],
    winningPlaybooks: [
      {
        title: 'The AFEX Certified Warehouse Receipt Model',
        steps: [
          'Build physical, climate-controlled grain silos and storage warehouses in major farming belts (Kaduna, Kano, Oyo).',
          'Deploy certified quality testing labs to grade maize, soybean, and paddy rice upon delivery.',
          'Issue electronic warehouse receipts (EWR) to farmers and aggregators as collateral for bank loans.',
          'Securitize the stored grain contracts on an exchange, selling commodity notes to institutional asset managers.',
        ],
        successExample: 'AFEX has securitized hundreds of thousands of metric tons of grain with institutional funding.',
      },
    ],
    unitEconomics: {
      avgCAC: '₦18,000 per farmer cooperative onboarded',
      avgLTV: '₦240,000 per season (via aggregation margins and storage fees)',
      paybackPeriod: '1 agricultural harvest season (6 months)',
      grossMarginRange: '12% – 22% on physical commodity trading; 45% on software and grading services',
      burnRate: 'High seasonal working capital requirement; low fixed operational burn',
      notes:
        'Physical commodity trading requires substantial trade finance credit lines. Software-only agritech fails without boots on the ground.',
    },
    regulatoryLandmines: [
      'SEC rules on digital commodities exchanges and warehouse receipts.',
      'Federal Ministry of Agriculture export phytosanitary documentation and quarantine approvals.',
      'State government agricultural produce haulage levies and state border checkpoints.',
    ],
    marketGapsDetailed: [
      {
        gap: 'Solar Walk-In Cold Storage in Open Food Markets',
        size: '$9B Annual Food Loss Prevention',
        difficulty: 'medium',
        why: 'ColdHubs demonstrated 100% organic cash flow charging ₦200 per crate per night; demand exceeds capacity by 50x.',
      },
      {
        gap: 'Mechanized Tractor Sharing Platforms',
        size: '$1.4B Tractor Deficit',
        difficulty: 'hard',
        why: 'Nigeria has fewer than 7 tractors per 100 sq km (vs 200 in India); asset-light tractor aggregation is massively underserved.',
      },
    ],
  },

  'crypto-web3-remittance': {
    sectorId: '5',
    fullAnalysis:
      'Nigeria is the undisputed cryptocurrency powerhouse of the African continent. Crypto adoption in Nigeria is entirely driven by utility rather than speculative hype: stablecoins (USDT/USDC) serve as the everyday foreign trade settlement currency for merchants importing goods from China and the United States when commercial banks face chronic dollar shortages.',
    failureCaseStudies: [
      {
        company: 'Patricia Technologies',
        founded: '2017',
        died: '2023 (Operational Freeze / Debt Token Imposition)',
        raised: 'Undisclosed (High Retail Volume)',
        causeOfDeath:
          'Lost $2M in a late-2022 security breach (subsequently investigated by the Nigeria Police Force Cybercrime Unit, who in Nov 2023 arrested politician Wilfred Bonse for laundering ₦607M of the stolen funds). Froze user withdrawals in May 2023 and unilaterally converted customer balances into an unbacked internal debt token (Patricia Token - PTK), triggering retail backlash and regulatory scrutiny.',
        lessons: [
          'Centralized cryptocurrency platforms lacking audited cold-storage multi-signature custody face existential liquidation risk upon a single breach.',
          'Never attempt to force an unbacked internal debt token onto retail users whose fiat balances were compromised.',
        ],
      },
    ],
    winningPlaybooks: [
      {
        title: 'The Regulated Institutional On/Off-Ramp Strategy (Quidax & Busha Playbook)',
        steps: [
          'Secure formal regulatory incubation approval under the SEC Accelerated Regulatory Incubation Programme (ARIP - minimum ₦1B paid-up capital).',
          'Establish direct commercial banking settlement partnerships with licensed Tier-1 commercial banks per CBN Dec 2023 circular.',
          'Focus on B2B cross-border treasury settlements for international merchants and compliant OTC desks rather than speculative meme coins.',
          'Enforce strict biometric KYC (BVN/NIN verification) and real-time chain-analysis screening for AML/CFT compliance.',
        ],
        successExample: 'Busha and Quidax received the first provisional operating licenses (Approval-in-Principle) from SEC Nigeria in August 2024.',
      },
    ],
    unitEconomics: {
      avgCAC: '$3.50 – $7.00 per active KYC-verified customer',
      avgLTV: '$95.00 – $240.00 (via spread margins on recurring P2P and OTC conversions)',
      paybackPeriod: '2 to 4 months',
      grossMarginRange: '0.4% – 1.5% on retail trading volume; 2.5% – 4% on cross-border merchant settlement',
      burnRate: 'Low to moderate; primarily legal, compliance, and cyber infrastructure costs',
      notes:
        'Volume-driven business. Retail margins are tight; B2B OTC desk trades for registered corporate importers generate the highest margins.',
    },
    regulatoryLandmines: [
      'SEC Nigeria ARIP Framework: Mandatory ₦1,000,000,000 (₦1B) minimum paid-up capital requirement and ₦30M application/supervisory fees.',
      'SEC Directive (May 2024) mandating the delisting of all Nigerian Naira (NGN) pairs from peer-to-peer (P2P) platforms.',
      'CBN Circular FPR/DIR/GEN/CIR/01/010 (Dec 2023) regulating VASP banking relationships (prohibiting banks from holding crypto on proprietary accounts).',
      'Mandatory registration with Nigerian Financial Intelligence Unit (NFIU) and compliance with the Money Laundering (Prevention and Prohibition) Act 2022.',
    ],
    marketGapsDetailed: [
      {
        gap: 'Institutional Compliant Stablecoin OTC Settlement for Registered Importers',
        size: '$15B Annual Import FX Gap',
        difficulty: 'hard',
        why: 'Commercial importers spend weeks queuing for Central Bank Form Q approvals; a regulated stablecoin corridor solves this instantly.',
      },
      {
        gap: 'Automated PAYE Tax Withholding for Remote Tech Workers Earning in Crypto',
        size: '$850M Annual Remote Payroll',
        difficulty: 'medium',
        why: 'Thousands of Nigerian software engineers earn in USDT/USDC; companies need software to calculate and remit local taxes compliantly.',
      },
    ],
  },

  'energy-solar': {
    sectorId: '34',
    fullAnalysis:
      'With grid generation stagnating at 4,000 MW and diesel prices exceeding ₦1,300/litre, commercial and industrial solar power is the most economically compelling sector in West Africa. Commercial factories, hospitals, and telecom towers spend up to 45% of their total operating expenses on diesel generator fuel; switching to solar PPAs cuts energy bills by half with zero upfront customer capital outlay.',
    failureCaseStudies: [
      {
        company: 'Residential PAYG Solar Kit Operators (Generic)',
        founded: '2016',
        died: '2022-2023 (Severe Retrenchment)',
        raised: '$30M+ (Sector-wide)',
        causeOfDeath:
          'Imported small 50W-100W DC residential solar kits financed with US Dollar debt while collecting micro-repayments in Naira. When the Naira depreciated from ₦460/$ to ₦1,500/$, unhedged debt obligations destroyed solvency.',
        lessons: [
          'Never finance local-currency retail installment receivables using unhedged foreign currency debt.',
          'Low-income residential consumers prioritize food over solar battery installments during severe inflation.',
        ],
      },
    ],
    winningPlaybooks: [
      {
        title: 'The Daystar Power C&I Corporate PPA Model',
        steps: [
          'Target creditworthy corporate enterprise off-takers (Nigerian Breweries, commercial bank branches, large food factories).',
          'Conduct extensive load audits to design a rooftop solar and battery storage system that replaces daytime diesel generator runs.',
          'Sign a 10 to 15-year Power Purchase Agreement (PPA) with take-or-pay clauses and Naira tariff indexing linked to diesel price benchmarks.',
          'Secure long-term concessional green debt from international DFIs (IFC, Proparco) to finance equipment procurement.',
        ],
        successExample: 'Daystar Power built 400+ installations across Africa before being acquired by Shell in 2022.',
      },
    ],
    unitEconomics: {
      avgCAC: '₦450,000 – ₦1,200,000 per enterprise corporate account',
      avgLTV: '₦45,000,000+ (over a 10-year enterprise PPA contract)',
      paybackPeriod: '18 to 30 months',
      grossMarginRange: '48% – 65% on kilowatt-hour electricity sales',
      burnRate: 'Low once operating; high upfront capex financed through non-recourse project debt',
      notes:
        'C&I solar is an infrastructure asset class. Returns are highly predictable, protected by corporate collateral, and immune to retail consumer default.',
    },
    regulatoryLandmines: [
      'Electricity Act 2023 granting State governments regulatory authority over state electricity markets.',
      'NERC regulations on captive power generation permits and mini-grid licensing.',
      'Import duties and VAT waivers on solar panels and inverters requiring Ministry of Finance approval.',
    ],
    marketGapsDetailed: [
      {
        gap: 'Battery Energy Storage Systems (BESS) Replacing 500kVA Factory Generators',
        size: '$6.2B Industrial Diesel Replacement',
        difficulty: 'hard',
        why: 'Heavy manufacturing plants cannot run on solar panels alone; utility-scale lithium storage replacing night diesel runs is in extreme demand.',
      },
      {
        gap: 'Solar Energy-as-a-Service for Multi-Tenant Commercial Plazas',
        size: '₦320B Urban Plaza Power Market',
        difficulty: 'medium',
        why: 'Plaza landlords struggle with generator diesel levies and tenant disputes; smart sub-metered solar solves this with automated billing.',
      },
    ],
  },

  'food-delivery-quick-commerce': {
    sectorId: '20',
    fullAnalysis:
      'Food delivery in Nigeria witnessed a stunning turnaround in 2023-2024. While international giants (Jumia Food, Bolt Food) exited Nigeria claiming the market was structurally unprofitable, homegrown operator Chowdeck proved that hyper-dense dispatch clustering, disciplined unit economics, and exclusive partnerships with nationwide QSR brands (Chicken Republic) could unlock explosive, profitable growth.',
    failureCaseStudies: [
      {
        company: 'Jumia Food Nigeria',
        founded: '2012',
        died: 'December 2023 (Closed Operations)',
        raised: 'Corporate Jumia Balance Sheet',
        causeOfDeath:
          'High corporate overhead, nationwide geographic spread with thin order density, inability to achieve positive contribution margins per delivery, and consumer reluctance to pay ₦1,200+ delivery fees on small order values.',
        lessons: [
          'Food delivery cannot scale by spreading dispatch riders thinly across an entire country.',
          'Focusing on high-end gourmet dining with low order frequency burns capital faster than mass everyday staple meals.',
        ],
      },
      {
        company: 'Bolt Food Nigeria',
        founded: '2021',
        died: 'December 2023 (Exited Nigeria)',
        raised: 'Corporate Bolt Balance Sheet',
        causeOfDeath:
          'Exited Nigeria simultaneously with Jumia Food in December 2023. Crushed by post-fuel-subsidy delivery costs, double-digit food inflation, and fierce localized competition from nimble homegrown operators like Chowdeck.',
        lessons: [
          'Global ride-hailing balance sheets cannot subsidize food delivery in high-inflation African markets without localized restaurant partnerships.',
          'Riders migrate instantly to platforms offering batched orders and higher daily take-home earnings.',
        ],
      },
    ],
    winningPlaybooks: [
      {
        title: 'The Chowdeck Hyper-Clustered QSR Model',
        steps: [
          'Secure exclusive delivery integration with high-frequency quick-service staples (Chicken Republic).',
          'Deploy dedicated motorcycle rider clusters within tight 3km-5km radii around top-performing store branches.',
          'Batch multiple customer orders going in the same direction to increase rider revenue per hour.',
          'Monetize on both sides: 15-20% commission from the restaurant plus a transparent ₦500-₦900 delivery fee from the customer.',
        ],
        successExample: 'Chowdeck expanded from ₦7B GMV in 2023 to over ₦30B in delivery volume in 2024.',
      },
    ],
    unitEconomics: {
      avgCAC: '₦1,800 – ₦3,500 per transacting customer',
      avgLTV: '₦28,000 – ₦45,000 annually (driven by 3.2 average orders per month)',
      paybackPeriod: '2 to 3 months',
      grossMarginRange: '18% – 24% blended take rate on gross merchandise value (GMV)',
      burnRate: 'Controlled; riders operate on commission-per-trip models rather than fixed salaries',
      notes:
        'Profitability hinges on order density. Achieving 2.5+ deliveries per rider hour turns the unit economics positive after motorcycle maintenance.',
    },
    regulatoryLandmines: [
      'Lagos State Ministry of Transportation dispatch carrier licenses and road safety permits.',
      'Local government area (LGA) dispatch stickers and council emblem harassment.',
      'NAFDAC food hygiene regulations for insulated thermal backpacks.',
    ],
    marketGapsDetailed: [
      {
        gap: 'Late-Night Dark Kitchen Delivery (10 PM to 4 AM)',
        size: '₦45B Nightlife & Shift-Worker Market',
        difficulty: 'medium',
        why: 'Urban centers like Lagos and Abuja have active night economies, but 95% of restaurants close by 9 PM due to safety and power costs.',
      },
      {
        gap: 'Corporate Lunch Subscriptions for Financial District Towers',
        size: '₦60B Corporate Catering Market',
        difficulty: 'easy',
        why: 'Commercial banks in Marina and Victoria Island want bundled, discounted staff lunch deliveries arriving reliably at 12:30 PM.',
      },
    ],
  },
}

export function getProAnalysis(slug: string): ProAnalysis {
  // If dedicated analysis exists, return it
  if (proAnalyses[slug]) {
    return proAnalyses[slug]
  }

  // Fallback to high-calibre generalized deep analysis
  return {
    sectorId: slug,
    fullAnalysis: `This sector represents a high-potential operational frontier within Nigeria's expanding domestic economy. While macroeconomic headwinds (currency volatility, electricity constraints, and regulatory licensing bottlenecks) create friction, entrepreneurs executing with asset-light operations, local raw material sourcing, and disciplined unit economics continue to capture outsized market share.`,
    failureCaseStudies: [
      {
        company: 'Venture-Backed First Movers (Historical Cohort)',
        founded: '2018–2020',
        died: '2022–2024',
        raised: '$2M–$8M Estimated',
        causeOfDeath:
          'Subsidizing customer acquisition without achieving positive unit economics; heavy reliance on unhedged foreign currency debt; inability to navigate arbitrary state regulatory clampdowns.',
        lessons: [
          'In Nigeria, cash flow is sovereign. Startups that rely on subsequent funding rounds to subsidize operational losses face sudden death during venture downturns.',
          'Distribution networks must be structured to survive erratic national electricity and high diesel generator costs.',
        ],
      },
    ],
    winningPlaybooks: [
      {
        title: 'The Asset-Light Hybrid Distribution Playbook',
        steps: [
          'Identify fragmented, informal traditional brokers who currently control 80%+ of offline trade volume.',
          'Equip them with mobile-first software that reduces operational friction (invoicing, inventory tracking, payment settlement).',
          'Avoid heavy capital expenditure on real estate and company-owned delivery fleets by leasing third-party assets on revenue-share terms.',
          'Monetize through high-margin transaction commissions and embedded financial services rather than software subscriptions alone.',
        ],
        successExample: 'Proven by leading Nigerian B2B software and logistics aggregators.',
      },
    ],
    unitEconomics: {
      avgCAC: '₦3,500 – ₦15,000 (depending on B2C vs B2B enterprise tier)',
      avgLTV: '₦65,000 – ₦350,000 across 18-month customer lifecycles',
      paybackPeriod: '3 to 6 months',
      grossMarginRange: '35% – 60% gross contribution margin',
      burnRate: 'Sustainable if customer acquisition is tied to referral and organic channels',
      notes:
        'Pricing must be indexed in local currency (Naira) with frequent micro-adjustments or sachet pricing to maintain customer affordability.',
    },
    regulatoryLandmines: [
      'State-level agency permits, multiple municipal taxation levies, and mandatory compliance with federal data residency standards (NDPA 2023).',
      'Sector-specific statutory oversight from regulatory bodies (NAFDAC, CBN, NCC, or FCCPC) requiring statutory licensing before commercial launch.',
    ],
    marketGapsDetailed: [
      {
        gap: 'Sachetized B2B Software Built for Mobile-First Merchants',
        size: 'Multi-Billion Naira Addressable Niche',
        difficulty: 'medium',
        why: 'Informal Nigerian businesses require simple WhatsApp-integrated interfaces that do not require specialized computer training.',
      },
      {
        gap: 'Direct Producer-to-Consumer Supply Chain Disintermediation',
        size: 'High Value Market Opportunity',
        difficulty: 'hard',
        why: 'Cutting out multiple layers of exploitative middlemen directly increases farmer/producer income while lowering retail food prices.',
      },
    ],
  }
}
