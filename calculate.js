function isTriangle(a, b, c) {
  return a + b > c && a + c > b && b + c > a;
}

function getTriangleType(a, b, c) {
  const sides = [a, b, c].sort((x, y) => x - y);
  const [x, y, z] = sides;

  if (x ** 2 + y ** 2 === z ** 2) {
    return "Right-angled";
  } else if (a === b && b === c) {
    return "Equilateral";
  } else if (a === b || b === c || a === c) {
    return "Isosceles";
  } else {
    return "Scalene";
  }
}
