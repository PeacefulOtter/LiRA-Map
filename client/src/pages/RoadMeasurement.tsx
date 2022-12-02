// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';

import { MeasurementsProvider } from '../context/MeasurementsContext';
import { MetasProvider } from '../context/MetasContext';
import Rides from '../components/RoadMeasurements/Rides';
import RidesPopup from '../components/RoadMeasurements/RidesPopup';


export default function RoadMeasurement() {
	const { themeStretch } = useSettings();

	return (
		<Page title='Road Measurement' style={{ margin: '-24px -16px -24px -16px' }}> 
			
			<MeasurementsProvider>
				<MetasProvider>
					<div className='rides-wrapper'  style={{ position: 'absolute', left: 87 }}>
						<RidesPopup />
						<Rides />
					</div>
				</MetasProvider>
			</MeasurementsProvider>
		</Page>
	);
}

