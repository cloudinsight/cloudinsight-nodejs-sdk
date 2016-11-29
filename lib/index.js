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
module.exports=function(t){function e(o){if(r[o])return r[o].exports;var n=r[o]={exports:{},id:o,loaded:!1};return t[o].call(n.exports,n,n.exports,e),n.loaded=!0,n.exports}var r={};return e.m=t,e.c=r,e.p="",e(0)}([function(t,e,r){"use strict";var o=r(1);e.StatsD=o},function(t,e,r){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}function n(t,e,r){this.host=t||"localhost",this.port=e||8251,this.globalTags=r,this.socket=i.default.createSocket((0,u.default)(process.version))}var s=r(3),i=o(s),c=r(2),u=o(c);n.prototype.gauge=function(t,e,r,o,n){this._sendMetric(t,"g",e,r,o||1,n)},n.prototype.increment=function(t,e,r,o){this._sendMetric(t,"c",1,e,r||1,o)},n.prototype.decrement=function(t,e,r,o){this._sendMetric(t,"c",-1,e,r||1,o)},n.prototype.incrementBy=function(t,e,r,o,n){this._sendMetric(t,"c",e||1,r,o||1,n)},n.prototype.decrementBy=function(t,e,r,o,n){this._sendMetric(t,"c",e||-1,r,o||1,n)},n.prototype.close=function(){this.socket.close()},n.prototype._sendMetric=function(t,e,r,o,n,s){if(n<=0||n>1){var i=new Error("SampleRate should be within ( 0, 1 ]");if(s)return s(i);throw i}if("number"!=typeof r){var c=new Error("Value should be number");if(s)return s(c);throw c}var u=[t,":",r,"|",e];n&&1!==n&&u.push("|@"+n);var a=[];this.globalTags&&Array.isArray(this.globalTags)&&(a=a.concat(this.globalTags)),o&&Array.isArray(o)&&(a=a.concat(o)),a.length>0&&(u.push("|#"),u=u.concat(a.join(",")));var p=new Buffer(u.join("")),h=[p,0,p.length,this.port,this.host];s&&h.push(s),this.socket.send.apply(this.socket,[p,0,p.length,this.port,this.host,s])},t.exports=n},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(t){return Number(t.match(/^v(\d+\.\d+)/)[1])<=.11?"udp4":{type:"udp4"}};e.default=r},function(t,e){t.exports=require("dgram")}]);