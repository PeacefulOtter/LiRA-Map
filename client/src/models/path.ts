// Represents a point containing (lat, lng) coordinates, 

import { Palette } from "./graph";
import { LatLng } from "./models";
import { Measurement, PathProperties, PointProperties } from "./properties";
import { PathEventHandler, RendererName } from "./renderers";

// rendering properties, and optionally, a value and some metadata (like timestamp)
export interface PointData extends LatLng {
	properties?: PointProperties;
	value?: number;   	   			
	metadata?: any;
}

// A Path is a collection of points
export type Path = PointData[]

export type Metadata =  { [key: string]: any }

export interface Bounds {
    minX?: number;
    maxX?: number;
	minY?: number;
    maxY?: number; 
}


// Props passed to the Path and EventPath components
export interface PathProps {
	path: Path;
	bounds?: Bounds;
	properties: PathProperties;
	metadata?: Metadata;
	onClick?: PathEventHandler
}

// used for queries
export interface BoundedPath {
	path: Path;
	bounds?: Bounds;
}

// This interface is used as a type for server's response
// for instance, JSON files follow this format
export interface JSONProps extends BoundedPath {
	properties: Measurement;
	metadata?: Metadata;
}


export type HotlinePalette = { [x: number]: string; };

export interface HotlineOptions {
	min?: number;
	max?: number;
	weight?: number;
	outlineWidth?: number;
	palette?: HotlinePalette;
	onclick?: (e: any) => void;
}


export interface Node {
    lat: number;
	lng: number;
	way_dist: number;
}

export type Ways = { [key: string]: Node[] }

export interface ConditionPoint {
	way_dist: number;
	value: number;
}

export type WayConditions = ConditionPoint[]

export type WayId = string;

export interface MapCondition {
	way_length: number;
	nodes: Node[];
	conditions: WayConditions;
}

export type MapConditions = { [key: WayId]: MapCondition }

