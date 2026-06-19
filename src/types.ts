export type CargoType = 'general' | 'perecedera' | 'peligrosa' | 'sobredimensionada';

export type DeliverySpeed = 'estandar' | 'express' | 'priority';

export type ActiveTab = 'inicio' | 'empresa' | 'servicios' | 'clientes' | 'contacto' | 'cotizador' | 'rastreo' ;

export interface RouteInfo {
  city: string;
  country: string;
}

export interface CargoDetails {
  type: CargoType;
  weight: number; // in kg
  packagesCount: number;
  length: number; // in cm
  width: number; // in cm
  height: number; // in cm
}

export interface QuotePreferences {
  deliverySpeed: DeliverySpeed;
  insurance: boolean;
  needsTemperatureControl: boolean;
  needsFragileHandling: boolean;
  needsExtraSecurity: boolean;
}

export interface QuotePricing {
  basePrice: number;
  handlingSurcharge: number;
  insuranceFee: number;
  deliverySurcharge: number;
  total: number;
}

export interface QuoteRequest {
  id: string; // generated ref code e.g., IFC-94821
  timestamp: string; // date ISO string
  fullName: string;
  company: string;
  email: string;
  phone: string;
  origin: RouteInfo;
  destination: RouteInfo;
  cargo: CargoDetails;
  preferences: QuotePreferences;
  pricing: QuotePricing;
  status: 'PENDIENTE_REVISION' | 'APROBADO' | 'EN_TRANSITO' | 'ENTREGADO';
}

export interface ShipmentUpdate {
  timestamp: string;
  location: string;
  description: string;
  icon: string;
}

export interface ShipmentTracking {
  quoteId: string;
  currentStep: number; // 0 to 4 matching step-by-step state
  history: ShipmentUpdate[];
}
