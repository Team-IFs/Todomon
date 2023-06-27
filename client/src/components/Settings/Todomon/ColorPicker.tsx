import { useState } from 'react';
import { SketchPicker } from 'react-color';

const ColorPicker = () => {
  const [color, setColor] = useState('#000');

  const handleChangeComplete = (color:any) => {
    setColor(color.hex);

    document.body.style.backgroundColor = color.hex;
  };

  return (
    <SketchPicker
      color={color}
        onChange={handleChangeComplete}
        width='300px'
      />
  );
}
export default ColorPicker;