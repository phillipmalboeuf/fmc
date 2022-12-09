export const date = (value: string | Date, time=false, lang='fr') =>
  value !== undefined && value !== null ? new Date(value)
    .toLocaleDateString(
      lang === 'fr' ? 'fr-CA' : 'en-us',
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        ...time && {
          hour: '2-digit',
          minute: '2-digit'
        }
      }
    )
  : '–'

export const money = (value: number | string) => 
  value !== undefined && value !== null ? `$${parseFloat(value as string).toFixed(2)}` : `–`

export const types = (type: string, locale: string) => ({
  'fr': {
    'Signals': 'Signaux',
    'Scenario': 'Scénario',
    'Challenges & trailblazers': 'Opportunités'
  }[type]
}[locale] || {
  'Challenges & trailblazers': 'Opportunities'
}[type] || type)

export const backs = (color: string) => ({
  'pink': 'coral',
  'green': 'yellow',
  'blue': 'marin',
  'cyan': 'moss',
  'violet': 'coral',
}[color])

export const texts = (color: string) => ({
  'pink': 'white',
  'coral': 'black',
  'green': 'black',
  'yellow': 'black',
  'blue': 'white',
  'cyan': 'white',
  'marin': 'white',
  'moss': 'white',
  'violet': 'black',
}[color])

export const highlights = (color: string) => ({
  'violet': 'pink',
}[color])


export function csvToChartData(data: string) {
  const delimiter = data.includes('\t') ? '\t' : ','
  const headers = data.slice(0, data.indexOf("\n")).split(delimiter)

  const rows = data.slice(data.indexOf("\n") + 1).split("\n")

  const arr = rows.map(function (row) {
    if (delimiter === '\t') { row = row.replace(/,/g, '.') }
    const values = row.split(delimiter)
    const el = headers.reduce(function (object, header, index) {
      object[header] = values[index]
      return object
    }, {})
    return el
  })

  return arr
}

export function csvToMatrix(data: string) {
  const delimiter = data.includes('\t') ? '\t' : ','
  var resultArray = [];
  data.split("\n").forEach(function(row) {
      var rowArray = [];
      row.split(delimiter).forEach(function(cell) {
          rowArray.push(cell);
      });
      resultArray.push(rowArray);
  });
  return resultArray;
}

export function matrixToCSV(data: [][]) {
  return data.map(d => d.join('\t')).join('\n');
}

export const transpose = matrix => {
  for (let row = 0; row < matrix.length; row++) {
    for (let column = 0; column < row; column++) {
      let temp = matrix[row][column]
      matrix[row][column] = matrix[column][row]
      matrix[column][row] = temp
    }
  }
  return matrix;
}

export function wait(ms: number) {
  return new Promise(function(resolve, reject) {
    setTimeout(resolve, ms);
  })
}
