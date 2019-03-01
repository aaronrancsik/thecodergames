/*! For license information please see LICENSES */
(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{170:function(t,e,n){var o=n(5);o(o.S,"Object",{setPrototypeOf:n(85).set})},197:function(t,e,n){"use strict";n.d(e,"b",function(){return l});var o=n(0);n.d(e,"c",function(){return o.default});var r=n(207),c=n.n(r);function l(t){return Object(r.createDecorator)(function(e,n){var o=e.provide;if("function"!=typeof o||!o.managed){var r=e.provide;(o=e.provide=function(){var t=Object.create(("function"==typeof r?r.call(this):r)||null);for(var i in o.managed)t[o.managed[i]]=this[i];return t}).managed={}}o.managed[n]=t||n})}n.d(e,"a",function(){return c.a})},207:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o,r=(o=n(0))&&"object"==typeof o&&"default"in o?o.default:o,c="undefined"!=typeof Reflect&&Reflect.defineMetadata;function l(t,e,n){(n?Reflect.getOwnMetadataKeys(e,n):Reflect.getOwnMetadataKeys(e)).forEach(function(o){var r=n?Reflect.getOwnMetadata(o,e,n):Reflect.getOwnMetadata(o,e);n?Reflect.defineMetadata(o,r,t,n):Reflect.defineMetadata(o,r,t)})}var f={__proto__:[]}instanceof Array;var d=["data","beforeCreate","created","beforeMount","mounted","beforeDestroy","destroyed","beforeUpdate","updated","activated","deactivated","render","errorCaptured"];function h(t,e){void 0===e&&(e={}),e.name=e.name||t._componentTag||t.name;var n=t.prototype;Object.getOwnPropertyNames(n).forEach(function(t){if("constructor"!==t)if(d.indexOf(t)>-1)e[t]=n[t];else{var o=Object.getOwnPropertyDescriptor(n,t);void 0!==o.value?"function"==typeof o.value?(e.methods||(e.methods={}))[t]=o.value:(e.mixins||(e.mixins=[])).push({data:function(){var e;return(e={})[t]=o.value,e}}):(o.get||o.set)&&((e.computed||(e.computed={}))[t]={get:o.get,set:o.set})}}),(e.mixins||(e.mixins=[])).push({data:function(){return function(t,e){var n=e.prototype._init;e.prototype._init=function(){var e=this,n=Object.getOwnPropertyNames(t);if(t.$options.props)for(var o in t.$options.props)t.hasOwnProperty(o)||n.push(o);n.forEach(function(n){"_"!==n.charAt(0)&&Object.defineProperty(e,n,{get:function(){return t[n]},set:function(e){t[n]=e},configurable:!0})})};var data=new e;e.prototype._init=n;var o={};return Object.keys(data).forEach(function(t){void 0!==data[t]&&(o[t]=data[t])}),o}(this,t)}});var o=t.__decorators__;o&&(o.forEach(function(t){return t(e)}),delete t.__decorators__);var h,y,v=Object.getPrototypeOf(t.prototype),I=v instanceof r?v.constructor:r,m=I.extend(e);return function(t,e,n){Object.getOwnPropertyNames(e).forEach(function(o){if("prototype"!==o){var r=Object.getOwnPropertyDescriptor(t,o);if(!r||r.configurable){var c,l,d=Object.getOwnPropertyDescriptor(e,o);if(!f){if("cid"===o)return;var h=Object.getOwnPropertyDescriptor(n,o);if(c=d.value,l=typeof c,null!=c&&("object"===l||"function"===l)&&h&&h.value===d.value)return}0,Object.defineProperty(t,o,d)}}})}(m,t,I),c&&(l(h=m,y=t),Object.getOwnPropertyNames(y.prototype).forEach(function(t){l(h.prototype,y.prototype,t)}),Object.getOwnPropertyNames(y).forEach(function(t){l(h,y,t)})),m}function y(t){return"function"==typeof t?h(t):function(e){return h(e,t)}}y.registerHooks=function(t){d.push.apply(d,t)},e.default=y,e.createDecorator=function(t){return function(e,n,o){var r="function"==typeof e?e:e.constructor;r.__decorators__||(r.__decorators__=[]),"number"!=typeof o&&(o=void 0),r.__decorators__.push(function(e){return t(e,n,o)})}},e.mixins=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return r.extend({mixins:t})}},208:function(t,e,n){var content=n(296);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(29).default)("ed3cf550",content,!0,{sourceMap:!1})},294:function(t,e,n){"use strict";var o,r=n(16),c=(n(170),n(197)),l=(o=function(t,b){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,b){t.__proto__=b}||function(t,b){for(var p in b)b.hasOwnProperty(p)&&(t[p]=b[p])})(t,b)},function(t,b){function e(){this.constructor=t}o(t,b),t.prototype=null===b?Object.create(b):(e.prototype=b.prototype,new e)}),f=function(t,e,n,desc){var o,c=arguments.length,l=c<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(r.a)(Reflect))&&"function"==typeof Reflect.decorate)l=Reflect.decorate(t,e,n,desc);else for(var i=t.length-1;i>=0;i--)(o=t[i])&&(l=(c<3?o(l):c>3?o(e,n,l):o(e,n))||l);return c>3&&l&&Object.defineProperty(e,n,l),l},d=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.downloaded=!1,e}return l(e,t),e.prototype.mounted=function(){var t=this;Promise.all([n.e(7),n.e(8)]).then(n.bind(null,1540)).then(function(e){t.downloaded=!0,t.$nextTick(function(){return e.launch()})})},f([Object(c.b)()],e.prototype,"downloaded",void 0),e=f([c.a],e)}(c.c),h=(n(295),n(15)),component=Object(h.a)(d,function(){var t=this.$createElement,e=this._self._c||t;return e("section",{staticClass:"sec"},[this.downloaded?e("div",{attrs:{id:"gameid"}}):e("div",{staticClass:"placeholder"},[this._v("\n        Downloading...\n    ")])])},[],!1,null,"ebb59308",null);e.a=component.exports},295:function(t,e,n){"use strict";var o=n(208);n.n(o).a},296:function(t,e,n){(t.exports=n(28)(!1)).push([t.i,"#gameid[data-v-ebb59308],.sec[data-v-ebb59308]{height:100%}",""])},297:function(t,e,n){var content=n(653);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(29).default)("5bb9532e",content,!0,{sourceMap:!1})},647:function(t,e,n){"use strict";n(86),n(87);var o,r=n(16),c=(n(170),n(197)),l=n(648),f=n.n(l),d=(o=function(t,b){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,b){t.__proto__=b}||function(t,b){for(var p in b)b.hasOwnProperty(p)&&(t[p]=b[p])})(t,b)},function(t,b){function e(){this.constructor=t}o(t,b),t.prototype=null===b?Object.create(b):(e.prototype=b.prototype,new e)}),h=function(t,e,n,desc){var o,c=arguments.length,l=c<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(r.a)(Reflect))&&"function"==typeof Reflect.decorate)l=Reflect.decorate(t,e,n,desc);else for(var i=t.length-1;i>=0;i--)(o=t[i])&&(l=(c<3?o(l):c>3?o(e,n,l):o(e,n))||l);return c>3&&l&&Object.defineProperty(e,n,l),l},y=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return d(e,t),e.prototype.mounted=function(){var t={scrollbars:!0,media:"/blockly/media/",toolbox:(new DOMParser).parseFromString(f.a.decode(n(650).substring(28).toString()),"text/xml").firstChild,zoom:{controls:!0,wheel:!1,startScale:1,maxScale:6,minScale:.3,scaleSpeed:1.2},collapse:!1,comments:!0,disable:!0,maxBlocks:1/0,horizontalLayout:!1,toolboxPosition:"end",css:!0,rtl:!1,sounds:!1,trashcan:!1,grid:{spacing:20,length:3,colour:"#ccc",snap:!1}};Blockly.HSV_SATURATION=.7,Blockly.HSV_VALUE=.9,Blockly.BlockSvg.START_HAT=!0,Blockly.Blocks.iterations={init:function(){this.appendDummyInput().appendField("Lépések"),this.appendStatementInput("iterationsin").setCheck(null),this.setColour(0),this.setTooltip(""),this.setHelpUrl("")}},Blockly.JavaScript.iterations=function(t){return t.setDeletable(!1),"Iteration(){\n"+Blockly.JavaScript.statementToCode(t,"iterationsin")+"\n};\n"},Blockly.Blocks.stepforward={init:function(){this.appendDummyInput().setAlign(Blockly.ALIGN_RIGHT).appendField("Előre lépés ⬆"),this.setPreviousStatement(!0,null),this.setNextStatement(!0,null),this.setColour(33),this.setTooltip(""),this.setHelpUrl("")}},Blockly.JavaScript.stepforward=function(t){return"StepForward();\n"},Blockly.Blocks.stepback={init:function(){this.appendDummyInput().setAlign(Blockly.ALIGN_RIGHT).appendField("Hátra lépés ⬇"),this.setPreviousStatement(!0,null),this.setNextStatement(!0,null),this.setColour(33),this.setTooltip(""),this.setHelpUrl("")}},Blockly.JavaScript.stepback=function(t){return"StepBack();\n"},Blockly.Blocks.turnright={init:function(){this.appendDummyInput().setAlign(Blockly.ALIGN_RIGHT).appendField("Jobbra fordulás ↩ "),this.setPreviousStatement(!0,null),this.setNextStatement(!0,null),this.setColour(200),this.setTooltip(""),this.setHelpUrl("")}},Blockly.JavaScript.turnright=function(t){return"TurnRight();\n"},Blockly.Blocks.turnleft={init:function(){this.appendDummyInput().setAlign(Blockly.ALIGN_RIGHT).appendField("Balra fordulás ↪"),this.setPreviousStatement(!0,null),this.setNextStatement(!0,null),this.setColour(200),this.setTooltip(""),this.setHelpUrl("")}},Blockly.JavaScript.turnleft=function(t){return"TurnLeft();\n"};var e=this.$refs.blocklyDiv,o=Blockly.inject(e,t),r=(new DOMParser).parseFromString(f.a.decode(n(651).substring(28).toString()),"text/xml").firstChild;Blockly.Xml.domToWorkspace(r,o),o.addChangeListener(function(){Blockly.JavaScript.workspaceToCode(o);var t=Blockly.Xml.workspaceToDom(o);Blockly.Xml.domToPrettyText(t)}),o.toolbox_.flyout_.autoClose=!1,o.scrollbar.setContainerVisible(!1)},e=h([c.a],e)}(c.c),v=(n(652),n(15)),component=Object(v.a)(y,function(){var t=this.$createElement;return(this._self._c||t)("div",{ref:"blocklyDiv",staticClass:"blocklyDiv"})},[],!1,null,null,null);e.a=component.exports},648:function(t,e,n){(function(t,o){var r;!function(c){var l=e,f=(t&&t.exports,"object"==typeof o&&o);f.global!==f&&f.window;var d=function(t){this.message=t};(d.prototype=new Error).name="InvalidCharacterError";var h=function(t){throw new d(t)},y="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",v=/[\t\n\f\r ]/g,I={encode:function(input){input=String(input),/[^\0-\xFF]/.test(input)&&h("The string to be encoded contains characters outside of the Latin1 range.");for(var a,b,t,e,n=input.length%3,output="",o=-1,r=input.length-n;++o<r;)a=input.charCodeAt(o)<<16,b=input.charCodeAt(++o)<<8,t=input.charCodeAt(++o),output+=y.charAt((e=a+b+t)>>18&63)+y.charAt(e>>12&63)+y.charAt(e>>6&63)+y.charAt(63&e);return 2==n?(a=input.charCodeAt(o)<<8,b=input.charCodeAt(++o),output+=y.charAt((e=a+b)>>10)+y.charAt(e>>4&63)+y.charAt(e<<2&63)+"="):1==n&&(e=input.charCodeAt(o),output+=y.charAt(e>>2)+y.charAt(e<<4&63)+"=="),output},decode:function(input){var t=(input=String(input).replace(v,"")).length;t%4==0&&(t=(input=input.replace(/==?$/,"")).length),(t%4==1||/[^+a-zA-Z0-9\/]/.test(input))&&h("Invalid character: the string to be decoded is not correctly encoded.");for(var e,n,o=0,output="",r=-1;++r<t;)n=y.indexOf(input.charAt(r)),e=o%4?64*e+n:n,o++%4&&(output+=String.fromCharCode(255&e>>(-2*o&6)));return output},version:"0.1.0"};void 0===(r=function(){return I}.call(e,n,e,t))||(t.exports=r)}()}).call(this,n(649)(t),n(27))},649:function(t,e){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),t.webpackPolyfill=1),t}},650:function(t,e){t.exports="data:application/xml;base64,PHhtbCBpZD0idG9vbGJveCIgc3R5bGU9ImRpc3BsYXk6IG5vbmUiPg0KPGNhdGVnb3J5IG5hbWU9IkxvZ2ljIiBjb2xvdXI9IiV7QktZX0xPR0lDX0hVRX0iPg0KICAgPGJsb2NrIHR5cGU9InN0ZXBmb3J3YXJkIj48L2Jsb2NrPg0KICAgPGJsb2NrIHR5cGU9InN0ZXBiYWNrIj48L2Jsb2NrPg0KICAgPGJsb2NrIHR5cGU9InR1cm5sZWZ0Ij48L2Jsb2NrPg0KICAgPGJsb2NrIHR5cGU9InR1cm5yaWdodCI+PC9ibG9jaz4NCiAgIDxibG9jayB0eXBlPSJjb250cm9sc19yZXBlYXQiID48L2Jsb2NrPg0KICAgPGJsb2NrIHR5cGU9ImNvbnRyb2xzX2lmIj48L2Jsb2NrPg0KICAgPGJsb2NrIHR5cGU9ImNvbnRyb2xzX2lmIj4NCiAgICAgIDxtdXRhdGlvbiBlbHNlPSIxIj48L211dGF0aW9uPg0KICAgPC9ibG9jaz4NCiAgIDxibG9jayB0eXBlPSJsb2dpY19jb21wYXJlIj48L2Jsb2NrPg0KICAgPGJsb2NrIHR5cGU9ImxvZ2ljX29wZXJhdGlvbiI+PC9ibG9jaz4NCiAgIDxibG9jayB0eXBlPSJsb2dpY19uZWdhdGUiPjwvYmxvY2s+DQogICA8YmxvY2sgdHlwZT0ibG9naWNfYm9vbGVhbiI+PC9ibG9jaz4NCiAgIDxibG9jayB0eXBlPSJsb2dpY19udWxsIj48L2Jsb2NrPg0KICAgPGJsb2NrIHR5cGU9ImxvZ2ljX3Rlcm5hcnkiPjwvYmxvY2s+DQogICA8YmxvY2sgdHlwZT0ibWF0aF9udW1iZXIiPg0KICAgICAgIDxmaWVsZCBuYW1lPSJOVU0iPjEyMzwvZmllbGQ+DQogICA8L2Jsb2NrPg0KICAgPGJsb2NrIHR5cGU9Im1hdGhfYXJpdGhtZXRpYyI+PC9ibG9jaz4NCiAgIDxibG9jayB0eXBlPSJtYXRoX3NpbmdsZSI+PC9ibG9jaz4NCiAgIDxibG9jayB0eXBlPSJtYXRoX3RyaWciPjwvYmxvY2s+DQogICA8YmxvY2sgdHlwZT0ibWF0aF9jb25zdGFudCI+PC9ibG9jaz4NCiAgIDxibG9jayB0eXBlPSJtYXRoX251bWJlcl9wcm9wZXJ0eSI+PC9ibG9jaz4NCiAgIDxibG9jayB0eXBlPSJtYXRoX3JvdW5kIj48L2Jsb2NrPg0KICAgPGJsb2NrIHR5cGU9Im1hdGhfb25fbGlzdCI+PC9ibG9jaz4NCiAgIDxibG9jayB0eXBlPSJtYXRoX21vZHVsbyI+PC9ibG9jaz4NCiAgIDxibG9jayB0eXBlPSJtYXRoX3JhbmRvbV9mbG9hdCI+PC9ibG9jaz4NCiAgIDxibG9jayB0eXBlPSJtYXRoX2F0YW4yIj48L2Jsb2NrPg0KPC9jYXRlZ29yeT4NCjwveG1sPg0K"},651:function(t,e){t.exports="data:application/xml;base64,PHhtbCBpZD0ic3RhcnRCbG9ja3MiIHN0eWxlPSJkaXNwbGF5OiBub25lIj4NCiAgICA8YmxvY2sgdHlwZT0iaXRlcmF0aW9ucyIgIHg9IjIwIiB5PSIyMCI+PC9ibG9jaz4NCjwveG1sPg=="},652:function(t,e,n){"use strict";var o=n(297);n.n(o).a},653:function(t,e,n){(t.exports=n(28)(!1)).push([t.i,".blocklyDiv{height:100%}",""])}}]);