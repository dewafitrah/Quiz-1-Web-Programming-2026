// Accordion: hanya satu yang terbuka
const items = document.querySelectorAll('.acc-item');
function setOpen(item, open){
  item.classList.toggle('open', open);
  const p = item.querySelector('.acc-panel');
  p.style.maxHeight = open ? p.scrollHeight + 'px' : 0;
}
items.forEach(item=>{
  item.querySelector('.acc-btn').addEventListener('click',()=>{
    const wasOpen = item.classList.contains('open');
    items.forEach(i=>setOpen(i,false));
    setOpen(item,!wasOpen);
  });
  setOpen(item, item.classList.contains('open')); // kondisi awal
});

// Dark mode
const themeBtn = document.getElementById('theme');
themeBtn.onclick = ()=>{
  document.body.classList.toggle('dark');
  themeBtn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
};

// Menu mobile
const links = document.getElementById('links');
document.getElementById('menu').onclick = ()=>links.classList.toggle('show');
links.addEventListener('click',()=>links.classList.remove('show'));

// Carousel: satu kartu per tampilan, tombol next/prev berputar (infinite)
document.querySelectorAll('.carousel').forEach(car=>{
  const track = car.querySelector('.carousel-track');
  const cards = [...track.querySelectorAll('.card')];
  const total = cards.length;
  let index = 0;

  // Indikator titik
  const dots = document.createElement('div');
  dots.className = 'carousel-dots';
  cards.forEach((_, i)=>{
    const d = document.createElement('button');
    d.setAttribute('aria-label', 'Ke kartu ' + (i+1));
    if(i === 0) d.classList.add('active');
    d.addEventListener('click', ()=> goTo(i));
    dots.appendChild(d);
  });
  car.after(dots);

  function goTo(i){
    index = (i + total) % total;
    track.scrollTo({ left: index * track.clientWidth, behavior: 'smooth' });
    updateDots();
  }
  function updateDots(){
    [...dots.children].forEach((d, i)=> d.classList.toggle('active', i === index));
  }

  car.querySelector('.prev')?.addEventListener('click', ()=> goTo(index - 1));
  car.querySelector('.next')?.addEventListener('click', ()=> goTo(index + 1));

  // Sinkronkan titik saat digeser manual (swipe/trackpad)
  let scrollTimer;
  track.addEventListener('scroll', ()=>{
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(()=>{
      index = Math.round(track.scrollLeft / track.clientWidth);
      updateDots();
    }, 100);
  });
});