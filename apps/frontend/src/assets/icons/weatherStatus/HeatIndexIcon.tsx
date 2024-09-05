/* eslint-disable tailwindcss/no-custom-classname */

const HeatIndexIcon = () => {
  const size = 40;
  return (
    <svg
      data-name='Layer 1'
      id='Layer_1'
      viewBox='0 0 64 64'
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      width={size}
      height={size}
    >
      <defs>
        <style>{`
          .cls-1 { fill: #0baeff; }
          .cls-2 { fill: none; stroke-linecap: round; stroke: #0baeff; stroke-linejoin: round; stroke-width: 12px; }
          .cls-3 { fill: none; stroke-linecap: round; stroke: #1441af; stroke-miterlimit: 10; stroke-width: 6px; }
          .cls-4 { fill: none; stroke-linecap: round; stroke: #f7563c; stroke-miterlimit: 10; stroke-width: 6px; }
          .cls-5 { fill: url(#linear-gradient); }
        `}</style>
        <linearGradient
          gradientTransform='translate(51.07 19.07) rotate(90)'
          gradientUnits='userSpaceOnUse'
          id='linear-gradient'
          x1='22.27'
          x2='33.6'
          y1='13.32'
          y2='27.31'
        >
          <stop offset='0.02' stopColor='#f7563c' />
          <stop offset='1' stopColor='#d43217' />
        </linearGradient>
      </defs>
      <title>Heat Index Icon</title>
      <circle className='cls-1' cx='32' cy='46' r='12' />
      <line className='cls-2' x1='32' x2='32' y1='13' y2='46' />
      <line className='cls-3' x1='32' x2='32' y1='13' y2='37' />
      <line className='cls-4' x1='32' x2='32' y1='19' y2='46' />
      <circle
        className='cls-5'
        cx='32'
        cy='46'
        r='9'
        transform='translate(-22.49 59.06) rotate(-68.66)'
      />
    </svg>
  );
};

export default HeatIndexIcon;
