'use strict';
(function(){
  var data=[];
  var meta={};
  var page=1;
  var pageSize=18;
  var favorites=new Set(JSON.parse(localStorage.getItem('pi_favorites')||'[]'));
  var checklist=JSON.parse(localStorage.getItem('pi_checklist')||'{}');
  var currentLang=localStorage.getItem('pi_lang')||'pt';
  var categories={todos:'Todas as necessidades',saude:'Saúde',assistencia:'Assistência social',acolhimento:'Acolhimento',trabalho:'Trabalho',alimentacao:'Alimentação',outros:'Outros'};
  var steps=[
    {id:'regularizacao',icon:'🛂',title:'Regularização migratória',text:'Consulte a Polícia Federal ou apoio jurídico gratuito.',category:'outros'},
    {id:'cpf',icon:'🪪',title:'CPF',text:'Veja como solicitar ou regularizar seu CPF.',category:'outros'},
    {id:'acolhimento',icon:'🏠',title:'Emergência e acolhimento',text:'Procure proteção, abrigo e alimentação segura.',category:'acolhimento'},
    {id:'saude',icon:'🏥',title:'Saúde e Cartão SUS',text:'Encontre atendimento de saúde. Em urgência, ligue 192.',category:'saude'},
    {id:'assistencia',icon:'🤝',title:'Assistência social',text:'Localize CRAS, CREAS, Centro POP e orientação social.',category:'assistencia'},
    {id:'integracao',icon:'🌱',title:'Trabalho, escola e integração',text:'Busque emprego, qualificação e caminhos para estudar.',category:'trabalho'}
  ];
  var translations={
    pt:{free:'Gratuito • sem cadastro • sem intermediários',heroTitle:'Encontre orientação para seus primeiros passos no Brasil',heroText:'Regularização, CPF, saúde, assistência, acolhimento, trabalho e educação em uma jornada simples.',findService:'Encontrar um serviço',seeSteps:'Ver os 6 passos',safetyTitle:'Sua segurança vem primeiro',safetyText:'O portal não cobra, não pede documentos e não substitui órgãos públicos. Nunca pague a terceiros por uma orientação daqui.',stepsTitle:'Seus 6 primeiros passos',searchTitle:'Encontre serviços perto de você'},
    es:{free:'Gratis • sin registro • sin intermediarios',heroTitle:'Encuentre orientación para sus primeros pasos en Brasil',heroText:'Regularización, CPF, salud, asistencia, acogida, trabajo y educación en un recorrido sencillo.',findService:'Encontrar un servicio',seeSteps:'Ver los 6 pasos',safetyTitle:'Su seguridad es lo primero',safetyText:'El portal no cobra, no solicita documentos y no sustituye a organismos públicos. Nunca pague a terceros por esta orientación.',stepsTitle:'Sus 6 primeros pasos',searchTitle:'Encuentre servicios cerca de usted'},
    en:{free:'Free • no registration • no intermediaries',heroTitle:'Find guidance for your first steps in Brazil',heroText:'Migration status, CPF, healthcare, social support, shelter, work and education in one simple journey.',findService:'Find a service',seeSteps:'See the 6 steps',safetyTitle:'Your safety comes first',safetyText:'This portal does not charge fees, request documents or replace public authorities. Never pay third parties for this guidance.',stepsTitle:'Your first 6 steps',searchTitle:'Find services near you'}
  };
  var $=function(id){return document.getElementById(id)};
  var escapeHTML=function(value){return String(value==null?'':value).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})};
  var normalize=function(value){return String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase()};
  function showToast(text){var el=$('toast');el.textContent=text;el.classList.add('show');window.clearTimeout(showToast.timer);showToast.timer=window.setTimeout(function(){el.classList.remove('show')},2200)}
  function setLanguage(lang){currentLang=translations[lang]?lang:'pt';localStorage.setItem('pi_lang',currentLang);document.documentElement.lang=currentLang==='pt'?'pt-BR':currentLang;document.querySelectorAll('[data-i18n]').forEach(function(el){var key=el.dataset.i18n;if(translations[currentLang][key])el.textContent=translations[currentLang][key]});document.querySelectorAll('[data-lang]').forEach(function(btn){var active=btn.dataset.lang===currentLang;btn.classList.toggle('active',active);btn.setAttribute('aria-pressed',String(active))})}
  function renderSteps(){var grid=$('stepsGrid');grid.innerHTML=steps.map(function(step,index){var done=!!checklist[step.id];return '<article class="step '+(done?'done':'')+'"><div class="step-top"><span class="step-number">'+(index+1)+'</span><span class="step-icon" aria-hidden="true">'+step.icon+'</span></div><h3>'+escapeHTML(step.title)+'</h3><p>'+escapeHTML(step.text)+'</p><label><input type="checkbox" data-step="'+step.id+'" '+(done?'checked':'')+'> '+(done?'Concluído':'Marcar como feito')+'</label><button class="text-button" type="button" data-step-category="'+step.category+'">Ver serviços</button></article>'}).join('');grid.querySelectorAll('[data-step]').forEach(function(input){input.addEventListener('change',function(){checklist[input.dataset.step]=input.checked;localStorage.setItem('pi_checklist',JSON.stringify(checklist));renderSteps();showToast(input.checked?'Passo concluído.':'Passo reaberto.')})});grid.querySelectorAll('[data-step-category]').forEach(function(btn){btn.addEventListener('click',function(){if(btn.dataset.stepCategory==='outros'){document.getElementById('oficiais').scrollIntoView({behavior:'smooth'});return}$('category').value=btn.dataset.stepCategory;page=1;renderServices();$('busca').scrollIntoView({behavior:'smooth'})})})}
  function uniqueSorted(list){return Array.from(new Set(list.filter(Boolean))).sort(function(a,b){return a.localeCompare(b,'pt-BR')})}
  function option(value,label){return '<option value="'+escapeHTML(value)+'">'+escapeHTML(label)+'</option>'}
  function populateCategories(){var html='';Object.keys(categories).forEach(function(key){html+=option(key==='todos'?'':key,categories[key])});$('category').innerHTML=html}
  function populateRegions(){var previous=$('region').value;$('region').innerHTML=option('','Todas')+uniqueSorted(data.map(function(s){return s.region})).map(function(v){return option(v,v)}).join('');$('region').value=previous}
  function populateStates(){var region=$('region').value;var previous=$('state').value;var list=data.filter(function(s){return !region||s.region===region}).map(function(s){return s.state});$('state').innerHTML=option('','Todos')+uniqueSorted(list).map(function(v){return option(v,v)}).join('');if(Array.from($('state').options).some(function(o){return o.value===previous}))$('state').value=previous;else $('state').value=''}
  function populateCities(){var region=$('region').value;var state=$('state').value;var previous=$('city').value;var list=data.filter(function(s){return (!region||s.region===region)&&(!state||s.state===state)}).map(function(s){return s.city});$('city').innerHTML=option('','Todas')+uniqueSorted(list).map(function(v){return option(v,v)}).join('');if(Array.from($('city').options).some(function(o){return o.value===previous}))$('city').value=previous;else $('city').value=''}
  function documentsFor(category){return {saude:'Se tiver: documento de identificação, CPF ou Cartão SUS. A falta desses documentos não deve impedir acolhimento inicial.',assistencia:'Se tiver: documento pessoal, CPF e comprovante de residência. Confirme exigências com a unidade.',acolhimento:'Leve os documentos que possuir. Em risco imediato, priorize sua segurança.',trabalho:'Se tiver: CPF, identificação e Carteira de Trabalho Digital.',alimentacao:'Confirme antes se há cadastro, encaminhamento ou documento exigido.'}[category]||'Confirme no canal oficial quais documentos são necessários.'}
  function filtered(){var q=normalize($('query').value);var region=$('region').value;var state=$('state').value;var city=$('city').value;var category=$('category').value;return data.filter(function(s){var hay=normalize([s.name,s.category,s.region,s.state,s.city,s.address].join(' '));return (!q||hay.indexOf(q)>=0)&&(!region||s.region===region)&&(!state||s.state===state)&&(!city||s.city===city)&&(!category||s.category===category)}).sort(function(a,b){var official=Number(Boolean(b.sourceRegistered))-Number(Boolean(a.sourceRegistered));var pa={Urgente:0,Alta:1,'Média':2,Baixa:3};return official||(pa[a.priority]-pa[b.priority])||a.name.localeCompare(b.name,'pt-BR')})}
  function card(s){
    var canRoute=s.addressSpecific&&s.map;
    var dial=s.contactConfirmed?(s.phone.match(/\+?\d[\d\s().-]{2,}/)||[s.phone])[0].replace(/[^0-9+]/g,''):'';
    var phone=s.contactConfirmed?'<a href="tel:'+escapeHTML(dial)+'">Ligar</a>':'';
    var route=canRoute?'<a class="route" href="'+escapeHTML(s.map)+'" target="_blank" rel="noopener noreferrer">Abrir rota</a>':'';
    var source=s.sourceUrl?'<a href="'+escapeHTML(s.sourceUrl)+'" target="_blank" rel="noopener noreferrer">Fonte oficial</a>':'';
    var saved=favorites.has(s.id);
    var reasons=s.reasons.length?s.reasons.join(' • '):'Dados básicos disponíveis';
    var verified=s.verified?' • conferido em '+escapeHTML(s.verified):'';
    return '<article class="service-card"><header><div><h3>'+escapeHTML(s.name)+'</h3><div class="location">'+escapeHTML(s.city)+' • '+escapeHTML(s.state)+'</div></div><span class="tag">'+escapeHTML(categories[s.category]||s.category)+'</span></header><div class="warning"><b>Confirme antes de ir.</b> '+escapeHTML(reasons)+'.</div><dl class="meta"><div><dt>Endereço</dt><dd>'+escapeHTML(s.address||'Não confirmado')+'</dd></div><div><dt>Telefone</dt><dd>'+escapeHTML(s.phoneLabel)+'</dd></div><div><dt>Horário</dt><dd>'+escapeHTML(s.hours)+'</dd></div><div><dt>O que levar</dt><dd>'+escapeHTML(documentsFor(s.category))+'</dd></div></dl><div class="service-actions">'+phone+route+source+'<button type="button" data-favorite="'+escapeHTML(s.id)+'" class="'+(saved?'saved':'')+'">'+(saved?'Salvo':'Salvar')+'</button></div><div class="service-note">Registro da base informativa • prioridade de revisão: '+escapeHTML(s.priority)+verified+' • confirme antes do deslocamento</div></article>';
  }
  function renderPagination(total){var pages=Math.ceil(total/pageSize);if(pages<=1){$('pagination').innerHTML='';return}var start=Math.max(1,page-2);var end=Math.min(pages,start+4);start=Math.max(1,end-4);var html='';if(page>1)html+='<button type="button" data-page="'+(page-1)+'" aria-label="Página anterior">‹</button>';for(var p=start;p<=end;p++)html+='<button type="button" data-page="'+p+'" class="'+(p===page?'active':'')+'" aria-current="'+(p===page?'page':'false')+'">'+p+'</button>';if(page<pages)html+='<button type="button" data-page="'+(page+1)+'" aria-label="Próxima página">›</button>';$('pagination').innerHTML=html;$('pagination').querySelectorAll('[data-page]').forEach(function(btn){btn.addEventListener('click',function(){page=Number(btn.dataset.page);renderServices();$('busca').scrollIntoView({behavior:'smooth'})})})}
  function renderServices(){var list=filtered();var pages=Math.max(1,Math.ceil(list.length/pageSize));if(page>pages)page=1;var shown=list.slice((page-1)*pageSize,page*pageSize);$('resultCount').textContent=list.length+' serviço'+(list.length===1?' encontrado':'s encontrados');$('serviceGrid').innerHTML=shown.length?shown.map(card).join(''):'<div class="empty"><b>Nenhum serviço encontrado.</b><p>Tente remover um filtro ou consulte os canais oficiais abaixo.</p></div>';renderPagination(list.length);$('serviceGrid').querySelectorAll('[data-favorite]').forEach(function(btn){btn.addEventListener('click',function(){var id=btn.dataset.favorite;if(favorites.has(id))favorites.delete(id);else favorites.add(id);localStorage.setItem('pi_favorites',JSON.stringify(Array.from(favorites)));renderServices();showToast(favorites.has(id)?'Serviço salvo neste aparelho.':'Serviço removido dos salvos.')})})}
  function clearFilters(){$('query').value='';$('region').value='';populateStates();populateCities();$('category').value='';page=1;renderServices()}
  async function init(){
    try{
      var payload=window.PORTAL_DATA||null;
      if(!payload){
        var response=await fetch('data/services.json');
        if(!response.ok)throw new Error('Falha ao carregar a base');
        payload=await response.json();
      }
      data=payload.services||[];
      meta=payload.meta||{};
      $('baseTotal').textContent=String(data.length);
      $('officialTotal').textContent=String((meta.stats&&meta.stats.withSource)||data.filter(function(s){return s.sourceRegistered}).length);
      var coverage=meta.coverageSummary||{};
      $('coverageTotal').textContent=String(coverage.reviewedUnits||Object.keys(meta.coverage||{}).length)+'/'+String(coverage.totalUnits||27);
      populateCategories();
      populateRegions();
      populateStates();
      populateCities();
      renderSteps();
      setLanguage(currentLang);
      renderServices();
    }catch(error){
      $('resultCount').textContent='Não foi possível carregar a base de serviços.';
      $('serviceGrid').innerHTML='<div class="empty"><b>Base indisponível.</b><p>Use os canais oficiais nacionais ou tente novamente.</p></div>';
    }
  }
  $('searchForm').addEventListener('submit',function(event){event.preventDefault();page=1;renderServices()});$('query').addEventListener('input',function(){page=1;renderServices()});$('category').addEventListener('change',function(){page=1;renderServices()});$('region').addEventListener('change',function(){populateStates();populateCities();page=1;renderServices()});$('state').addEventListener('change',function(){populateCities();page=1;renderServices()});$('city').addEventListener('change',function(){page=1;renderServices()});$('clearFilters').addEventListener('click',clearFilters);$('resetSteps').addEventListener('click',function(){checklist={};localStorage.setItem('pi_checklist','{}');renderSteps();showToast('Checklist reiniciado.')});document.querySelectorAll('[data-lang]').forEach(function(btn){btn.addEventListener('click',function(){setLanguage(btn.dataset.lang)})});$('contrastButton').addEventListener('click',function(){var active=document.body.classList.toggle('contrast');this.setAttribute('aria-pressed',String(active));localStorage.setItem('pi_contrast',active?'1':'0')});$('fontButton').addEventListener('click',function(){var current=parseInt(getComputedStyle(document.documentElement).getPropertyValue('--font-size'),10)||16;var next=current>=20?16:current+2;document.documentElement.style.setProperty('--font-size',next+'px');localStorage.setItem('pi_font',String(next))});if(localStorage.getItem('pi_contrast')==='1'){document.body.classList.add('contrast');$('contrastButton').setAttribute('aria-pressed','true')}document.documentElement.style.setProperty('--font-size',(localStorage.getItem('pi_font')||'16')+'px');if('serviceWorker' in navigator&&location.protocol.indexOf('http')===0)navigator.serviceWorker.register('sw.js').catch(function(){});init();
})();
