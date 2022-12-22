import React, { FC, useEffect, useState } from 'react';
import { TwitterPicker } from 'react-color';
import { Gradient } from 'react-gradient-hook';
import Select from 'react-select';

import { RendererName, rendererTypes } from '../../../models/renderers';

import Checkbox from '../../Checkbox';
import {
  ActiveMeasProperties,
  DeviceProperties,
  TagProperties,
} from '../../../models/properties';
import { getTags } from '../../../queries/tags';
import { getDevices } from '../../../queries/devices';

import { v4 as uuidv4 } from 'uuid';

interface IPopupWrapper {
  defaultOptions: Required<ActiveMeasProperties>;
  setOptions: (newOpts: Required<ActiveMeasProperties>) => void;
}

const PopupWrapper: FC<IPopupWrapper> = ({ defaultOptions, setOptions }) => {
  const [state, setState] = useState(defaultOptions);
  const [availableTags, setTags] = useState<TagProperties[]>();
  const { name, dbName, rendererName, color } = state;

  const update = (key: keyof ActiveMeasProperties) => (val: any) => {
    const temp = { ...state } as any;
    temp[key] = val;
    setState(temp);
    setOptions(temp);
    temp.id = uuidv4();
  };

  /** @author Matteo Hoffmann s222952, Mads Westerman s174508 */
  useEffect(() => {
    getTags((data: TagProperties[]) => {
      data.forEach(function (value) {
        setTags(data);
      });
    });
  }, []);

  /** @author Matteo Hoffmann s222952, Mads Westermann s174508 */
  const nameChange =
    (key: keyof ActiveMeasProperties) =>
    ({ target }: any) =>
      update(key)(target.value);

  /** @author Matteo Hoffmann s222952, Mads Westermann s174508 */
  const tagChange =
    (key: keyof ActiveMeasProperties) =>
    ({ value }: any) =>
      update(key)(value);

  /** @author Matteo Hoffmann s222952, Mads Westermann s174508 */
  const tagOptions = availableTags?.map((tag) => ({
    value: tag.type.toString(),
    label:
      tag.type.toString() +
      (tag.readableName ? '\n(' + tag.readableName + ')' : '').toString(),
  }));

  return (
    <div className="popup-wrapper">
      <input
        className="sweetalert-input"
        placeholder="Name.."
        type="text"
        defaultValue={name}
        onChange={nameChange('name')}
      />

      {/** @author Matteo Hoffmann s222952, Mads Westermann s174508*/}
      <Select
        className="react-select-combobox"
        placeholder="Tag.."
        value={dbName ? { value: dbName, label: dbName } : undefined}
        onChange={tagChange('dbName')}
        options={tagOptions}
      />

      <div className="sweetalert-checkboxes">
        {Object.keys(RendererName).map((rName: string, i: number) => (
          <Checkbox
            key={`sweetalert-checkbox-${i}`}
            className="ride-metadata-checkbox"
            html={<div style={{ textTransform: 'capitalize' }}>{rName}</div>}
            forceState={rName === rendererName}
            onClick={() => update('rendererName')(rName)}
          />
        ))}
      </div>

      {rendererTypes[rendererName].usePalette ? (
        <Gradient
          key={`gradient-${rendererName}`}
          defaultColors={rendererTypes[rendererName].defaultPalette}
          cursorOptions={{ grid: true, samples: 40 }}
          pickerOptions={{ showCircles: false }}
          onChange={update('palette')}
        />
      ) : (
        <TwitterPicker color={color} onChange={(c) => update('color')(c.hex)} />
      )}
    </div>
  );
};

export default PopupWrapper;
