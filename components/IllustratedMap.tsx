"use client";

/**
 * Hand-illustrated map of Koh Tao — from Mae Haad pier to KD Genetics
 * at Tanote Bay. Vintage cartographer feel: cream paper, kraft linework,
 * dotted route, hand-set serif labels.
 *
 * This is v1 — geometry is approximate. Iterate the path "d" attrs to
 * tune the island silhouette and the road if it doesn't match local memory.
 *
 * Pure SVG, no external assets. Scales to any container width.
 */
export default function IllustratedMap({
  title,
  subtitle,
  className = "",
}: {
  title?: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={`relative rounded-2xl overflow-hidden border border-[#1E1E1E]/8 ${className}`}>
      <svg
        viewBox="0 0 800 600"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={title ?? "Map from Mae Haad pier to KD Genetics, Tanote Bay"}
        className="block w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Cream paper background */}
          <linearGradient id="paper" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F4EFE2" />
            <stop offset="100%" stopColor="#E9E1CC" />
          </linearGradient>
          {/* Soft sea */}
          <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#CDD8C8" />
            <stop offset="100%" stopColor="#B7C3B1" />
          </linearGradient>
          {/* Paper grain — subtle dotted noise */}
          <pattern id="grain" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.5" fill="#1E1E1E" opacity="0.04" />
          </pattern>
          {/* Compass rose star */}
          <symbol id="compass" viewBox="-20 -20 40 40">
            <circle cx="0" cy="0" r="16" fill="none" stroke="#3D2A14" strokeWidth="1" opacity="0.6" />
            <polygon points="0,-15 3,0 0,15 -3,0" fill="#3D2A14" opacity="0.85" />
            <polygon points="-15,0 0,-3 15,0 0,3" fill="#3D2A14" opacity="0.55" />
            <text x="0" y="-18" textAnchor="middle" fontSize="6" fontFamily="serif" fill="#3D2A14" opacity="0.7">N</text>
          </symbol>
        </defs>

        {/* Paper background */}
        <rect width="800" height="600" fill="url(#paper)" />
        <rect width="800" height="600" fill="url(#grain)" />

        {/* Sea — fills around the island */}
        <rect width="800" height="600" fill="url(#sea)" opacity="0.55" />

        {/* Koh Tao island silhouette — stylized teardrop, tilted slightly */}
        <g>
          <path
            d="M 380 90
               C 460 100, 540 160, 555 250
               C 565 320, 545 400, 500 470
               C 460 520, 410 545, 360 530
               C 305 510, 265 460, 250 400
               C 235 330, 245 250, 285 180
               C 310 130, 340 100, 380 90 Z"
            fill="#EFE7D2"
            stroke="#3D2A14"
            strokeWidth="2.2"
            strokeLinejoin="round"
            opacity="0.95"
          />

          {/* Subtle hill ridge running down the spine */}
          <path
            d="M 360 170 Q 405 250, 395 340 Q 385 430, 400 490"
            fill="none"
            stroke="#3D2A14"
            strokeWidth="1"
            strokeDasharray="2 4"
            opacity="0.35"
          />
          {/* Hill marks */}
          <g fill="none" stroke="#3D2A14" strokeWidth="1.2" opacity="0.55">
            <path d="M 360 250 Q 370 240, 380 250" />
            <path d="M 385 290 Q 395 278, 405 290" />
            <path d="M 380 340 Q 390 328, 400 340" />
            <path d="M 395 390 Q 405 378, 415 390" />
          </g>

          {/* Tiny palm marks scattered */}
          <g fill="#3D2A14" opacity="0.45">
            {[
              [310, 220], [330, 200], [320, 280], [430, 200],
              [460, 280], [340, 410], [460, 410], [430, 460],
              [320, 350], [470, 350],
            ].map(([cx, cy], i) => (
              <g key={i} transform={`translate(${cx} ${cy})`}>
                <line x1="0" y1="0" x2="0" y2="-7" stroke="#3D2A14" strokeWidth="0.8" />
                <path d="M 0 -7 Q -5 -10, -7 -6 M 0 -7 Q 5 -10, 7 -6 M 0 -7 Q -3 -12, -1 -10 M 0 -7 Q 3 -12, 1 -10"
                      fill="none" stroke="#3D2A14" strokeWidth="0.8" strokeLinecap="round" />
              </g>
            ))}
          </g>
        </g>

        {/* Route — dotted, from Mae Haad pier (west) over the hill into Tanote Bay (east) */}
        <path
          d="M 290 370
             C 310 350, 330 340, 360 345
             C 395 350, 420 360, 440 350
             C 470 335, 490 320, 510 330
             C 525 340, 535 360, 540 380"
          fill="none"
          stroke="#5A6A4F"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="2 7"
          opacity="0.95"
        />

        {/* Mae Haad pier marker — boat + label */}
        <g>
          {/* Jetty */}
          <line x1="295" y1="370" x2="265" y2="380" stroke="#3D2A14" strokeWidth="2" strokeLinecap="round" />
          <line x1="265" y1="376" x2="265" y2="384" stroke="#3D2A14" strokeWidth="2" strokeLinecap="round" />
          {/* Boat */}
          <path d="M 250 372 L 270 372 L 266 378 L 254 378 Z" fill="#3D2A14" />
          <line x1="260" y1="372" x2="260" y2="365" stroke="#3D2A14" strokeWidth="1" />
          <path d="M 260 366 L 268 372 Z" fill="#3D2A14" opacity="0.7" />

          <text x="240" y="360" textAnchor="end" fontFamily="Cormorant Garamond, serif"
                fontStyle="italic" fontSize="18" fill="#3D2A14">
            Mae Haad Pier
          </text>
          <text x="240" y="376" textAnchor="end" fontFamily="serif" fontSize="10"
                fill="#3D2A14" opacity="0.65">
            ferries from the mainland
          </text>
        </g>

        {/* KD Genetics marker — leaf icon + label */}
        <g>
          {/* Pin */}
          <circle cx="540" cy="380" r="10" fill="#5A6A4F" stroke="#3D2A14" strokeWidth="1.5" />
          {/* Mini leaf inside */}
          <path d="M 540 376 Q 545 380, 540 385 Q 535 380, 540 376 Z" fill="#F4EFE2" />
          <line x1="540" y1="385" x2="540" y2="389" stroke="#F4EFE2" strokeWidth="1" />

          {/* Connector line to label */}
          <line x1="552" y1="380" x2="595" y2="370" stroke="#3D2A14" strokeWidth="1" opacity="0.5" />

          <text x="600" y="368" fontFamily="Cormorant Garamond, serif"
                fontWeight="600" fontSize="22" fill="#3D2A14">
            KD Genetics
          </text>
          <text x="600" y="384" fontFamily="serif" fontStyle="italic"
                fontSize="11" fill="#3D2A14" opacity="0.7">
            Tanote Bay
          </text>
          <text x="600" y="398" fontFamily="serif" fontSize="9.5"
                fill="#3D2A14" opacity="0.55">
            Open daily · 10:00 – 19:00
          </text>
        </g>

        {/* Sairee Beach reference label (west, north of Mae Haad) */}
        <g opacity="0.55">
          <circle cx="290" cy="270" r="2.5" fill="#3D2A14" />
          <text x="282" y="262" textAnchor="end" fontFamily="serif" fontStyle="italic"
                fontSize="11" fill="#3D2A14">
            Sairee
          </text>
        </g>

        {/* Viewpoint hill reference (center) */}
        <g opacity="0.55">
          <path d="M 395 330 l -7 12 l 14 0 z" fill="none" stroke="#3D2A14" strokeWidth="1" />
          <text x="410" y="338" fontFamily="serif" fontStyle="italic"
                fontSize="10" fill="#3D2A14">
            John-Suwan viewpoint
          </text>
        </g>

        {/* Ride time chip — sits above the route */}
        <g>
          <rect x="380" y="295" width="92" height="22" rx="11"
                fill="#F4EFE2" stroke="#3D2A14" strokeWidth="1" opacity="0.95" />
          <text x="426" y="310" textAnchor="middle" fontFamily="serif"
                fontSize="11" fill="#3D2A14" fontStyle="italic">
            ~ 15 min · scooter
          </text>
        </g>

        {/* Compass top-right */}
        <g transform="translate(720 90)">
          <use href="#compass" />
        </g>

        {/* Scale bar bottom-left */}
        <g transform="translate(50 550)" opacity="0.65">
          <line x1="0" y1="0" x2="80" y2="0" stroke="#3D2A14" strokeWidth="2" />
          <line x1="0" y1="-5" x2="0" y2="5" stroke="#3D2A14" strokeWidth="2" />
          <line x1="40" y1="-3" x2="40" y2="3" stroke="#3D2A14" strokeWidth="1" />
          <line x1="80" y1="-5" x2="80" y2="5" stroke="#3D2A14" strokeWidth="2" />
          <text x="40" y="20" textAnchor="middle" fontFamily="serif" fontSize="10" fill="#3D2A14">
            ~ 2 km
          </text>
        </g>

        {/* Title cartouche bottom-right (optional, drawn only if no overlay title) */}
        {!title && (
          <g transform="translate(560 540)" opacity="0.85">
            <text fontFamily="Cormorant Garamond, serif" fontStyle="italic"
                  fontSize="14" fill="#3D2A14">
              Koh Tao — east side
            </text>
          </g>
        )}
      </svg>

      {(title || subtitle) && (
        <div className="absolute top-4 left-4 max-w-[55%] pointer-events-none">
          {title && (
            <p className="font-display text-base sm:text-lg text-[#3D2A14] leading-snug">
              {title}
            </p>
          )}
          {subtitle && (
            <p className="text-[#3D2A14]/65 text-[11px] sm:text-xs mt-1 leading-snug">
              {subtitle}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
