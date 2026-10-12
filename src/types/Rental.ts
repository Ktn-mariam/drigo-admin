export enum RentalStatus {
  Started = "Started",
  Active = "Active",
  Completed = "Completed",
  PaymentPending = "PaymentPending",
  Cancelled = "Cancelled",
  Accident = "Accident"
}

export type RentalDetailType = {
  id: number;
  user: {
    id: string;
    fullName: string;
    phoneNumber: string;
    email: string;
  };
  car: {
    id: number;
    plateNumber: string;
    brand: string;
    model: string;
    color: string;
    fuelType: string;
    year: number;
  };
  tariff: {
    id: number;
    packageName: string;
    unitCount: number;
    timeUnit: string;
    activePrice: number;
    includedDistance: number;
  };
  insurance: {
    id: number;
    name: string;
    dailyPrice: number;
    deductible: number;
  };
  route: {
    startLatitude: number;
    startLongitude: number;
    endLatitude: number;
    endLongitude: number;
    distance: number;
  };
  booking: unknown | null;
  startDate: string;
  endDate: string;
  freeTimeEnd: string;
  nextPaymentDue: string | null;
  lastPaymentAt: string | null;
  packageStartDate: string;
  isPackageExpired: boolean;
  status: RentalStatus;
  totalPrice: number;
  totalDistance: number;
  discountAmount: number;
  discountName: string | null;
  useBonus: boolean;
  bonusUsed: number;
  bonusEarned: number;
  problemNote: string | null;
  createdAt: string;
  updatedAt: string;
  tarsContractDid: string | null;
  tarsRequestId: string | null;
  tarsError: string | null;
  totalDebt: number;
  debts: RentalDebtType[];
  actionHistory: {
    id: number;
    action: string;
    at: string;
    by: string;
    note: string | null;
  }[];
  userRentalHistory: {
    id: number;
    status: string;
    startDate: string;
    endDate: string;
    totalPrice: number;
  }[];
  purchasedDistanceTotal: number;
  compensationDistanceTotal: number;
  carServiceId: number | null;
  startPhotoUrls: string[];
  endPhotoUrls: string[];
  paymentGracePeriodUntil: string | null;
  distanceUsedThisPeriod: number;
  purchasedDistanceThisPeriod: number;
  compensationDistanceThisPeriod: number;
  nextPaymentBaseAmount: number | null;
  nextPaymentOverageAmount: number | null;
  nextPaymentTripFee: number | null;
  nextPaymentDiscountAmount: number | null;
  nextPaymentBonusAmount: number | null;
  nextPaymentServiceFee: number | null;
  nextPaymentBundledDebts: number | null;
  nextPaymentTotal: number | null;
  customerBonusBalance: number;
  paymentRetryState: unknown | null;
  cancelReason: string | null;
  userEndLocation: {
    latitude: number;
    longitude: number;
  };
  hasAccident: boolean;
  carSegments: {
    carId: number;
    plateNumber: string;
    from: string;
    to: string;
  }[];
  currentPeriod: number;
  isMonthlySubscription: boolean;
};

export type RentalDebtType = {
  id: number;
  type: string;
  description: string;
  amount: number;
  currency: string;
  isPaid: boolean;
  createdAt: string;
};