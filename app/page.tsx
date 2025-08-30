import { getPathArrayForRadiusAndKnots } from './lib/circleLineAlgorithm';

export default function Home() {
  return (
    <main title="circrete" className="bg-circrete-mokka">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="-100 -50 400 200" className="max-w-full">
        <path id="base-path" stroke="transparent" fill="transparent" strokeWidth="0">
          <animate
            attributeName="d"
            dur={500}
            repeatCount="indefinite"
            values={getPathArrayForRadiusAndKnots(30, 45)}
          />
        </path>
        <text strokeWidth="5" fontSize="53" fontWeight="bold" color="inherit">
          <textPath href="#base-path" stroke="var(--color-circrete-red)" fill="transparent" strokeWidth={1}>
            c
          </textPath>
          <textPath href="#base-path" fill="var(--color-circrete-red)">
            &nbsp;&nbsp;&nbsp;ircrete
          </textPath>
        </text>
      </svg>
    </main>
  );
}
