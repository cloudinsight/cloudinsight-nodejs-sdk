/*!
 * The MIT License (MIT)
 * 
 * Copyright (c) 2016 Cloud Insight
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 */
module.exports=function(e){function t(n){if(r[n])return r[n].exports;var o=r[n]={exports:{},id:n,loaded:!1};return e[n].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var r={};return t.m=e,t.c=r,t.p="",t(0)}([function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.StatsD=void 0;var o=r(1),i=n(o);t.default=i.default,t.StatsD=i.default},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),u=r(3),s=n(u),a=r(2),c=n(a),l=function(){function e(t,r,n){o(this,e),this.host=t||"localhost",this.port=r||8251,this.globalTags=n,this.socket=s.default.createSocket((0,c.default)(process.version))}return i(e,[{key:"close",value:function(){this.socket.close()}},{key:"gauge",value:function(e,t,r,n,o){this._sendMetric(e,"g",t,r,n,o)}},{key:"increment",value:function(e,t,r,n){this._sendMetric(e,"c",1,t,r,n)}},{key:"incrementBy",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,r=arguments[2],n=arguments[3],o=arguments[4];this._sendMetric(e,"c",t,r,n,o)}},{key:"decrement",value:function(e,t,r,n){this._sendMetric(e,"c",-1,t,r,n)}},{key:"decrementBy",value:function(e,t,r,n,o){this._sendMetric(e,"c",t||-1,r,n,o)}},{key:"_sendMetric",value:function(e,t,r,n){var o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1,i=arguments[5];if(o<=0||o>1){var u=new Error("SampleRate should be within ( 0, 1 ]");if(i)return i(u);throw u}if("number"!=typeof r){var s=new Error("Value should be number");if(i)return i(s);throw s}var a=[e,":",r,"|",t];o&&1!==o&&a.push("|@"+o);var c=[];this.globalTags&&Array.isArray(this.globalTags)&&(c=c.concat(this.globalTags)),n&&Array.isArray(n)&&(c=c.concat(n)),c.length>0&&(a.push("|#"),a=a.concat(c.join(",")));var l=new Buffer(a.join("")),f=[l,0,l.length,this.port,this.host];i&&f.push(i),this.socket.send.apply(this.socket,[l,0,l.length,this.port,this.host,i])}}]),e}();t.default=l},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(e){return Number(e.match(/^v(\d+\.\d+)/)[1])<=.11?"udp4":{type:"udp4"}};t.default=r},function(e,t){e.exports=require("dgram")}]);