const images = document.querySelectorAll('.Private-Lessons-list img');
images.forEach((img) => {
    img.addEventListener('mouseover', () => {
        img.style.transform = 'scale(1.1)'; 
        img.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.3)'; 
        img.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease'; 
    });
    img.addEventListener('mouseout', () => {
        img.style.transform = 'scale(1)'; 
        img.style.boxShadow = 'none'; 
    });
});








