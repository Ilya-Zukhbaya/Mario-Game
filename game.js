kaboom({
    global: true,
    fullscreen: true,
    scale: 2,
    debug: true,
    clearColor:[0, 0, 0, 1] // Метод, позволяющий очистить бэк и поставить цвет [red, green, blue, alpha]
})

loadRoot('https://i.imgur.com/')
loadSprite('Coin', 'wbKxhcd.png')
loadSprite('EvilShroom', 'KPO3fR9.png')
loadSprite('Brick', 'pogC9x5.png')
loadSprite('Block', 'M6rwarW.png')
loadSprite('Mario', 'Wb1qfhK.png')
loadSprite('Mushroom', '0wMd92p.png')
loadSprite('Surprise', 'gesQ1KP.png')
loadSprite('Unboxed', 'bdrLpi6.png')
loadSprite('Pipe-Top-Left', 'ReTPiWY.png')
loadSprite('Pipe-Top-Right', 'hj2GK4n.png')
loadSprite('Pipe-Bottom-Left', 'c1cYSbt.png')
loadSprite('Pipe-Bottom-Right', 'nqQ79eI.png')

scene("game", () => {
    layers(['background', 'gmar', 'UI'], 'obj')

    const map = [
        '                                              ',
        '                                              ',
        '                                              ',
        '                                              ',
        '                                              ',
        '                                              ',
        '               %    =&=%=                     ',
        '                                              ',
        '                                              ',
        '                                   <>         ',
        '             @     #        #      ()         ',
        '========= ===========================  ======='
    ]

    let scalePipe = scale(0.5)



    const levelConfig = {
        width: 20,
        height: 20,
        '=': [sprite('Block', solid())], // solid () - means that player cannot pass through these sprites, that are markable as solid()
        '$': [sprite('Coin')],
        '#': [sprite('EvilShroom'), solid()],
        '@': [sprite('Mushroom'), solid()],
        '%': [sprite('Surprise'), solid(), 'coin-surprise'],
        '&': [sprite('Surprise'), solid(), 'mushroom-surprise'],
        '^': [sprite('Unboxed'), solid()],
        '<': [sprite('Pipe-Top-Left', solid()), scalePipe],
        '>': [sprite('Pipe-Top-Right', solid()), scalePipe],
        '(': [sprite('Pipe-Bottom-Left', solid()), scalePipe],
        ')': [sprite('Pipe-Bottom-Right', solid()), scalePipe]
    }

    const gameLevel = addLevel(map, levelConfig)
})

start("game")