
const supabaseUrl = 'https://ribvjcjogwukedhhkgbx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpYnZqY2pvZ3d1a2VkaGhrZ2J4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA5Njk4MDMsImV4cCI6MjA1NjU0NTgwM30.152UN5yiJrWyHIeBnZjSmIhGargSRDTqs1BYF0qohwQ';
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);



////////////////////////////  caroucel  ///////////////////////////////////////// 
async function fetchData() {
    let { data, error } = await _supabase
        .from('information')
        .select('*');

    if (error) {
        console.error('Error fetching data:', error);
    } else {
        populateCarousel(data);
    }
}

function populateCarousel(items) {
    const carouselContainer = document.getElementById('carousel-container');
    items.forEach((item, index) => {
        const carouselItem = document.createElement('div');
        carouselItem.className = 'item';
        if (index === 0) carouselItem.style.display = 'block'; // Show the first item by default
        carouselItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="carousel-caption">
                <p>${item.title}</p>
                <a href="${item.url}" target="_blank" class="carousel-link">Clique aqui para saber mais</a>
            </div>
        `;
        carouselContainer.insertBefore(carouselItem, carouselContainer.children[0]);
    });
}

fetchData().then(() => {
    let slideIndex = 0;
    showSlides(slideIndex);

    function moveSlide(n) {
        showSlides(slideIndex += n);
    }

    function showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("item");
        if (n >= slides.length) { slideIndex = 0 }
        if (n < 0) { slideIndex = slides.length - 1 }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slides[slideIndex].style.display = "block";
    }

    function autoSlide() {
        setInterval(() => {
            moveSlide(1);
        }, 5000); // Change slide every 5 seconds
    }

    autoSlide();

    // Attach moveSlide function to global scope for button onclick
    window.moveSlide = moveSlide;
});


//////////////////////////// mural /////////////////////////////////////////

       
                let currentImgIndex = 0;
        const images = [];
        
        async function fetchImages() {
            const { data, error } = await _supabase
                .from('Imagensmural')
                .select('*');
        
            if (error) {
                console.error('Error fetching images:', error);
            } else {
                populateCarousels(data);
            }
        }
        
        function populateCarousels(items) {
            const carousel1 = document.getElementById('carousel1');
            const carousel2 = document.getElementById('carousel2');
            const carousel3 = document.getElementById('carousel3');
            const carousel4 = document.getElementById('carousel4');
            // Adiciona mais carousels dinamicamente se necessário
            const carousels = [carousel1, carousel2, carousel3, carousel4];
        
            // Cria carousels extras se houver mais imagens
            const imagesPerCarousel = 12;
            const totalCarouselsNeeded = Math.ceil(items.length / imagesPerCarousel);
        
            // Cria elementos de carousel extras se necessário
            for (let i = carousels.length; i < totalCarouselsNeeded; i++) {
                const newCarousel = document.createElement('div');
                newCarousel.id = `carousel${i + 1}`;
                newCarousel.style.display = 'none';
                newCarousel.className = 'carousel-grid';
                document.getElementById('mural-carousels').appendChild(newCarousel);
                carousels.push(newCarousel);
            }
        
            items.forEach((item, index) => {
                const imgElement = document.createElement('img');
                imgElement.src = item.image;
                imgElement.alt = item.title;
                imgElement.tabIndex = 0; // Make the image focusable
                imgElement.onclick = () => openModal(imgElement);
                imgElement.onkeypress = (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        openModal(imgElement);
                    }
                };
                images.push(imgElement);
                const carouselIndex = Math.floor(index / imagesPerCarousel);
                carousels[carouselIndex].appendChild(imgElement);
            });
        }
        
        function openModal(element) {
            const modal = document.getElementById("myModal");
            const modalImg = document.getElementById("img01");
            const captionText = document.getElementById("caption");
            modal.style.display = "block";
            modalImg.src = element.src;
            captionText.innerHTML = element.alt;
            currentImgIndex = images.indexOf(element);
        }
        
        function closeModal() {
            const modal = document.getElementById("myModal");
            modal.style.display = "none";
        }
        
        function moveModal(n) {
            currentImgIndex += n;
            if (currentImgIndex >= images.length) {
                currentImgIndex = 0;
            } else if (currentImgIndex < 0) {
                currentImgIndex = images.length - 1;
            }
            const modalImg = document.getElementById("img01");
            const captionText = document.getElementById("caption");
            modalImg.src = images[currentImgIndex].src;
            captionText.innerHTML = images[currentImgIndex].alt;
        }
        
        function showCarousel(n) {
            const muralCarousels = document.getElementById('mural-carousels');
            const carousels = muralCarousels.querySelectorAll('[id^="carousel"]');
            carousels.forEach((carousel, index) => {
                carousel.style.display = (index + 1) === n ? 'grid' : 'none';
            });
        }
        
        // Expose modal and carousel functions to global scope if needed
        window.openModal = openModal;
        window.closeModal = closeModal;
        window.moveModal = moveModal;
        window.showCarousel = showCarousel;
        
        fetchImages();