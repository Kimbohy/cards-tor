import type {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFieldArrayReturn,
} from "react-hook-form";
import type {
  CreateDeckInput,
  KeyFeatureType,
} from "@/lib/api/deck/deck.schema";

export interface BaseStepProps {
  register: UseFormRegister<CreateDeckInput>;
  control: Control<CreateDeckInput>;
  errors: FieldErrors<CreateDeckInput>;
}

export interface InfoStepProps extends BaseStepProps {}

export interface PricingStepProps extends BaseStepProps {
  priceFields: UseFieldArrayReturn<CreateDeckInput, "prices">["fields"];
  appendPrice: UseFieldArrayReturn<CreateDeckInput, "prices">["append"];
  removePrice: UseFieldArrayReturn<CreateDeckInput, "prices">["remove"];
}

export interface FeaturesStepProps extends BaseStepProps {
  featureFields: UseFieldArrayReturn<CreateDeckInput, "keyFeatures">["fields"];
  appendFeature: UseFieldArrayReturn<CreateDeckInput, "keyFeatures">["append"];
  removeFeature: UseFieldArrayReturn<CreateDeckInput, "keyFeatures">["remove"];
  watchedFeatures: CreateDeckInput["keyFeatures"] | undefined;
  expandedFeature: string | null;
  setExpandedFeature: (id: string | null) => void;
}

export interface ImagesStepProps extends BaseStepProps {
  imageFields: UseFieldArrayReturn<CreateDeckInput, "images">["fields"];
  appendImage: UseFieldArrayReturn<CreateDeckInput, "images">["append"];
  removeImage: UseFieldArrayReturn<CreateDeckInput, "images">["remove"];
}

export type { CreateDeckInput, KeyFeatureType };
