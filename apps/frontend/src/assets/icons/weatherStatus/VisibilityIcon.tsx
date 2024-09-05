/* eslint-disable tailwindcss/no-custom-classname */

const VisibilityIcon = () => {
  const size = 40;

  return (
    <svg
      id='Eye'
      viewBox='0 0 32 32'
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      width={size}
      height={size}
    >
      <style>{`
        .st0 { fill: #E4EDF2; }
        .st1 { fill: #C77C58; }
        .st2 { fill: #3B3E3F; }
      `}</style>
      <g>
        <path
          // eslint-disable-next-line tailwindcss/no-custom-classname
          className='st0'
          d='M29.576,14.735c-3.027-4.513-8.113-7.207-13.605-7.207c-5.491,0-10.578,2.694-13.605,7.207c-0.526,0.785-0.526,1.8,0,2.586c3.028,4.513,8.114,7.207,13.605,7.207c5.491,0,10.578-2.694,13.606-7.207C30.104,16.536,30.104,15.521,29.576,14.735z M9.988,16.056c0-3.233,2.671-5.863,5.955-5.863c3.284,0,5.955,2.63,5.955,5.863s-2.671,5.863-5.955,5.863C12.66,21.919,9.988,19.289,9.988,16.056z'
        />
        <path
          className='st1'
          d='M21.897,16.056c0-3.233-2.671-5.863-5.955-5.863c-3.283,0-5.955,2.63-5.955,5.863s2.671,5.863,5.955,5.863C19.227,21.919,21.897,19.289,21.897,16.056z M15.943,18.646c-1.445,0-2.621-1.162-2.621-2.59s1.176-2.59,2.621-2.59s2.621,1.162,2.621,2.59S17.388,18.646,15.943,18.646z'
        />
        <ellipse className='st2' cx='15.943' cy='16.056' rx='2.621' ry='2.59' />
      </g>
    </svg>
  );
};

export default VisibilityIcon;
