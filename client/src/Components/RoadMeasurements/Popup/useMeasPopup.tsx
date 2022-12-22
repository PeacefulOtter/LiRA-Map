import { ActiveMeasProperties } from '../../../models/properties';

import PopupWrapper from './PopupWrapper';
import createPopup from '../../createPopup';

import '../../../css/popup.css';
import React from 'react';

const useMeasPopup = () => {
  const popup = createPopup<ActiveMeasProperties>();
  // const [options, setOptions] = useState<ActiveMeasProperties>()

  return (
    callback: (measurement: ActiveMeasProperties) => void,
    defaultOptions: Required<ActiveMeasProperties>,
  ) => {
    // setOptions( defaultOptions )
    let options = { ...defaultOptions };

    popup({
      title: <p className="tiny">Enter measurement name and tag</p>,
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Add',
      html: (
        <PopupWrapper
          defaultOptions={defaultOptions}
          setOptions={(opts) => {
            console.log(opts);
            options = opts;
          }}
        />
      ),
    }).then((result: any) => {
      if (!result.isConfirmed || options === undefined) return;

      callback(options);

      popup({
        title: (
          <p>
            Measurement <b>{options.name}</b> added / modified
          </p>
        ),
        footer: `Will be drawn as ${options.rendererName}`,
        icon: 'success',
        timer: 1500,
        timerProgressBar: true,
        toast: true,
      });
    });
  };
};

export default useMeasPopup;
