export type Category = 'chairs' | 'sofas' | 'tables';

export interface FabricOption {
  id: string;
  label: string;
  /** Swatch color shown in the picker. */
  hex: string;
  /** Name of a glTF material variant that carries this fabric. */
  variant?: string;
  /** Flat color applied to the fabric material when there is no variant. */
  tint?: boolean;
}

export interface ModelCredit {
  title: string;
  author: string;
  license: 'CC0 1.0' | 'CC BY 4.0';
  licenseUrl: string;
  sourceUrl: string;
}

export interface Product {
  slug: string;
  name: string;
  category: Category;
  price: number;
  summary: string;
  description: string;
  details: string;
  /** Width, depth, height in centimeters, measured from the model bounds. */
  dimensionsCm: { w: number; d: number; h: number };
  modelSrc: string;
  posterSrc: string;
  /** Name of the glTF material that holds the fabric, when it can be tinted. */
  fabricMaterial?: string;
  fabrics: FabricOption[];
  credit: ModelCredit;
  related: string[];
}

export const CATEGORY_LABEL: Record<Category, string> = {
  chairs: 'Chairs',
  sofas: 'Sofas',
  tables: 'Tables',
};
