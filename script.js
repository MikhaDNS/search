function isValidURL(string) {
  let res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  return (res !== null)
};
function rez_sitemap(){
let stringArray = document.getElementById('textarea').value.split('\n')
let address
let url
let url1
let host
let arrayHtml=""
let k=0
for(k;k<stringArray.length; k++){
	address='http://'+stringArray[k]
	if(!isValidURL(address)){
		arrayHtml += '<p><font color="red">Ошибка в адресе: <strong>'+ stringArray[k] + '</strong></font></p>';
		arrayHtml+='<hr>'
		document.getElementById("work_area").style.display='inline-block';
		document.getElementById("work_area").innerHTML=arrayHtml
	}else{
		url = new URL(address)
		host = url.hostname
		url1 = new URL(address)
		url1 = 'https://cors-anywhere.herokuapp.com/' + url
		if(url.pathname=="/"){
			 url = url1 +'sitemap.xml'
		}else{
			url = url1
		}
			const xml = new window.XMLHttpRequest()
	        alert(url)
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
let k=0
for(k;k<stringArray.length; k++){
	if(!isValidURL(stringArray[k])){
		arrayHtml += '<p><font color="red">Ошибка в адресе: <strong>'+ stringArray[k] + '</strong></font></p>';
		arrayHtml+='<hr>'
		document.getElementById("work_area").innerHTML=arrayHtml
	}else{
		let url = new URL(stringArray[k])
		let host = url.hostname
		let url1 = new URL(stringArray[k])
		let urlsave = new URL(stringArray[k])
		urlsave=url + 'robots.txt'
		url1 = 'https://cors-anywhere.herokuapp.com/' + url + 'robots.txt'
		url = url1
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
			}

		}
		document.getElementById("three").innerHTML="Ждите.."
		document.getElementById("three").style.background = "red";

	}

}

}
