/* eslint-disable tailwindcss/no-custom-classname */

const WindIcon = () => {
  const size = 40;

  return (
    <svg
      viewBox='0 0 32 32'
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
    >
      <defs>
        <style>{`
          .cls-1 { fill: #2f7ded; }
        `}</style>
      </defs>
      <title>Wind Icon</title>
      <g data-name='direction' id='direction-2'>
        <path
          className='cls-1'
          d='M20,13H5a1,1,0,0,1,0-2H20a2,2,0,1,0-2-2,1,1,0,0,1-2,0,4,4,0,1,1,4,4Z'
        />
        <path
          className='cls-1'
          d='M17,25a4,4,0,0,1-4-4,1,1,0,0,1,2,0,2,2,0,1,0,2-2H5a1,1,0,0,1,0-2H17a4,4,0,0,1,0,8Z'
        />
        <path
          className='cls-1'
          d='M25,21a3,3,0,0,1-3-3,1,1,0,0,1,2,0,1,1,0,0,0,2,0,2,2,0,0,0-2-2H5a1,1,0,0,1,0-2H24a4,4,0,0,1,4,4A3,3,0,0,1,25,21Z'
        />
      </g>
    </svg>
  );
};

export default WindIcon;
