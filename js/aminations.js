const pages = document.querySelectorAll('.page');
let visibilityData = [['filler']]; // Initialize with a placeholder for the first page

// Function to calculate visibility percentage
function getVisibilityPercentage(entry) {
    const height = entry.boundingClientRect.height;
    const visibleHeight = Math.min(height, entry.intersectionRect.height);
    return (visibleHeight / height) * 100;
}

// Initialize Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        const pageId = entry.target.dataset.page || entry.target.id;
        const percentage = getVisibilityPercentage(entry);
        
        // Find the index of the page in visibilityData
        const pageIndex = Array.from(pages).findIndex(page => page.id === pageId);

        // If the page is found, update its visibility and percentage
        if (pageIndex >= 0) {
            visibilityData[pageIndex + 1] = [
                entry.isIntersecting,           // visibility (true or false)
                Math.round(percentage)          // percentage visible
            ];
        }
    });
}, { threshold: [...Array(101).keys()].map(i => i / 100) }); // Track visibility at every 1%

// Observe each page
pages.forEach(page => observer.observe(page));


let mainVis = false;
document.addEventListener('scroll', (e) => {
    console.log(visibilityData); // Debugging output
    if (visibilityData[2][1] > 20 && !mainVis){
        mainVis = true;
        document.querySelector('.mainBottomLeft').style.opacity = '1';
    }
});
