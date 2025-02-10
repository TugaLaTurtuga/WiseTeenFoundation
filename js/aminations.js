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


// Array to track if an animation has already been played (prevents re-triggering)
let Vis = new Array(255).fill(0);

// Function to check visibility and trigger animations
function triggerAnimation(pageIndex, thresholds) {
    if (visibilityData[pageIndex][0]) { // Checks if the page is visible
        const visibilityPercentage = visibilityData[pageIndex][1];

        thresholds.forEach(({ threshold, visIndex, elementSelector, animation, time }) => {
            if (visibilityPercentage > threshold && Vis[visIndex] === 0) {
                Vis[visIndex] = 1; // Mark the animation as played
                document.querySelector(elementSelector).style.animation = `${animation} ${time}s ease forwards`;
            }
        });
    }
}

// Event listener for scroll to check visibility
document.addEventListener('scroll', () => {
    triggerAnimation(2, [
        { threshold: 10, visIndex: 0, elementSelector: '.mainBottomLeft', animation: 'fadeIn', time: 0.4 },
        { threshold: 50, visIndex: 1, elementSelector: '#dpMain', animation: 'appearLeft', time: 0.4 },
        { threshold: 68, visIndex: 2, elementSelector: '#dpMainSub', animation: 'appearLeft', time: 0.4 }
    ]);

    triggerAnimation(3, [
        { threshold: 50, visIndex: 3, elementSelector: '#gMain', animation: 'appearLeft', time: 0.3 },
        
    ]);

    triggerAnimation(4, [
        { threshold: 5, visIndex: 4, elementSelector: '#gMainSub', animation: 'appearLeft', time: 10 }
    ]);
});
