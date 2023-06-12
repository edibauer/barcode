const jsBarcode = require('jsbarcode') 
let { createCanvas } = require('canvas')
const fs = require('fs')

// create canvas form create canvas constructor
const canvas = createCanvas(300,300, 'jpeg')

const codes = async () => {
    let res = await fetch('https://sheetdb.io/api/v1/c9ou241vtwg1w')
    let data = await res.json()
    // console.log(typeof Number(data[0].Number))
    data.forEach(code => {
        if (code.Number.length === 12) {
            jsBarcode(canvas, code.Number, { format: "UPC" })
            fs.writeFileSync(`${ code.Number }.jpeg`, canvas.toBuffer())
        } else {
            jsBarcode(canvas, code.Number, { format: "EAN13" })
            fs.writeFileSync(`${ code.Number }.jpeg`, canvas.toBuffer())
        }
        
    })   
    
}

codes()



// Use the normal primitives.
