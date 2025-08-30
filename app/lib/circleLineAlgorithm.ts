const translateVector = (vector: { x: number; y: number }, translation: { x: number; y: number }) => ({
  x: vector.x + translation.x,
  y: vector.y + translation.y
});

const rotateVector = (vector: { x: number; y: number }, angle: number) => ({
  x: vector.x * Math.cos(angle) - vector.y * Math.sin(angle),
  y: vector.x * Math.sin(angle) + vector.y * Math.cos(angle)
});

const invertVector = (vector: { x: number; y: number }) => ({
  x: -vector.x,
  y: -vector.y
});

const scaleVector = (vector: { x: number; y: number }, scale: number) => ({
  x: vector.x * scale,
  y: vector.y * scale
});

const rotateVectorAroundCenter = (vector: { x: number; y: number }, center: { x: number; y: number }, angle: number) =>
  translateVector(rotateVector(translateVector(vector, invertVector(center)), angle), center);

export const circleAtIndex = (radius: number, knots: number, index: number) => {
  const angleSegment = (Math.PI * 2) / knots;
  const arcDistance = radius * angleSegment;

  const cDelta = {
    x: index * arcDistance,
    y: 0
  };

  const dCenter = { x: 0, y: radius };

  const dBefore = { x: -arcDistance * 0.25, y: 0 };
  const dAfter = { x: arcDistance * 0.25, y: 0 };

  const pointDirectionArray: {
    dBefore: { x: number; y: number };
    dAfter: { x: number; y: number };
    position: { x: number; y: number };
  }[] = [
    { dBefore, dAfter, position: { x: -arcDistance * 4, y: 0 } },
    { dBefore, dAfter, position: { x: -arcDistance * 3, y: 0 } },
    { dBefore, dAfter, position: { x: -arcDistance * 2, y: 0 } },
    { dBefore, dAfter, position: { x: -arcDistance, y: 0 } }
  ];

  for (let i = 0; i < knots + 1; i++) {
    const position = {
      x: i * arcDistance,
      y: 0
    };
    if (i <= index) pointDirectionArray.push({ dBefore, dAfter, position });
    else {
      const angle = (i - index) * angleSegment;
      pointDirectionArray.push({
        dBefore: rotateVectorAroundCenter(dBefore, { x: 0, y: 0 }, angle),
        dAfter: rotateVectorAroundCenter(dAfter, { x: 0, y: 0 }, angle),
        position: translateVector(rotateVectorAroundCenter({ x: 0, y: 0 }, dCenter, angle), cDelta)
      });
    }
  }

  return pointDirectionArray;
};

const vertexToString = (vertex: { x: number; y: number }) => `${vertex.x.toFixed(2)},${vertex.y.toFixed(2)}`;

const getPathForPointDirectionArray = (
  pointDirectionArray: {
    dBefore: { x: number; y: number };
    dAfter: { x: number; y: number };
    position: { x: number; y: number };
  }[]
) => {
  let path = `M ${vertexToString(pointDirectionArray[0].position)}`;
  for (let i = 1; i < pointDirectionArray.length; i++) {
    path += ` C ${vertexToString(
      translateVector(pointDirectionArray[i - 1].position, pointDirectionArray[i - 1].dAfter)
    )}`;
    path += ` ${vertexToString(translateVector(pointDirectionArray[i].position, pointDirectionArray[i].dBefore))}`;
    path += ` ${vertexToString(pointDirectionArray[i].position)}`;
  }
  return path;
};

export const getPathArrayForRadiusAndKnots = (radius: number, knots: number) => {
  const pathArray: string[] = [];

  for (let i = 0; i < knots + 1; i++) pathArray.push(getPathForPointDirectionArray(circleAtIndex(radius, knots, i)));

  // add the first a couple of times add the last a couple of times and then add an inverted instance of the whole pathArray
  pathArray.push(...pathArray.slice(-1));
  pathArray.push(...pathArray.slice(-1));
  pathArray.push(...pathArray.slice(-1));
  pathArray.push(...pathArray.slice().reverse());
  pathArray.unshift(...pathArray.slice(0));
  pathArray.unshift(...pathArray.slice(0));
  pathArray.unshift(...pathArray.slice(0));
  pathArray.unshift(...pathArray.slice(0));
  pathArray.unshift(...pathArray.slice(0));
  pathArray.unshift(...pathArray.slice(0));

  return pathArray.join(';\n');
};
