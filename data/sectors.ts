import { Sector } from '@/types/sector'
import {
  companyBackersMap,
  getCitationsForSector,
  getShouldIBuildForSector,
} from './sector-enhancements'

const rawSectors: Omit<Sector, 'companies' | 'shouldIBuild' | 'citations'>[] = [
  // ─── 1. FINANCIAL TECHNOLOGY & RAILS ──────────────────────────────────────────
  {
    id: '1',
    slug: 'fintech',
    name: 'Fintech & Digital Payments',
    emoji: '💳',
    category: 'Financial Services',
    status: 'succeeding',
    riskLevel: 'medium',
    opportunityScore: 9,
    marketSizeEst: '₦600T+ TPV (NIBSS 2023)',
    summary:
      "Nigeria's digital payment ecosystem is the most mature and highly funded in Africa. With 2.7M+ active POS terminals and over ₦600 trillion processed over NIBSS Instant Payments (NIP) in 2023, offline merchant acquiring and B2B checkout rails have achieved massive scale, spearheaded by Moniepoint, OPay, and Paystack.",
    publicInsight:
      'Consumer card interchange is a delusion in Nigeria (capped at fractions of a basis point). The real money is in physical merchant agency networks, merchant cash advances, and automated corporate treasury clearing.',
    keyPlayers: ['Moniepoint', 'OPay', 'Paystack (Stripe)', 'Flutterwave', 'PalmPay', 'Kuda', 'Interswitch'],
    whySucceeding:
      'Massive cash scarcity tailwinds (2023 currency redesign), adult financial inclusion jumping to 64% (EFInA), and proprietary offline agent networks capturing everyday cash transactions.',
    marketGaps: [
      'Cross-border AfCFTA trade settlement rails for informal traders',
      'Instant merchant working capital against POS transaction history',
      'Automated state withholding tax (WHT) deduction at checkout',
      'Offline contactless (NFC/soundwave) payments for zero-connectivity markets',
      'B2B recurring direct-debit infrastructure replacing failed card subscriptions',
    ],
    regulatoryNotes:
      'Governed by Central Bank of Nigeria (CBN). Requires PSSP (₦100M capital), PTSP, or Mobile Money Operator (MMO - ₦2B capital) license. Mandatory BVN/NIN verification on all account tiers.',
    tags: ['payments', 'POS', 'merchant-acquiring', 'settlement', 'agency-banking'],
  },
  {
    id: '2',
    slug: 'digital-banking-neobanks',
    name: 'Digital Banking & Neobanks',
    emoji: '🏦',
    category: 'Financial Services',
    status: 'struggling',
    riskLevel: 'high',
    opportunityScore: 7,
    marketSizeEst: '₦450B+ Digital Deposits (~$300M)',
    summary:
      'Neobanks built on Tier-3 Microfinance Bank (MFB) licenses attempted to disrupt legacy commercial banks via zero fees and 25 free monthly transfers. While customer acquisition exploded, monetization proved brutal as high server costs, customer support overhead, and razor-thin deposit margins squeezed unit economics.',
    publicInsight:
      'Free transfers do not build a sustainable balance sheet. Winning neobanks must transition from retail deposit apps into high-yielding merchant lending machines or corporate cash management engines.',
    keyPlayers: ['Kuda Bank', 'FairMoney MFB', 'VBank (VFD Group)', 'Carbon', 'Gomoney', 'Eyowo (re-licensed)'],
    whyFailing:
      'High cost of customer acquisition ($4-$8 per active customer) coupled with low revenue per user ($0.40-$1.10 annually). Retail depositors keep small balances and move funds out instantly.',
    marketGaps: [
      'High-yield corporate escrow accounts for online trade',
      'Digital micro-pension savings linked to daily bank deposits',
      'Targeted neobanking for teenage and university student allowances',
      'Automated FX multi-currency accounts compliant with CBN guidelines',
      'Credit-building digital bank accounts for informal market artisans',
    ],
    regulatoryNotes:
      'Licensed under CBN National or State Microfinance Bank regulations (NDIC insured). CBN Dec 2023 circular mandated BVN/NIN linkage across all tiers; onboarding was temporarily frozen in April–May 2024 to enforce biometric and physical address compliance.',
    tags: ['neobanks', 'microfinance', 'deposits', 'transfers', 'consumer-banking'],
  },
  {
    id: '3',
    slug: 'wealthtech-micro-investing',
    name: 'WealthTech & Micro-Investing',
    emoji: '📈',
    category: 'Financial Services',
    status: 'succeeding',
    riskLevel: 'medium',
    opportunityScore: 8,
    marketSizeEst: '₦3.2T Domestic Retail Assets',
    summary:
      'WealthTech platforms revolutionized domestic savings and foreign stock investing for middle-class Nigerian youths looking to hedge against severe Naira devaluation. Despite regulatory friction with the SEC and CBN FX restrictions, platforms like PiggyVest and Cowrywise have mobilized hundreds of billions in local savings.',
    publicInsight:
      'Automated daily and weekly micro-deductions into fixed deposits and Treasury Bills remain sticky. The battleground has shifted to offshore asset allocation and SEC-licensed digital sub-broker partnerships.',
    keyPlayers: ['PiggyVest', 'Cowrywise', 'Risevest', 'Bamboo', 'Trove', 'Chaka'],
    whySucceeding:
      'Over 50% annual domestic inflation drives intense consumer urgency to save in high-yield vehicles, dollar assets, and short-term commercial papers.',
    marketGaps: [
      'Fractional commercial real estate syndication for retail savers',
      'Local currency inflation-protected index funds',
      'Automated inheritance and digital estate planning for young professionals',
      'Diaspora dollar-denominated infrastructure bonds',
      'Micro-endowments and education tuition savings funds',
    ],
    regulatoryNotes:
      'SEC Nigeria oversees digital sub-brokers, fund managers, and robo-advisors. Strict compliance with AML/CFT and prohibition on offering unregistered foreign derivatives directly.',
    tags: ['wealthtech', 'savings', 'investing', 'stocks', 'dollar-hedge'],
  },
  {
    id: '4',
    slug: 'buy-now-pay-later',
    name: 'Buy Now Pay Later (BNPL) & Consumer Credit',
    emoji: '🛍️',
    category: 'Financial Services',
    status: 'struggling',
    riskLevel: 'very-high',
    opportunityScore: 6,
    marketSizeEst: '$1.4B Consumer Credit Gap',
    summary:
      'Consumer installment credit faced brutal headwinds as 30%+ benchmark interest rates and inflation crushed disposable income. Startups attempting instant unsecured BNPL on fashion and electronics suffered 15-28% non-performing loan (NPL) ratios, forcing survivors to pivot to asset-locked models like smartphones and solar generators.',
    publicInsight:
      'Unsecured BNPL without collateral or remote asset lockout is guaranteed suicide in Nigeria. The only surviving models are remote device locking (Samsung Knox/PayJoy) or deferred delivery.',
    keyPlayers: ['CDcare (Layaway)', 'CredPal', 'Carbon Zero', 'FairMoney Pay', 'M-KOPA Nigeria'],
    whyFailing:
      'Lack of a unified national credit bureau with enforcement teeth. Borrowers ditch SIM cards and bank accounts when loans default. Cost of funds for lenders soared above 25% APR.',
    marketGaps: [
      'Work-tool BNPL (laptops, cameras, sewing machines) with verification',
      'Solar home system installment plans with remote inverter shutoff',
      'Healthcare procedure financing tied directly to HMO co-payments',
      'School fees term loans disbursed straight to accredited institutions',
      'Merchant-subsidized 0% interest clearance sales for vetted civil servants',
    ],
    regulatoryNotes:
      'FCCPC Limited Interim Regulatory/Registration Framework for Digital Lending (mandating registration and prohibiting contact-scraping debt shaming). State Money Lender licenses and CBN consumer protection guidelines.',
    tags: ['BNPL', 'credit', 'consumer-loans', 'asset-finance', 'lending'],
  },
  {
    id: '5',
    slug: 'crypto-web3-remittance',
    name: 'Crypto, Web3 & Cross-Border Rails',
    emoji: '🪙',
    category: 'Financial Services',
    status: 'succeeding',
    riskLevel: 'high',
    opportunityScore: 9,
    marketSizeEst: '$56.7B Annual Crypto Volume (Chainalysis)',
    summary:
      'Nigeria ranks second globally for grassroots cryptocurrency adoption (Chainalysis 2023/2024). Despite banking bans and regulatory tensions with Binance, peer-to-peer (P2P) stablecoin (USDT/USDC) usage is ubiquitous for cross-border trade with China, freelance contractor payouts, and wealth preservation.',
    publicInsight:
      'Web3 in Nigeria is not about Bored Ape NFTs; it is practical plumbing. Nigerian merchants use USDT as an indispensable settlement currency to buy goods from Guangzhou and Yiwu without waiting 3 weeks for commercial bank Form Q approvals.',
    keyPlayers: ['Quidax (SEC Approved)', 'Busha (SEC Approved)', 'Yellow Card', 'Bitmama', 'Kotani Pay', 'Flincap'],
    whySucceeding:
      'Persistent dollar liquidity shortages in formal commercial banks and huge FX bid-ask spreads make stablecoins the most liquid commercial settlement mechanism in West Africa.',
    marketGaps: [
      'Institutional OTC stablecoin ramps for registered importers',
      'Compliant corporate crypto payroll gateways withholding PAYE taxes',
      'Stablecoin micro-insurance against extreme Naira currency swings',
      'Hardware crypto wallets localized for African retail users',
      'Regulated custody infrastructure for institutional wealth managers',
    ],
    regulatoryNotes:
      'Governed by SEC Nigeria Accelerated Regulatory Incubation Programme (ARIP - ₦1B minimum paid-up capital requirement) with preliminary licenses granted to Busha and Quidax in August 2024. CBN lifted the 2021 banking prohibition via Circular FPR/DIR/PUB/CIR/002/003 (Dec 2023). Mandatory delisting of Naira (NGN) P2P trading pairs per May 2024 SEC directive.',
    tags: ['crypto', 'web3', 'stablecoins', 'remittances', 'p2p'],
  },
  {
    id: '6',
    slug: 'insurtech',
    name: 'InsurTech & Micro-Insurance',
    emoji: '🛡️',
    category: 'Financial Services',
    status: 'emerging',
    riskLevel: 'high',
    opportunityScore: 8,
    marketSizeEst: '₦1.1T Gross Premium Written (NAICOM)',
    summary:
      'Insurance penetration in Nigeria remains abysmal at under 0.5% of GDP. However, digital underwriters and API aggregators are finding breakout product-market fit by embedding sachet insurance into ride-hailing trips, device purchases, vehicle inspections, and hospital visits.',
    publicInsight:
      'Selling standalone life or fire insurance to retail Nigerians via mobile web pages fails 99% of the time due to deep institutional distrust. Insurance must be bundled invisibly into high-frequency consumer transactions.',
    keyPlayers: ['Casava', 'Curacel', 'ETAP Car Insurance', 'Reliance HMO', 'Coverboy', 'Octamile'],
    whySucceeding:
      'Regulatory mandate for motor insurance (3rd party minimum premium increased to ₦15,000 in 2023) and automated claims processing APIs (Curacel) reducing fraud by 30%.',
    marketGaps: [
      'Parametric climate insurance for smallholder maize and rice farmers',
      'Gig-worker health and accident coverage deducted daily from dispatch earnings',
      'Electronics damage and screen replacement insurance at point of purchase',
      'Cargo transit micro-insurance for interstate commercial buses (luxury bus lines)',
      'Tenant rent default insurance protecting residential buy-to-let landlords',
    ],
    regulatoryNotes:
      'Regulated by NAICOM (National Insurance Commission). Requires Web Aggregator License or full underwriting insurance license. Sandbox approvals required for parametric micro-policies.',
    tags: ['insurance', 'insurtech', 'claims', 'auto-insurance', 'embedded-finance'],
  },
  {
    id: '7',
    slug: 'api-infrastructure-open-banking',
    name: 'API Infrastructure & Open Banking',
    emoji: '🔌',
    category: 'Financial Services',
    status: 'succeeding',
    riskLevel: 'medium',
    opportunityScore: 9,
    marketSizeEst: '$420M API & Data Services TAM',
    summary:
      'As fintechs proliferate, developer-first infrastructure providing bank account linking, real-time balance queries, automated debit mandates, and identity verification has become mission-critical. Nigeria became the first African nation to publish comprehensive Open Banking Operational Guidelines in 2023.',
    publicInsight:
      'Bank scraping via screen automation is dead due to two-factor authentications. The winners build direct core-banking integrations with Zenith, GTCO, and Access Bank while diversifying into payment orchestration and fraud analytics.',
    keyPlayers: ['Mono', 'Stitch', 'Okra', 'Anchor', 'Termii', 'OnePipe'],
    whySucceeding:
      'Fintechs and digital lenders cannot underwrite loans or process payroll deductions without programmatic access to customer banking history and statement aggregation.',
    marketGaps: [
      'Universal direct-debit API with 98%+ execution reliability on salary days',
      'Corporate treasury multi-bank unified dashboard APIs for conglomerates',
      'SME credit-scoring engine combining POS history and telco data',
      'Automated reconciliation APIs for high-volume marketplace platforms',
      'Offline USSD-as-a-Service APIs for non-smartphone applications',
    ],
    regulatoryNotes:
      'CBN Open Banking Operational Guidelines (2023). Mandatory registration with the Open Banking Registry and data residency compliance with NDPC (Nigeria Data Protection Act 2023).',
    tags: ['APIs', 'open-banking', 'infrastructure', 'developer-tools', 'banking'],
  },
  {
    id: '8',
    slug: 'identity-regtech-fraud',
    name: 'Identity Verification & RegTech',
    emoji: '🪪',
    category: 'Financial Services',
    status: 'succeeding',
    riskLevel: 'low',
    opportunityScore: 9,
    marketSizeEst: '$310M Compliance & Verification Market',
    summary:
      'With the CBN and FCCPC mandating strict BVN, NIN, and face-match verification across all financial accounts, RegTech platforms experienced surging demand. Fraud prevention systems verifying government registries, company CAC records, and biometric liveness are indispensable.',
    publicInsight:
      'Identity verification in Africa is not a nice-to-have SaaS; it is a legally mandated tollbooth. Every single digital account, loan application, and driver onboarding requires multiple paid API lookups.',
    keyPlayers: ['Dojah', 'Smile ID (Smile Identity)', 'Prembly (Identitypass)', 'Seamfix', 'Youverify'],
    whySucceeding:
      'CBN zero-tolerance directives on unverified accounts, combined with the National Identity Management Commission (NIMC) integration push across 100M+ issued NINs.',
    marketGaps: [
      'Document tamper detection for forged utility bills and bank statements',
      'Cross-industry fraudulent borrower blacklists with cryptographic privacy',
      'Real-time address verification using motorcycle dispatch agents',
      'PEP (Politically Exposed Persons) screening built specifically for Nigerian public registries',
      'Biometric authentication on low-cost Android devices without specialized sensors',
    ],
    regulatoryNotes:
      'Licensed Identity Verification Agents with NIMC and NIBSS. Must comply with the Nigeria Data Protection Act 2023 (NDPA) enforced by NDPC.',
    tags: ['KYC', 'compliance', 'identity', 'fraud-prevention', 'regtech'],
  },

  // ─── 2. ENTERPRISE & BUSINESS SOFTWARE (SAAS) ──────────────────────────────────
  {
    id: '9',
    slug: 'b2b-saas-sme-software',
    name: 'B2B SME Bookkeeping & Operations',
    emoji: '📊',
    category: 'Software & SaaS',
    status: 'emerging',
    riskLevel: 'medium',
    opportunityScore: 9,
    marketSizeEst: '41M+ MSMEs (SMEDAN 2023)',
    summary:
      "Nigeria's 41 million micro, small, and medium enterprises historically ran operations on carbon-paper receipt notebooks and chaotic WhatsApp chats. Modern SaaS platforms providing digital invoicing, inventory control, and multi-channel order synchronization are transforming trade.",
    publicInsight:
      'SMEs will not pay for software that only records what happened yesterday (accounting). They eagerly pay for software that brings new sales, collects overdue customer debts, or automates Instagram DM orders.',
    keyPlayers: ['Bumpa', 'Kippa', 'Catapult', 'Sabi', 'Prospa', 'Bujeti'],
    whySucceeding:
      'Social commerce merchants running Instagram/WhatsApp shops hit operational ceilings at 20 orders/day; software automating payment verification and dispatch booking becomes non-negotiable.',
    marketGaps: [
      'WhatsApp conversational commerce bots that generate instant checkout links',
      'Automated inventory sync between physical retail shops and online stores',
      'Multi-currency invoicing for Nigerian creative freelancers servicing global clients',
      'SME debt recovery automation sending automated polite SMS/WhatsApp reminders',
      'Micro-franchise inventory and cash control software for retail chains',
    ],
    regulatoryNotes:
      'FIRS e-invoicing initiatives and state internal revenue service tax collection drives are forcing formal record-keeping upon previously informal merchants.',
    tags: ['SaaS', 'bookkeeping', 'invoicing', 'inventory', 'SME'],
  },
  {
    id: '10',
    slug: 'hr-tech-payroll-saas',
    name: 'HR Tech & Payroll Operations',
    emoji: '👥',
    category: 'Software & SaaS',
    status: 'succeeding',
    riskLevel: 'low',
    opportunityScore: 9,
    marketSizeEst: '$850M Enterprise HR & Payroll Spend',
    summary:
      'Enterprise payroll in Nigeria is a minefield of complex state-level PAYE tax variations, mandatory statutory pension remittances (PenCom), National Housing Fund (NHF), and ITF deductions. Cloud HR platforms automating statutory compliance have expanded rapidly into mid-market and enterprise accounts.',
    publicInsight:
      'Selling HR software solely on employee attendance tracking results in high churn. The unshakeable moat is one-click statutory tax remittance and earned wage access (EWA) that gives staff payroll advances without company liability.',
    keyPlayers: ['SeamlessHR', 'Pade HCM', 'Workpay', 'Bento Africa', 'Cadana', 'Yara HR'],
    whySucceeding:
      'Corporate CFOs face severe financial penalties and criminal summons from State Internal Revenue Services (like LIRS) for botched employee tax remittances; automation eliminates human error.',
    marketGaps: [
      'Informal artisan and construction worker daily payroll disbursement tools',
      'Cross-border contractor payroll compliant with multiple African tax jurisdictions',
      'Automated health insurance (HMO) selection and deduction portals for SMEs',
      'Performance appraisal software tailored for sales agent incentive models',
      'Digital onboarding and credential background checking for domestic staff',
    ],
    regulatoryNotes:
      'PenCom (Pension Reform Act 2014), FIRS/SIRS PAYE guidelines, Employees Compensation Act (NSITF), and National Housing Fund (FMBN).',
    tags: ['HR', 'payroll', 'tax-remittance', 'pension', 'enterprise'],
  },
  {
    id: '11',
    slug: 'accounting-taxtech-saas',
    name: 'Accounting & TaxTech Compliance',
    emoji: '📑',
    category: 'Software & SaaS',
    status: 'emerging',
    riskLevel: 'medium',
    opportunityScore: 8,
    marketSizeEst: '₦450B Corporate Tax Services',
    summary:
      'With federal and state governments aggressively expanding the tax net to offset oil revenue deficits, business owners face unprecedented audit pressure. TaxTech startups providing automated VAT filing, CIT calculation, and electronic withholding tax credit retrieval are becoming indispensable.',
    publicInsight:
      'Most Nigerian companies have hundreds of thousands of Naira locked up in unclaimed Withholding Tax (WHT) credit notes that paper bureaucracy makes impossible to offset against CIT. Software unlocking these credits sells instantly.',
    keyPlayers: ['SimpliTax', 'TaxTech', 'Accounteer', 'Bujeti', 'Wallets Africa'],
    whySucceeding:
      'Federal Inland Revenue Service (FIRS) nationwide rollout of TaxPro-Max online portal and intensified audits on corporate banking turnovers.',
    marketGaps: [
      'Automated WHT credit note matching and recovery platform',
      'Transfer pricing documentation software for mid-tier multinationals',
      'State-level informal market daily presumptive tax collection apps',
      'E-commerce VAT compliance plugins for WooCommerce and Shopify Nigeria',
      'Real-time FX gain/loss accounting for import-heavy businesses',
    ],
    regulatoryNotes:
      'Finance Acts (2019-2023), FIRS regulations, Joint Tax Board (JTB) rules, and State Internal Revenue Service (LIRS, OIRS, BIR) audit standards.',
    tags: ['tax', 'accounting', 'compliance', 'FIRS', 'audit'],
  },
  {
    id: '12',
    slug: 'restaurant-tech-food-pos',
    name: 'Restaurant Tech & Foodservice POS',
    emoji: '🍽️',
    category: 'Software & SaaS',
    status: 'succeeding',
    riskLevel: 'medium',
    opportunityScore: 8,
    marketSizeEst: '$3.8B Urban Foodservice Revenue',
    summary:
      'Nigerian restaurants, lounges, and quick-service restaurant (QSR) chains hemorrhage cash through staff pilferage, chaotic kitchen ticket communication, and untracked inventory wastage. Specialized restaurant management systems integrating table ordering, kitchen display systems (KDS), and inventory replenishment are expanding fast.',
    publicInsight:
      'General-purpose retail POS machines fail in hospitality. Restaurants demand cloud software that prevents waiters from voiding receipts after collecting cash, tracks meat portions from the freezer to plate, and aggregates delivery orders from Chowdeck and Bolt Food onto one screen.',
    keyPlayers: ['Orda Africa', 'FoodCourt POS', 'Menufinder Africa', 'Bumpa Restaurant Suite', 'Vendease Procurement'],
    whySucceeding:
      'Restaurant margins are razor-thin (8-15%) due to 100% generator fuel costs; automated inventory controls that curb raw material theft can single-handedly save an eatery from bankruptcy.',
    marketGaps: [
      'Centralized recipe cost calculation software updating dynamically as ingredient prices fluctuate',
      'Unified delivery aggregator screen consolidating Chowdeck, Glovo, and direct orders',
      'Customer loyalty and SMS marketing software tailored for upscale lounges',
      'Automated raw ingredient purchase financing based on weekly POS dining volume',
      'QR code table ordering and split-bill payment software for nightclubs and bars',
    ],
    regulatoryNotes:
      'NAFDAC food hygiene regulations, State Tourism & Licensing Boards, and State Consumption Tax (5% hospitality tax in Lagos).',
    tags: ['restaurant-tech', 'food-POS', 'hospitality', 'inventory-theft', 'QSR'],
  },
  {
    id: '13',
    slug: 'fleet-management-telematics',
    name: 'Fleet Management & Telematics',
    emoji: '🚛',
    category: 'Software & SaaS',
    status: 'succeeding',
    riskLevel: 'medium',
    opportunityScore: 8,
    marketSizeEst: '$450M Commercial Telematics',
    summary:
      'With diesel prices hovering around ₦1,200 to ₦1,500 per litre and commercial truck tires costing upwards of ₦350,000 each, fleet operators cannot tolerate unauthorized trips, fuel siphoning, or reckless driving. IoT telematics platforms offering real-time fuel tank monitoring and speed governances are seeing strong enterprise adoption.',
    publicInsight:
      'Basic GPS tracking is commoditized. The real value and high willingness-to-pay lies in capacitive fuel rod sensors that detect diesel siphoning to the exact liter and remote engine shutoff when drivers deviate from authorized corridors.',
    keyPlayers: ['Mecho Autotech', 'Cartrack Nigeria', 'CarScan', 'DriveMe', 'Max Drive Telematics'],
    whySucceeding:
      'Fuel theft accounts for 15-25% of commercial fleet operating budgets; deploying telematics delivers an immediate ROI within 60 to 90 days.',
    marketGaps: [
      'Tire pressure and tread wear IoT sensors preventing highway blowouts',
      'Predictive engine maintenance scheduling linked directly to vetted spare parts vendors',
      'Driver behavior scoring integrated with commercial motor insurance discounts',
      'Cold-chain temperature logging verified via tamper-proof sensor telemetry',
      'Interstate cargo security escort coordination and emergency SOS dispatch',
    ],
    regulatoryNotes:
      'Federal Road Safety Corps (FRSC) mandatory speed limiter regulations and State vehicle inspection service (VIO) computerised roadworthiness standards.',
    tags: ['fleet-management', 'telematics', 'fuel-monitoring', 'logistics', 'IoT'],
  },
  {
    id: '14',
    slug: 'legaltech-corporate-compliance',
    name: 'LegalTech & Regulatory Filings',
    emoji: '⚖️',
    category: 'Software & SaaS',
    status: 'emerging',
    riskLevel: 'low',
    opportunityScore: 7,
    marketSizeEst: '₦120B Legal & Corporate Filings Market',
    summary:
      'Corporate Affairs Commission (CAC) company incorporation and post-incorporation filings used to require physical lawyer queues and paper briefs. LegalTech platforms have digitized business registration, trademark protection, and standard contract generation for African startups and foreign entrants.',
    publicInsight:
      'Standard document templates alone do not generate recurring revenue. High-value LegalTech software focuses on automated annual returns reminders, company secretarial workflows, and multi-jurisdictional expansion kits across West Africa.',
    keyPlayers: ['LawPavilion', 'DIYlaw', 'Sidebrief', 'Legal Trunk', 'PluralCode Legal'],
    whySucceeding:
      'CAC full migration to the online Companies Registration Portal (CRP) and increasing foreign investor scrutiny on regulatory corporate governance.',
    marketGaps: [
      'Automated contract review spotting dangerous indemnity clauses under Nigerian law',
      'Whistleblower protection and internal fraud reporting SaaS for corporate compliance',
      'Digital land title registry verification software for Lagos and Abuja land transactions',
      'Intellectual property copyright fingerprinting for Nollywood filmmakers and music producers',
      'Automated NDA and employment offer generation for distributed remote teams',
    ],
    regulatoryNotes:
      'Corporate Affairs Commission (CAMA 2020), Nigerian Bar Association (NBA) professional rules on legal advertising, and Trademarks Registry.',
    tags: ['legaltech', 'compliance', 'CAC', 'incorporation', 'contracts'],
  },
  {
    id: '15',
    slug: 'cybersecurity-data-protection',
    name: 'Cybersecurity & Data Privacy (NDPA)',
    emoji: '🔒',
    category: 'Software & SaaS',
    status: 'succeeding',
    riskLevel: 'medium',
    opportunityScore: 9,
    marketSizeEst: '$650M Cybersecurity Spend (Nigeria/West Africa)',
    summary:
      'Financial institutions and startups in Nigeria suffer relentless targeted ransomware, credential stuffing, and insider fraud attacks (over ₦17 billion lost to bank fraud in 2023 per FITC). The enactment of the Nigeria Data Protection Act (NDPA 2023) introduced heavy statutory fines, making compliance and perimeter defense top board priorities.',
    publicInsight:
      'The biggest cyber vulnerability in Nigerian corporations is not zero-day software exploits; it is insider collusion (bank tellers selling customer SIM swap data) and phishing. Platforms automating privileged access management and employee security drills command premium enterprise pricing.',
    keyPlayers: ['Cybervergent', 'Digital Encode', 'CyberSafe Foundation', 'Outsource Global Cyber', 'Layer3'],
    whySucceeding:
      'Nigeria Data Protection Commission (NDPC) statutory audit deadlines and CBN risk-based cybersecurity framework mandating SOC2 and ISO27001 certifications for licensed entities.',
    marketGaps: [
      'Continuous automated vendor third-party risk assessment for commercial banks',
      'Insider fraud detection flagging unauthorized database queries by support staff',
      'Phishing simulation training conducted in colloquial Nigerian English and Pidgin',
      'Affordable compliance automation software for Tier-2 fintechs facing NDPC audits',
      'Cyber-extortion and business email compromise (BEC) incident response retainers',
    ],
    regulatoryNotes:
      'Nigeria Data Protection Act (NDPA 2023), NDPC regulations, CBN Risk-Based Cybersecurity Framework, and Cybercrimes (Prohibition, Prevention, etc.) Amendment Act 2024.',
    tags: ['cybersecurity', 'NDPA', 'data-protection', 'fraud', 'compliance'],
  },

  // ─── 3. COMMERCE, RETAIL & MARKETPLACES ────────────────────────────────────────
  {
    id: '16',
    slug: 'b2b-wholesale-fmcg',
    name: 'B2B Wholesale & FMCG Distribution',
    emoji: '📦',
    category: 'Commerce & Retail',
    status: 'struggling',
    riskLevel: 'very-high',
    opportunityScore: 7,
    marketSizeEst: '$100B+ Informal FMCG Market',
    summary:
      'Startups raised hundreds of millions of dollars to digitize mom-and-pop kiosk (khe-khe) wholesale inventory replenishment. However, heavy warehouse leases, asset-heavy delivery fleets, and hyper-inflationary working capital erosion forced brutal restructuring across pioneer operators.',
    publicInsight:
      'Owning warehouses and delivery vans destroys capital in Nigerian B2B wholesale. The surviving model is an asset-light marketplace connecting established super-distributors (who already own warehouses) to neighborhood retailers via WhatsApp.',
    keyPlayers: ['Omnibiz', 'Sabi', 'TradeDepot', 'Alerzo (downsized)', 'Vendease'],
    whyFailing:
      'FMCG wholesale operates on microscopic 3-6% gross margins. Soaring diesel costs, vehicle breakdowns, and currency devaluation wiped out gross margins, leading to widespread warehouse shutdowns and layoffs.',
    marketGaps: [
      'Asset-light distributor software empowering traditional super-distributors to run routes efficiently',
      'Manufacturer-to-retailer direct promotional rebate verification software',
      'Wholesale bulk-buying clubs for neighborhood bakeries and caterers (flour/sugar)',
      'Working capital financing where repayment is secured by physical FMCG inventory',
      'Digitized cash collection verification for FMCG van sales reps to stop field theft',
    ],
    regulatoryNotes:
      'NAFDAC registration required for packaged foods and cosmetics; FCCPC consumer protection oversight; local government haulage permits and market union levies.',
    tags: ['wholesale', 'FMCG', 'distribution', 'retail', 'inventory'],
  },
  {
    id: '17',
    slug: 'ecommerce-marketplaces',
    name: 'E-Commerce & Multi-Vendor Marketplaces',
    emoji: '🛒',
    category: 'Commerce & Retail',
    status: 'struggling',
    riskLevel: 'very-high',
    opportunityScore: 6,
    marketSizeEst: '$7.5B B2C Online Retail',
    summary:
      'Horizontal multi-category e-commerce remains difficult to scale profitably. High logistics return rates on Cash-on-Delivery (COD) orders, customer skepticism over counterfeit products, and high server costs have pressured pioneer operators, while second-hand classifieds and vertical marketplaces thrive.',
    publicInsight:
      'Horizontal e-commerce cannot survive without owning delivery and enforcing upfront digital payment. The only profitable e-commerce models are high-ticket vertical niches (car parts, industrial machinery) or peer-to-peer classifieds.',
    keyPlayers: ['Jumia Nigeria', 'Konga (Zinox)', 'Jiji Nigeria', 'Obiex Commerce', 'Kasuwa'],
    whyFailing:
      'Failed deliveries on COD (return rates exceeding 30%), low average order value (AOV) vs high dispatch cost, and consumer reluctance to trust seller product photos.',
    marketGaps: [
      'B2B industrial spare parts marketplace with verified technical specifications',
      'Automated escrow payment infrastructure for high-ticket peer-to-peer online sales',
      'Refurbished graded smartphone marketplace with genuine 6-month warranties',
      'Direct-to-consumer artisanal home decor and export fashion marketplaces',
      'Hyperlocal hardware construction materials marketplace delivering to building sites',
    ],
    regulatoryNotes:
      'FCCPC Consumer Protection regulations on return policies and misleading advertising; SON (Standards Organisation of Nigeria) certification on imported goods.',
    tags: ['ecommerce', 'marketplace', 'retail', 'COD', 'logistics'],
  },
  {
    id: '18',
    slug: 'social-commerce-enablement',
    name: 'Social Commerce & Creator Selling',
    emoji: '🛍️',
    category: 'Commerce & Retail',
    status: 'succeeding',
    riskLevel: 'low',
    opportunityScore: 9,
    marketSizeEst: '$3.2B Social Commerce GMV',
    summary:
      'The vast majority of digital retail in Nigeria takes place on Instagram, WhatsApp, and TikTok rather than formal e-commerce websites. Tools enabling social vendors to display product catalogs, verify instant payments, print thermal receipts, and book dispatch riders directly inside chat are flourishing.',
    publicInsight:
      'Nigerian shoppers buy based on personal relationship and real-time video validation. Winning platforms do not try to pull buyers out of Instagram into an app; they embed payment verification and delivery booking directly into WhatsApp DMs.',
    keyPlayers: ['Bumpa', 'Paystack Commerce', 'Selar', 'Catapult', 'Sendbox Social'],
    whySucceeding:
      'Over 35 million active social media users and a generational shift toward entrepreneurial micro-retailing among Gen-Z and Millennial creators.',
    marketGaps: [
      'Automated payment confirmation bots that instantly detect fake bank transfer screenshots',
      'WhatsApp automated customer support handling standard sizing and availability inquiries',
      'Social vendor micro-collateralized inventory loans based on Instagram sales volume',
      'Group-buying and pre-order coordination tools for viral TikTok vendors',
      'Instant thermal shipping label generation and multi-courier rate comparisons',
    ],
    regulatoryNotes:
      'NDPA compliance for customer contact storage; FIRS tax monitoring on digital social vendors receiving commercial transfers into personal bank accounts.',
    tags: ['social-commerce', 'instagram-vendors', 'whatsapp-store', 'catalogs', 'D2C'],
  },
  {
    id: '19',
    slug: 'fashion-on-demand-apparel',
    name: 'Fashion & On-Demand Ethnic Apparel',
    emoji: '👗',
    category: 'Commerce & Retail',
    status: 'emerging',
    riskLevel: 'medium',
    opportunityScore: 8,
    marketSizeEst: '$4.7B Apparel & Footwear Market',
    summary:
      'Nigeria has one of the most vibrant bespoke fashion cultures globally, anchored by traditional Aso-Ebi, Ankara, and modern Afrocentric streetwear. The export market to the African diaspora in the US, UK, and Canada is booming, but fragmented artisan tailoring and erratic fabric supply restrict scale.',
    publicInsight:
      'Mass-produced standard ready-to-wear struggles due to non-standardized African body measurements. The multi-million-dollar opportunity is organized contract manufacturing hubs that standardize sizing, quality control, and international DHL export delivery.',
    keyPlayers: ['Afrikrea (ANKA)', 'Orange Culture', 'Dye Lab', 'Zuvva', 'Aso-Ebi Hub'],
    whySucceeding:
      'Naira devaluation made Nigerian bespoke fashion extraordinarily affordable for diaspora buyers earning in USD and GBP, driving high-margin export orders.',
    marketGaps: [
      'Standardized 3D body-scanning and automated measurement capture via smartphone camera',
      'Contract apparel manufacturing factories for independent streetwear labels',
      'Fabric provenance and bulk digital wholesale marketplace for raw textiles (Aba/Kano)',
      'Diaspora wedding Aso-Ebi coordination and global doorstep fulfillment platform',
      'On-demand embroidery and screen-printing SaaS platform for merchandising',
    ],
    regulatoryNotes:
      'Nigerian Export Promotion Council (NEPC) Export Expansion Grant (EEG); SON textile quality standards; AfCFTA rules of origin certifications.',
    tags: ['fashion', 'apparel', 'export', 'diaspora', 'manufacturing'],
  },
  {
    id: '20',
    slug: 'food-delivery-quick-commerce',
    name: 'Food Delivery & Quick Commerce',
    emoji: '🍔',
    category: 'Commerce & Retail',
    status: 'succeeding',
    riskLevel: 'high',
    opportunityScore: 8,
    marketSizeEst: '₦30B+ Annual Delivery Volume (2024)',
    summary:
      'After foreign conglomerates like Jumia Food and Bolt Food retreated from Nigeria due to high overhead and inability to achieve unit profitability, local operators cracked the market. Chowdeck demonstrated dramatic growth (crossing ₦30B in GMV in 2024) by partnering with high-volume fast-food chains like Chicken Republic and deploying hyper-localized motorbike clusters.',
    publicInsight:
      'Food delivery cannot survive on gourmet sushi orders in Victoria Island. It scales by dominating everyday staple meals (jollof rice, fried chicken, meat pies) with ₦3,500-₦6,000 basket sizes and hyper-dense dispatch routing.',
    keyPlayers: ['Chowdeck', 'FoodCourt', 'Heyfood', 'Eden Life', 'Glovo Nigeria'],
    whySucceeding:
      'Young urban professionals dealing with 3-hour daily Lagos traffic prioritize time savings, while exclusive delivery partnerships with nationwide QSR brands create high order density.',
    marketGaps: [
      'Late-night dark kitchen delivery networks operating from 10 PM to 4 AM',
      'Low-cost corporate lunch batch delivery subscriptions for commercial banks',
      'Hyperlocal fruit, vegetable, and raw meat procurement delivered in under 45 minutes',
      'Electric motorcycle battery-swapping networks dedicated to delivery riders',
      'Specialized insulated backpack hardware maintaining food temperature in heavy rain',
    ],
    regulatoryNotes:
      'Lagos State Ministry of Transportation delivery permits; local government dispatch emblem fees; NAFDAC hygienic food transportation standards.',
    tags: ['food-delivery', 'quick-commerce', 'logistics', 'qsr', 'cloud-kitchens'],
  },
  {
    id: '21',
    slug: 'halal-commerce-ethical-products',
    name: 'Halal Commerce & Islamic Products',
    emoji: '🌙',
    category: 'Commerce & Retail',
    status: 'emerging',
    riskLevel: 'low',
    opportunityScore: 8,
    marketSizeEst: '$2.1B Halal Consumer Goods (Northern Nigeria)',
    summary:
      'Over 100 million Muslims reside in Nigeria, predominantly in the North and Southwest. Despite immense purchasing power and strict dietary/lifestyle requirements, the domestic market for certified Halal food processing, non-interest financial products, and Shariah-compliant personal care products is deeply underserved.',
    publicInsight:
      'Halal is not just a religious label; it is a global gold standard for food hygiene, ethical supply chains, and non-interest finance. Certified Halal meat processing in Northern Nigeria can serve both domestic supermarkets and export to GCC/Middle Eastern markets.',
    keyPlayers: ['Lotus Bank Digital', 'Marble Capital', 'HalalChain', 'Jaiz Digital', 'Alt-Bank'],
    whySucceeding:
      'Rapid growth of Islamic non-interest commercial banking and increasing demand for certified transparency in food sourcing and financial returns.',
    marketGaps: [
      'Traceable farm-to-fork Halal meat certification and refrigerated logistics platform',
      'Shariah-compliant equity crowdfunding and Sukuk investment app for retail investors',
      'Halal cosmetic, skincare, and personal care distribution network',
      'Islamic micro-takaful insurance products for northern agricultural cooperatives',
      'Modest fashion e-commerce marketplace catering to urban Muslim professional women',
    ],
    regulatoryNotes:
      'CBN Non-Interest Financial Institutions (NIFI) regulatory framework; Halal Certification Authority (HCA) Nigeria; NAFDAC food labeling guidelines.',
    tags: ['halal', 'islamic-finance', 'non-interest', 'ethical-commerce', 'northern-nigeria'],
  },

  // ─── 4. HEALTHCARE & LIFE SCIENCES ─────────────────────────────────────────────
  {
    id: '22',
    slug: 'healthtech-telemedicine',
    name: 'HealthTech & Telemedicine Platforms',
    emoji: '🏥',
    category: 'Healthcare',
    status: 'emerging',
    riskLevel: 'medium',
    opportunityScore: 8,
    marketSizeEst: '$11B National Healthcare Expenditure',
    summary:
      'With only 0.4 doctors per 1,000 citizens and severe physician emigration ("Japa" wave to the UK and Canada), physical healthcare access has collapsed. Telemedicine platforms connecting licensed doctors to patients via chat, audio, and video consultations are essential shock absorbers.',
    publicInsight:
      'Stand-alone video consultation apps fail because patient data is too expensive and bandwidth is erratic. Telemedicine works when integrated directly into employer HMO health plans, pharmacy fulfillment, and WhatsApp bot triage.',
    keyPlayers: ['Helium Health', 'Reliance HMO', 'WellaHealth', 'Mobihealth International', 'CarePay'],
    whySucceeding:
      'The National Health Insurance Authority (NHIA) Act 2022 made health insurance mandatory for all Nigerian residents, creating massive corporate demand for digital-first HMO platforms.',
    marketGaps: [
      'Low-bandwidth WhatsApp AI triage bot for basic malaria, typhoid, and hypertension management',
      'Digital hospital management software (EMR) tailored for small private clinics',
      'Diaspora remittance-to-healthcare portals allowing overseas Nigerians to pay clinics directly for parents',
      'Specialist tele-radiology and tele-pathology second opinion networks',
      'Mobile chronic disease management (diabetes/cardiovascular) with home lab visits',
    ],
    regulatoryNotes:
      'Medical and Dental Council of Nigeria (MDCN) teleconsultation ethics code; NHIA operational guidelines; Federal Ministry of Health regulations.',
    tags: ['healthtech', 'telemedicine', 'HMO', 'NHIA', 'primary-care'],
  },
  {
    id: '23',
    slug: 'b2b-pharma-distribution',
    name: 'B2B Pharmaceutical Distribution',
    emoji: '💊',
    category: 'Healthcare',
    status: 'succeeding',
    riskLevel: 'medium',
    opportunityScore: 9,
    marketSizeEst: '$3.5B Pharmaceutical Market',
    summary:
      'Nigeria’s fragmented pharmaceutical supply chain is plagued by counterfeit drugs (estimated at 15-30% of circulating medications) and frequent stockouts in neighborhood retail pharmacies and patent medicine stores (PPMVs). B2B digital distributors ordering directly from global and local manufacturers have unlocked massive, capital-efficient distribution.',
    publicInsight:
      'B2B pharma is one of the highest-performing sectors in African tech. Pharmacies order essential medications weekly, demand guaranteed authentic stock to protect patient lives, and generate 100% predictable, recurring working capital cycles.',
    keyPlayers: ['DrugStoc', 'Remedial Health', 'PharmaRun', 'Field Intelligence', 'LifeBank'],
    whySucceeding:
      'High fragmentation of 40,000+ retail pharmacies and PPMVs combined with zero tolerance for counterfeit medications; tech platforms guarantee batch authenticity and next-day clinic delivery.',
    marketGaps: [
      'Temperature-controlled cold-chain distribution for insulin and biologic oncology drugs',
      'Inventory management and point-of-sale software customized for small retail pharmacies',
      'Working capital inventory financing for neighborhood patent and proprietary medicine vendors (PPMVs)',
      'Raw pharmaceutical active pharmaceutical ingredient (API) import marketplace for local drug factories',
      'Counterfeit drug verification handheld scanners for hospital procurement officers',
    ],
    regulatoryNotes:
      'Pharmacy Council of Nigeria (PCN) Act 2022 wholesale premises licensing; NAFDAC drug registration and counterfeit drug taskforce regulations.',
    tags: ['pharma', 'healthtech', 'drug-distribution', 'NAFDAC', 'pharmacies'],
  },
  {
    id: '24',
    slug: 'medical-diagnostics-pathology',
    name: 'Medical Diagnostics & Pathology Tech',
    emoji: '🔬',
    category: 'Healthcare',
    status: 'struggling',
    riskLevel: 'very-high',
    opportunityScore: 7,
    marketSizeEst: '$1.2B Diagnostic Testing Market',
    summary:
      'Over 70% of medical clinical decisions rely on laboratory diagnostic tests, yet most Nigerian hospitals lack functioning automated analyzers. Pioneer biotech startups attempting high-cost genome sequencing faced strategic and financial headwinds (e.g. 54gene liquidation in 2023), while focused clinical pathology networks and blood dispatch systems thrive.',
    publicInsight:
      'High-complexity genomics without domestic paying clients burned tens of millions in venture capital. The sustainable play is decentralized, rapid blood bank logistics (LifeBank) and automated clinical chemistry labs serving private maternity hospitals.',
    keyPlayers: ['LifeBank', 'Synlab Nigeria', 'Clina-Lancet Laboratories', 'Flying Doctors Healthcare', 'MeCure Industries'],
    whyFailing:
      'Astronomical equipment import costs, foreign exchange depreciation, uninterrupted power supply requirements, and the collapse of capital-intensive genomic biobanks due to boardroom governance battles.',
    marketGaps: [
      'Automated donor blood dispatch and emergency oxygen cylinder logistics tracking',
      'Point-of-care rapid molecular diagnostic test kits for infectious disease screening',
      'Digital pathology slides scanning platform enabling remote pathology interpretations',
      'Mobile phlebotomy service collecting routine diagnostic blood samples from patient homes',
      'Refurbished diagnostic laboratory equipment leasing and technical repair service',
    ],
    regulatoryNotes:
      'Medical Laboratory Science Council of Nigeria (MLSCN); Federal Ministry of Health regulations; NAFDAC diagnostic reagent approvals.',
    tags: ['diagnostics', 'pathology', 'lifebank', 'laboratories', 'blood-bank'],
  },
  {
    id: '25',
    slug: 'mental-health-digital-therapy',
    name: 'Mental Health & Digital Therapy',
    emoji: '🧠',
    category: 'Healthcare',
    status: 'emerging',
    riskLevel: 'high',
    opportunityScore: 7,
    marketSizeEst: '₦80B Underserved Mental Health Gap',
    summary:
      'Severe economic hardship, runaway inflation, and social disruption have triggered an unprecedented mental health crisis in urban Nigeria. With fewer than 300 certified psychiatrists serving 220 million people and severe cultural stigma surrounding traditional psychiatric hospitals, anonymous digital therapy platforms are stepping into the breach.',
    publicInsight:
      'Out-of-pocket retail consumer willingness to pay for therapy is low due to severe budget constraints. The profitable enterprise model is B2B corporate employee assistance programs (EAP) sold to commercial banks, telecoms, and tech startups as an employee retention benefit.',
    keyPlayers: ['Mentally Aware Nigeria (MANI)', 'She Writes Woman', 'Nguvu Health', 'Asido Foundation', 'MyTherapist.ng'],
    whySucceeding:
      'Growing awareness among Gen-Z and Millennial corporate professionals, coupled with anonymous tele-counseling that circumvents deep social stigma.',
    marketGaps: [
      'B2B Corporate Employee Assistance Program (EAP) stress management SaaS',
      'Anonymous audio-only peer support groups moderated by trained clinical psychologists',
      'WhatsApp conversational cognitive behavioral therapy (CBT) tools for anxiety',
      'Substance abuse relapse prevention tracking and anonymous digital check-in platform',
      'Culturally adapted mental healthcare delivered in Yoruba, Hausa, and Pidgin',
    ],
    regulatoryNotes:
      'National Mental Health Act 2021 (which decriminalized attempted suicide and established patient human rights); MDCN practitioner licensing.',
    tags: ['mental-health', 'therapy', 'counseling', 'wellness', 'EAP'],
  },
  {
    id: '26',
    slug: 'femtech-maternal-health',
    name: 'FemTech & Maternal Healthcare',
    emoji: '🤰',
    category: 'Healthcare',
    status: 'emerging',
    riskLevel: 'medium',
    opportunityScore: 8,
    marketSizeEst: '₦350B Maternal & Reproductive Health Spend',
    summary:
      'Nigeria accounts for nearly 20% of global maternal deaths, making safe pregnancy, antenatal tracking, and reproductive healthcare a catastrophic public health emergency. FemTech startups combining mobile antenatal SMS guidance, menstrual tracking, and postpartum counseling are filling gaps left by overburdened public general hospitals.',
    publicInsight:
      'Standalone period tracker apps do not monetize well. High-impact monetization occurs when antenatal tracking is bundled with verified obstetrician consultations, home ultrasound dispatch, and delivery preparation savings accounts.',
    keyPlayers: ['Helium Mama', 'Whispa Health', 'Mothering.ng', 'My-Care', 'Omomi'],
    whySucceeding:
      'Over 7 million babies are born in Nigeria annually; anxious middle-class expectant mothers actively invest in private digital healthcare monitoring to guarantee safe deliveries.',
    marketGaps: [
      'Antenatal monitoring platforms coordinating home midwife visits in peri-urban areas',
      'Affordable ultrasound scan booking and digital radiologist report delivery',
      'Postpartum depression screening and remote mother support communities',
      'Reproductive healthcare e-pharmacy with discreet home delivery for women',
      'Hospital delivery savings wallets allowing extended families to pool childbirth funds',
    ],
    regulatoryNotes:
      'Nursing and Midwifery Council of Nigeria (NMCN); Federal Ministry of Health Maternal & Child Health policies; NAFDAC reproductive health product approvals.',
    tags: ['femtech', 'maternal-health', 'antenatal', 'womens-health', 'pregnancy'],
  },

  // ─── 5. AGRICULTURE, FOOD & CLIMATE ─────────────────────────────────────────────
  {
    id: '27',
    slug: 'agritech',
    name: 'Agritech & Smallholder Aggregation',
    emoji: '🌾',
    category: 'Agriculture & Food',
    status: 'struggling',
    riskLevel: 'high',
    opportunityScore: 8,
    marketSizeEst: '22-24% of National GDP (NBS)',
    summary:
      'Smallholder agriculture sustains over 36% of the Nigerian labor force, but the sector suffered massive reputational damage following the collapse of retail crowdfunding platforms (Farmcrowdy, Agropartnerships). Today, the sector is rebuilding around institutional commodity aggregation, mechanization sharing, and contract farming.',
    publicInsight:
      'Guaranteed-return retail crowdsourcing is dead and illegal. The enduring model is institutional commodity aggregation (AFEX) backed by certified warehouse receipts and mechanized tractor asset sharing (Hello Tractor).',
    keyPlayers: ['AFEX Commodities Exchange', 'Hello Tractor', 'Releaf', 'ThriveAgric (restructured)', 'Babban Gona'],
    whyFailing:
      'Pioneer retail crowdfunding platforms failed due to biological harvest risks, climate shocks, lack of institutional hedging, and unsustainable promises of 20-30% guaranteed returns.',
    marketGaps: [
      'Digital warehouse receipt financing allowing farmers to borrow against stored grain',
      'Smallholder tractor and harvester booking software for agricultural cooperatives',
      'Drone-based aerial multispectral crop health and pest infestation monitoring',
      'Traceability software for cocoa and palm oil compliant with the European Deforestation Regulation (EUDR)',
      'Automated seed and fertilizer distribution networks bypassing corrupt government middlemen',
    ],
    regulatoryNotes:
      'SEC rules on digital commodities exchanges and warehouse receipts; Federal Ministry of Agriculture and Food Security policies; Nigerian Agricultural Insurance Corporation (NAIC).',
    tags: ['agritech', 'smallholders', 'commodities', 'AFEX', 'mechanization'],
  },
  {
    id: '28',
    slug: 'commodity-export-tech',
    name: 'Agricultural Commodity Export Tech',
    emoji: '🚢',
    category: 'Agriculture & Food',
    status: 'succeeding',
    riskLevel: 'medium',
    opportunityScore: 9,
    marketSizeEst: '$3.8B Non-Oil Agro Export Potential',
    summary:
      'Naira devaluation created massive incentives for non-oil exports, with raw cashew nuts, sesame seeds, cocoa beans, ginger, and hibiscus (zobo leaves) commanding soaring prices in US Dollars and Euros. Export Tech platforms streamlining sourcing from rural hinterlands, lab quality testing, and port export logistics are generating strong foreign currency revenues.',
    publicInsight:
      'Exporting agricultural commodities is the cleanest legal dollar hedge in Nigeria. The competitive moat is not an app; it is quality grading laboratories, moisture meters, and direct relationships with rural farmer cooperatives.',
    keyPlayers: ['AFEX Export', 'AgroEknor', 'Complete Farmer', 'Farmforte', 'Releaf Export'],
    whySucceeding:
      'Global industrial demand for raw agricultural commodities (sesame in Asia, cocoa in Europe, cashew in India) combined with strong federal export incentive schemes (RT200 / EEG).',
    marketGaps: [
      'Automated moisture and aflatoxin testing verification IoT hardware for field buyers',
      'Export contract hedging platform protecting Nigerian aggregators against global spot price swings',
      'Traceable organic certification documentation for European specialty food markets',
      'Digital phytosanitary inspection booking reducing customs hold-ups at Apapa/Tin Can ports',
      'Direct farm-to-shipping-container stuffing logistics in hinterland aggregation hubs (Kano, Ogbomoso)',
    ],
    regulatoryNotes:
      'Nigerian Export Promotion Council (NEPC); Nigeria Agricultural Quarantine Service (NAQS); CBN Clean Certificate of Inspection (CCI) and NXP form requirements.',
    tags: ['export', 'commodities', 'cashew', 'sesame', 'cocoa'],
  },
  {
    id: '29',
    slug: 'cold-chain-storage',
    name: 'Cold Chain Storage Infrastructure',
    emoji: '❄️',
    category: 'Agriculture & Food',
    status: 'succeeding',
    riskLevel: 'medium',
    opportunityScore: 10,
    marketSizeEst: '$9B Annual Post-Harvest Waste Value',
    summary:
      'Over 40% of perishable fresh fruits and vegetables rot before reaching urban consumer plates due to zero temperature-controlled logistics. Solar-powered walk-in cold rooms deployed directly inside bustling open-air food markets (Mile 12, Bodija) extend produce shelf-life from 2 days to 21 days, unlocking immense economic value.',
    publicInsight:
      'Cold storage works when deployed as a pay-as-you-store utility. Market women gladly pay ₦200 to ₦300 per 20kg plastic crate per night because saving a single crate of tomatoes from rotting preserves ₦15,000 in capital.',
    keyPlayers: ['ColdHubs', 'Koolboks', 'InspiraFarms', 'Gricd Integrated Services', 'FreshBag'],
    whySucceeding:
      'High ambient temperatures and frequent electricity blackouts make decentralized solar cold rooms the only viable mechanism to prevent catastrophic food losses.',
    marketGaps: [
      'Solar-refrigerated three-wheeler tricycles transporting tomatoes from farm-gate to market',
      'Cold-chain temperature logging sensors verified on cloud dashboards for pharma compliance',
      'Refrigerated container leasing for tomato and pepper transport along the Kano-Lagos corridor',
      'Centralized seafood and poultry cold storage facilities in coastal fishing communities',
      'Post-harvest solar dehydration equipment for export-grade dried mango and chili peppers',
    ],
    regulatoryNotes:
      'Federal Ministry of Agriculture post-harvest policy; NAFDAC food preservation standards; State market development authorities.',
    tags: ['cold-chain', 'coldhubs', 'post-harvest', 'solar-cooling', 'agriculture'],
  },
  {
    id: '30',
    slug: 'aquaculture-fish-farming',
    name: 'Aquaculture & Fish Farming Tech',
    emoji: '🐟',
    category: 'Agriculture & Food',
    status: 'emerging',
    riskLevel: 'high',
    opportunityScore: 8,
    marketSizeEst: '$1.5B Commercial Aquaculture',
    summary:
      'Nigeria is the largest consumer of catfish in Africa, yet the country imports over $800 million in frozen fish annually to meet national demand. Catfish and tilapia aquaculture suffers from astronomical fish feed costs (comprising 70% of operating expenses) and poor water quality management.',
    publicInsight:
      'The multi-million-dollar bottleneck in Nigerian aquaculture is feed costs driven by imported fishmeal. Companies producing insect-based protein (Black Soldier Fly larvae) to replace imported fishmeal hold the key to doubling fish farm profit margins.',
    keyPlayers: ['Triton Aqua', 'Grand Cereals Aquaculture', 'Durante Fish Industries', 'Biofly Africa', 'Aqualink Nigeria'],
    whySucceeding:
      'High domestic cultural preference for fresh catfish (catfish pepper soup) and federal restrictions on commercial frozen fish import foreign exchange allocations.',
    marketGaps: [
      'Black Soldier Fly (BSF) insect protein production facilities replacing expensive fishmeal',
      'Automated IoT water quality sensors monitoring dissolved oxygen and pH in fish ponds',
      'Solar-powered recirculating aquaculture systems (RAS) slashing water usage by 90%',
      'Catfish smoker kiln upgrades meeting international export hygiene standards',
      'B2B live catfish aggregator marketplace linking peri-urban fish farmers to restaurant grillers',
    ],
    regulatoryNotes:
      'Federal Department of Fisheries regulations; National Environmental Standards and Regulations Enforcement Agency (NESREA) water effluent discharge rules.',
    tags: ['aquaculture', 'fish-farming', 'catfish', 'insect-protein', 'feed'],
  },
  {
    id: '31',
    slug: 'livestock-veterinary-tech',
    name: 'Livestock & Veterinary Tech',
    emoji: '🐄',
    category: 'Agriculture & Food',
    status: 'emerging',
    riskLevel: 'high',
    opportunityScore: 7,
    marketSizeEst: '$4.2B Livestock Economy',
    summary:
      'Nigeria’s livestock sector (cattle, goats, sheep, and poultry) is held back by open grazing conflicts, disease outbreaks (Newcastle disease, African Swine Fever), and counterfeit veterinary drugs. Digitized ranching, feedlot management, and veterinary supply chain platforms are beginning to formalize meat production.',
    publicInsight:
      'Open nomadic pastoralism is facing existential climate and security pressures. The commercial future lies in intensive, enclosed feedlots and automated poultry climate controls backed by direct offtake contracts with commercial supermarkets.',
    keyPlayers: ['Farmsby', 'Zenvet', 'VetKonect', 'Novus Agro Livestock', 'Livestock247'],
    whySucceeding:
      'High demand for hygienic beef, chicken, and dairy from growing urban populations, alongside state government pushes to establish designated livestock grazing reserves.',
    marketGaps: [
      'RFID ear tag traceability and electronic livestock anti-theft tracking systems',
      'On-demand veterinary consultation and cold-chain vaccine delivery platform',
      'Commercial poultry broiler batch performance and feed-conversion-ratio software',
      'Direct cattle feedlot-to-abattoir digital trading platform eliminating exploitative middlemen',
      'Silage and hay commercial packaging and distribution network for dry season cattle feeding',
    ],
    regulatoryNotes:
      'Department of Animal Health and Production; Veterinary Council of Nigeria (VCN); National Livestock Transformation Plan (NLTP).',
    tags: ['livestock', 'poultry', 'cattle', 'veterinary', 'feedlot'],
  },
  {
    id: '32',
    slug: 'smart-ag-iot-precision',
    name: 'Smart Agriculture & Precision Farming IoT',
    emoji: '🛰️',
    category: 'Agriculture & Food',
    status: 'emerging',
    riskLevel: 'medium',
    opportunityScore: 7,
    marketSizeEst: '$180M Precision Ag Market',
    summary:
      'Precision agriculture utilizes satellite imagery, soil sensors, automated irrigation controllers, and drone spraying to maximize hectare yields. While smallholder adoption is constrained by cost, large commercial agribusinesses, seed producers, and rubber/oil palm plantations are heavily adopting precision tools.',
    publicInsight:
      'Commercial plantations with 1,000+ hectares waste millions on manual fertilizer broadcasting and weed management. Agricultural drone spraying delivers measurable ROI by cutting chemical input usage by 35% and spraying an entire hectare in 15 minutes.',
    keyPlayers: ['BeatDrone', 'Agrospace Tech', 'Crop2Cash', 'Zenvus', 'AeroFarms Nigeria'],
    whySucceeding:
      'Extreme rainfall unpredictability caused by climate change requires data-driven planting schedules and precision irrigation to protect multi-million-Naira farm investments.',
    marketGaps: [
      'Commercial drone crop-spraying as a service for rice and sugarcane plantations',
      'Solar-powered smart drip irrigation controllers managed via GSM text message',
      'Soil nutrient analysis kits providing instant N-P-K readings without laboratory delays',
      'Satellite-based crop damage assessment tools for agricultural insurance underwriters',
      'Automated grain silo temperature and humidity sensors preventing weevil infestations',
    ],
    regulatoryNotes:
      'Nigerian Civil Aviation Authority (NCAA) commercial drone flight approvals and pilot licensing; National Space Research and Development Agency (NASRDA).',
    tags: ['precision-ag', 'drones', 'IoT', 'irrigation', 'soil-sensors'],
  },
  {
    id: '33',
    slug: 'clean-cookstoves-lpg',
    name: 'Clean Cookstoves & LPG Tech',
    emoji: '🍳',
    category: 'Agriculture & Food',
    status: 'succeeding',
    riskLevel: 'low',
    opportunityScore: 9,
    marketSizeEst: '$1.8B Household Cooking Energy Market',
    summary:
      'Over 120 million Nigerians still cook over open firewood and charcoal fires, causing severe deforestation and respiratory illnesses. High cooking gas (LPG) cylinder refilling costs have driven the adoption of smart pay-as-you-cook IoT LPG smart meters and advanced biomass gasifier cookstoves.',
    publicInsight:
      'Low-income households cannot afford to refill a full 12.5kg cooking gas cylinder for ₦15,000 upfront. Smart IoT valves that let households pay ₦500 daily for gas via mobile money have opened up the mass market.',
    keyPlayers: ['BioLite Nigeria', 'Bboxx LPG', 'Sun King Clean Cooking', 'Envirofit', 'Oando Clean Cooking'],
    whySucceeding:
      'Surging prices of charcoal and firewood, combined with massive international carbon credit revenues that subsidize the upfront cost of clean cookstove hardware.',
    marketGaps: [
      'Pay-as-you-cook IoT smart gas cylinder valves with automatic replenishment alert',
      'High-efficiency biomass pellet cookstoves powered by agricultural sawdust waste',
      'Last-mile LPG cylinder home swap delivery networks in high-density informal settlements',
      'Carbon credit issuance platform monitoring verified clean cookstove usage in real-time',
      'Electric induction cookers optimized for households with off-grid solar mini-grids',
    ],
    regulatoryNotes:
      'Nigerian Midstream and Downstream Petroleum Regulatory Authority (NMDPRA) LPG safety regulations; Standards Organisation of Nigeria (SON) cylinder standards.',
    tags: ['clean-cooking', 'LPG', 'cookstoves', 'carbon-credits', 'IoT-meters'],
  },

  // ─── 6. ENERGY, UTILITIES & ENVIRONMENT ─────────────────────────────────────────
  {
    id: '34',
    slug: 'energy-solar',
    name: 'Clean Energy & C&I Solar Solutions',
    emoji: '⚡',
    category: 'Energy & Utilities',
    status: 'succeeding',
    riskLevel: 'medium',
    opportunityScore: 10,
    marketSizeEst: '$25B Commercial Energy Access Gap',
    summary:
      'Nigeria generates barely 4,000 MW of national grid electricity for over 220 million people, leaving factories, banks, and hospitals reliant on expensive diesel generators. Commercial & Industrial (C&I) solar companies providing zero-capex solar power purchase agreements (PPAs) represent one of the most profitable sectors in West Africa.',
    publicInsight:
      'Residential solar systems face currency default risk when households struggle with inflation. In stark contrast, C&I solar contracts with manufacturing plants, telecom towers, and commercial banks are dollar-indexed, take-or-pay, and deliver 18-month cash flow paybacks.',
    keyPlayers: ['Daystar Power (Shell)', 'Starsight Energy', 'Arnergy', 'Lumos Nigeria', 'Sun King', 'Auxano Solar'],
    whySucceeding:
      'Diesel prices soaring above ₦1,300/litre and petrol exceeding ₦1,000/litre make solar power 40-60% cheaper than running generator sets, creating overwhelming economic urgency.',
    marketGaps: [
      'Commercial battery energy storage systems (BESS) replacing massive 500kVA factory diesel generators',
      'Local assembly and testing of lithium iron phosphate (LiFePO4) solar batteries',
      'Solar financing platform securitizing PPA contracts for local institutional pension funds',
      'Solar inverter predictive maintenance sensors detecting inverter faults before battery damage occurs',
      'Solar energy-as-a-service tailored specifically for multi-tenant shopping plazas',
    ],
    regulatoryNotes:
      'Electricity Act 2023 (which demonopolized the national grid and empowered States to regulate electricity); Nigerian Electricity Regulatory Commission (NERC) generation permits.',
    tags: ['solar', 'clean-energy', 'C&I', 'diesel-replacement', 'batteries'],
  },
  {
    id: '35',
    slug: 'mini-grids-rural-electrification',
    name: 'Mini-Grids & Rural Electrification',
    emoji: '🔋',
    category: 'Energy & Utilities',
    status: 'succeeding',
    riskLevel: 'medium',
    opportunityScore: 9,
    marketSizeEst: '$9.2B Rural Electrification Opportunity',
    summary:
      'Over 85 million Nigerians lack access to the national electricity grid. Decentralized solar mini-grids powering agricultural communities, agro-processing mills, and rural markets have evolved from non-profit experiments into commercially viable, grant-subsidized infrastructure assets.',
    publicInsight:
      'Mini-grids fail if they only sell lightbulbs to rural households (low electricity consumption). They succeed when developers actively stimulate "productive use of energy" (PUE) by financing electric grain mills, welding shops, and cold rooms for community entrepreneurs.',
    keyPlayers: ['Havenhill Synergy', 'Husk Power Systems', 'Nayo Tropical Technology', 'Rubitec Solar', 'PowerGen Renewable Energy'],
    whySucceeding:
      'The Rural Electrification Agency (REA) under the Nigeria Electrification Project (NEP) and DARES project disbursed over $350M in World Bank and AfDB performance-based capital grants.',
    marketGaps: [
      'Productive use appliance financing (electric cassava graters, oil expellers) for mini-grid customers',
      'Smart bidirectional energy meters with automated USSD remote recharge',
      'Hybrid biomass-solar mini-grids providing 24/7 baseline electricity to rice-farming communities',
      'Turnkey operations and maintenance (O&M) services for remote rural mini-grid installations',
      'Anchor load water pumping solutions purifying community borehole water using excess solar power',
    ],
    regulatoryNotes:
      'NERC Mini-Grid Regulations (providing clear compensation framework in case the national grid extends to the mini-grid area); REA capital subsidy rules.',
    tags: ['mini-grids', 'rural-energy', 'REA', 'PUE', 'productive-use'],
  },
  {
    id: '36',
    slug: 'electric-vehicles-mobility',
    name: 'Electric Vehicles (EV) & Battery Swapping',
    emoji: '🛵',
    category: 'Energy & Utilities',
    status: 'emerging',
    riskLevel: 'high',
    opportunityScore: 8,
    marketSizeEst: '$1.5B Commercial EV Transition',
    summary:
      'With petrol prices quadrupling following the removal of fuel subsidies in May 2023, commercial motorcycle (okada) and tricycle (keke) riders face devastating operating costs. Electric two-wheelers and three-wheelers with modular battery swapping stations are rapidly proving cheaper per kilometer than petrol.',
    publicInsight:
      'Four-wheeler passenger electric cars are irrelevant in Nigeria today due to high purchase costs and zero charging infrastructure. The entire EV opportunity is focused on commercial 2-wheeler dispatch bikes and 3-wheeler tricycles utilizing 60-second battery swapping kiosks.',
    keyPlayers: ['Spiro', 'MAX.ng EV', 'Siltech World', 'Possible EV', 'Jet Motor Company'],
    whySucceeding:
      'Commercial dispatch riders spend ₦4,000-₦6,000 on petrol daily; electric battery swapping cuts daily fueling expenditure by over 40%, generating immediate driver buy-in.',
    marketGaps: [
      'Battery swapping kiosk networks deployed at high-density petrol stations and delivery hubs',
      'Local assembly plants for heavy-duty electric commercial tricycles capable of carrying heavy freight',
      'Telematics and IoT battery management systems (BMS) tracking cell temperature and preventing theft',
      'Asset financing for commercial riders switching from petrol motorcycles to electric bikes',
      'Solar-powered off-grid charging stations independent of the unreliable national electricity grid',
    ],
    regulatoryNotes:
      'National Automotive Design and Development Council (NADDC) EV policy; zero import duty incentives on completely knocked down (CKD) EV parts.',
    tags: ['EV', 'battery-swapping', 'electric-bikes', 'mobility', 'clean-transport'],
  },
  {
    id: '37',
    slug: 'waste-management',
    name: 'Waste Management & Circular Economy',
    emoji: '♻️',
    category: 'Energy & Utilities',
    status: 'emerging',
    riskLevel: 'medium',
    opportunityScore: 8,
    marketSizeEst: '10,000+ Tons Daily Waste (Lagos Alone)',
    summary:
      'Lagos alone produces over 13,000 metric tons of municipal solid waste every single day, with less than 15% formally recycled. Startups digitizing scrap collection, deploying neighborhood buy-back centers, and aggregating PET plastic flakes for export are transforming trash into valuable industrial raw materials.',
    publicInsight:
      'Waste is a reverse-logistics and manufacturing business. Do not rely on municipal government subsidies to get paid. You profit by selling clean baled PET plastic and aluminum scrap to bottling conglomerates (Coca-Cola, Nigerian Breweries) and global recyclers.',
    keyPlayers: ['Wecyclers', 'Scrapays', 'Pakam Technology', 'Chanja Datti', 'RecyclePoints'],
    whySucceeding:
      'Global FMCG packaging mandates and the implementation of Extended Producer Responsibility (EPR) regulations requiring beverage companies to recover packaging waste.',
    marketGaps: [
      'Digital scrap trading platform connecting informal cart-pushers to formal recycling factories',
      'Industrial e-waste recovery extracting precious metals (gold, copper, lithium) from dead electronics',
      'Biogas digesters converting wet organic market waste into clean cooking gas and liquid organic fertilizer',
      'Recycled plastic lumber manufacturing producing weather-resistant outdoor furniture and pallets',
      'Plastic credit verification and tokenization platform for corporate sustainability reporting',
    ],
    regulatoryNotes:
      'National Environmental Standards and Regulations Enforcement Agency (NESREA); State Waste Management Authorities (LAWMA in Lagos); Extended Producer Responsibility (EPR) framework.',
    tags: ['recycling', 'circular-economy', 'waste-tech', 'plastic', 'sustainability'],
  },
  {
    id: '38',
    slug: 'water-purification-utilities',
    name: 'Water Purification & Decentralized Utilities',
    emoji: '💧',
    category: 'Energy & Utilities',
    status: 'emerging',
    riskLevel: 'low',
    opportunityScore: 8,
    marketSizeEst: '₦1.2T Household Drinking Water Spend',
    summary:
      'Municipal pipe-borne water is practically non-existent in urban and peri-urban Nigeria, forcing over 150 million citizens to rely on private boreholes, plastic sachet "pure water", and 20-litre refill dispensers. Decentralized solar water treatment plants and smart dispensing kiosks are emerging as high-margin utility businesses.',
    publicInsight:
      'Pure water sachets are suffering severe margin compression due to packaging polymer inflation. Automated, decentralized solar water refill stations where consumers bring their own reusable 20-litre jugs undercut sachet water by 50% while generating 60% gross profit margins.',
    keyPlayers: ['Jibu Nigeria', 'WaterAid Tech Projects', 'Hydrologic', 'Retew Water', 'Farmwater Solutions'],
    whySucceeding:
      'Drinking water is an inelastic, non-discretionary daily survival need; urban households spend between ₦10,000 and ₦25,000 monthly purely on drinking water.',
    marketGaps: [
      'Automated solar-powered water vending ATM kiosks dispensing UV-treated water per liter',
      'IoT smart water flow meters detecting leaks and managing utility billing in residential estates',
      'Borehole water testing and iron/salinity filtration hardware for coastal communities (Lekki/Port Harcourt)',
      'Bulk clean water delivery dispatch software coordinating private commercial water tankers',
      'Industrial reverse osmosis water purification plants leased to beverage and food manufacturing SMEs',
    ],
    regulatoryNotes:
      'NAFDAC water factory licensing and microbiological safety standards; National Water Resources Act guidelines; State Water Regulatory Commissions.',
    tags: ['water-tech', 'water-purification', 'utilities', 'clean-water', 'ATMs'],
  },
  {
    id: '39',
    slug: 'carbon-markets-climate-verification',
    name: 'Carbon Markets & ClimateTech Verification',
    emoji: '🌱',
    category: 'Energy & Utilities',
    status: 'emerging',
    riskLevel: 'medium',
    opportunityScore: 9,
    marketSizeEst: '$2.5B Africa Carbon Credit Potential',
    summary:
      'With global corporations seeking verified voluntary carbon offsets to hit net-zero targets, Nigeria’s carbon mitigation projects (mangrove restoration in the Niger Delta, clean cookstoves, agroforestry, and landfill methane capture) are attracting major foreign carbon capital.',
    publicInsight:
      'Carbon credits derived from Africa historically faced steep discounts due to lack of transparent measurement, reporting, and verification (MRV). Startups utilizing satellite telemetry and IoT sensor data to verify emission reductions earn top-tier premium credit pricing.',
    keyPlayers: ['Africa Carbon Markets Initiative (ACMI)', 'Carbonland Africa', 'Aceleron Climate', 'Greenbureau', 'Ekipt Climate'],
    whySucceeding:
      'Nigeria’s Climate Change Act 2021 and the establishment of the National Council on Climate Change (NCCC) creating formal frameworks for international carbon trade under Article 6 of the Paris Agreement.',
    marketGaps: [
      'Digital MRV (Measurement, Reporting, and Verification) platform using satellite data for reforestation',
      'IoT smart cookstove telemetry verifying actual daily usage for carbon registry issuance',
      'Carbon credit registry and trading platform connecting local solar mini-grid developers to international buyers',
      'Mangrove blue carbon verification in the Niger Delta with community revenue-sharing escrows',
      'Corporate carbon accounting and greenhouse gas audit software for Nigerian stock-exchange listed companies',
    ],
    regulatoryNotes:
      'National Council on Climate Change (NCCC); Climate Change Act 2021; UNFCCC Article 6 international transfer authorizations.',
    tags: ['carbon-credits', 'climate-tech', 'MRV', 'sustainability', 'net-zero'],
  },

  // ─── 7. INFRASTRUCTURE, MOBILITY & LOGISTICS ────────────────────────────────────
  {
    id: '40',
    slug: 'logistics',
    name: 'Logistics, Freight & Last-Mile Delivery',
    emoji: '🚚',
    category: 'Infrastructure & Mobility',
    status: 'struggling',
    riskLevel: 'very-high',
    opportunityScore: 7,
    marketSizeEst: '$6.4B Domestic Freight Market',
    summary:
      'Moving goods in Nigeria is extraordinarily complex due to highway security risks, chronic port congestion, multiple arbitrary checkpoints, and diesel inflation. Startups that raised venture capital to build asset-heavy truck fleets burned massive capital, while asset-light digital freight brokers and regional parcel aggregators found sustainable niches.',
    publicInsight:
      'Do not buy commercial trucks with venture capital equity. The winners operate asset-light dispatch networks: they aggregate existing independent truck drivers, verify their background with biometrics, and provide return-trip loads to eliminate empty backhauls.',
    keyPlayers: ['GIG Logistics (GIGL)', 'Kobo360', 'Topship', 'Sendbox', 'Fez Delivery', 'Red Star Express (FedEx)'],
    whyFailing:
      'Highway extortion, bad roads causing frequent mechanical axle damage, soaring diesel prices (70% of long-haul operating costs), and inability to enforce cargo liability on third-party drivers.',
    marketGaps: [
      'Return-trip backhaul matching software eliminating empty truck runs between Lagos, Onitsha, and Kano',
      'Bonded container shuttle transit software moving containers by barge from Apapa to inland ports',
      'Automated parcel locker networks deployed in university campuses and high-density estates',
      'Cross-border trucking dispatch connecting Nigerian manufacturers to markets in Ghana and Ivory Coast',
      'Cargo insurance micro-policies issued instantly per shipment via API',
    ],
    regulatoryNotes:
      'NIPOST courier licensing regulations; Federal Road Safety Corps (FRSC); State haulage permits and local government transit levies.',
    tags: ['logistics', 'freight', 'trucking', 'last-mile', 'dispatch'],
  },
  {
    id: '41',
    slug: 'mobility',
    name: 'Urban Mobility & Ride-Hailing',
    emoji: '🚗',
    category: 'Infrastructure & Mobility',
    status: 'struggling',
    riskLevel: 'very-high',
    opportunityScore: 6,
    marketSizeEst: '$2B Ride-Hailing Market',
    summary:
      'Ride-hailing in major metros (Lagos, Abuja) has become a brutal battleground of driver strikes, regulatory crackdowns, and passenger price sensitivity. With commercial drivers unable to maintain vehicle financing repayments under 30% interest rates and high fuel costs, platforms are pivoting to corporate employee shuttles and mass transit tech.',
    publicInsight:
      'On-demand consumer car ride-hailing is an unprofitable grind of price wars and driver commission churn. The high-margin, sticky sector is scheduled corporate bus shuttles (Shuttlers) paid for directly by employers to move workers safely to office towers.',
    keyPlayers: ['Bolt Nigeria', 'Uber Nigeria', 'Shuttlers', 'Moove', 'Lagride', 'MAX.ng'],
    whyFailing:
      'Frequent fuel price hikes, severe car maintenance inflation (imported replacement parts up 300%), driver union strikes over commission rates, and sudden municipal regulatory bans.',
    marketGaps: [
      'Fixed-route air-conditioned corporate commuter bus booking software',
      'Mass transit bus ticketing and digital tap-to-pay validator hardware (replacing paper tickets)',
      'Vehicle maintenance subscription networks providing fleet drivers with genuine wholesale spare parts',
      'Compressed Natural Gas (CNG) conversion kits and refueling dispatch networks for ride-hailing cars',
      'Interstate luxury bus seat booking and luggage tracking software',
    ],
    regulatoryNotes:
      'Lagos State Transport Management Authority (LASTMA); Lagos State Ministry of Transportation ride-hailing regulations; National Union of Road Transport Workers (NURTW) dynamics.',
    tags: ['mobility', 'ride-hailing', 'shuttles', 'transport', 'commute'],
  },
  {
    id: '42',
    slug: 'intra-africa-cross-border-trade',
    name: 'Intra-Africa Cross-Border Cargo & Trade',
    emoji: '🌍',
    category: 'Infrastructure & Mobility',
    status: 'emerging',
    riskLevel: 'high',
    opportunityScore: 9,
    marketSizeEst: '$25B Informal Regional Trade (ECOWAS)',
    summary:
      'Despite the African Continental Free Trade Area (AfCFTA) promises, trading physical goods between Nigeria, Ghana, Togo, Benin, and Kenya is plagued by chaotic border customs procedures, foreign currency conversion frictions, and lack of verified cross-border couriers.',
    publicInsight:
      'Trading between Lagos and Accra should take 8 hours by road, but trucks spend 5 days stuck at Seme and Aflao borders. Platforms that streamline unified digital customs clearance and handle cross-border payments unlock massive latent trade volume.',
    keyPlayers: ['Topship International', 'Terminal Africa', 'Aftown Cargo', 'Fez Delivery', 'DHL Express Nigeria'],
    whySucceeding:
      'Booming e-commerce trade where Nigerian fashion, cosmetics, and Nollywood merchandise are eagerly bought by consumers in Ghana, Kenya, and Ivory Coast.',
    marketGaps: [
      'Multi-currency escrow and customs clearing portal for Lagos-Accra commerce',
      'Consolidated air-cargo freight forwarding for small e-commerce merchants shipping to East and Southern Africa',
      'Direct trucking freight routes linking Lagos industrial zones to the Port of Cotonou and Lomé',
      'AfCFTA Rules of Origin compliance and certificate of origin digital filing software',
      'Cross-border returns and reverse logistics warehouse management',
    ],
    regulatoryNotes:
      'Nigeria Customs Service (NCS); ECOWAS Trade Liberalization Scheme (ETLS); AfCFTA Secretariat guidelines; Pan-African Payment and Settlement System (PAPSS) cross-border local-currency settlement framework.',
    tags: ['cross-border', 'AfCFTA', 'customs', 'regional-trade', 'freight'],
  },
  {
    id: '43',
    slug: 'telecoms',
    name: 'Telecoms, Fiber & Fixed Wireless Infrastructure',
    emoji: '📡',
    category: 'Infrastructure & Mobility',
    status: 'succeeding',
    riskLevel: 'low',
    opportunityScore: 8,
    marketSizeEst: '$8.5B Annual Telecoms Revenue',
    summary:
      'Telecommunications is the bedrock of Nigeria’s digital economy, with over 150 million mobile internet subscriptions. While mobile network operators (MTN, Airtel) battle foreign exchange losses and high tower diesel costs, the expansion of 5G networks, undersea cables (Equiano, 2Africa), and metropolitan fiber networks is driving infrastructure demand.',
    publicInsight:
      'Do not try to build a 5th mobile network operator. The big opportunity is last-mile fiber-to-the-home (FTTH) and fixed wireless broadband in gated estates and corporate hubs, or white-labeling Starlink enterprise installations for remote bank branches.',
    keyPlayers: ['MTN Nigeria', 'Airtel Africa', 'Globacom', 'MainOne (Equinix)', 'Spectranet', 'IHS Towers'],
    whySucceeding:
      'Inelastic consumer demand for data connectivity; corporate enterprise cloud migration; NCC approval of long-overdue tariff adjustments and fiber protection regulations.',
    marketGaps: [
      'Last-mile fiber deployment for gated residential estates in tier-2 cities (Ibadan, Abeokuta, Enugu)',
      'Enterprise Starlink satellite terminal integration and managed backup failover for bank ATMs',
      'Telecom tower solar hybrid conversion kits reducing diesel consumption at remote base stations',
      'Public Wi-Fi monetized via local advertising in high-density shopping malls and transit terminals',
      'Micro-ISP infrastructure kits enabling local entrepreneurs to distribute broadband in small towns',
    ],
    regulatoryNotes:
      'Nigerian Communications Commission (NCC) licensing (Unified Access, ISP, Infrastructure Companies - InfraCos); Critical National Information Infrastructure (CNII) Presidential Order 2024.',
    tags: ['telecoms', 'fiber', 'broadband', '5G', 'infrastructure'],
  },
  {
    id: '44',
    slug: 'real-estate',
    name: 'PropTech & Residential Real Estate',
    emoji: '🏘️',
    category: 'Infrastructure & Mobility',
    status: 'struggling',
    riskLevel: 'high',
    opportunityScore: 7,
    marketSizeEst: '28M Housing Deficit (FMBN)',
    summary:
      'Nigeria has a catastrophic housing deficit of over 28 million units, yet thousands of high-end apartments in Ikoyi and Maitama sit vacant. The residential rental market is broken by landlords demanding 1 to 2 years of upfront cash rent, exorbitant 20% legal and agency fees, and pervasive land title registry fraud.',
    publicInsight:
      'Platforms trying to pay annual rent upfront on behalf of tenants without strict salary garnishment failed because when tenants lost jobs, the startup took 100% of the loan loss. The resilient PropTech models are co-living, short-lets, and automated digital rent escrow for vetted corporate professionals.',
    keyPlayers: ['Estate Intel', 'Spleet', 'PropertyPro Nigeria', 'SmallSmall Technology', 'BuyLetLive', 'Eden Life Short-lets'],
    whyFailing:
      'Slow judicial eviction procedures (taking 2+ years to evict defaulting tenants), lack of long-term mortgage financing (mortgage debt is under 1% of GDP), and high cost of building materials.',
    marketGaps: [
      'Digital land title search and Certificate of Occupancy (C of O) verification software',
      'Verified short-let apartment management SaaS for diaspora holiday visitors',
      'Purpose-built student accommodation (PBSA) development and booking platforms near federal universities',
      'Property management and service charge collection software for residential estate associations',
      'Rent escrow platform protecting tenants from fake estate agents and double-leased apartments',
    ],
    regulatoryNotes:
      'Land Use Act 1978 (requiring Governor’s Consent for property title transfers); Lagos State Real Estate Regulatory Authority (LASRERA) agent registration; State Tenancy Laws.',
    tags: ['proptech', 'real-estate', 'rent', 'housing', 'short-let'],
  },
  {
    id: '45',
    slug: 'coworking-managed-workspaces',
    name: 'Coworking & Managed Flexible Workspaces',
    emoji: '🏢',
    category: 'Infrastructure & Mobility',
    status: 'succeeding',
    riskLevel: 'medium',
    opportunityScore: 8,
    marketSizeEst: '₦65B Flexible Office Market',
    summary:
      'With residential electricity generation costs skyrocketing and remote tech workers needing reliable high-speed fiber internet, demand for flexible shared workspaces and executive private offices has surged. Modern spaces operate as community hubs offering enterprise meeting rooms, event halls, and uninterrupted solar/diesel power.',
    publicInsight:
      'Coworking spaces cannot survive solely on daily freelancer desk passes (₦5,000/day). Profitability requires signing long-term managed office leases with tech startups, NGO country offices, and multinational satellite teams who pay 6 months upfront.',
    keyPlayers: ['Co-Creation Hub (CcHUB)', 'Leadspace', 'Workstation Nigeria', 'Venia Hub', 'CapitalSquare'],
    whySucceeding:
      'Running an independent office in Lagos with dual diesel generators, 24/7 security, and dedicated fiber costs a small company millions monthly; outsourcing to managed coworking cuts office opex by 50%.',
    marketGaps: [
      'Neighborhood micro-coworking hubs located in residential suburbs (Magodo, Festac, Gwarinpa) to cut commuting',
      'Soundproof on-demand podcast and video recording studios inside shared workspaces',
      'Dedicated private executive suites for visiting diaspora tech founders and investors',
      'Flexible desk booking software and meeting room reservation apps for multi-branch coworking operators',
      'Corporate distributed team pass allowing enterprise staff to work from any affiliated hub across Nigeria',
    ],
    regulatoryNotes:
      'Local government commercial tenement rates; fire safety compliance certificates; State building control regulations.',
    tags: ['coworking', 'remote-work', 'flexible-office', 'power-as-a-service', 'hubs'],
  },

  // ─── 8. EDUCATION, TALENT & CREATIVE ECONOMY ────────────────────────────────────
  {
    id: '46',
    slug: 'edtech',
    name: 'Professional Tech Upskilling & Bootcamps',
    emoji: '💻',
    category: 'Education & Talent',
    status: 'succeeding',
    riskLevel: 'medium',
    opportunityScore: 9,
    marketSizeEst: '$450M Tech Talent Training Market',
    summary:
      'Over 60% of Nigerian university graduates are deemed unemployable by top-tier employers due to obsolete academic curriculums. Tech bootcamps and vocational skilling academies offering intensive training in software engineering, cloud architecture, product design, and cybersecurity—linked directly to remote job placement—have expanded aggressively.',
    publicInsight:
      'Income Share Agreements (ISAs) where students pay tuition only after landing a job ran into severe debt recovery issues during the global tech hiring slowdown. Sustainable bootcamps now use upfront employer sponsorships, corporate training contracts, or low-cost monthly subscription models.',
    keyPlayers: ['AltSchool Africa', 'Utiva', 'Decagon', 'Semicolon Africa', 'Nuru Tech Academy'],
    whySucceeding:
      'Millions of ambitious Nigerian youths recognize that acquiring digital skills is the most viable path to earning in foreign currencies (USD/EUR) or securing high-paying local corporate roles.',
    marketGaps: [
      'AI engineering and machine learning deployment bootcamps tailored for enterprise workflows',
      'Cloud DevOps and Kubernetes certification academies partnering with AWS and Google Cloud',
      'Executive upskilling for commercial bank managers adapting to fintech disruption',
      'English fluency and European cultural communication training for remote offshore talent',
      'Vocational artisan digital academies (solar installation, EV repair, HVAC maintenance)',
    ],
    regulatoryNotes:
      'National Board for Technical Education (NBTE) vocational certification; Industrial Training Fund (ITF) corporate training rebates; Ministry of Communications, Innovation & Digital Economy.',
    tags: ['upskilling', 'bootcamps', 'tech-talent', 'software-training', 'edtech'],
  },
  {
    id: '47',
    slug: 'primary-secondary-edtech',
    name: 'Primary & Secondary EdTech (K-12)',
    emoji: '📚',
    category: 'Education & Talent',
    status: 'struggling',
    riskLevel: 'high',
    opportunityScore: 6,
    marketSizeEst: '$1.8B K-12 Supplemental Education',
    summary:
      'Startups raised tens of millions to build animated video streaming apps for primary and secondary school pupils. However, mass-market parents struggled with continuous internet data costs and smartphone sharing, forcing EdTech operators to pivot toward school management systems (SMS) and high-stakes exam preparation (WAEC/JAMB).',
    publicInsight:
      'Parents will not renew expensive subscriptions for general conceptual learning. They eagerly pay for high-stakes exam drill software that guarantees their child scores 280+ in JAMB or passes WAEC in one sitting to avoid wasting another academic year.',
    keyPlayers: ['uLesson', 'Gradely', 'PrepClass', 'SimbiBot', 'Edukoya'],
    whyFailing:
      'High churn on B2C video learning apps, customer resistance to paying for education content when free YouTube exists, and high customer acquisition costs via television and billboard ads.',
    marketGaps: [
      'Offline-first gamified JAMB and WAEC computer-based test (CBT) practice hardware',
      'School management and automated fee collection SaaS for low-fee private primary schools',
      'Teacher lesson plan generation and automated exam grading AI tools for private school educators',
      'Affordable offline learning tablets pre-loaded with curriculum-aligned content without internet requirements',
      'Parent-teacher communication and student bus tracking SMS portals',
    ],
    regulatoryNotes:
      'Universal Basic Education Commission (UBEC); National Educational Research and Development Council (NERDC) curriculum alignment; State Ministries of Education private school accreditation.',
    tags: ['K12', 'edtech', 'JAMB', 'WAEC', 'exam-prep'],
  },
  {
    id: '48',
    slug: 'higher-education-degree-tech',
    name: 'Higher Education & Online Degrees',
    emoji: '🎓',
    category: 'Education & Talent',
    status: 'emerging',
    riskLevel: 'medium',
    opportunityScore: 8,
    marketSizeEst: '$2.4B Higher Education Expenditure',
    summary:
      'Public federal universities suffer frequent prolonged strikes by the Academic Staff Union of Universities (ASUU) and severe infrastructure decay, while top private universities charge ₦2M-₦5M annually. Accredited online degree programs and cross-border distance learning are capturing working adults and disrupted undergraduates.',
    publicInsight:
      'The bottleneck in Nigerian higher education is physical university bed space. 1.8 million candidates sit for JAMB every year, but all Nigerian universities combined can only admit 400,000. Accredited online degree programs represent the only mathematical solution to this admission crisis.',
    keyPlayers: ['Nexford University', 'National Open University of Nigeria (NOUN)', 'Unicaf Nigeria', 'Miva Open University', 'Edusoko'],
    whySucceeding:
      'Desperate demand for accredited bachelor’s and master’s degrees from working professionals seeking career promotion without quitting their jobs.',
    marketGaps: [
      'Accredited online Bachelor of Science (BSc) programs priced under ₦300,000 per academic year',
      'Credit transfer exchange platform linking local students to US and UK partner universities',
      'University transcript digitization and instant electronic verification for alumni applications',
      'Corporate-sponsored degree apprenticeships where companies pay university tuition in exchange for work',
      'Digital student loan financing platform underwritten by future graduate earnings',
    ],
    regulatoryNotes:
      'National Universities Commission (NUC) Open and Distance Learning (ODL) guidelines; Federal Ministry of Education guidelines.',
    tags: ['higher-education', 'degrees', 'online-university', 'NUC', 'tertiary'],
  },
  {
    id: '49',
    slug: 'creator-economy',
    name: 'Creator Economy & Digital Product Checkout',
    emoji: '📱',
    category: 'Education & Talent',
    status: 'succeeding',
    riskLevel: 'low',
    opportunityScore: 9,
    marketSizeEst: '$104B Global TAM (Nigeria rapidly expanding)',
    summary:
      'Nigerian creators, educators, authors, and influencers are monetizing their knowledge directly through digital products: downloadable ebooks, specialized online cohorts, design templates, and subscription communities. Dedicated African digital commerce checkouts have made monetizing local and diaspora audiences frictionless.',
    publicInsight:
      'African creators cannot easily use Gumroad or Patreon due to international credit card declines and PayPal payout blocks. Platforms like Selar that accept local bank transfers, USSD, and Mobile Money while paying creators instantly into local bank accounts have captured this explosive boom.',
    keyPlayers: ['Selar', 'Mainstack', 'Paystack Storefront', 'Geegpay', 'Buy Me a Coffee (Afro-users)'],
    whySucceeding:
      'Zero inventory risk, near-100% gross profit margins on digital information products, and the ability of Nigerian creators to sell to diaspora buyers in USD and GBP.',
    marketGaps: [
      'Protected digital video streaming DRM preventing buyers from screen-recording and pirating courses',
      'Automated affiliate marketing networks connecting digital product creators to hungry WhatsApp distributors',
      'Community cohort hosting software with integrated WhatsApp/Telegram discussion access controls',
      'Micro-membership and recurring monthly subscription billing via direct bank debit',
      'Creator accounting and international multi-currency tax filing software',
    ],
    regulatoryNotes:
      'NDPA compliance for student email collection; Advertising Regulatory Council of Nigeria (ARCON) guidelines for paid influencer promotions.',
    tags: ['creator-economy', 'digital-products', 'ebooks', 'selar', 'monetization'],
  },
  {
    id: '50',
    slug: 'media-nollywood-streaming',
    name: 'Media, Nollywood & Video Streaming',
    emoji: '🎬',
    category: 'Education & Talent',
    status: 'succeeding',
    riskLevel: 'medium',
    opportunityScore: 8,
    marketSizeEst: '$6.4B Nollywood Valuation (UNESCO)',
    summary:
      'Nollywood is the second-largest film industry globally by production volume. With global streaming giants (Netflix, Prime Video, Showmax) commissioning high-budget Nigerian originals, local theatrical cinema box office numbers breaking records, and YouTube Nollywood channels generating millions in AdSense, the film ecosystem is formalizing rapidly.',
    publicInsight:
      'Building a stand-alone domestic SVOD streaming app in Nigeria is financial suicide due to high data streaming costs and low subscription willingness. The gold mine is production studios producing high-concept indigenous theatrical films and monetizing via cinema box office, global licensing deals, and YouTube AdSense.',
    keyPlayers: ['Showmax Nigeria', 'Filmhouse Cinemas', 'Inkblot Productions', 'EbonyLife Media', 'SceneOne Productions (Funke Akindele)'],
    whySucceeding:
      'Unprecedented domestic cinema box office hits (films like "A Tribe Called Judah" crossing ₦1.4 billion gross box office) and intense international appetite for authentic African storytelling.',
    marketGaps: [
      'Film production financing and institutional equity syndication platform for independent producers',
      'Automated intellectual property rights cataloging and royalty collection software',
      'High-end film equipment leasing and specialized soundstage studio rental facilities in Lagos',
      'Nollywood post-production color grading and sound design software infrastructure',
      'YouTube channel management and digital rights anti-piracy takedown services for filmmakers',
    ],
    regulatoryNotes:
      'National Film and Video Censors Board (NFVCB); Nigerian Copyright Commission (NCC); National Broadcasting Commission (NBC).',
    tags: ['nollywood', 'cinema', 'streaming', 'film-production', 'media'],
  },
  {
    id: '51',
    slug: 'mobile-gaming-esports',
    name: 'Mobile Gaming & African Esports',
    emoji: '🎮',
    category: 'Education & Talent',
    status: 'emerging',
    riskLevel: 'medium',
    opportunityScore: 7,
    marketSizeEst: '$250M Nigerian Gaming Market',
    summary:
      'With over 120 million smartphone users and a median population age of 18, mobile gaming is booming. While in-app microtransactions traditionally struggled due to card payment barriers, direct carrier billing (airtime payments) and local fintech checkouts are unlocking viable monetization for hyper-casual mobile titles and competitive esports tournaments.',
    publicInsight:
      'Console gaming (PlayStation/Xbox) is restricted to affluent households due to expensive hardware and electricity blackouts. The mass market is hyper-casual mobile titles (under 50MB download size) localized with popular cultural themes (street traffic, Danfo buses, local slang) monetized via rewarded video ads and airtime billing.',
    keyPlayers: ['Carry1st', 'Maliyo Games', 'Gamr Africa', 'Deluxe Studio', 'ChopUp'],
    whySucceeding:
      'Explosive youth demographics, cheap entry-level Android smartphones, and global gaming publishers (Riot, Call of Duty Mobile) seeking African distribution partners.',
    marketGaps: [
      'Direct carrier billing (DCB) API allowing gamers to purchase in-game gems directly using MTN and Airtel airtime',
      'Esports tournament management and automated prize pool payout platform for university leagues',
      'Culturally localized educational games teaching financial literacy and mathematics in Nigerian languages',
      'African gaming talent development and 3D animation art outsourcing studios for global game developers',
      'Localized mobile gaming ad network serving interactive rewarded playable ads for Nigerian brands',
    ],
    regulatoryNotes:
      'National Lottery Regulatory Commission (NLRC) oversight on games with real-money or prize elements; NCC regulations on value-added services (VAS) airtime billing.',
    tags: ['gaming', 'esports', 'mobile-games', 'carrier-billing', 'entertainment'],
  },
  {
    id: '52',
    slug: 'event-ticketing-experience',
    name: 'Event Ticketing & Live Experience Tech',
    emoji: '🎟️',
    category: 'Education & Talent',
    status: 'succeeding',
    riskLevel: 'low',
    opportunityScore: 8,
    marketSizeEst: '₦80B Live Entertainment & Ticketing Market',
    summary:
      'Lagos is the live entertainment and nightlife capital of Africa, reaching fever pitch during the annual "Detty December" diaspora homecoming. Modern digital ticketing platforms offering QR code gate validation, fraud prevention against duplicate tickets, and cashless wristband payments are replacing chaotic paper wristbands.',
    publicInsight:
      'Ticket sales alone generate 3-5% processing fees. The lucrative monetization lies in cashless RFID wristbands for drinks and food inside the event arena (capturing 2% of all bar sales) and ticket resale/escrow marketplaces that eliminate counterfeit gate tickets.',
    keyPlayers: ['Tix Africa', 'Nairabox', 'Ariiya Tickets', 'AllEvents Nigeria', 'Showgear'],
    whySucceeding:
      'Afrobeats concert boom (Asake, Burna Boy, Davido), explosion of food festivals, tech conferences, and massive diaspora seasonal tourist influx.',
    marketGaps: [
      'Offline RFID cashless wristband payment hardware functional when mobile network towers get congested at concerts',
      'Verified peer-to-peer concert ticket resale marketplace with instant ticket re-barcoding to stop fraud',
      'Event vendor management and real-time food/beverage inventory tracking software for concert promoters',
      'Automated VIP table booking and split-payment software for Lagos luxury beach clubs and nightclubs',
      'Audience demographic analytics software empowering promoters to secure major corporate brand sponsorships',
    ],
    regulatoryNotes:
      'Lagos State Internal Revenue Service (LIRS) withholding tax on entertainment events; Lagos State Safety Commission event venue permits.',
    tags: ['ticketing', 'events', 'live-experiences', 'nightlife', 'detty-december'],
  },
]

export const sectors: Sector[] = rawSectors.map((s) => {
  const customCompanies = companyBackersMap[s.slug]
  const fallbackCompanies = s.keyPlayers.map((player) => {
    const cleanDomain = player.toLowerCase().replace(/[^a-z0-9]/g, '') + '.com'
    return {
      name: player,
      domain: cleanDomain,
      url: `https://${cleanDomain}`,
      description: `Active operating enterprise in the Nigerian ${s.name} sector.`,
      status: 'active' as const,
    }
  })

  return {
    ...s,
    companies:
      customCompanies && customCompanies.length > 0 ? customCompanies : fallbackCompanies,
    citations: getCitationsForSector(s.slug, s.category),
    shouldIBuild: getShouldIBuildForSector(s.slug, s.status, s.name),
  }
})

export const sectorsByStatus = {
  succeeding: sectors.filter((s) => s.status === 'succeeding'),
  emerging: sectors.filter((s) => s.status === 'emerging'),
  struggling: sectors.filter((s) => s.status === 'struggling'),
  failed: sectors.filter((s) => s.status === 'failed'),
}

export const getSectorBySlug = (slug: string) => sectors.find((s) => s.slug === slug)
