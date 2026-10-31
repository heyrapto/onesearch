import { CompanyBacker, ShouldIBuild, ResearchCitation } from '@/types/sector'

// ─── VERIFIED COMPANY BACKERS REPOSITORY ───────────────────────────────────────
export const companyBackersMap: Record<string, CompanyBacker[]> = {
  fintech: [
    {
      name: 'Moniepoint',
      domain: 'moniepoint.com',
      url: 'https://moniepoint.com',
      description: 'All-in-one financial services platform for businesses and agency banking network processing $17B+ monthly.',
      status: 'active',
    },
    {
      name: 'Paystack',
      domain: 'paystack.com',
      url: 'https://paystack.com',
      description: 'Stripe-acquired modern online and offline payments infrastructure for African businesses.',
      status: 'acquired',
    },
    {
      name: 'OPay',
      domain: 'opayweb.com',
      url: 'https://opayweb.com',
      description: 'Mobile-based payment super-app offering high-velocity peer-to-peer transfers and offline agency acquiring.',
      status: 'active',
    },
    {
      name: 'Flutterwave',
      domain: 'flutterwave.com',
      url: 'https://flutterwave.com',
      description: 'Pan-African payments technology company connecting global enterprises to African payment rails.',
      status: 'active',
    },
    {
      name: 'PalmPay',
      domain: 'palmpay.co',
      url: 'https://palmpay.co',
      description: 'Consumer digital wallet and agency banking network with rewards, payments, and bill settlement.',
      status: 'active',
    },
    {
      name: 'Interswitch',
      domain: 'interswitchgroup.com',
      url: 'https://interswitchgroup.com',
      description: 'Pioneer integrated digital payments and national card switching conglomerate in Africa.',
      status: 'active',
    },
  ],
  'digital-banking-neobanks': [
    {
      name: 'Kuda Bank',
      domain: 'kuda.com',
      url: 'https://kuda.com',
      description: 'Digital-first microfinance bank offering zero-fee transfers, budgeting, and consumer overdrafts.',
      status: 'active',
    },
    {
      name: 'FairMoney',
      domain: 'fairmoney.io',
      url: 'https://fairmoney.io',
      description: 'Credit-led neobank providing instant personal loans, bill payments, and MFB commercial bank accounts.',
      status: 'active',
    },
    {
      name: 'Carbon',
      domain: 'yourcarbon.com',
      url: 'https://yourcarbon.com',
      description: 'Pan-African digital bank offering instant consumer loans, high-yield fixed deposits, and cards.',
      status: 'active',
    },
    {
      name: 'VBank',
      domain: 'vbank.ng',
      url: 'https://vbank.ng',
      description: 'VFD Microfinance Bank digital app providing streamlined retail banking, joint accounts, and fixed deposits.',
      status: 'active',
    },
  ],
  'wealthtech-micro-investing': [
    {
      name: 'PiggyVest',
      domain: 'piggyvest.com',
      url: 'https://piggyvest.com',
      description: 'Pioneer automated micro-savings and locked investment platform serving over 4 million registered users.',
      status: 'active',
    },
    {
      name: 'Cowrywise',
      domain: 'cowrywise.com',
      url: 'https://cowrywise.com',
      description: 'SEC-licensed fund manager and mutual fund aggregator automating wealth generation for young professionals.',
      status: 'active',
    },
    {
      name: 'Bamboo',
      domain: 'investbamboo.com',
      url: 'https://investbamboo.com',
      description: 'SEC-licensed digital sub-broker platform enabling Nigerians to invest in US and domestic equities.',
      status: 'active',
    },
    {
      name: 'Risevest',
      domain: 'risevest.com',
      url: 'https://risevest.com',
      description: 'Automated dollar wealth manager investing in curated US real estate, stocks, and fixed income.',
      status: 'active',
    },
    {
      name: 'Trove',
      domain: 'trovefinance.com',
      url: 'https://trovefinance.com',
      description: 'Digital investment application offering fractional ownership in Nigerian and global equities.',
      status: 'active',
    },
  ],
  'buy-now-pay-later': [
    {
      name: 'CDcare',
      domain: 'cdcare.ng',
      url: 'https://cdcare.ng',
      description: 'Pay small-small marketplace where consumers pay installments and take delivery upon hitting threshold.',
      status: 'active',
    },
    {
      name: 'CredPal',
      domain: 'credpal.com',
      url: 'https://credpal.com',
      description: 'Consumer credit card and omnichannel point-of-sale checkout installment financing platform.',
      status: 'active',
    },
    {
      name: 'M-KOPA Nigeria',
      domain: 'm-kopa.com',
      url: 'https://m-kopa.com',
      description: 'Asset financing company providing connected smartphones and solar kits with remote asset-locking tech.',
      status: 'active',
    },
  ],
  'crypto-web3-remittance': [
    {
      name: 'Quidax',
      domain: 'quidax.com',
      url: 'https://quidax.com',
      description: 'African cryptocurrency exchange awarded provisional operating license (Approval-in-Principle) by SEC Nigeria under ARIP.',
      status: 'active',
    },
    {
      name: 'Busha',
      domain: 'busha.co',
      url: 'https://busha.co',
      description: 'SEC-approved digital asset exchange providing retail and institutional crypto on/off-ramp services under ARIP.',
      status: 'active',
    },
    {
      name: 'Yellow Card',
      domain: 'yellowcard.io',
      url: 'https://yellowcard.io',
      description: 'Licensed pan-African fiat-crypto on/off-ramp and corporate treasury settlement infrastructure.',
      status: 'active',
    },
    {
      name: 'Luno Nigeria',
      domain: 'luno.com',
      url: 'https://luno.com',
      description: 'Global crypto investment platform; suspended direct Naira banking deposits post-2021 regulatory restrictions.',
      status: 'pivoted',
    },
    {
      name: 'Bitmama',
      domain: 'bitmama.io',
      url: 'https://bitmama.io',
      description: 'Crypto wallet platform offering virtual crypto debit cards and cross-border remittances.',
      status: 'active',
    },
  ],
  insurtech: [
    {
      name: 'Casava',
      domain: 'casava.co',
      url: 'https://casava.co',
      description: 'Licensed micro-insurance underwriter offering income protection, health, and gadget coverage.',
      status: 'active',
    },
    {
      name: 'Curacel',
      domain: 'curacel.co',
      url: 'https://curacel.co',
      description: 'AI-driven claims automation and fraud detection infrastructure used by major African insurance underwriters.',
      status: 'active',
    },
    {
      name: 'ETAP Car Insurance',
      domain: 'etap.insure',
      url: 'https://etap.insure',
      description: 'Mobile-first auto insurance offering pay-per-minute driving policies and instant accident claims.',
      status: 'active',
    },
    {
      name: 'Reliance HMO',
      domain: 'reliancehmo.com',
      url: 'https://reliancehmo.com',
      description: 'Tech-enabled health insurance bundling automated hospital approvals with 24/7 telemedicine.',
      status: 'active',
    },
  ],
  'api-infrastructure-open-banking': [
    {
      name: 'Mono',
      domain: 'mono.co',
      url: 'https://mono.co',
      description: 'Open banking API infrastructure providing financial data access, bank account linking, and direct debits.',
      status: 'active',
    },
    {
      name: 'Stitch',
      domain: 'stitch.money',
      url: 'https://stitch.money',
      description: 'API infrastructure for instant bank transfers, account verification, and multi-bank reconciliation.',
      status: 'active',
    },
    {
      name: 'Okra',
      domain: 'okra.ng',
      url: 'https://okra.ng',
      description: 'Real-time open finance data aggregation and payment initiation API platform.',
      status: 'active',
    },
    {
      name: 'Anchor',
      domain: 'getanchor.co',
      url: 'https://getanchor.co',
      description: 'Banking-as-a-service (BaaS) infrastructure enabling companies to embed bank accounts and cards.',
      status: 'active',
    },
    {
      name: 'Termii',
      domain: 'termii.com',
      url: 'https://termii.com',
      description: 'Communication and multi-channel OTP verification API powering leading African fintechs.',
      status: 'active',
    },
  ],
  'identity-regtech-fraud': [
    {
      name: 'Dojah',
      domain: 'dojah.io',
      url: 'https://dojah.io',
      description: 'End-to-end identity verification, KYC, and fraud prevention API suite built for African digital businesses.',
      status: 'active',
    },
    {
      name: 'Smile ID',
      domain: 'usesmileid.com',
      url: 'https://usesmileid.com',
      description: 'Pan-African biometric digital identity verification and compliance engine across 20+ countries.',
      status: 'active',
    },
    {
      name: 'Prembly (Identitypass)',
      domain: 'prembly.com',
      url: 'https://prembly.com',
      description: 'Compliance infrastructure verifying government IDs, business CAC registrations, and international credit.',
      status: 'active',
    },
    {
      name: 'Seamfix',
      domain: 'seamfix.com',
      url: 'https://seamfix.com',
      description: 'Identity management and biometric enrollment platform powering telecommunication and national registries.',
      status: 'active',
    },
  ],
  'b2b-saas-sme-software': [
    {
      name: 'Bumpa',
      domain: 'getbumpa.com',
      url: 'https://getbumpa.com',
      description: 'Commerce operating system helping social and retail merchants manage orders, payments, and dispatch.',
      status: 'active',
    },
    {
      name: 'Kippa',
      domain: 'kippa.africa',
      url: 'https://kippa.africa',
      description: 'Digital bookkeeping and invoice management application built for African small business owners.',
      status: 'active',
    },
    {
      name: 'Prospa',
      domain: 'getprospa.com',
      url: 'https://getprospa.com',
      description: 'Business banking OS combining commercial bank accounts, invoicing, and accounting tools.',
      status: 'active',
    },
    {
      name: 'Bujeti',
      domain: 'bujeti.com',
      url: 'https://bujeti.com',
      description: 'Corporate expense management and multi-card spending control software for growing African enterprises.',
      status: 'active',
    },
  ],
  'hr-tech-payroll-saas': [
    {
      name: 'SeamlessHR',
      domain: 'seamlesshr.com',
      url: 'https://seamlesshr.com',
      description: 'Enterprise cloud HR and payroll software operating across Africa with embedded financial solutions.',
      status: 'active',
    },
    {
      name: 'Pade HCM',
      domain: 'padehcm.com',
      url: 'https://padehcm.com',
      description: 'Automated HR and payroll management software built for modern African startups and mid-market firms.',
      status: 'active',
    },
    {
      name: 'Workpay',
      domain: 'myworkpay.com',
      url: 'https://myworkpay.com',
      description: 'Pan-African cloud payroll and human resource compliance platform with multi-currency capabilities.',
      status: 'active',
    },
    {
      name: 'Bento Africa',
      domain: 'bento.africa',
      url: 'https://bento.africa',
      description: 'Digital payroll and statutory benefit remittance software for formal and informal businesses.',
      status: 'active',
    },
  ],
  'food-delivery-quick-commerce': [
    {
      name: 'Chowdeck',
      domain: 'chowdeck.com',
      url: 'https://chowdeck.com',
      description: 'On-demand food and grocery delivery platform processing over ₦30B GMV in 2024 via hyper-clustered routing.',
      status: 'active',
    },
    {
      name: 'FoodCourt',
      domain: 'foodcourt.app',
      url: 'https://foodcourt.app',
      description: 'Virtual food hall combining multiple proprietary restaurant brands into a single combined delivery order.',
      status: 'active',
    },
    {
      name: 'Heyfood',
      domain: 'heyfood.africa',
      url: 'https://heyfood.africa',
      description: 'YC-backed food delivery aggregator dominating regional Nigerian markets (Ibadan) with hyper-dense motorcycle logistics.',
      status: 'active',
    },
    {
      name: 'Eden Life',
      domain: 'edenlife.ng',
      url: 'https://edenlife.ng',
      description: 'Operating system for home services offering chef-cooked meal delivery, cleaning, and laundry subscriptions.',
      status: 'active',
    },
    {
      name: 'Glovo Nigeria',
      domain: 'glovoapp.com',
      url: 'https://glovoapp.com',
      description: 'Multi-category courier delivery app connecting urban users with restaurants and retail pharmacies.',
      status: 'active',
    },
  ],
  'b2b-pharma-distribution': [
    {
      name: 'DrugStoc',
      domain: 'drugstoc.com',
      url: 'https://drugstoc.com',
      description: 'ISO-certified healthcare procurement platform delivering authentic pharmaceuticals to 3,000+ hospitals.',
      status: 'active',
    },
    {
      name: 'Remedial Health',
      domain: 'remedial.health',
      url: 'https://remedial.health',
      description: 'Tech-enabled pharmaceutical wholesaler offering working capital and inventory software to neighborhood pharmacies.',
      status: 'active',
    },
    {
      name: 'Field Intelligence',
      domain: 'field.inc',
      url: 'https://field.inc',
      description: 'Healthcare supply chain operating system managing pharmaceutical procurement and Shelf Life inventory financing.',
      status: 'active',
    },
    {
      name: 'LifeBank',
      domain: 'lifebank.ng',
      url: 'https://lifebank.ng',
      description: 'Medical distribution company delivering blood, medical oxygen, and vaccines to hospitals 24/7.',
      status: 'active',
    },
  ],
  'energy-solar': [
    {
      name: 'Daystar Power',
      domain: 'daystar-power.com',
      url: 'https://daystar-power.com',
      description: 'Commercial & Industrial solar developer acquired by Shell, providing clean energy PPAs to factories and banks.',
      status: 'acquired',
    },
    {
      name: 'Arnergy',
      domain: 'arnergy.com',
      url: 'https://arnergy.com',
      description: 'Commercial solar and lithium battery storage provider powering commercial businesses and financial branches.',
      status: 'active',
    },
    {
      name: 'Starsight Energy',
      domain: 'starsightenergy.com',
      url: 'https://starsightenergy.com',
      description: 'Pan-African clean energy and cooling services provider serving major corporate institutions.',
      status: 'active',
    },
    {
      name: 'Sun King Nigeria',
      domain: 'sunking.com',
      url: 'https://sunking.com',
      description: 'Off-grid solar company providing PAYG solar home systems and inverters to underserved households.',
      status: 'active',
    },
  ],
  agritech: [
    {
      name: 'AFEX Commodities Exchange',
      domain: 'afex.africa',
      url: 'https://afex.africa',
      description: 'Nigeria’s premier commodities exchange providing warehouse receipts, trade finance, and grain storage.',
      status: 'active',
    },
    {
      name: 'Hello Tractor',
      domain: 'hellotractor.com',
      url: 'https://hellotractor.com',
      description: 'Agricultural technology company connecting smallholder farmers with tractor owners via IoT asset sharing.',
      status: 'active',
    },
    {
      name: 'ColdHubs',
      domain: 'coldhubs.com',
      url: 'https://coldhubs.com',
      description: 'Solar-powered walk-in cold rooms installed in open food markets preventing post-harvest vegetable rot.',
      status: 'active',
    },
    {
      name: 'Releaf',
      domain: 'releaf.africa',
      url: 'https://releaf.africa',
      description: 'Industrial agritech company operating localized food processing technology for smallholder oil palm farmers.',
      status: 'active',
    },
  ],
  'creator-economy': [
    {
      name: 'Selar',
      domain: 'selar.com',
      url: 'https://selar.com',
      description: 'E-commerce platform empowering African creators to sell digital products, courses, and memberships globally.',
      status: 'active',
    },
    {
      name: 'Mainstack',
      domain: 'mainstack.co',
      url: 'https://mainstack.co',
      description: 'All-in-one platform for entrepreneurs and creators to monetize their knowledge and service businesses.',
      status: 'active',
    },
    {
      name: 'Geegpay',
      domain: 'geegpay.africa',
      url: 'https://geegpay.africa',
      description: 'Financial platform providing African freelancers and digital creators with virtual foreign bank accounts.',
      status: 'active',
    },
  ],
  creator: [
    {
      name: 'Selar',
      domain: 'selar.com',
      url: 'https://selar.com',
      description: 'E-commerce platform empowering African creators to sell digital products, courses, and memberships globally.',
      status: 'active',
    },
    {
      name: 'Mainstack',
      domain: 'mainstack.co',
      url: 'https://mainstack.co',
      description: 'All-in-one platform for entrepreneurs and creators to monetize their knowledge and service businesses.',
      status: 'active',
    },
    {
      name: 'Geegpay',
      domain: 'geegpay.africa',
      url: 'https://geegpay.africa',
      description: 'Financial platform providing African freelancers and digital creators with virtual foreign bank accounts.',
      status: 'active',
    },
  ],
  edtech: [
    {
      name: 'AltSchool Africa',
      domain: 'altschoolafrica.com',
      url: 'https://altschoolafrica.com',
      description: 'Tech school offering diploma programs in software engineering, data science, and product management.',
      status: 'active',
    },
    {
      name: 'Utiva',
      domain: 'utiva.io',
      url: 'https://utiva.io',
      description: 'Technology workforce development platform training professionals in digital and analytical skills.',
      status: 'active',
    },
    {
      name: 'Decagon',
      domain: 'decagon.institute',
      url: 'https://decagon.institute',
      description: 'Software engineering institute training and matching elite software engineers with global enterprises.',
      status: 'active',
    },
    {
      name: 'Semicolon Africa',
      domain: 'semicolon.africa',
      url: 'https://semicolon.africa',
      description: 'Technology and innovation institute training software engineers, enterprise leaders, and startup builders.',
      status: 'active',
    },
    {
      name: 'uLesson',
      domain: 'ulesson.com',
      url: 'https://ulesson.com',
      description: 'Educational technology company providing curriculum-aligned video learning and live tutoring for K-12.',
      status: 'active',
    },
  ],
}

// ─── CITATION GENERATOR ────────────────────────────────────────────────────────
export function getCitationsForSector(slug: string, category: string): {
  marketSize: ResearchCitation
  keyTrend: ResearchCitation
  regulatory: ResearchCitation
} {
  const s = slug.toLowerCase()

  if (s.includes('fintech') || s.includes('payment') || s.includes('bank') || s.includes('api')) {
    return {
      marketSize: {
        source: 'Nigeria Inter-Bank Settlement System (NIBSS) / Central Bank of Nigeria',
        title: 'Annual Electronic Payments & Financial Stability Report',
        year: '2023–2024',
        url: 'https://nibss-plc.com.ng',
        dataPoint: 'Over ₦600 trillion processed across NIP instant payment rails in 2023.',
      },
      keyTrend: {
        source: 'EFInA (Enhancing Financial Innovation & Access)',
        title: 'Access to Financial Services in Nigeria Survey',
        year: '2023',
        url: 'https://efina.org.ng',
        dataPoint: 'Adult financial inclusion formal rate expanded to 64% nationwide.',
      },
      regulatory: {
        source: 'Central Bank of Nigeria (CBN)',
        title: 'Guidelines for Licensing and Regulation of Payment Service Providers',
        year: '2023',
        url: 'https://www.cbn.gov.ng',
        dataPoint: 'Capital reserves of ₦100M for PSSP, ₦2B for Mobile Money Operator (MMO).',
      },
    }
  }

  if (s.includes('solar') || s.includes('energy') || s.includes('mini-grid')) {
    return {
      marketSize: {
        source: 'Rural Electrification Agency (REA) / World Bank',
        title: 'Nigeria Electrification Project (NEP) Mid-Term Assessment',
        year: '2023–2024',
        url: 'https://rea.gov.ng',
        dataPoint: '$25B commercial energy gap; 85M+ citizens lacking national grid access.',
      },
      keyTrend: {
        source: 'Dalberg & GOGLA Global Off-Grid Solar',
        title: 'Off-Grid Solar Market Trends Report for West Africa',
        year: '2024',
        url: 'https://www.gogla.org',
        dataPoint: 'Diesel at ₦1,300+/L cuts solar payback period down to 18–24 months for C&I.',
      },
      regulatory: {
        source: 'Nigerian Electricity Regulatory Commission (NERC)',
        title: 'The Electricity Act 2023 & State Electricity Market Regulations',
        year: '2023',
        url: 'https://nerc.gov.ng',
        dataPoint: 'Decentralized generation permits; states empowered to license off-grid power.',
      },
    }
  }

  if (s.includes('agri') || s.includes('commodity') || s.includes('cold-chain')) {
    return {
      marketSize: {
        source: 'National Bureau of Statistics (NBS)',
        title: 'Nigerian Gross Domestic Product (GDP) Report Q2 2024',
        year: '2024',
        url: 'https://nigerianstat.gov.ng',
        dataPoint: 'Agriculture accounts for 22.6% of national GDP and 36% of labor force.',
      },
      keyTrend: {
        source: 'Food and Agriculture Organization (FAO) / ColdHubs Data',
        title: 'Post-Harvest Food Losses and Value Chain Assessment in Nigeria',
        year: '2023',
        url: 'https://www.fao.org',
        dataPoint: 'Over 40% of fresh produce perishes before market, valued at $9B annually.',
      },
      regulatory: {
        source: 'Securities and Exchange Commission (SEC) Nigeria',
        title: 'Rules on Commodities Exchanges & Warehouse Receipts',
        year: '2023',
        url: 'https://sec.gov.ng',
        dataPoint: 'Prohibition on uncollateralized retail crowdsourced investment schemes.',
      },
    }
  }

  if (s.includes('pharma') || s.includes('health') || s.includes('telemedicine')) {
    return {
      marketSize: {
        source: 'Federal Ministry of Health & WHO Nigeria',
        title: 'National Health Accounts & Universal Health Coverage Report',
        year: '2023–2024',
        url: 'https://health.gov.ng',
        dataPoint: '$11B national healthcare spend; doctor-to-patient ratio at 0.4 per 1,000.',
      },
      keyTrend: {
        source: 'TechCabal Insights / HealthTech Index',
        title: 'The State of Healthcare Procurement in West Africa',
        year: '2024',
        url: 'https://techcabal.com',
        dataPoint: 'B2B pharmaceutical distribution commands 70%+ order repeat rate monthly.',
      },
      regulatory: {
        source: 'National Health Insurance Authority (NHIA)',
        title: 'Operational Guidelines under the NHIA Act 2022',
        year: '2022–2023',
        url: 'https://nhia.gov.ng',
        dataPoint: 'Mandatory contributory health insurance enacted for all employers and residents.',
      },
    }
  }

  // General default citation
  return {
    marketSize: {
      source: 'National Bureau of Statistics (NBS) & PwC Nigeria',
      title: 'Nigerian Economic Outlook & Industry Value Chain Assessment',
      year: '2023–2024',
      url: 'https://nigerianstat.gov.ng',
      dataPoint: 'Calculated via formal corporate revenue registries and informal market surveys.',
    },
    keyTrend: {
      source: 'KPMG Nigeria / SMEDAN National MSME Survey',
      title: 'SME Digitization and Operational Resilience in Nigeria',
      year: '2023',
      url: 'https://smedan.gov.ng',
      dataPoint: 'Over 41M MSMEs transitioning from paper ledgers to mobile digital workflows.',
    },
    regulatory: {
      source: 'Federal Republic of Nigeria Official Gazette',
      title: 'Business Enabling Environment & Statutory Agency Guidelines',
      year: '2023–2024',
      url: 'https://www.firs.gov.ng',
      dataPoint: 'Statutory compliance with FIRS, CAC CAMA 2020, and State revenue agencies.',
    },
  }
}

// ─── SHOULD I BUILD DECISION FRAMEWORK ─────────────────────────────────────────
export function getShouldIBuildForSector(
  slug: string,
  status: string,
  name: string
): ShouldIBuild {
  const s = slug.toLowerCase()

  if (s === 'fintech') {
    return {
      verdict: 'PROCEED_WITH_CAUTION',
      verdictSummary:
        'DO NOT build another consumer transfer wallet or virtual card app. The consumer wallet space is oversaturated by heavily funded incumbents. HOWEVER, building specialized B2B vertical treasury rails, POS lending software, or cross-border AfCFTA trade settlement has massive greenfield.',
      whoShouldBuild:
        'Founders with deep banking compliance relationships, access to ₦100M+ regulatory capital, or direct ties to major wholesale merchant associations.',
      whoShouldAvoid:
        'First-time solo software developers without institutional debt access or compliance licenses.',
      capitalToStart: '₦25M – ₦80M (excluding formal CBN license capital reserves)',
      timeToFirstMillion: '4 to 6 months (if targeting B2B merchants with loan products)',
      unfairAdvantageNeeded:
        'Direct relationship with a licensed Tier-1 commercial bank or PTSP acquiring license.',
    }
  }

  if (s === 'energy-solar') {
    return {
      verdict: 'BUILD',
      verdictSummary:
        'STRONG GREEN LIGHT. Fuel inflation makes commercial solar PPAs 40-60% cheaper than diesel generators. Corporate off-takers (factories, commercial banks, private hospitals) are desperate for energy cost reduction.',
      whoShouldBuild:
        'Technical solar engineers, project finance specialists with DFI connections, or operators with industrial factory relationships.',
      whoShouldAvoid:
        'Builders attempting residential retail installment sales funded by unhedged foreign currency debt.',
      capitalToStart: '₦15M – ₦50M for project feasibility, engineering design, and pilot installation',
      timeToFirstMillion: '3 to 5 months upon closing the first commercial corporate PPA',
      unfairAdvantageNeeded:
        'Access to non-recourse low-interest green debt lines and creditworthy corporate off-taker contracts.',
    }
  }

  if (s === 'food-delivery-quick-commerce') {
    return {
      verdict: 'NICHE_ONLY',
      verdictSummary:
        'Viable ONLY if executing with hyper-dense motorcycle dispatch clustering in specific neighborhoods. Do not attempt nationwide expansion. Owning the customer relationship around everyday staple food (Chicken Republic, jollof rice) works; gourmet dining fails.',
      whoShouldBuild:
        'Relentless operational dispatch managers who understand Lagos/Abuja traffic corridors and driver fleet management.',
      whoShouldAvoid:
        'Founders who think food delivery is just a mobile app without dirty, complex street-level dispatch logistics.',
      capitalToStart: '₦10M – ₦25M (motorcycle fleet lease, thermal backpacks, rider incentives)',
      timeToFirstMillion: '3 to 4 months in high-density corridors like Yaba, Lekki, or Wuse 2',
      unfairAdvantageNeeded:
        'Exclusive or priority dispatch integrations with top nationwide quick-service restaurant chains.',
    }
  }

  if (s === 'agritech') {
    return {
      verdict: 'PROCEED_WITH_CAUTION',
      verdictSummary:
        'Retail crowdfunding is dead and banned by the SEC. Build ONLY if you are providing tangible physical infrastructure (solar cold storage, tractor sharing) or institutional commodity aggregation backed by warehouse receipts.',
      whoShouldBuild:
        'Operators with boots on the ground in agrarian belts (Kaduna, Kano, Benue, Oyo) with grain storage infrastructure.',
      whoShouldAvoid:
        'City-based software developers who have never spent 2 weeks on a rural farm in Northern Nigeria.',
      capitalToStart: '₦15M – ₦45M (storage infrastructure or asset aggregation pilot)',
      timeToFirstMillion: '6 to 9 months (tied strictly to bi-annual harvest cycles)',
      unfairAdvantageNeeded:
        'Direct trust and contracts with vetted farmer cooperatives and certified warehouse facilities.',
    }
  }

  if (s === 'b2b-saas-sme-software') {
    return {
      verdict: 'BUILD',
      verdictSummary:
        'EXCELLENT OPPORTUNITY. 41 million Nigerian MSMEs are running operations on paper notebooks and WhatsApp chats. Software that automates social commerce checkouts, recovers customer debts, or syncs inventory sells reliably.',
      whoShouldBuild:
        'Product-minded full-stack software engineers who can build simple, lightweight WhatsApp-first tools.',
      whoShouldAvoid:
        'Founders copying complex US desktop enterprise software (Salesforce, SAP) that requires a laptop to operate.',
      capitalToStart: '₦2M – ₦6M (mostly cloud hosting, WhatsApp Business API fees, and direct sales)',
      timeToFirstMillion: '2 to 4 months with direct merchant onboarding in commercial trade markets',
      unfairAdvantageNeeded:
        'Frictionless onboarding that requires zero training and operates natively inside WhatsApp or Android.',
    }
  }

  if (s === 'b2b-pharma-distribution') {
    return {
      verdict: 'BUILD',
      verdictSummary:
        'STRONG OPPORTUNITY. Pharmacies order essential medications weekly, demand genuine non-counterfeit stock, and generate 100% predictable cash flow. B2B pharma is among the most capital-efficient sectors in Nigeria.',
      whoShouldBuild:
        'Pharmacists, healthcare supply chain operators, or logistics founders with PCN regulatory knowledge.',
      whoShouldAvoid:
        'Founders without access to wholesale manufacturer distributor lines or working capital trade credit.',
      capitalToStart: '₦12M – ₦30M (initial authentic inventory procurement and wholesale storage)',
      timeToFirstMillion: '2 to 3 months by onboarding 20 neighborhood community pharmacies',
      unfairAdvantageNeeded:
        'Direct manufacturer distribution agreements guaranteeing 100% authentic NAFDAC-approved medications.',
    }
  }

  // Dynamic verdict based on status
  if (status === 'succeeding') {
    return {
      verdict: 'BUILD',
      verdictSummary: `High market momentum with validated customer willingness to pay. Success requires disciplined unit economics, asset-light distribution, and local currency pricing resilience.`,
      whoShouldBuild:
        'Domain experts with at least 3 years of direct operational experience in Nigerian commerce or enterprise software.',
      whoShouldAvoid:
        'Founders expecting easy venture capital subsidies without achieving immediate positive gross margins.',
      capitalToStart: '₦5M – ₦15M for MVP deployment and initial customer acquisition.',
      timeToFirstMillion: '3 to 6 months through direct enterprise or B2B contracts.',
      unfairAdvantageNeeded:
        'Proprietary access to high-trust distribution networks or mission-critical regulatory licenses.',
    }
  }

  if (status === 'emerging') {
    return {
      verdict: 'PROCEED_WITH_CAUTION',
      verdictSummary: `Promising early adopter demand, but mass-market infrastructure is still formalizing. Early movers must educate customers and structure operations to survive longer sales cycles.`,
      whoShouldBuild:
        'Patient operators capable of bootstrapping with lean burn rates while building high-trust customer moats.',
      whoShouldAvoid:
        'Founders with less than 12 months of personal financial runway who need instant consumer scale.',
      capitalToStart: '₦4M – ₦12M for lean product launch and community validation.',
      timeToFirstMillion: '6 to 9 months as customer trust and regulatory awareness mature.',
      unfairAdvantageNeeded:
        'Unique content, community distribution, or strategic partnerships with established corporate players.',
    }
  }

  if (status === 'struggling') {
    return {
      verdict: 'NICHE_ONLY',
      verdictSummary: `The mass-market horizontal version of this sector has severely burned capital. However, focused vertical niches (B2B high-ticket transactions, specialized B2B software) remain viable.`,
      whoShouldBuild:
        'Niche specialists who focus exclusively on high-margin enterprise or diaspora customers.',
      whoShouldAvoid:
        'Anyone attempting to launch a generic consumer-facing marketplace or horizontal platform.',
      capitalToStart: '₦8M – ₦20M depending on operational equipment and logistics requirements.',
      timeToFirstMillion: '6 to 10 months targeting vetted corporate accounts.',
      unfairAdvantageNeeded:
        'Guaranteed corporate take-or-pay off-take agreements or physical asset ownership.',
    }
  }

  return {
    verdict: 'DO_NOT_BUILD',
    verdictSummary: `High casualty rate among venture-backed predecessors. Structural macroeconomic constraints (FX risk, physical infrastructure gaps, or unviable unit margins) make this hazardous.`,
    whoShouldBuild:
      'Only well-capitalized industrial conglomerates with balance sheets capable of absorbing sustained losses.',
    whoShouldAvoid:
      'Startups, angel-backed founders, and early-stage entrepreneurs without balance-sheet subsidies.',
    capitalToStart: '₦50M+ minimum to absorb regulatory, currency, and operational shocks.',
    timeToFirstMillion: '12+ months with significant regulatory hurdles.',
    unfairAdvantageNeeded:
      'Direct government concession, statutory monopoly rights, or sovereign institutional guarantees.',
  }
}
