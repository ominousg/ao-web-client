export const Filters = () => (
  <defs>
    <filter id="hoverEffect">
      <feColorMatrix
        type="matrix"
        values="1 0 0 0 0.2 0 1 0 0 0.2 0 0 1 0 0.2 0 0 0 1 0"
      />
    </filter>

    <filter id="textShadow" x="-20%" y="0%" width="140%" height="140%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="0" className="textShadowAnimation" />
      <feOffset dx="2" dy="2" result="offsetblur" />
      <feFlood floodColor="black" floodOpacity="0.8" />
      <feComposite in2="offsetblur" operator="in" />
      <feMerge>
        <feMergeNode in="SourceGraphic" />
        <feMergeNode />
      </feMerge>
    </filter>
  </defs>
);