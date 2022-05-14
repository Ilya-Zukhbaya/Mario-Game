kaboom({
    global: true,
    fullscreen: true,
    scale: 1,
    debug: true,
    clearColor:[0, 0, 0, 1] // Метод, позволяющий очистить бэк и поставить цвет [red, green, blue, alpha]
})

loadRoot('https://imgur.com/')
loadSprite('Coin', 'wbKxhcd.png')
loadSprite('EvilShroom', 'KPO3fR9.png')
loadSprite('Brick', 'pogC9x5.png')
loadSprite('Block', 'bdrLpi6.png')
loadSprite('Mario', 'Wb1qfhK.png')
loadSprite('Mushrooom', '0wMd92p.png')
loadSprite('Surprise', 'gesQ1KP.png')
loadSprite('Unboxed', 'bdrLpi6.png')
loadSprite('Pipe-Top-Left', 'ReTPiWY.png')
loadSprite('Pipe-Top-Right', 'hj2GK4n.png')
loadSprite('Pipe-Bottom-Left', 'c1cYSbt.png')
loadSprite('Pipe-Bottom-Right', 'nqQ79eI.png')

scene("game", () => {
    layers(['background', 'gmar', 'UI'], 'obj')
})
start("game")