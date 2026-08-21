(function(){"use strict";
  const header=document.querySelector("#header");
  const nav=document.querySelector("#navmenu");
  const navToggle=document.querySelector(".nav-toggle");
  const scrollTop=document.querySelector("#scroll-top");
  const navLinks=document.querySelectorAll("#navmenu a[href^='#']");

  function setHeaderState(){
    const scrolled=window.scrollY>24;
    header?.classList.toggle("scrolled",scrolled);
    scrollTop?.classList.toggle("active",window.scrollY>500);
  }

  function closeNavigation(){
    nav?.classList.remove("open");
    document.body.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded","false");
    const icon=navToggle?.querySelector("i");
    icon?.classList.remove("bi-x-lg");
    icon?.classList.add("bi-list");
  }

  navToggle?.addEventListener("click",()=>{
    const isOpen=nav?.classList.toggle("open");
    document.body.classList.toggle("nav-open",isOpen);
    navToggle.setAttribute("aria-expanded",String(isOpen));
    const icon=navToggle.querySelector("i");
    icon.classList.toggle("bi-list",!isOpen);
    icon.classList.toggle("bi-x-lg",isOpen);
  });

  navLinks.forEach(link=>link.addEventListener("click",closeNavigation));
  const sections=[...document.querySelectorAll("main section[id]")];

  function updateActiveLink(){
    const marker=window.scrollY+180;
    let current=sections[0]?.id;
    sections.forEach(section=>{if(marker>=section.offsetTop)current=section.id});
    navLinks.forEach(link=>link.classList.toggle("active",link.hash===`#${current}`));
  }

  window.addEventListener("scroll",()=>{setHeaderState();updateActiveLink()},{passive:true});
  scrollTop?.addEventListener("click",event=>{event.preventDefault();window.scrollTo({top:0,behavior:"smooth"})});
  document.addEventListener("click",event=>{if(nav?.classList.contains("open")&&!nav.contains(event.target)&&!navToggle.contains(event.target))closeNavigation()});

  const year=document.querySelector("#current-year");
  if(year)year.textContent=new Date().getFullYear();
  const contactForm=document.querySelector("#contact-form");
  contactForm?.addEventListener("submit",event=>{
    event.preventDefault();
    const data=new FormData(contactForm);
    const subject=encodeURIComponent(data.get("subject"));
    const body=encodeURIComponent(`Hi Mark,\n\n${data.get("message")}\n\nFrom: ${data.get("name")}\nEmail: ${data.get("email")}`);
    window.location.href=`mailto:mark.austria.devcon@gmail.com?subject=${subject}&body=${body}`;
  });
  if(window.AOS)AOS.init({duration:700,easing:"ease-out-cubic",once:true,offset:40});
  setHeaderState();
  updateActiveLink();
})();
