
    const celeste = document.getElementById('celeste')
    const violeta = document.getElementById('violeta')
    const naranja = document.getElementById('naranja')
    const verde = document.getElementById('verde')
    const btnEmpezar = document.getElementById('btnEmpezar')
    const ULTIMO_NIVEL = 10
    const ULTIMA_ETAPA = 3
    
    var puntuacionMaxima = 0
    
    class Juego {
        constructor() {
            this.inicializar = this.inicializar.bind(this)
            this.inicializar()  
            this.generarSecuencia()
            setTimeout(this.siguienteNivel(), 500)
        }
        
        inicializar() {
            this.elegirColor = this.elegirColor.bind(this)
            this.siguienteEtapa = this.siguienteEtapa.bind(this)
            this.siguienteNivel = this.siguienteNivel.bind(this)
            this.toggleBtnEmpezar()
            this.nivel = 1
            this.etapa = 1
            this.puntuacion = 0
            this.colores ={
                celeste,
                violeta,
                naranja,
                verde
            }
            this.mostarValores()
        }

        inicializarSiguienteNivel(){
            this.nivel++
            mostarValores()
        }
        
        mostarValores(){
            const etapa = document.getElementById('etapa')
            const nivel = document.getElementById('nivel')
            const puntuacion = document.getElementById('puntuacion')
            const puntuacionMaximaLbl = document.getElementById('puntuacionMaxima')
            etapa.innerText= this.etapa
            nivel.innerText = this.nivel
            puntuacion.innerText = this.puntuacion
            puntuacionMaximaLbl.innerText = puntuacionMaxima
        }

        toggleBtnEmpezar(){
            if(btnEmpezar.classList.contains('hide')){
                btnEmpezar.classList.remove('hide')
            }else{
                btnEmpezar.classList.add('hide')
            }
        }

        generarSecuencia(){
            this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor( Math.random() * 4)) 
        }

        siguienteNivel(){
            this.subNivel = 0
            this.iluminarSecuencia()
            this.agregarEventosClick()
        }

        siguienteEtapa(){
            this.subNivel = 0
            this.nivel = 1
            this.etapa++
            this.generarSecuencia()
            this.iluminarSecuencia()
            this.mostarValores()
            this.agregarEventosClick()
        }

        transformarNumeroAColor(numero){
            switch(numero){
                case 0: return 'celeste'
                case 1: return 'violeta'
                case 2: return 'naranja'
                case 3: return 'verde'
            }
        }

        transformarColorANumero(color){
            switch(color){
                case 'celeste': return 0
                case 'violeta': return 1
                case 'naranja':return 2
                case 'verde':return 3
            }
        }

        iluminarSecuencia(){
            for(let i =0; i < this.nivel; i++){
                const color = this.transformarNumeroAColor(this.secuencia[i])
                setTimeout(()=> this.iluminarColor(color), 1000 * i)
            }
        }

        iluminarColor(color){
            this.colores[color].classList.add('light')
            setTimeout(()=>this.apagarColor(color), 350)
        }

        apagarColor(color){
            this.colores[color].classList.remove('light')
        }

        agregarEventosClick(){
            this.colores.celeste.addEventListener('click', this.elegirColor)
            this.colores.violeta.addEventListener('click', this.elegirColor)
            this.colores.verde.addEventListener('click', this.elegirColor)
            this.colores.naranja.addEventListener('click', this.elegirColor)
        }

        eliminarEventosClick(){
            this.colores.celeste.removeEventListener('click', this.elegirColor)
            this.colores.violeta.removeEventListener('click', this.elegirColor)
            this.colores.verde.removeEventListener('click', this.elegirColor)
            this.colores.naranja.removeEventListener('click', this.elegirColor)
        }

        elegirColor(ev){
            const nombreColor =ev.target.dataset.color
            const numeroColor = this.transformarColorANumero(nombreColor)
            this.iluminarColor(nombreColor)
            if(numeroColor === this.secuencia[this.subNivel]){
                this.subNivel++
                this.calcularPuntuacion()
                if(this.subNivel === this.nivel){
                    this.nivel++
                    this.eliminarEventosClick()
                    if(ULTIMO_NIVEL + 1 === this.nivel){
                        this.ganoNivel()
                    }
                    else{
                        setTimeout(this.siguienteNivel, 1500)
                    }
                    this.mostarValores()
                }
            }else{
                this.perdioElJuego()
            }
        }

        calcularPuntuacion(){
            this.puntuacion += this.subNivel * this.etapa * 5
            if(this.puntuacion > puntuacionMaxima){
                puntuacionMaxima = this.puntuacion
            }
            this.mostarValores()
        }

        ganoNivel(){
            if(ULTIMA_ETAPA + 1 === this.etapa){
                this.ganoElJuego()
            } else{
                swal('Simón Dice', 'Has superado el nivel', 'success')
                .then(this.siguienteEtapa)
            }
        }
        
        ganoElJuego(){
            swal('Simón Dice', 'Felicitaciones ganaste el juego :)', 'success')
            .then(() => {
                this.eliminarEventosClick()
                this.inicializar()
            })
        }

        perdioElJuego(){
            swal('Simón Dice', 'Lo lamentamos, perdiste :(', 'error')
            .then(()=>{
                this.eliminarEventosClick()
                this.inicializar()
            })
        }

    }

    function empezarJuego() {
        var juego = new Juego()
    }