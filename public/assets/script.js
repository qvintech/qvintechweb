const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  navigation.classList.toggle('open', !isOpen);
});

navigation.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
    navigation.classList.remove('open');
  });
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('open')) {
    menuToggle.click();
    menuToggle.focus();
  }
});

document.querySelector('#year').textContent = new Date().getFullYear();

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.service-card, .portfolio-card, .steps article').forEach(element => {
    element.classList.add('reveal');
    observer.observe(element);
  });
}

document.querySelector('#contact-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const subject = `Qvin Tech inquiry: ${data.get('service')}`;
  const body = `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nService: ${data.get('service')}\n\n${data.get('message')}`;
  document.querySelector('#form-status').textContent = 'Your email draft is ready to open. Send it from your email app to complete your inquiry. This demo uses hello@qvin.net; replace it with your company’s email before publishing.';
  window.location.href = `mailto:hello@qvin.net?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
