function isValidURL(string) {
  let res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  return (res !== null)
};

function rez_sitemap(){
document.getElementById("one").innerHTML="Ждите.."
document.getElementById("one").style.background = "red";
let stringArray = document.getElementById('textarea').value.split('\n');
let arrayHtml="";
let k=0
for(k;k<stringArray.length; k++){
	if(!isValidURL(stringArray[k])){
		arrayHtml += '<p><font color="red">Адрес №'+k+' Ошибка в адресе: <strong>'+ stringArray[k] + '</strong></font></p>';
		arrayHtml+='<hr>'
		document.getElementById("work_area").innerHTML=arrayHtml
	}else{
		let url = new URL(stringArray[k])
		let host = url.hostname
		let url1 = new URL(stringArray[k])
		let url2 = new URL(stringArray[k])
		url1 = 'https://cors-anywhere.herokuapp.com/' + url
		if(url.pathname=="/"){
			 url2 = url1 +'sitemap.xml'
			 url=url2
		}else{
			url = url1
		}
		let error=0;
		const xml = new window.XMLHttpRequest()
		xml.open("GET", url, false)

		try{
			xml.send(null);
		}catch(e){
			alert(e)
			arrayHtml += '<p><font color="red">Адрес №'+k+' Не удалось установить соединение: <strong>'+ host + '</strong></font></p>';
			arrayHtml+='<hr>'
			document.getElementById("work_area").innerHTML=arrayHtml
			error=1;
		}
		if(error==0){
			let parser = new DOMParser()
			let xml1 = parser.parseFromString(xml.response, 'application/xml')

			let urls = Array.from(xml1.querySelectorAll('loc')).map(x => x.textContent)
			if(urls==null){
				arrayHtml += '<p><font color="red">Адрес №'+k+' <strong>Нет файла sitemap.xml</strong></font></p>';
				arrayHtml+='<hr>'
			document.getElementById("work_area").innerHTML=arrayHtml
			}else{
				arrayHtml += '<p>Адрес №'+k+'</p><h1> '+host +'</h1>';
				for (var i=0; i<urls.length; i++) {
				  let element = urls[i]
					arrayHtml += '<a target="_blanc" href="' + element + '" >'+ element + '</a><br>'
				}
				arrayHtml+='<hr>'
				document.getElementById("work_area").innerHTML=arrayHtml
			}
		}
		}

}
document.getElementById("work_area").style.display='inline-block';
document.getElementById("work_area").innerHTML +='<h1>Поиск завершен!</h1>';
document.getElementById("one").innerHTML="Искать все ссылки"
document.getElementById("one").style.background = "#2b995b";
}



function rez_random(){
	document.getElementById("two").innerHTML="Ждите.."
document.getElementById("two").style.background = "red";
let stringArray = document.getElementById('textarea').value.split('\n');
let arrayHtml="";
let element=[];
let index=0
let k=0
for(k;k<stringArray.length; k++){
	if(!isValidURL(stringArray[k])){
		arrayHtml += '<p><font color="red">Адрес №'+k+' Ошибка в адресе: <strong>'+ stringArray[k] + '</strong></font></p>';
		document.getElementById("rnd_area").innerHTML=arrayHtml
	}else{
		let url = new URL(stringArray[k])
		let host = url.hostname
		let url1 = new URL(stringArray[k])
		let url2 = new URL(stringArray[k])
		url1 = 'https://cors-anywhere.herokuapp.com/' + url
		if(url.pathname=="/"){
			 url2 = url1 +'sitemap.xml'
			 url=url2
		}else{
			url = url1
		}
		let error=0;
		const xml = new window.XMLHttpRequest()
		xml.open("GET", url, false)

		try{
			xml.send(null);
		}catch(e){
			arrayHtml += '<p><font color="red">Адрес №'+k+' Не удалось установить соединение: <strong>'+ host + '</strong></font></p>';
			document.getElementById("rnd_area").innerHTML=arrayHtml
			error=1;
		}
		if(error==0){
						let parser = new DOMParser()
			let xml1 = parser.parseFromString(xml.response, 'application/xml')

			let urls = Array.from(xml1.querySelectorAll('loc')).map(x => x.textContent)
			if(urls==null){
				arrayHtml += '<p><font color="red">Адрес №'+k+' <strong>Нет файла sitemap.xml</strong></font></p>';
			document.getElementById("rnd_area").innerHTML=arrayHtml
			}else{
				for (var i=0; i<urls.length; i++) {
				  element[index] = urls[i]
				  index++
				}
			}
		}
		}

}
if (index>0){
	let randval = Math.floor(Math.random() * index)
	document.getElementById("rnd_area").innerHTML ='<a target="_blanc" href="' + element[randval] + '" ><h1> Случайная ссылка!</h1></a>';
}else{
	alert('Нет доступных ссылок!')
}
document.getElementById("rnd_area").style.display='inline-block';
document.getElementById("two").innerHTML="Случайная ссылка"
document.getElementById("two").style.background = "#2b995b";
}
