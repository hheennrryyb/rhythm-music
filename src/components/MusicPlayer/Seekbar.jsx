import React from 'react';

const Seekbar = ({ value, min, max, onInput, setSeekTime, appTime }) => {
  // converts the time to format 0:00
  const getTime = (time) => `${Math.floor(time / 60)}:${(`0${Math.floor(time % 60)}`).slice(-2)}`;

  return (
    <div className="w-full flex flex-row items-center justify-center">
      {/* <button type="button" onClick={() => setSeekTime(appTime - 5)} className="hidden lg:mr-4 lg:block text-white">
        -
      </button> */}
      <p className="text-white w-[2rem] hidden sm:block">{value === 0 ? '0:00' : getTime(value)}</p>
      <input
        type="range"
        step="any"
        value={value}
        min={min}
        max={max}
        onInput={onInput}
        className="range md:block w-full sm:w-[30rem] 2xl:w-96 mx-4 2xl:mx-6 "
      />
      <p className="text-white w-[2rem] hidden sm:block">{max === 0 ? '0:00' : getTime(max)}</p>
      {/* <button type="button" onClick={() => setSeekTime(appTime + 5)} className="hidden lg:ml-4 lg:block text-white">
        +
      </button> */}
    </div>
  );
};

export default Seekbar;
