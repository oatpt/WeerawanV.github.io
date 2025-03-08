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

// Function to display triangle visualization below the current interface
function displayTriangle(triangleType, sideA, sideB, sideC) {
  // Create or find the container for visualization
  let vizContainer = document.getElementById("triangle-viz-container");
  
  // If container doesn't exist, create it
  if (!vizContainer) {
      // Find the card element
      const card = document.querySelector(".card");
      
      // Create a new container for the visualization
      vizContainer = document.createElement("div");
      vizContainer.id = "triangle-viz-container";
      vizContainer.style.marginTop = "20px";
      vizContainer.style.textAlign = "center";
      vizContainer.style.borderTop = "1px solid #ccc";
      vizContainer.style.paddingTop = "15px";
      
      // Append it to the end of the card
      card.appendChild(vizContainer);
  } else {
      // Clear existing content if container already exists
      vizContainer.innerHTML = "";
  }
  
  // Create the SVG element
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 110 110");
  svg.setAttribute("width", "150");
  svg.setAttribute("height", "150");
  svg.style.display = "inline-block";
  
  // Create path and text elements based on triangle type
  if (triangleType === "Right-angled") {
      // Right triangle
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", "M20,90 L110,90 L20,20 Z");
      path.setAttribute("fill", "none");
      path.setAttribute("stroke", "black");
      path.setAttribute("stroke-width", "2");
      
      // Text for sides
      const textB = createSvgText(55, 105, sideB.toFixed(1));
      const textC = createSvgText(65, 50, sideC.toFixed(1));
      const textA = createSvgText(0, 60, sideA.toFixed(1));
      
      svg.appendChild(path);
      svg.appendChild(textA);
      svg.appendChild(textB);
      svg.appendChild(textC);
  } 
  else if (triangleType === "Equilateral") {
      // Equilateral triangle
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", "M15,90 L95,90 L55,20 Z");
      path.setAttribute("fill", "none");
      path.setAttribute("stroke", "black");
      path.setAttribute("stroke-width", "2");
      
      // Text for sides - all sides are equal
      const textA = createSvgText(55, 105, sideA.toFixed(1));
      const textB = createSvgText(80, 60, sideA.toFixed(1));
      const textC = createSvgText(20, 60, sideA.toFixed(1));
      
      svg.appendChild(path);
      svg.appendChild(textA);
      svg.appendChild(textB);
      svg.appendChild(textC);
  }
  else if (triangleType === "Isosceles") {
      // Isosceles triangle
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", "M20,90 L90,90 L55,20 Z");
      path.setAttribute("fill", "none");
      path.setAttribute("stroke", "black");
      path.setAttribute("stroke-width", "2");
      
      // Identify the equal sides
      let equalSide, differentSide;
      if (Math.abs(sideA - sideB) < 0.0001) {
          equalSide = sideA;
          differentSide = sideC;
      } else if (Math.abs(sideA - sideC) < 0.0001) {
          equalSide = sideA;
          differentSide = sideB;
      } else {
          equalSide = sideB;
          differentSide = sideA;
      }
      
      // Text for sides
      const textA = createSvgText(55, 105, differentSide.toFixed(1));
      const textB = createSvgText(80, 60, equalSide.toFixed(1));
      const textC = createSvgText(20, 60, equalSide.toFixed(1));
      
      svg.appendChild(path);
      svg.appendChild(textA);
      svg.appendChild(textB);
      svg.appendChild(textC);
  }
  else if (triangleType === "Scalene") {
      // Scalene triangle (all sides different)
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", "M40,90 L110,90 L20,20 Z");
      path.setAttribute("fill", "none");
      path.setAttribute("stroke", "black");
      path.setAttribute("stroke-width", "2");
      
      // Text for sides
      const textA = createSvgText(75, 105, sideB.toFixed(1));
      const textB = createSvgText(65, 50, sideC.toFixed(1));
      const textC = createSvgText(0, 60, sideA.toFixed(1));
      
      svg.appendChild(path);
      svg.appendChild(textA);
      svg.appendChild(textB);
      svg.appendChild(textC);
  }
  
  
  // Append elements to container
  vizContainer.appendChild(svg);

}

// Helper function to create SVG text elements
function createSvgText(x, y, content) {
  const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  text.setAttribute("x", x);
  text.setAttribute("y", y);
  text.setAttribute("font-size", "12");
  text.textContent = content;
  return text;
}

// Function to fix the getTriangleType function
function getTriangleType(a, b, c) {
  // Sort sides to ensure proper comparison
  const sides = [a, b, c].sort((x, y) => x - y);
  const [x, y, z] = sides;
  
  // Define a small epsilon value for floating-point comparison
  const epsilon = 0.0001;
  
  // Check if it's a right-angled triangle using Pythagorean theorem
  if (Math.abs(x * x + y * y - z * z) < epsilon) {
      return "Right-angled";
  } 
  // Check if it's an equilateral triangle (all sides equal)
  else if (Math.abs(a - b) < epsilon && Math.abs(b - c) < epsilon) {
      return "Equilateral";
  } 
  // Check if it's an isosceles triangle (two sides equal)
  else if (Math.abs(a - b) < epsilon || Math.abs(b - c) < epsilon || Math.abs(a - c) < epsilon) {
      return "Isosceles";
  } 
  // Otherwise it's a scalene triangle (all sides different)
  else {
      return "Scalene";
  }
}

// Function to provide advice for fixing invalid triangle sides
function getTriangleAdvice(a, b, c) {
  // Create an array of sides with their labels
  const sides = [
    { name: "side 1", value: a },
    { name: "side 2", value: b },
    { name: "side 3", value: c }
  ];
  
  // Sort by value (ascending)
  sides.sort((x, y) => x.value - y.value);
  
  // Check which triangle inequality is violated
  const [smallest, middle, largest] = sides;
  
  // The main issue is usually that the largest side is too large compared to the sum of the others
  if (smallest.value + middle.value <= largest.value) {
    const minValue = (largest.value - middle.value) + 0.1;
    const suggestion = `${largest.name} (${largest.value.toFixed(1)}) is too large compared to the other sides.`;
    
    // Generate advice options
    const options = [];
    
    // Option 1: Decrease the largest side
    const decreaseValue = (middle.value + smallest.value - 0.1).toFixed(1);
    options.push(`${largest.name} should be less than ${decreaseValue}`);
    
    // Option 2: Increase the smallest side
    options.push(`${smallest.name} should be greater than ${minValue.toFixed(1)}`);
    
    return {
      issue: suggestion,
      options: options
    };
  }
  
  // This shouldn't happen if isTriangle() returns false, but just in case:
  return {
    issue: "The sides don't form a valid triangle.",
    options: ["Ensure that the sum of any two sides is greater than the third side."]
  };
}

// Updated triangle validity check function with more details
function getTriangleValidityDetails(a, b, c) {
  // Check if any single value is non-positive
  if (a <= 0 || b <= 0 || c <= 0) {
    return {
      isValid: false,
      reason: "All sides must be positive numbers."
    };
  }
  
  // Check triangle inequality theorem for each pair of sides
  if (a + b <= c) {
    return {
      isValid: false,
      reason: `Side 1 (${a.toFixed(1)}) + Side 2 (${b.toFixed(1)}) must be greater than Side 3 (${c.toFixed(1)})`
    };
  }
  
  if (a + c <= b) {
    return {
      isValid: false,
      reason: `Side 1 (${a.toFixed(1)}) + Side 3 (${c.toFixed(1)}) must be greater than Side 2 (${b.toFixed(1)})`
    };
  }
  
  if (b + c <= a) {
    return {
      isValid: false,
      reason: `Side 2 (${b.toFixed(1)}) + Side 3 (${c.toFixed(1)}) must be greater than Side 1 (${a.toFixed(1)})`
    };
  }
  
  // If all checks pass, the triangle is valid
  return {
    isValid: true,
    reason: ""
  };
}