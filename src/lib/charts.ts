export function csvToChartData(data: string) {
  return csvToArray(data)
}

function csvToArray(str: string, delimiter = ",") {
  const headers = str.slice(0, str.indexOf("\n")).split(delimiter)

  const rows = str.slice(str.indexOf("\n") + 1).split("\n")

  const arr = rows.map(function (row) {
    const values = row.split(delimiter)
    const el = headers.reduce(function (object, header, index) {
      object[header] = values[index]
      return object
    }, {})
    return el
  })

  return arr;
}


import { Bullet, Circle, Color, color, DataProcessor, Label, Legend, LinearGradient, percent, Root, Theme, Tooltip } from '@amcharts/amcharts5'
import { XYChart, ValueAxis, CategoryAxis, AxisRendererX, ColumnSeries, AxisRendererY, LineSeries, AxisLabel, XYCursor } from '@amcharts/amcharts5/xy'
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated"
// import am5themes_Dark from "@amcharts/amcharts5/themes/Dark"
import am5locales_fr from "@amcharts/amcharts5/locales/fr_FR"
import am5locales_en from "@amcharts/amcharts5/locales/en_CA"
// import { FunnelSeries, PieChart, PieSeries, PyramidSeries, SlicedChart } from '@amcharts/amcharts5/percent'


export function init(element: HTMLElement, locale: string) {
  let root = Root.new(element)
  root._logo.dispose()

  const myTheme = Theme.new(root);

  myTheme.rule("Label").setAll({
    fill: color("#0E0E0E"),
    fontSize: "0.88em",
    fontFamily: "Trim"
  })

  myTheme.rule("Grid").setAll({
    stroke: color("#0E0E0E"),
    strokeOpacity: 0.5
  })

  root.locale = locale === 'fr' ? am5locales_fr : am5locales_en

  root.setThemes([
    // am5themes_Animated.new(root),
    // am5themes_Dark.new(root),
    myTheme
  ]);

  return root
}



export function createColumns(element: HTMLElement, seriesData: any[], vertical: boolean, min: number, max: number, title: string, firstColor: string, secondColor: string, locale: string) {
  let root = init(element, locale)
  let chart = root.container.children.push(
    XYChart.new(root, {
      panY: false,
      layout: vertical ? root.verticalLayout : root.horizontalLayout,
      paddingLeft: 0,
      paddingRight: 0,
    })
  )


  let yAxis = chart.yAxes.push(
    ValueAxis.new(root, {
      min,
      max,
      renderer: AxisRendererY.new(root, {})
    })
  )

  if (min > 0) {
    yAxis.labelsContainer.children.push(Label.new(root, {
      text: 'truncated',
      y: percent(100),
      x: -50,
      fontSize: '0.66em'
    }))
  }
  
  title && chart.leftAxesContainer.children.push(Label.new(root, {
    text: title,
    rotation: -90,
    y: percent(50),
    centerX: percent(50),
    fontSize: '0.75em'
  }))

  let renderer = AxisRendererX.new(root, {
    minGridDistance: 30
  })
  renderer.grid.template.setAll({
    strokeOpacity: 0
  })
  
  let xAxis = chart.xAxes.push(
    CategoryAxis.new(root, {
      renderer,
      categoryField: "Category",
    })
  )
  xAxis.data.setAll(seriesData)



  const keys = Object.keys(seriesData[0]).filter(key => !['Category'].includes(key))
  

  keys.forEach((name, i) => {
    // const hsl = color(couleur).toHSL()
    // hsl.h += i * 0.02

    const fill = Color.interpolate((keys.length - 1 - i) / (keys.length-1), color(firstColor), color(secondColor))

    // let gradient = LinearGradient.new(root, {
    //   stops: [{
    //     color: Color.fromHSL(hsl.h, hsl.s, hsl.l)
    //   }, {
    //     color: Color.fromHSL(hsl.h, hsl.s, hsl.l),
    //     opacity: 0
    //   }]
    // });

    let series = chart.series.push(ColumnSeries.new(root, {
      name,
      xAxis,
      yAxis,
      valueYField: name,
      categoryXField: "Category",
      // stacked: keys.length > 1,
      tooltip: Tooltip.new(root, {}),
    }))

    series.columns.template.setAll({
      // fillGradient: gradient,
      fill,
      // stroke: Color.fromHSL(hsl.h, hsl.s, hsl.l),
      strokeOpacity: 0,
      width: percent(88),
      dx: (100 / keys.length * -i) + 50,
      cornerRadiusTL: 12,
      cornerRadiusTR: 12,
      // ...i > 0 && {
      //   cornerRadiusBL: 6,
      //   cornerRadiusBR: 6,
      // },
      showTooltipOn: "always",
      tooltipX: percent(40),
      tooltipY: percent(0),
      tooltipText: `{valueY}`
    })

    series.columns.template.setup = function(target) {
      const tooltip = Tooltip.new(root, {
        paddingTop: 0,
        paddingRight: 3,
        paddingLeft: 3,
        paddingBottom: 0,
        getFillFromSprite: false,
        autoTextColor: false
      })
      tooltip.get("background").setAll({
        fill: color('#F6F7F6'),
        strokeOpacity: 0
      });

      tooltip.label.setAll({
        fill: color("#0E0E0E")
      });

      target.set("tooltip", tooltip);
    }

    series.data.processor = DataProcessor.new(root, {
      numericFields: [name]
    })
    
    series.data.setAll(seriesData)
  })

  if (keys.length > 1) {
    let legend = chart.children.push(Legend.new(root, {}));
    legend.data.setAll(chart.series.values)
  }

  return chart
}

export function createCurve(element: HTMLElement, seriesData: any[], vertical: boolean, min: number, max: number, title: string, firstColor: string, secondColor: string, locale: string) {
  let root = init(element, locale)
  let chart = root.container.children.push(
    XYChart.new(root, {
      panY: false,
      layout: vertical ? root.verticalLayout : root.horizontalLayout,
      cursor: XYCursor.new(root, {}),
      paddingLeft: 0,
      paddingRight: 0,
    })
  )

  let yAxis = chart.yAxes.push(
    ValueAxis.new(root, {
      min,
      max,
      renderer: AxisRendererY.new(root, {})
    })
  )

  if (min > 0) {
    yAxis.labelsContainer.children.push(Label.new(root, {
      text: 'tronqué',
      y: percent(100),
      x: -50,
      fontSize: '0.66em'
    }))
  }
  
  title && chart.leftAxesContainer.children.push(Label.new(root, {
    text: title,
    rotation: -90,
    y: percent(50),
    centerX: percent(50),
    fontSize: '0.75em'
  }))

  let xAxis = chart.xAxes.push(
    CategoryAxis.new(root, {
      renderer: AxisRendererX.new(root, {
        minGridDistance: 30
      }),
      categoryField: "Date",
    })
  )
  xAxis.data.setAll(seriesData)


  const keys = Object.keys(seriesData[0]).filter(key => !['Category', 'Date'].includes(key))
  

  keys.forEach((name, i) => {

    const fill = Color.interpolate((keys.length - 1 - i) / (keys.length-1), color(firstColor), color(secondColor))
    
    let series = chart.series.push(LineSeries.new(root, {
      name,
      xAxis,
      yAxis,
      valueYField: name,
      categoryXField: "Date",
      fill,
      stroke: fill,
      tooltip: Tooltip.new(root, {
        labelText: `${keys.length > 1 ? '{name}, ' : ''}{categoryX}: {valueY}`
      }),
      // tooltipText: 
    }))

    series.strokes.template.setAll({
      // stroke: color(couleur),
      
      strokeWidth: 3,
      
    })

    series.bullets.push(function() {
      return Bullet.new(root, {
        sprite: Circle.new(root, {
          radius: 4,
          fill: series.get("fill")
        })
      })
    })

    series.data.processor = DataProcessor.new(root, {
      numericFields: [name]
    })
    
    series.data.setAll(seriesData)
  })

  if (keys.length > 1) {
    let legend = chart.children.push(Legend.new(root, {}));
    legend.data.setAll(chart.series.values)
  }

  return chart
}

// export function createPyramide(element: HTMLElement, seriesData: any[], min: number, max: number, title: string, couleur: string, locale: string) {
//   let root = init(element, locale)
//   let chart = root.container.children.push(
//     SlicedChart.new(root, {
//       layout: root.verticalLayout,
//       paddingLeft: 0,
//       paddingRight: 0,
//     })
//   )
  
//   title && chart.seriesContainer.children.push(Label.new(root, {
//     text: title,
//     rotation: -90,
//     y: percent(50),
//     centerX: percent(50),
//     fontSize: '0.75em'
//   }))


//   const keys = Object.keys(seriesData[0]).filter(key => !['Date', 'Demographic'].includes(key))

//   keys.forEach((name, i) => {
//     let series = chart.series.push(FunnelSeries.new(root, {
//       name,
//       categoryField: "Date",
//       valueField: name,
//       orientation: "horizontal",
//       alignLabels: false
//     }))

//     series.data.processor = DataProcessor.new(root, {
//       numericFields: [name]
//     })
    
//     series.data.setAll(seriesData)

//     series.slices.template.setAll({
//       fill: color(couleur),
//       stroke: color(couleur),
//       strokeWidth: 3
//     })

//     series.links.template.setAll({
//       fill: color(couleur),
//       fillOpacity: 0.66
//     })

//     series.labels.template.setAll({
//       text: "{category}: {value}",
//       rotation: 0,
//       // inside: false,
//       // radius: 10
//     });
//   })

//   return chart
// }

// export function createTarte(element: HTMLElement, seriesData: any[], min: number, max: number, title: string, couleur: string, locale: string) {
//   let root = init(element, locale)
//   let chart = root.container.children.push(
//     PieChart.new(root, {
//       layout: root.verticalLayout,
//       innerRadius: percent(40),
//       paddingLeft: 0,
//       paddingRight: 0,
//     })
//   )

//   const keys = Object.keys(seriesData[0]).filter(key => !['Date', 'Région', 'Catégorie'].includes(key))

//   keys.forEach((name, i) => {
//     let series = chart.series.push(PieSeries.new(root, {
//       name,
//       categoryField: "Catégorie",
//       valueField: name,
//       alignLabels: false
//     }))

//     series.data.processor = DataProcessor.new(root, {
//       numericFields: [name]
//     })
    
//     series.data.setAll(seriesData)

//     series.slices.template.setAll({
//       fill: color(couleur),
//       stroke: color(couleur),
//       strokeWidth: 3
//     })

//     series.labels.template.setAll({
//       text: "{category}",
//       textType: "circular",
//       inside: false,
//       radius: 10
//     });
//   })

//   return chart
// }