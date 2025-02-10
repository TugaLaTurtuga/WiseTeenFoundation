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
