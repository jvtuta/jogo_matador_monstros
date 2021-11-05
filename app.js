const app = {
    data: function() {
        return { 
            progressBarPlayer: {
                width: '100%',
                backgroundColor: 'green',
            },
            progressBarMonstro: {
                width: '100%',
                backgroundColor: 'green',
            },
            start: false,
            win: false,
            logs: []
        }
    },
    computed: {

    },
    methods: {
        setStart() {
            this.progressBarMonstro.width = '100%'
            this.progressBarPlayer.width = '100%'
            this.logs = []
            this.start = true
            this.win = false
        },
        
        atacar(especial = false) {
            let vidaPlayer = this.progressBarPlayer.width.replace('%','')
            let vidaMonstro = this.progressBarMonstro.width.replace('%','')
            let danoNoMonstro, danoNoPlayer
            let danoEspecial = false
            if(especial) {

                                    
                danoNoMonstro = Math.ceil(Math.random() *10) + 2
                danoNoPlayer = Math.ceil(Math.random()* 10) + 2

                this.logs.push({
                    type: 'especial',
                    value: danoNoMonstro,
                    dano: danoNoPlayer
                })

                danoEspecial = true
                

            } else {                    
                danoNoMonstro = Math.ceil(Math.random() *10) 
                danoNoPlayer = Math.ceil(Math.random()* 10) + 2
            }

            vidaPlayer -= danoNoPlayer
            vidaMonstro -= danoNoMonstro

            this.progressBarMonstro.width = vidaMonstro + '%'
            this.progressBarPlayer.width = vidaPlayer + '%'

            if(vidaMonstro <= 0) this.win = true
           
            if(!danoEspecial) {
                this.logs.push({
                    type: 'dano',
                    value: danoNoMonstro,
                    dano: danoNoPlayer
                })    
            }
            

        },
        curar() {
            let vidaPlayer = this.progressBarPlayer.width.replace('%','')
            const danoNoPlayer = Math.ceil(Math.random()* 10) + 2
            const cura = Math.ceil(Math.random() * 10) + 2

            vidaPlayer -= danoNoPlayer

            vidaPlayer = (parseInt(vidaPlayer) + cura)
            
            vidaPlayer = vidaPlayer >= 100 ? 100 : vidaPlayer

            this.progressBarPlayer.width =  vidaPlayer + '%'

            this.logs.push({
                type: 'cura',
                value: cura,
                dano: danoNoPlayer
            })
            
        },
        desistir() {
            this.start = false
            this.progressBarMonstro.width = '100%'
            this.progressBarPlayer.width = '100%'
        },
    }
}

Vue.createApp(app).mount('#app')