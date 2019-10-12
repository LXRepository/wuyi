<template> 
 <!-- style="background: url(static/img/bbj.jpg) center center;" -->
  <div class='login' >
      <div class="waves">
        <!-- style="background: url(static/img/hbj.jpg) center center;" -->
          <div class="landai"  ></div>
          <div class="systemName">
              <img class="logo" src="static/img/fyhbL.png" alt="">
              数据资源目录汇总平台
          </div>
          <div class="loginBox">
            <p class="title">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</p>
            <h5>用户名<input type="text" v-model="username" @keyup.enter="login()"></h5>
            <h5>密&nbsp;&nbsp;&nbsp;码<input type="password" v-model="password" @keyup.enter="login()"></h5>
            <p class="buttons">
              <button @click="login()">登录</button>
              <button @click="resetit()">重置</button>
            </p>
          </div>
          <div class="aboutUs">
            <h5>版权所有：四川省高级人民法院</h5>
            <h5>建议浏览器：360、谷歌、Firefox</h5>
            <h5>技术支持：四川智诚汇通信息技术有限公司  </h5>
          </div>
      </div>   
  </div>
</template>

<script>
import $ from 'jquery'
import Vue from 'vue'
import {getUserName,Login,updatePwd} from '@/api/getdata'
import {Loading, Message} from 'element-ui'
import md5 from 'js-md5'
Vue.prototype.$md5 = md5
Vue.use(Loading)
export default {
  name: 'loginPage',
  data () {
    return {
      username:'',
      password:'',
    }
  },
   components: {
    Login,
  },
  mounted () {
    var _this = this
    // window.onresize = function () { // 定义窗口大小变更通知事件
    //   _this.screenHeight = document.documentElement.clientHeight // 窗口高度
    // }
    // class ShaderProgram {

    //     constructor( holder, options = {} ) {

    //         options = Object.assign( {
    //         antialias: false,
    //         depthTest: false,
    //         mousemove: false,
    //         autosize: true,
    //         side: 'front',
    //         vertex: `
    //             precision highp float;

    //             attribute vec4 a_position;
    //             attribute vec4 a_color;

    //             uniform float u_time;
    //             uniform vec2 u_resolution;
    //             uniform vec2 u_mousemove;
    //             uniform mat4 u_projection;

    //             varying vec4 v_color;

    //             void main() {

    //             gl_Position = u_projection * a_position;
    //             gl_PointSize = (10.0 / gl_Position.w) * 100.0;

    //             v_color = a_color;

    //             }`,
    //         fragment: `
    //             precision highp float;

    //             uniform sampler2D u_texture;
    //             uniform int u_hasTexture;

    //             varying vec4 v_color;

    //             void main() {

    //             if ( u_hasTexture == 1 ) {

    //                 gl_FragColor = v_color * texture2D(u_texture, gl_PointCoord);

    //             } else {

    //                 gl_FragColor = v_color;

    //             }

    //             }`,
    //         uniforms: {},
    //         buffers: {},
    //         camera: {},
    //         texture: null,
    //         onUpdate: ( () => {} ),
    //         onResize: ( () => {} ),
    //         }, options )

    //         const uniforms = Object.assign( {
    //         time: { type: 'float', value: 0 },
    //         hasTexture: { type: 'int', value: 0 },
    //         resolution: { type: 'vec2', value: [ 0, 0 ] },
    //         mousemove: { type: 'vec2', value: [ 0, 0 ] },
    //         projection: { type: 'mat4', value: [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ] },
    //         }, options.uniforms )

    //         const buffers = Object.assign( {
    //         position: { size: 3, data: [] },
    //         color: { size: 4, data: [] },
    //         }, options.buffers )

    //         const camera = Object.assign( {
    //         fov: 60,
    //         near: 1,
    //         far: 10000,
    //         aspect: 1,
    //         z: 100,
    //         perspective: true,
    //         }, options.camera )

    //         const canvas = document.createElement( 'canvas' )
    //         const gl = canvas.getContext( 'webgl', { antialias: options.antialias } )

    //         if ( ! gl ) return false

    //         this.count = 0
    //         this.gl = gl
    //         this.canvas = canvas
    //         this.camera = camera
    //         this.holder = holder
    //         this.onUpdate = options.onUpdate
    //         this.onResize = options.onResize
    //         this.data = {}

    //         holder.appendChild( canvas )

    //         this.createProgram( options.vertex, options.fragment )

    //         this.createBuffers( buffers )
    //         this.createUniforms( uniforms )

    //         this.updateBuffers()
    //         this.updateUniforms()

    //         this.createTexture( options.texture )

    //         gl.enable( gl.BLEND )
    //         gl.enable( gl.CULL_FACE )
    //         gl.blendFunc( gl.SRC_ALPHA, gl.ONE )
    //         gl[ options.depthTest ? 'enable' : 'disable' ]( gl.DEPTH_TEST )

    //         if ( options.autosize )
    //         window.addEventListener( 'resize', e => this.resize( e ), false )
    //         if ( options.mousemove )
    //         window.addEventListener( 'mousemove', e => this.mousemove( e ), false )

    //         this.resize()

    //         this.update = this.update.bind( this )
    //         this.time = { start: performance.now(), old: performance.now() }
    //         this.update()

    //     }

    //     mousemove( e ) {

    //         let x = e.pageX / this.width * 2 - 1
    //         let y = e.pageY / this.height * 2 - 1

    //         this.uniforms.mousemove = [ x, y ]

    //     }

    //     resize( e ) {

    //         const holder = this.holder
    //         const canvas = this.canvas
    //         const gl = this.gl

    //         const width = this.width = holder.offsetWidth
    //         const height = this.height = holder.offsetHeight
    //         const aspect = this.aspect = width / height
    //         const dpi = this.dpi = devicePixelRatio

    //         canvas.width = width * dpi
    //         canvas.height = height * dpi
    //         canvas.style.width = width + 'px'
    //         canvas.style.height = height + 'px'
    //         canvas.style.minWidth = '1280px'
    //         canvas.style.minHeight = '625px'

    //         gl.viewport( 0, 0, width * dpi, height * dpi )
    //         gl.clearColor( 0, 0, 0, 0 )

    //         this.uniforms.resolution = [ width, height ]
    //         this.uniforms.projection = this.setProjection( aspect )

    //         this.onResize( width, height, dpi )

    //     }

    //     setProjection( aspect ) {

    //         const camera = this.camera

    //         if ( camera.perspective ) {

    //         camera.aspect = aspect

    //         const fovRad = camera.fov * ( Math.PI / 180 )
    //         const f = Math.tan( Math.PI * 0.5 - 0.5 * fovRad )
    //         const rangeInv = 1.0 / ( camera.near - camera.far )

    //         const matrix = [
    //             f / camera.aspect, 0, 0, 0,
    //             0, f, 0, 0,
    //             0, 0, (camera.near + camera.far) * rangeInv, -1,
    //             0, 0, camera.near * camera.far * rangeInv * 2, 0
    //         ]

    //         matrix[ 14 ] += camera.z
    //         matrix[ 15 ] += camera.z

    //         return matrix

    //         } else {

    //         return [
    //             2 / this.width, 0, 0, 0,
    //             0, -2 / this.height, 0, 0,
    //             0, 0, 1, 0,
    //             -1, 1, 0, 1,
    //         ]

    //         }

    //     }

    //     createShader( type, source ) {

    //         const gl = this.gl
    //         const shader = gl.createShader( type )

    //         gl.shaderSource( shader, source )
    //         gl.compileShader( shader )

    //         if ( gl.getShaderParameter (shader, gl.COMPILE_STATUS ) ) {

    //         return shader

    //         } else {

    //         gl.deleteShader( shader )

    //         }

    //     }

    //     createProgram( vertex, fragment ) {

    //         const gl = this.gl

    //         const vertexShader = this.createShader( gl.VERTEX_SHADER, vertex )
    //         const fragmentShader = this.createShader( gl.FRAGMENT_SHADER, fragment )

    //         const program = gl.createProgram()

    //         gl.attachShader( program, vertexShader )
    //         gl.attachShader( program, fragmentShader )
    //         gl.linkProgram( program )

    //         if ( gl.getProgramParameter( program, gl.LINK_STATUS ) ) {

    //         gl.useProgram( program )
    //         this.program = program

    //         } else {

    //         gl.deleteProgram( program )

    //         }

    //     }

    //     createUniforms( data ) {

    //         const gl = this.gl
    //         const uniforms = this.data.uniforms = data
    //         const values = this.uniforms = {}

    //         Object.keys( uniforms ).forEach( name => {

    //         const uniform = uniforms[ name ]

    //         uniform.location = gl.getUniformLocation( this.program, 'u_' + name )

    //         Object.defineProperty( values, name, {
    //             set: value => {

    //             uniforms[ name ].value = value
    //             this.setUniform( name, value )

    //             },
    //             get: () => uniforms[ name ].value
    //         } )

    //         } )

    //     }

    //     setUniform( name, value ) {

    //         const gl = this.gl
    //         const uniform = this.data.uniforms[ name ]

    //         uniform.value = value

    //         switch ( uniform.type ) {
    //         case 'int': {
    //             gl.uniform1i( uniform.location, value )
    //             break
    //         }
    //         case 'float': {
    //             gl.uniform1f( uniform.location, value )
    //             break
    //         }
    //         case 'vec2': {
    //             gl.uniform2f( uniform.location, ...value )
    //             break
    //         }
    //         case 'vec3': {
    //             gl.uniform3f( uniform.location, ...value )
    //             break
    //         }
    //         case 'vec4': {
    //             gl.uniform4f( uniform.location, ...value )
    //             break
    //         }
    //         case 'mat2': {
    //             gl.uniformMatrix2fv( uniform.location, false, value )
    //             break
    //         }
    //         case 'mat3': {
    //             gl.uniformMatrix3fv( uniform.location, false, value )
    //             break
    //         }
    //         case 'mat4': {
    //             gl.uniformMatrix4fv( uniform.location, false, value )
    //             break
    //         }
    //         }

    //         // ivec2       : uniform2i,
    //         // ivec3       : uniform3i,
    //         // ivec4       : uniform4i,
    //         // sampler2D   : uniform1i,
    //         // samplerCube : uniform1i,
    //         // bool        : uniform1i,
    //         // bvec2       : uniform2i,
    //         // bvec3       : uniform3i,
    //         // bvec4       : uniform4i,

    //     }

    //     updateUniforms() {

    //         const gl = this.gl
    //         const uniforms = this.data.uniforms

    //         Object.keys( uniforms ).forEach( name => {

    //         const uniform = uniforms[ name ]

    //         this.uniforms[ name ] = uniform.value

    //         } )

    //     }

    //     createBuffers( data ) {

    //         const gl = this.gl
    //         const buffers = this.data.buffers = data
    //         const values = this.buffers = {}

    //         Object.keys( buffers ).forEach( name => {

    //         const buffer = buffers[ name ]

    //         buffer.buffer = this.createBuffer( 'a_' + name, buffer.size )

    //         Object.defineProperty( values, name, {
    //             set: data => {

    //             buffers[ name ].data = data
    //             this.setBuffer( name, data )

    //             if ( name == 'position' )
    //                 this.count = buffers.position.data.length / 3

    //             },
    //             get: () => buffers[ name ].data
    //         } )

    //         } )

    //     }

    //     createBuffer( name, size ) {

    //         const gl = this.gl
    //         const program = this.program

    //         const index = gl.getAttribLocation( program, name )
    //         const buffer = gl.createBuffer()

    //         gl.bindBuffer( gl.ARRAY_BUFFER, buffer )
    //         gl.enableVertexAttribArray( index )
    //         gl.vertexAttribPointer( index, size, gl.FLOAT, false, 0, 0 )

    //         return buffer

    //     }

    //     setBuffer( name, data ) {

    //         const gl = this.gl
    //         const buffers = this.data.buffers

    //         if ( name == null && ! gl.bindBuffer( gl.ARRAY_BUFFER, null ) ) return

    //         gl.bindBuffer( gl.ARRAY_BUFFER, buffers[ name ].buffer )
    //         gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( data ), gl.STATIC_DRAW )

    //     }

    //     updateBuffers() {

    //         const gl = this.gl
    //         const buffers = this.buffers

    //         Object.keys( buffers ).forEach( name =>
    //         buffers[ name ] = buffer.data
    //         )

    //         this.setBuffer( null )

    //     }

    //     createTexture( src ) {

    //         const gl = this.gl
    //         const texture = gl.createTexture()

    //         gl.bindTexture( gl.TEXTURE_2D, texture )
    //         gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array( [ 0, 0, 0, 0 ] ) )

    //         this.texture = texture

    //         if ( src ) {

    //         this.uniforms.hasTexture = 1
    //         this.loadTexture( src )

    //         }

    //     }

    //     loadTexture( src ) {

    //         const gl = this.gl
    //         const texture = this.texture

    //         const textureImage = new Image()

    //         textureImage.onload = () => {

    //         gl.bindTexture( gl.TEXTURE_2D, texture )

    //         gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureImage )

    //         gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR )
    //         gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR )

    //         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    //         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)

    //         // gl.generateMipmap( gl.TEXTURE_2D )

    //         }

    //         textureImage.src = src

    //     }

    //     update() {

    //         const gl = this.gl

    //         const now = performance.now()
    //         const elapsed = ( now - this.time.start ) / 5000
    //         const delta = now - this.time.old
    //         this.time.old = now

    //         this.uniforms.time = elapsed

    //         if ( this.count > 0 ) {
    //         gl.clear( gl.COLORBUFFERBIT )
    //         gl.drawArrays( gl.POINTS, 0, this.count )
    //         }

    //         this.onUpdate( delta )

    //         requestAnimationFrame( this.update )

    //     }

    // }
    

    // const pointSize = 2.5

    // const waves = new ShaderProgram( document.querySelector( '.waves' ), {
    //     texture: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAb1BMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8v0wLRAAAAJHRSTlMAC/goGvDhmwcExrVjWzrm29TRqqSKenRXVklANSIUE8mRkGpv+HOfAAABCElEQVQ4y4VT13LDMAwLrUHteO+R9f/fWMfO6dLaPeKVEECRxOULWsEGpS9nULDwia2Y+ALqUNbAWeg775zv+sA4/FFRMxt8U2FZFCVWjR/YrH4/H9sarclSKdPMWKzb8VsEeHB3m0shkhVCyNzeXeAQ9Xl4opEieX2QCGnwGbj6GMyjw9t1K0fK9YZunPXeAGsfJtYjwzxaBnozGGorYz0ypK2HzQSYx1y8DgSRo2ewOiyh2QWOEk1Y9OrQV0a8TiBM1a8eMHWYnRMy7CZ4t1CmyRkhSUvP3gRXyHOCLBxNoC3IJv//ZrJ/kxxUHPUB+6jJZZHrpg6GOjnqaOmzp4NDR48OLxn/H27SRQ08S0ZJAAAAAElFTkSuQmCC',
    //     uniforms: {
    //         size: { type: 'float', value: pointSize },
    //         field: { type: 'vec3', value: [ 0, 0, 0 ] },
    //         speed: { type: 'float', value: 5 },
    //     },
    //     vertex: `
    //         #define M_PI 3.1415926535897932384626433832795

    //         precision highp float;

    //         attribute vec4 a_position;
    //         attribute vec4 a_color;

    //         uniform float u_time;
    //         uniform float u_size;
    //         uniform float u_speed;
    //         uniform vec3 u_field;
    //         uniform mat4 u_projection;

    //         varying vec4 v_color;

    //         void main() {

    //         vec3 pos = a_position.xyz;

    //         pos.y += (
    //             cos(pos.x / u_field.x * M_PI * 8.0 + u_time * u_speed) +
    //             sin(pos.z / u_field.z * M_PI * 8.0 + u_time * u_speed)
    //         ) * u_field.y;

    //         gl_Position = u_projection * vec4( pos.xyz, a_position.w );
    //         gl_PointSize = ( u_size / gl_Position.w ) * 100.0;

    //         v_color = a_color;

    //         }`,
    //     fragment: `
    //         precision highp float;

    //         uniform sampler2D u_texture;

    //         varying vec4 v_color;

    //         void main() {

    //         gl_FragColor = v_color * texture2D(u_texture, gl_PointCoord);

    //         }`,
    //     onResize( w, h, dpi ) {

    //         const position = [], color = []

    //         const width = 400 * ( w / h )
    //         const depth = 400
    //         const height = 3
    //         const distance = 5

    //         for ( let x = 0; x < width; x += distance ) {
    //         for ( let z = 0; z < depth; z+= distance ) {

    //             position.push( - width / 2 + x, -30, -depth / 2 + z )
    //             // color.push( 0, 1 - ( x / width ) * 1, 0.5 + x / width * 0.5, z / depth )
    //             color.push( 255, 255, 255, 1 )

    //         }
    //         }

    //         this.uniforms.field = [ width, height, depth ]

    //         this.buffers.position = position
    //         this.buffers.color = color

    //         this.uniforms.size = ( h / 400) * pointSize * dpi

    //     },
    // } )
  },
  methods: {
    // 重置
    resetit(){
      this.username = '',
      this.password = ''
    },
    // 登录
    login(){
      var els = document.getElementsByClassName('el-message')
      if (this.password == '') {
        if (els.length === 0) {
          Message.error("请填写完整信息！")
        }
      } else{
        Login(this.password,this.username).then((response) => {
            if (response.data.status == 'success') {
                this.$emit('introduce', {isLogin: true})
                sessionStorage.setItem('islogin', 'islogin')
                this.password = ''
            }
            else if (response.data.status == 'error'){
              if (els.length === 0) {
                Message.error(response.data.msg)
              }
            } 
        })
            .catch((response) => {
                Message.error('系统故障！')
            })
            .then(() => {
            })
      }
    },
    //获取用户名
    getUser(){
      getUserName().then((response) => {
          this.username = response.data.userName
      })
        .catch((response) => {
          Message.error('系统故障！')
        })
        .then(() => {
        })
    },
  },
  beforeDestroy() {
  }
}
</script>

<style lang='scss' scoped>
html,body {
	height:100%;
}
body {
	margin:0;
	background:#000;
}
canvas {
	display:block;
}
.waves {
	position:absolute;
	left:0;
	top:0;
	right:0;
	bottom:0;
  overflow: hidden;
  min-width: 1280px;
  min-height: 625px;
    .aboutUs{
        width: 100%;
        text-align: center;
        position: absolute;
        bottom: 0px;
        h5{
           display: inline-block;
            margin: 0px;
            color: #535D78;
            font-weight: normal;
        }
    }
}
.login{
    width: 100%;
    min-width: 1280px;
    min-height: 625px;
    height: 100%;
    // background:-webkit-gradient(linear, left bottom, left top, from(#003b8d), to(#80c1f5));
    background:#fff;
    position: relative;
    .landai {
        width: 100%;
        min-width: 1280px;
        height: 237px;
        background: rgb(57, 69, 97);
        //opacity: 0.6;
        position: absolute;
        left: 0;
        top: -174px;
        right: 0px;
        bottom: 0px;
        margin: auto;
    }
    .systemName{
        width: 737px;
        letter-spacing: 5px;
        height: 237px;
        color: #FFFFFF;
        font-size: 50px;
        position: absolute;
        left: 6%;
        top: -0%;
        bottom: 0px;
        margin: auto;
        .logo{
          margin-right: 20px;
          margin-top: -20px;
          width: 110px;
          height: 108px;
          float: left;
        }
    }
    .loginBox{
        width: 375px;
        height: 337px;
        background: #fff;
        position: relative;
        position: absolute;
        left: 56%;
        top: -170px;
        right: 0px;
        bottom: 0px;
        margin: auto;
        z-index: 1;
        box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.4);
        border-radius: 5px;
        .title{
          font-weight: 300;
          font-family: "neo";
          font-size: 25px;
          text-align: center;
          color: #535D78;
          font-weight: bold;
        }
        h5{
          font-weight: 300;
          width: 300px;
          height: 30px;
          font-size: 16px;
          background: none;
          border: none;
          border-bottom: 1px solid #dcdfe6;
          color: #535D78;
          text-align: left;
          margin: 0 auto;
          margin-bottom: 53px; 
          input{
            width: 250px;
            height: 30px;
            padding: 10px;
            font-size: 16px;
            box-sizing: border-box;
            outline: 0px;
            border:0px;
            background: rgba(0,0,0,0);
            color:#535D78;
          }
        }
        h6{
          font-style: normal;
          margin-top: 60px;
        }
        .buttons{
          text-align: center;
          button{
            width: 140px;
            font-size: 16px;
            line-height: 35px;
            border:1px solid #dcdfe6;
            background: rgba(0,0,0,0);
            font-family:Microsoft YaHei;
            cursor: pointer;
            color: #535D78;
            &:nth-child(1){
              margin-right: 8px;
            }
            &:nth-child(2){
              margin-left: 8px;
            }
          }
          button:hover{
            border: 0px;
            background: #535D78;
            color: #ffffff;
            font-weight: bold;
          }
        }
    }
}
</style>
<style>
  /* .login ::-webkit-scrollbar {
  width: 5px;
  height: 8px;
  background:rgba(0, 0, 0, 0);
  }
  .login ::-webkit-scrollbar-track {
    background: transparent;
  }
  .login ::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: #6b849eab;
  } */
</style>

