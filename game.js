kaboom({
    global: true,
    fullscreen: true,
    scale: 2,
    debug: true,
    clearColor:[0, 0, 0, 1] // Метод, позволяющий очистить бэк и поставить цвет [red, green, blue, alpha]
})

const MOVE_SPEED = 120
const JUMP_FORSE = 360
const BIG_JUMP_FORSE = 480
const ENEMY_SPEED = 20
const FALL_DEATH = 400
let isJumping = true
let CURRENT_JUMP_FORCE = JUMP_FORSE

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

scene("game", ({ score }) => {
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
        '$': [sprite('Coin'), 'Coin'],
        '#': [sprite('EvilShroom'), solid(), 'Danger'],
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
        text(`Your score: ${score}`),
        pos(10, 10),
        layer('UI'),
        {
            value: score,
        }
    ])

    add([text('level' + 'test', pos(10, 20))])

    const gameLevel = addLevel(map, levelConfig)

    function big() {
        let timer = 0
        let isBig = false
        return {
            update() {
                if (isBig) {
                    timer -= dt() // Get the delta time since last frame.
                    if (timer <= 0) {
                        this.smallify()
                    }
                }
            },
            isBig(){
                return isBig
            },
            smallify(){
                this.scale = vec2(1)
                CURRENT_JUMP_FORCE = JUMP_FORSE
                timer = 0
                isBig - false
            },
            biggify(time){
                this.scale = vec2(2)
                CURRENT_JUMP_FORCE = BIG_JUMP_FORSE
                timer = time
                isBig = true
            }
        }
    }

    const player = add([
        sprite('Mario'), solid(),
        pos(10,100),
        body(),
        big(),
        origin('bot')
    ])

    // Interaction with mushroom and player
    player.collides('Mushroom', (m) => {
        destroy(m)
        player.biggify(6) // for 5 sec
    })

    // Interaction with coin and player
    player.collides('Coin', (c) => {
        destroy(c)
        playerScore.value++
        playerScore.text = playerScore.value
    })

    // Interaction with dangerous mobs and player

    action('Danger', (d) => {
        d.move(-ENEMY_SPEED, 0)
    })

    player.collides('Danger', (d) => {
        if (isJumping){
            destroy(d)
        }
        else{
            go('playerLose', {score: playerScore.value}) // Go to a scene, passing all rest args to scene callback.
        }
    })

    action('Mushroom', (m) => {
        m.move(20, 0)
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
        player.move(-MOVE_SPEED, 0) // x and y axis
    })

    keyDown('right', () => {
        player.move(MOVE_SPEED, 0)
    })

    player.action(() => {
        if (player.grounded()){
            isJumping = false
        }
    })

    keyPress('space', () => {
        if (player.grounded()){
            isJumping = true
            player.jump(CURRENT_JUMP_FORCE)
        }
    })
})

scene('playerLose', ({score}) => {
    add([text(score, 32), origin('center'), pos(width()/2, height()/2)])
})

start("game", {score: 0})