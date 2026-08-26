export interface SubscriptionPlan {
  id: "inicial" | "basico" | "pro" | "premium";
  guid: string;
  name: string;
  price: string;
  timbres: string;
  recommended?: boolean;
}

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "inicial",
    guid: "be8919b2-e842-46ed-a172-746967a639f6",
    name: "Plan Inicial",
    price: "$649",
    timbres: "100 timbres",
  },
  {
    id: "basico",
    guid: "2317a364-c2f9-4651-ad32-1f2fb4a86ade",
    name: "Plan Básico",
    price: "$1,099",
    timbres: "200 timbres",
  },
  {
    id: "pro",
    guid: "a5c16c34-605d-4b79-ad61-18c53fff0b5a",
    name: "Plan PRO",
    price: "$1,999",
    timbres: "500 timbres",
    recommended: true,
  },
  {
    id: "premium",
    guid: "e5e2bcac-0412-4f73-b2ba-bc5ee1e580d8",
    name: "Premium",
    price: "$3,299",
    timbres: "1,000 timbres",
  },
];

export type SubscriptionPlanId = SubscriptionPlan["id"] | "prueba";

export const freeTrialSubscriptionGuid =
  "4ea467b7-58a0-47ad-8310-bf5575af103e";

export function findSubscriptionPlan(value: string | null) {
  return subscriptionPlans.find((plan) => plan.id === value);
}

export function getSubscriptionGuid(planId: SubscriptionPlanId) {
  if (planId === "prueba") return freeTrialSubscriptionGuid;
  return findSubscriptionPlan(planId)?.guid;
}
