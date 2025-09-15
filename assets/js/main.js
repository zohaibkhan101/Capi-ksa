// small interactive behaviors: year, mobile nav toggle
document.addEventListener('DOMContentLoaded', function(){
  const year = new Date().getFullYear();
  ['year','year2','year3','year4','year5'].forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.textContent = year;
  });

  const navToggle = document.getElementById('navToggle');
  navToggle && navToggle.addEventListener('click', function(){
    document.body.classList.toggle('mobile-nav-open');
  });

  // Simple form validation for contact (optional enhancement)
  const contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', function(e){
      // client-side validation could be expanded
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      if(!name || !email || !message){
        e.preventDefault();
        alert('Please fill name, email and message before sending.');
      } else {
        // allow mailto fallback to trigger
      }
    });
  }
});
