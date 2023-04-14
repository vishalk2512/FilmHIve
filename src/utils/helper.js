export function handleRatingIndicationColor(vote_average) {
  if (vote_average >= 7) {
    return "#007D5C";
  } else if (vote_average >= 5) {
    return "#CC7100";
  } else {
    return "#CA2E0C";
  }
}
