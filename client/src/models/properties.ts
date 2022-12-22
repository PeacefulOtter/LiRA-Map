import { Palette } from 'react-leaflet-hotline';
import { RendererName } from './renderers';

// Rendering properties of an entire Path
export interface PathProperties {
  // Color of a path if a palette is not used
  color?: string;
  // Radius of a point or a line
  width?: number;
  // Weight (boldness) of a point or the entire path
  weight?: number;
  // Opacity (between 0 and 1) of the path
  opacity?: number;
  // The name of the renderer to use - see ./renderers for the list of names
  rendererName: RendererName;
  // Weight can be multiplied by the dilatationFactor
  // 	< 1 -> shrinks ; > 1 -> grows ; == 1 -> stays the same
  dilatationFactor?: number;
  // Palette used for coloring the path and graph
  palette?: Palette;
  // Whether to show the arrow head or not, 0 no arrowhead, 1 = first dir, 2 = other dir, 3 = both dir
  arrowHead?: number;
}

export interface RendererOptions extends PathProperties {
  min?: number;
  max?: number;
}

export interface MeasProperties extends PathProperties {
  // measurement as it is in the database
  dbName: string;
  // human friendly name of the measurement
  name: string;
  // Needs to be specified if the points have a value attached to them
  hasValue?: boolean;
  // Adding a random uuid to each measurement created
  id: string;
}

export interface TagProperties {
  MeasurementTypeId: string;
  type: number;
  Created_Date: string; // "2021-04-27T18:11:02.223Z"
  readableName: string;
}

export interface DeviceProperties {
  DeviceId: string;
}

export interface ActiveMeasProperties extends MeasProperties {
  isActive: boolean; // true if measurement is displayed, false otherwise
}
