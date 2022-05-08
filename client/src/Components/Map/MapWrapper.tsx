
import { MapContainer, TileLayer, ScaleControl } from 'react-leaflet'

import Zoom from './Zoom';

import '../../css/map.css'

const MapWrapper = ( props : any ) => { 

	const { children } = props;

	return (
		<MapContainer 
			preferCanvas={true}
			center={[55.6720619937223, 12.458746337890627]} 
			zoom={12} 
			maxZoom={18} 
			scrollWheelZoom={true}
			zoomControl={false}
		>
			<TileLayer
				maxNativeZoom={18}
				maxZoom={18}
				attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Zoom />
			<ScaleControl imperial={false} position='bottomright'/>
			{ children }
		</MapContainer>
  	)
}

export default MapWrapper;
