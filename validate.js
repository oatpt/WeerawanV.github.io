function isValidNumber(value) {
  return (
    typeof value === "number" && !isNaN(value) && isFinite(value) && value > 0
  );
}
