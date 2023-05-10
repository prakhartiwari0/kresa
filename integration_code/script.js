

const gfr_button = document.getElementById("gfr_button_kresa");
const gfr_main_div = document.getElementById("gfr_main_div");
const gfk_overlay = document.getElementById("gfk_overlay");
const close_gfr_main_div = document.getElementById("close_gfr_main_div");



const feedback_area = document.getElementById("feedback_area");
const gfr_feedback_ch_counter = document.getElementById("gfr_feedback_ch_counter");



// OPENING AND CLOSING THE RATING BOX
// gfr_main_div.style.display = "none";
// gfk_overlay.style.display = "none";


gfr_button.addEventListener('click', ()=>{

    // gfk_overlay.style.display = "flex";
    // gfr_main_div.style.display = "flex";
    gfr_main_div.showModal();

})


close_gfr_main_div.addEventListener('click', ()=>{

    // gfk_overlay.style.display = "none";
    // gfr_main_div.style.display = "none";
    gfr_main_div.close();

})



// Feedback 
feedback_area.addEventListener("keyup", ()=>{
    current_length = feedback_area.value.length;
    gfr_feedback_ch_counter.innerText = `${current_length}/150`
    if (current_length>120) {
        gfr_feedback_ch_counter.style.color = "red"
    }   
    if (current_length < 120 && (gfr_feedback_ch_counter.style.color == "red")) {
        gfr_feedback_ch_counter.style.color = "black"
        
    }

})



const stars = document.querySelectorAll('.star');
let selectedRating = 0;

function handleStarClick(event) {
    const starId = event.target.id;

    for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        if (star.id <= starId) {
            star.classList.add('selected');
        } else {
            star.classList.remove('selected');
        }
    }

    selectedRating = starId.replace('star', '');
    console.log('Selected rating:', selectedRating);
}

for (let i = 0; i < stars.length; i++) {
    const star = stars[i];
    star.addEventListener('click', handleStarClick);
}
