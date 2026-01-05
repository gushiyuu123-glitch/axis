export default function initParticles(canvas) {
  const ctx = canvas.getContext("2d");
  let w, h;
  let particles = [];

  const resize = () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  };

  resize();
  window.addEventListener("resize", resize);

  for (let i = 0; i < 80; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.2 + 0.2,
      s: Math.random() * 0.4 + 0.2,
    });
  }

  const animate = () => {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "rgba(212,175,55,0.25)";
    particles.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      p.y += p.s;
      if (p.y > h) p.y = 0;
    });
    requestAnimationFrame(animate);
  };

  animate();
}
