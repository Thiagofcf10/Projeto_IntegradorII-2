
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
            let { data, error } = await _supabase
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
            if (index < 8) {
                carousel1.appendChild(imgElement);
            } else {
                carousel2.appendChild(imgElement);
            }
            });
        }

        function openModal(element) {
            var modal = document.getElementById("myModal");
            var modalImg = document.getElementById("img01");
            var captionText = document.getElementById("caption");
            modal.style.display = "block";
            modalImg.src = element.src;
            captionText.innerHTML = element.alt;
            currentImgIndex = images.indexOf(element);
        }

        function closeModal() {
            var modal = document.getElementById("myModal");
            modal.style.display = "none";
        }

        function moveModal(n) {
            currentImgIndex += n;
            if (currentImgIndex >= images.length) {
            currentImgIndex = 0;
            } else if (currentImgIndex < 0) {
            currentImgIndex = images.length - 1;
            }
            var modalImg = document.getElementById("img01");
            var captionText = document.getElementById("caption");
            modalImg.src = images[currentImgIndex].src;
            captionText.innerHTML = images[currentImgIndex].alt;
        }

        function showCarousel(n) {
            document.getElementById('carousel1').style.display = n === 1 ? 'grid' : 'none';
            document.getElementById('carousel2').style.display = n === 2 ? 'grid' : 'none';
        }

        fetchImages();