export interface SubscriptionPlan {
  id: "inicial" | "basico" | "pro" | "premium";
  name: string;
  price: string;
  timbres: string;
  recommended?: boolean;
}

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "inicial",
    name: "Plan Inicial",
    price: "$649",
    timbres: "100 timbres",
  },
  {
    id: "basico",
    name: "Plan Básico",
    price: "$1,099",
    timbres: "200 timbres",
  },
  {
    id: "pro",
    name: "Plan PRO",
    price: "$1,999",
    timbres: "500 timbres",
    recommended: true,
  },
  { id: "premium", name: "Premium", price: "$3,299", timbres: "1,000 timbres" },
];

export type SubscriptionPlanId = SubscriptionPlan["id"] | "prueba";

export function findSubscriptionPlan(value: string | null) {
  return subscriptionPlans.find((plan) => plan.id === value);
}
