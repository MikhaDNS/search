"use strict";
function isValidURL(string) {
  let res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  return (res !== null)
};
function isValidhttp(string) {
  let res = string.match(/(http(s)?:)/g);
  return (res !== null)
};
function isValidxml(string) {
  let res = string.match(/\.xml/g);
  return (res !== null)
};
function isValidfile(string) {
  let res = string.match(/(\.\w*)$/g);
  return (res !== null)
};
function isValidfileimage(string) {
  let res = string.match(/(?:\.|=)(?:jpg|jpeg|png|bmp|ico|gif|tif|tiff)/g);
  return (res !== null)
};
function isValidfilesitemap(string) {
  let res = string.match(/([Ss]itemap: ).*/g);
  return (res)
};
function rez_sitemap(){
let stringArray = document.getElementById('textarea').value.split('\n')
let address
let arrayHtml=""
let k=0
for(k;k<stringArray.length; k++){
	if(isValidhttp(stringArray[k])){
          address=stringArray[k]
	   }else{
	address='http://'+stringArray[k]
	   }
	if(!isValidURL(address)){
		arrayHtml += '<p><font color="red">Ошибка в адресе: <strong>'+ stringArray[k] + '</strong></font></p>';
		arrayHtml+='<hr>'
		document.getElementById("work_area").style.display='inline-block';
		document.getElementById("work_area").innerHTML=arrayHtml
	}else{
		let url = new URL(address)
		let host = url.hostname
		let url1 = new URL(address)
		url1 = 'https://cors-anywhere.herokuapp.com/' + url
		if(url.pathname=="/"){
			 url = url1 +'sitemap.xml'
		}else{
			url = url1
		}
			const xml = new window.XMLHttpRequest()
		xml.open("GET", url, true)
		xml.send();
		xml.onreadystatechange = function() { // (3)
		  if (xml.readyState != 4) return;

			document.getElementById("work_area").style.display='inline-block';
			document.getElementById("one").innerHTML="Искать все ссылки"
			document.getElementById("one").style.background = "#2b995b";

		  if (xml.status != 200) {
			arrayHtml += '<p><font color="red">Не удалось установить соединение: <strong>'+ host + '</strong></font></p>';
			arrayHtml+='<hr>'
			document.getElementById("work_area").innerHTML=arrayHtml
		  } else {
			let parser = new DOMParser()
			let xml1 = parser.parseFromString(xml.response, 'application/xml')

			let urls = Array.from(xml1.querySelectorAll('loc')).map(x => x.textContent)
			if(urls==null){
				arrayHtml += '<p><font color="red">Адрес №'+k+' <strong>Нет файла sitemap.xml</strong></font></p>';
				arrayHtml+='<hr>'
			document.getElementById("work_area").innerHTML=arrayHtml
			}else{
				arrayHtml += '<h1> '+host +'</h1>';
				for (var i=0; i<urls.length; i++) {
				  let element = urls[i]
					arrayHtml += '<a target="_blank" href="' + element + '" >'+ element + '</a><br>'
				}
				arrayHtml+='<hr>'
				document.getElementById("work_area").innerHTML=arrayHtml
			}
			}

		}
		document.getElementById("one").innerHTML="Ждите.."
		document.getElementById("one").style.background = "red";

	}

}

}

function rez_random(){
let stringArray = document.getElementById('textarea').value.split('\n');
let arrayHtml="";
let element=[];
let address
let index=0
let k=0
for(k;k<stringArray.length; k++){
	if(isValidhttp(stringArray[k])){
          address=stringArray[k]
	   }else{
	address='http://'+stringArray[k]
	   }
	if(!isValidURL(stringArray[k])){
		arrayHtml += '<p><font color="red">Адрес №'+k+' Ошибка в адресе: <strong>'+ stringArray[k] + '</strong></font></p>';
		arrayHtml+='<hr>'
		document.getElementById("rnd_area").style.display='inline-block';
		document.getElementById("rnd_area").innerHTML=arrayHtml
	}else{
		let url = new URL(address)
		let host = url.hostname
		let url1 = new URL(address)
		url1 = 'https://cors-anywhere.herokuapp.com/' + url
		if(url.pathname=="/"){
			 url = url1 +'sitemap.xml'
		}else{
			url = url1
		}
		const xml = new window.XMLHttpRequest()
		xml.open("GET", url, true)
		xml.send();
		xml.onreadystatechange = function() { // (3)
		  if (xml.readyState != 4) return;
		document.getElementById("rnd_area").style.display='inline-block';
		document.getElementById("two").innerHTML="Случайная ссылка"
		document.getElementById("two").style.background = "#2b995b";

		  if (xml.status == 200) {
				let parser = new DOMParser()
				let xml1 = parser.parseFromString(xml.response, 'application/xml')
				let urls = Array.from(xml1.querySelectorAll('loc')).map(x => x.textContent)
				if(urls!=null){
					for (var i=0; i<urls.length; i++) {
					  element[index] = urls[i]
					  index++
					}
	
				}
				if (index>0){
					let randval = Math.floor(Math.random() * index)	
					document.getElementById("rnd_area").innerHTML ='<a target="_blank" href="' + element[randval] + '" ><h1> '+element[randval]+'</h1></a>';
				}
		  }

		}
		document.getElementById("two").innerHTML="Ждите.."
		document.getElementById("two").style.background = "red";
	}

}
}

function rez_robots(){
let stringArray = document.getElementById('textarea').value.split('\n');
let arrayHtml="";
let address
let k=0
for(k;k<stringArray.length; k++){
	if(isValidhttp(stringArray[k])){
          address=stringArray[k]
	   }else{
	address='http://'+stringArray[k]
	   }
	if(!isValidURL(stringArray[k])){
		arrayHtml += '<p><font color="red">Ошибка в адресе: <strong>'+ stringArray[k] + '</strong></font></p>';
		arrayHtml+='<hr>'
		document.getElementById("work_area").innerHTML=arrayHtml
	}else{
		let url = new URL(address)
		let host = url.hostname
		let urlsave = new URL(address)
		urlsave=url + 'robots.txt'
		url = 'https://cors-anywhere.herokuapp.com/' + url  + 'robots.txt'
		const xml = new window.XMLHttpRequest()
		xml.open("GET", url, true)
		xml.send();
		xml.onreadystatechange = function() { // (3)
		  if (xml.readyState != 4) return;

			document.getElementById("work_area").style.display='inline-block';
			document.getElementById("three").innerHTML="Искать robots"
			document.getElementById("three").style.background = "#2b995b";

		  if (xml.status != 200) {
			arrayHtml += '<p><font color="red">Не удалось установить соединение: <strong>'+ host + '</strong></font></p>';
			arrayHtml+='<hr>'
			document.getElementById("work_area").innerHTML=arrayHtml
		  } else {
			arrayHtml += '<a target="_blank" href="' + urlsave + '" >'+ urlsave + '</a><br>'
			arrayHtml+='<hr>'
			document.getElementById("work_area").innerHTML=arrayHtml
			document.getElementById('textarea').value+='\n'
			document.getElementById('textarea').value+=isValidfilesitemap(xml.response).join('\n')
			}

		}
		document.getElementById("three").innerHTML="Ждите.."
		document.getElementById("three").style.background = "red";

	}

}

}

let errorlink=0

let count=0;

let addrnew=[]

function rez_func2(stringArray,breakp){
let address
	if(isValidhttp(stringArray)){
          address=stringArray
	   }else{
	address='http://'+stringArray
	   }
	if(isValidURL(address)){
		let url = new URL(address)
		let host = url.hostname
		let url1 = new URL(address)
		url1 = 'https://cors-anywhere.herokuapp.com/' + url
		url = url1
		const xml = new window.XMLHttpRequest()
		xml.open("GET", url, true)
		xml.send();
		xml.onreadystatechange = function() {
		// (3)
		  if (xml.readyState != 4) return;
		  if (xml.status == 200) {
			  count++
			let parser = new DOMParser()
			let xml1 = parser.parseFromString(xml.response, 'application/xml')

			let urls = Array.from(xml1.querySelectorAll('loc')).map(x => x.textContent)
			if(urls!=null){
				for (var i=0; i<urls.length; i++) {
				  let element = urls[i]
				  if(!isValidxml(element)){
					addrnew.push(element)
				  }else{
					  errorlink++
				  }
				}
				
			
			}
					if(count==breakp){
						count=0
						document.getElementById("neww").innerHTML="Все ссылки в корнях сайта"
						document.getElementById("neww").style.background = "#2b995b";
					}

			}

		}
		document.getElementById("neww").innerHTML="Ждите.."
		document.getElementById("neww").style.background = "red";
	}
}

function rez_func(){
 addrnew=[]
let stringArray = document.getElementById('textarea').value.split('\n')
let address
let k=0
count=0
errorlink=0
for(k;k<stringArray.length; k++){
	if(isValidhttp(stringArray[k])){
          address=stringArray[k]
	   }else{
	address='http://'+stringArray[k]
	   }
	if(isValidURL(address)){
		let url = new URL(address)
		let host = url.hostname
		let url1 = new URL(address)
		url1 = 'https://cors-anywhere.herokuapp.com/' + url
		if(url.pathname=="/"){
			 url = url1 +'sitemap.xml'
		}else{
			url = url1
		}
		const xml = new window.XMLHttpRequest()
		xml.open("GET", url, true)
		xml.send();
		xml.onreadystatechange = function() { // (3)
		  if (xml.readyState != 4) return;

			document.getElementById("neww").innerHTML="Все ссылки в корнях сайта"
			document.getElementById("neww").style.background = "#2b995b";
		  if (xml.status == 200) {
			addrnew.push('http://'+host)
			let parser = new DOMParser()
			let xml1 = parser.parseFromString(xml.response, 'application/xml')

			let urls = Array.from(xml1.querySelectorAll('loc')).map(x => x.textContent)
			if(urls!=null){
				for (var i=0; i<urls.length; i++) {
				  let element = urls[i]
						if(isValidxml(element)){
							  rez_func2(element,urls.length)
							 	
						}else{
							addrnew.push(element)
						}
				}
			}
			}

		}
		document.getElementById("neww").innerHTML="Ждите.."
		document.getElementById("neww").style.background = "red";

	}


}	
}

function rez_file(){
	let visio=[]
		document.getElementById("work_area").style.display='inline-block';
		for(let i=0; i<addrnew.length; i++){
			if(isValidfile(addrnew[i])){
				visio.push('<a target="_blank" href="' + addrnew[i] + '" >'+addrnew[i]+'</a><br>')
			}
		}
		if(visio.length==0){
			visio.push('Нет ссылок на файлы!')
		}
		document.getElementById("work_area").innerHTML=visio.join('')
}

function rez_fileimage(){
	let visio=[]
		document.getElementById("work_area").style.display='inline-block';
		for(let i=0; i<addrnew.length; i++){
			if(isValidfileimage(addrnew[i])){
				visio.push('<a target="_blank" href="' + addrnew[i] + '" >'+addrnew[i]+'</a><br>')
			}
		}
		if(visio.length==0){
			visio.push('Нет ссылок на файлы изображений!')
		}
		document.getElementById("work_area").innerHTML=visio.join('')
}


function rez_visual(){
	alert('Колличество не проиндексированных: '+errorlink)
	let visio=[]
		document.getElementById("work_area").style.display='inline-block';
		for(let i=0; i<addrnew.length; i++){
			visio.push('<a target="_blank" href="' + addrnew[i] + '" >'+addrnew[i]+'</a><br>')
		}
		document.getElementById("work_area").innerHTML=visio.join('')
}
function rez_imgout(){
	let visio=[]
		document.getElementById("work_area").style.display='inline-block';
		for(let i=0; i<addrnew.length; i++){
				if(isValidfileimage(addrnew[i])){
					visio.push('<a href="'+addrnew[i]+'" target="_blank"><img src="'+addrnew[i]+'"></a>')
				}
		}
		if(visio.length==0){
			visio.push('Нет ссылок на файлы изображений!')
		}
		document.getElementById("work_area").innerHTML=visio.join('')
}

function rez_randall(){
let randval = Math.floor(Math.random() * addrnew.length)	
	if(addrnew.length==0){
		alert('Нет доступных ссылок')
	}else{
	if(!isValidURL(addrnew[randval])){
		alert('error')
	}else{
		let url = new URL(addrnew[randval])
		let host = url.hostname
		let url1 = new URL(addrnew[randval])
		url1 = 'https://cors-anywhere.herokuapp.com/' + url
		url=url1
		const xml = new window.XMLHttpRequest()
		xml.open("GET", url, true)
		xml.send();
		xml.onreadystatechange = function() { // (3)
		  if (xml.readyState != 4) return;
			document.getElementById("rnd").innerHTML="Случайная ссылка с корнями"
			document.getElementById("rnd").style.background = "#2b995b";
		  if (xml.status == 200){
			 let parser = new DOMParser()
			let xml1 = parser.parseFromString(xml.responseText, 'text/html')
			let finded = xml1.querySelector('title').innerHTML
			document.getElementById("rnd_area").style.display='inline-block';
			document.getElementById("rnd_area").innerHTML ='<a target="_blank" href="' + addrnew[randval] + '" ><h1> '+finded+'</h1></a>';
			}else{
				alert('Ошибка подключения')
			}

		}
		document.getElementById("rnd").innerHTML="Ждите.."
		document.getElementById("rnd").style.background = "red";

	}
	}

}
