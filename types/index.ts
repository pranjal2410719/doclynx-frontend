export type UserRole = "SENDER" | "COURIER" | "RECEIVER";
export type ShipmentStatus =
  | "CREATED"
  | "IN_TRANSIT"
  | "DELIVERED"
  | "VERIFIED"
  | "DISPUTED";
export type ProofType = "PICKUP" | "DELIVERY";
export type PaymentStatus = "LOCKED" | "RELEASED" | "FAILED";
export type DisputeStatus = "OPEN" | "UNDER_REVIEW" | "RESOLVED";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt?: string;
};

export type AuthResponse = {
  user: User;
  token: string;
};

export type Proof = {
  id: string;
  shipmentId: string;
  userId: string;
  type: ProofType;
  filePath: string;
  fileUrl?: string;
  hash: string;
  actor: UserRole;
  timestamp: string;
};

export type Payment = {
  id: string;
  shipmentId: string;
  amount: number;
  status: PaymentStatus;
  providerRef: string;
  lockedAt: string;
  releasedAt?: string | null;
};

export type Dispute = {
  id: string;
  shipmentId: string;
  reason: string;
  status: DisputeStatus;
  createdAt: string;
};

export type Shipment = {
  id: string;
  senderId: string;
  receiverId: string;
  courierId?: string | null;
  status: ShipmentStatus;
  description?: string | null;
  escrowAmount: number;
  receiverConfirmed: boolean;
  createdAt: string;
  updatedAt: string;
  proofs?: Proof[];
  payment?: Payment | null;
  dispute?: Dispute | null;
};

export type VerificationResult = {
  shipmentId: string;
  passed: boolean;
  checks: {
    pickupProof: boolean;
    deliveryProof: boolean;
    receiverConfirmed: boolean;
  };
};

export type OtpSendResult = {
  shipmentId: string;
  code: string;
  channel: string;
  recipient: string;
  expiresInSeconds: number;
};

export type OtpVerifyResult = {
  shipmentId: string;
  receiverConfirmed: boolean;
};

export type KnownUser = Pick<User, "id" | "name" | "email" | "role">;
