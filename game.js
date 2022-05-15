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
    layers(['background', 'obj', 'UI'], 'obj')

    const map = [
        '                                              ',
        '                                              ',
        '                                              ',
        '                                              ',
        '                                              ',
        '                                              ',
        '                                              ',
        '                  %    =&=%=                  ',
        '                                              ',
        '                                   <>         ',
        '                   #        #      ()         ',
        '=========   =========================  ======='
    ]

    let scalePipe = scale(0.5)

    const levelConfig = {
        width: 20,
        height: 20,
        '=': [sprite('Block'), solid()], // solid () - means that player cannot pass through these sprites, that are markable as solid()
        '$': [sprite('Coin')],
        '#': [sprite('EvilShroom'), solid()],
        '%': [sprite('Surprise'), solid(), 'coin-surprise'],
        '&': [sprite('Surprise'), solid(), 'mushroom-surprise'],
        '^': [sprite('Unboxed'), solid()],
        '<': [sprite('Pipe-Top-Left'), solid(), scalePipe],
        '>': [sprite('Pipe-Top-Right'), solid(), scalePipe],
        '(': [sprite('Pipe-Bottom-Left'), solid(), scalePipe],
        ')': [sprite('Pipe-Bottom-Right'), solid(), scalePipe],
        '@': [sprite('Mushroom'), solid(), 'Mushroom', body()],
    }

    const playerScore = add([
        text('score'),
        pos(10, 10),
        layer('UI'),
        {
            value: 'score',
        }
    ])

    add([text('level' + 'test', pos(10, 20))])

    const gameLevel = addLevel(map, levelConfig)

    function bigPlayer(){
        let timer = 0
        let isBig = false
        return {
            update(){
                if (isBig){
                    timer -= dt // Get the delta time since last frame.
                    if (timer <= 0){
                        this.smallify()
                    }
                }
            },
            isBig(){
                return isBig
            },
            smallify(){
                this.scale = vec2(1)
                timer = 0
                isBig - false
            },
            biggify(){
                this.scale = vec2(2),
                timer = time,
                isBig = true
            }
        }
    }

    const player = add([
        sprite('Mario'), solid(),
        pos(10,100),
        body(),
        bigPlayer(),
        origin('bot')
    ])

    action('Mushroom', (m) => {
        m.move(10, 0)
    })

    // Box event
    player.on("headbump", (obj) => {
        if (obj.is('coin-surprise')) {
            gameLevel.spawn('$', obj.gridPos.sub(0, 1))
            destroy(obj)
            gameLevel.spawn('^', obj.gridPos.sub(0, 0))
        }
        if(obj.is('mushroom-surprise')){
            gameLevel.spawn('@', obj.gridPos.sub(0, 1))
            destroy(obj)
            gameLevel.spawn('^', obj.gridPos.sub(0, 0))
        }
    })

    keyDown('left', () => {
        player.move(-120, 0) // x and y axis
    })

    keyPress('space', () => {
        if (player.grounded()){
            player.jump(360)
        }
    })

    keyDown('right', () => {
        player.move(120, 0)
    })
})

start("game")