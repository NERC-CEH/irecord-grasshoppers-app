import * as resources from './other';
import * as photos from './photos';
import species from './cache/species.json';
import './photos';

export interface SpeciesInfo {
  id: string;
  warehouseId: number;
  commonName: string;
  scientificName: string;
  'warehouseId(old)'?: number;
  wales?: string;
  scotland?: string;
  englandN?: string;
  englandS?: string;
  ireland?: string;
  channelIsles?: string;
  orderByCommonness: number;
  orderByTaxonomy: number;
  orderByName: number;
  term: string;
  size: string;
  ukStatus: string;
  description: string;
  whatItEats: string;
  antennae: string;
  sound?: string;
  sounds?: string;
  whenToSee: string;
  mainColour: string[];
  adultWings: string[];
  similarSpecies: string;
  whereToSee: string;
  probabilityId: number;
  type: number;
  commonness: number;
}

interface Resource {
  descriptionImg?: string;
  thumbnail?: string;
  backgroundThumbnail?: string;
  map?: string;
  sonogram?: string;
  sound?: any;
  lifecycle?: any;
}

interface Photos {
  images: string[];
}

const speciesResources: { [key: string]: Resource } = resources;

export type Species = SpeciesInfo & Resource & Photos;

const extendWithResources = (sp: SpeciesInfo) => {
  const images = (photos as { [key: string]: string[] })[sp.id];
  const spExt = { ...sp, ...speciesResources[sp.id], images };

  return { ...spExt };
};

const extendedSpecies: Species[] = species.map(extendWithResources);

export default extendedSpecies;
