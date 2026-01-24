export default function codeCreator(
  startingCode: string,
  middleCode: string,
  endingCode: string,
): string {
  return `

    ${startingCode}

    ${middleCode}

    ${endingCode}
    
    
    `;
}

// for python and java languages endocode part can be passed as empty string
