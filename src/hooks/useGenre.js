function useGenre(activeGenres) {
  if (activeGenres.length < 1) return null;
  return activeGenres.map((activeGenre) => activeGenre.id).join(",");
}

export default useGenre;
