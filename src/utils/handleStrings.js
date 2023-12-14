export function splitStringToArrayByLineBreaks(inputString) {
    if (typeof inputString !== 'string') {
      return inputString; // Return unchanged if not a string
    }
  
    return inputString.split(/\n/g)
  }