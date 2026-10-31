import React from 'react'
import {
  CreditCard,
  Landmark,
  TrendingUp,
  ShoppingBag,
  Bitcoin,
  Shield,
  Layers,
  FileCheck2,
  FileText,
  Users2,
  Receipt,
  UtensilsCrossed,
  Truck,
  Scale,
  Lock,
  Boxes,
  ShoppingCart,
  Share2,
  Sparkles,
  Car,
  HeartHandshake,
  Activity,
  Pill,
  Microscope,
  Brain,
  Baby,
  Sprout,
  Ship,
  Snowflake,
  Fish,
  Beef,
  Cpu,
  Flame,
  Zap,
  BatteryCharging,
  Bike,
  Recycle,
  Droplets,
  Trees,
  Navigation,
  Globe2,
  Radio,
  Building2,
  Briefcase,
  GraduationCap,
  BookOpen,
  School,
  Video,
  Clapperboard,
  Gamepad2,
  Ticket,
  HelpCircle,
} from 'lucide-react'

interface SectorIconProps {
  slug?: string
  name?: string
  className?: string
  size?: number
}

export function SectorIcon({ slug = '', name = '', className = '', size = 20 }: SectorIconProps) {
  const s = slug.toLowerCase()

  // High-accuracy slug mappings
  if (s.includes('fintech') || s.includes('payment')) return <CreditCard size={size} className={className} />
  if (s.includes('neobank') || s.includes('bank')) return <Landmark size={size} className={className} />
  if (s.includes('wealth') || s.includes('invest')) return <TrendingUp size={size} className={className} />
  if (s.includes('bnpl') || s.includes('credit')) return <ShoppingBag size={size} className={className} />
  if (s.includes('crypto') || s.includes('web3')) return <Bitcoin size={size} className={className} />
  if (s.includes('insurtech') || s.includes('insurance')) return <Shield size={size} className={className} />
  if (s.includes('api') || s.includes('open-banking')) return <Layers size={size} className={className} />
  if (s.includes('identity') || s.includes('regtech') || s.includes('fraud')) return <FileCheck2 size={size} className={className} />
  
  if (s.includes('bookkeeping') || s.includes('sme-software')) return <FileText size={size} className={className} />
  if (s.includes('hr') || s.includes('payroll')) return <Users2 size={size} className={className} />
  if (s.includes('accounting') || s.includes('tax')) return <Receipt size={size} className={className} />
  if (s.includes('restaurant') || s.includes('food-pos')) return <UtensilsCrossed size={size} className={className} />
  if (s.includes('fleet') || s.includes('telematics')) return <Truck size={size} className={className} />
  if (s.includes('legaltech') || s.includes('compliance')) return <Scale size={size} className={className} />
  if (s.includes('cybersecurity') || s.includes('privacy')) return <Lock size={size} className={className} />

  if (s.includes('wholesale') || s.includes('fmcg')) return <Boxes size={size} className={className} />
  if (s.includes('ecommerce') || s.includes('marketplace')) return <ShoppingCart size={size} className={className} />
  if (s.includes('social-commerce')) return <Share2 size={size} className={className} />
  if (s.includes('fashion') || s.includes('apparel')) return <Sparkles size={size} className={className} />
  if (s.includes('food-delivery') || s.includes('quick-commerce')) return <UtensilsCrossed size={size} className={className} />
  if (s.includes('halal') || s.includes('ethical')) return <HeartHandshake size={size} className={className} />

  if (s.includes('telemedicine') || s.includes('healthtech')) return <Activity size={size} className={className} />
  if (s.includes('pharma') || s.includes('pharmaceutical')) return <Pill size={size} className={className} />
  if (s.includes('diagnostics') || s.includes('pathology')) return <Microscope size={size} className={className} />
  if (s.includes('mental-health') || s.includes('therapy')) return <Brain size={size} className={className} />
  if (s.includes('femtech') || s.includes('maternal')) return <Baby size={size} className={className} />

  if (s.includes('agritech') || s.includes('farming')) return <Sprout size={size} className={className} />
  if (s.includes('export') || s.includes('commodity')) return <Ship size={size} className={className} />
  if (s.includes('cold-chain') || s.includes('storage')) return <Snowflake size={size} className={className} />
  if (s.includes('aquaculture') || s.includes('fish')) return <Fish size={size} className={className} />
  if (s.includes('livestock') || s.includes('veterinary')) return <Beef size={size} className={className} />
  if (s.includes('smart-ag') || s.includes('precision') || s.includes('iot')) return <Cpu size={size} className={className} />
  if (s.includes('cookstove') || s.includes('lpg')) return <Flame size={size} className={className} />

  if (s.includes('solar') || s.includes('clean-energy') || s.includes('energy')) return <Zap size={size} className={className} />
  if (s.includes('mini-grid') || s.includes('electrification')) return <BatteryCharging size={size} className={className} />
  if (s.includes('electric-vehicle') || s.includes('ev')) return <Bike size={size} className={className} />
  if (s.includes('waste') || s.includes('circular')) return <Recycle size={size} className={className} />
  if (s.includes('water') || s.includes('purification')) return <Droplets size={size} className={className} />
  if (s.includes('carbon') || s.includes('climate')) return <Trees size={size} className={className} />

  if (s.includes('logistics') || s.includes('freight')) return <Truck size={size} className={className} />
  if (s.includes('mobility') || s.includes('ride-hailing')) return <Car size={size} className={className} />
  if (s.includes('cross-border') || s.includes('afcfta')) return <Globe2 size={size} className={className} />
  if (s.includes('telecom') || s.includes('fiber')) return <Radio size={size} className={className} />
  if (s.includes('real-estate') || s.includes('proptech')) return <Building2 size={size} className={className} />
  if (s.includes('coworking') || s.includes('workspace')) return <Briefcase size={size} className={className} />

  if (s.includes('upskilling') || s.includes('bootcamp')) return <GraduationCap size={size} className={className} />
  if (s.includes('primary') || s.includes('k-12') || s.includes('secondary')) return <BookOpen size={size} className={className} />
  if (s.includes('higher-education') || s.includes('degree')) return <School size={size} className={className} />
  if (s.includes('creator') || s.includes('digital-product')) return <Video size={size} className={className} />
  if (s.includes('media') || s.includes('nollywood') || s.includes('streaming')) return <Clapperboard size={size} className={className} />
  if (s.includes('gaming') || s.includes('esports')) return <Gamepad2 size={size} className={className} />
  if (s.includes('ticket') || s.includes('event')) return <Ticket size={size} className={className} />

  return <HelpCircle size={size} className={className} />
}
