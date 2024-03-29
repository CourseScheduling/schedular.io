/**
 * Version: 0.1.0
 * Author: Joseph Thomas
 */
(function(e){var g={},f=[{listener:null,exceptions:[]}],h=Node.prototype.addEventListener,k=Node.prototype.removeEventListener;Object.defineProperty(Node.prototype,"onoutclick",{set:function(c){f[0]={exceptions:[this],listener:c&&c.bind(this)};return c}});e.Node.prototype.addEventListener=function(c,a,d){if("outclick"==c){for(var b;g[b=(1E5*Math.random()).toString()];);g[b]=a;d=d||[];d.push(this);f.push({exceptions:d,listener:a&&a.bind(this),id:b});return b}h.apply(this,arguments)};e.document.addEventListener("click",
function(c){for(var a=f.length;a--;){for(var d=f[a],b=!1,e=d.exceptions.length;e--;)if(d.exceptions[e].contains(c.target)){b=!0;break}b||d.listener&&d.listener(c)}});e.Node.prototype.removeEventListener=function(c,a){if("outclick"==c){var d=-1;if("function"==typeof a)for(b in g){if(a.toString()==g[b].toString()){d=b;break}}else d=a;for(var b=f.length;b--;)if(f[b].id==d){f.splice(b,1);break}}else k.apply(this,arguments)};e=document.querySelectorAll("[outclick]");[].forEach.call(e,function(c){var a=
c.getAttribute("outclick"),a=Function(a);f.push({listener:a,exceptions:[c]})})})(window);



menuDrop.onclick = function () {
  navbar__menu.style.display = 'block'
}

navbar__menu.addEventListener('outclick', function () {
  navbar__menu.style.display = 'none'
}, [menuDrop])