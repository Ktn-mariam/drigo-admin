export type Customer = {
  id: string;
  phoneNumber: string;
  phoneCountryCode: string;
  phoneNumberConfirmed: boolean;
  fullName: string;
  email: string;
  createdAt: string;
  userType: string;
  isVerified: boolean;
  isApproved: boolean;
  isBlocked: boolean;
  isDeleted: boolean;
  platform: string;
  isPassportRejected: boolean;
  isNationalIdRejected: boolean;
  isDriverLicenseRejected: boolean;
  isFaceRejected: boolean;
};

export type CustomerType = "VIP" | "Standard" | "Business";

export type DocumentStatus = "Pending" | "Verified" | "Rejected";

export type CustomerDocument = {
  documentType: "Passport" | "DriverLicense" | "NationalId";
  status: DocumentStatus;
  isVerified: boolean;
  uploadedAt: string;
  verifiedAt: string | null;
  frontUrl: string | null;
  backUrl: string | null;
  rejectionReason: string | null;
  ocr: {
    number: string;
    expiryDate: string;
    fullName: string;
  } | null;
};

export type FaceVerifyDetail = {
  isVerified: boolean;
  status: DocumentStatus;
  matchScore: number;
  selfieUrl: string | null;
  verifiedAt: string | null;
};

export type ReferralDetail = {
  code: string;
  referredByCode: string | null;
  referredCount: number;
  bonusEarned: number;
};

export type CustomerDetail = {
  id: string;
  phoneNumber: string;
  phoneCountryCode: string;
  phoneNumberConfirmed: boolean;
  fullName: string;
  email: string;
  profilePhotoUrl: string;
  createdAt: string;
  userType: CustomerType;
  birthDate: string;
  gender: string;

  passportDetail: CustomerDocument | null;
  driverLicenseDetail: CustomerDocument | null;
  nationalIdentityDetail: CustomerDocument | null;
  faceVerifyDetail: FaceVerifyDetail | null;
  referralDetail: ReferralDetail;

  isVerified: boolean;
  isApproved: boolean;
  isBlocked: boolean;
  bonusBalance: number;
  isDeleted: boolean;
  deletedAt: string | null;
  deletedByName: string | null;
};