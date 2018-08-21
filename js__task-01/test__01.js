function randColor() {
    let color = '000000'
  
        color += Math.floor(Math.random() * 0xFFFFFF).toString(16)
        console.log(color)
        console.log('')
        console.log('#' + color.substr(-6))

  }
  randColor()