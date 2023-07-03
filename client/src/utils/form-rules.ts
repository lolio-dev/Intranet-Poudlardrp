export const requiredValue = (value: string) => {
  if (value) return true;

  return "Valeur requise"
}

export const requiredNumber = (value: string) => {
  if (/^\d+$/.test(value) && value) {
    return true
  }
  return "Valeur invalide"
}