export type CarFeature = {
  id: number;
  name: string;
  icon: string | null;
};

export type EndTripCity = {
  id: number;
  name: string;
};

export type Location = {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
};

export type ParkingZone = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  radiusMeters: number;
  isFree: boolean;
  createdAt: string;
};

export type GasStation = {
  id: number;
  name: string;
  brand: string;
  latitude: number;
  longitude: number;
  createdAt: string;
};

export type CarDetailType = {
  id: number;

  // Brand & model
  brandId: number;
  brandName: string;
  modelId: number;
  model: string;
  modelName: string;

  // Basic specifications
  year: number;
  manufactureYear: number;
  bodyType: string;
  engineVolume: string;
  engineCapacity: number;
  engineUnit: string;
  transmission: number;
  seats: number;
  maxSpeed: number;

  // Features
  hasCarplay: boolean;
  keylessEntry: boolean;
  freeParking: boolean;
  freeFuel: boolean;
  insurance: boolean;
  freeInsurance: boolean;

  // Color
  color: string;
  colorId: number;
  colorName: string;

  // Fuel
  fuelType: string;
  fuelTypeId: number;
  fuelTypeName: string;
  fuelPercentage: number;
  fuelLevel: number;
  fuelTankCapacity: number;

  // Location
  locationId: number;
  location: Location;
  locationMapUrl: string;

  // Images
  imageUrl: string;
  thumbnailUrl: string;
  mediumUrl: string;

  // Pricing
  tariffPackageId: number;
  price: number;

  // Distance
  distance: number;

  // Status
  isActive: boolean;
  isUsable: boolean;

  // Features
  carFeatures: CarFeature[];

  // End-trip cities
  endTripAvailableCities: EndTripCity[];

  // Parking & fuel stations
  includedParkingZones: ParkingZone[];
  includedGasStations: GasStation[];

  // Vehicle information
  plateNumber: string;
  chassisNumber: string;
  tarsVehicleDid: string;
  imei: string;

  // Metadata
  createdAt: string;
};