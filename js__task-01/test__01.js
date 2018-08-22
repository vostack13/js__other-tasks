// function randColor() {
//     let color = '000000'
  
//         color += Math.floor(Math.random() * 0xFFFFFF).toString(16)
//         console.log(color)
//         console.log('')
//         console.log('#' + color.substr(-6))

//   }
//   randColor()


function delayPromise(seconds) {
    return new Promise ((resolve) => {
        setTimeout(() => resolve(), seconds*1000)
        const a = 120.323

        
    })
}

console.log('Поехали')
delayPromise(3).then(() => console.log('Выполнился delay'))