import React from 'react'
import Slider from "@mui/material/Slider";

export default function SliderForm({value,setValue}) {

    const handleChangeHeight = (event, newValue) => {
        setValue(newValue);
      };
    return (
             <>
              <Slider
                    sx={{
                      "& .MuiSlider-track": {
                        color: "#ff93a6",
                      },
                      "& .MuiSlider-thumb": {
                        backgroundColor: "#ff93a6",
                      },
                      "& .MuiSlider-rail": {
                        opacity: 0.5,
                        backgroundColor: "#bfbfbf",
                      },
                    }}
                   max={300}
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChangeHeight}
        valueLabelDisplay="auto"
        // getAriaValueText={valuetext}
      />
             </>

    )
}
