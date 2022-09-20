(()=>{"use strict";const t=document.querySelector("form"),e=document.querySelector(".card"),s=document.querySelector(".details"),a=document.querySelector("img.time"),c=document.querySelector(".icon img"),i=new class{constructor(){this.key="9DTCaL30eScb2kysS7NmwwRL6OnzrChP",this.weatherURI="https://dataservice.accuweather.com/currentconditions/v1/",this.cityURI="https://dataservice.accuweather.com/locations/v1/cities/search"}async updateCity(t){const e=await this.getCity(t);return{cityDets:e,weather:await this.getWeather(e.Key)}}async getCity(t){const e=`?apikey=${this.key}&q=${t}`,s=await fetch(this.cityURI+e);return(await s.json())[0]}async getWeather(t){const e=`${t}?apikey=${this.key}`,s=await fetch(this.weatherURI+e);return(await s.json())[0]}};t.addEventListener("submit",(n=>{n.preventDefault();const r=t.city.value.trim();t.reset(),(async t=>{const e=await i.getCity(t);return{cityDets:e,weather:await i.getWeather(e.Key)}})(r).then((t=>(t=>{const{cityDets:i,weather:n}=t;s.innerHTML=`\n  <div class="text-muted text-uppercase text-center details">\n            <h5 class="my-3">${i.EnglishName}</h5>\n            <div class="my-3">${n.WeatherText}</div>\n            <div class="display-4 my-4">\n              <span>${n.Temperature.Metric.Value}</span>\n              <span>&deg;C</span>\n            </div>\n  `;const r=`img/icons/${n.WeatherIcon}.svg`;c.setAttribute("src",r);let o=n.IsDayTime?"img/day.svg":"img/night.svg";a.setAttribute("src",o),e.classList.contains("d-none")&&e.classList.remove("d-none")})(t))).catch((t=>console.log(t)))}))})();