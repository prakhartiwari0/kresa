

const gfr_button = document.getElementById("gfr_button_kresa");
const gfr_main_div = document.getElementById("gfr_main_div");
const gfk_overlay = document.getElementById("gfk_overlay");
const close_gfr_main_div = document.getElementById("close_gfr_main_div");



const feedback_area = document.getElementById("feedback_area");
const gfr_feedback_ch_counter = document.getElementById("gfr_feedback_ch_counter");




gfr_main_div.style.display = "none";
gfk_overlay.style.display = "none";


gfr_button.addEventListener('click', ()=>{

    gfr_main_div.style.display = "flex";
    gfk_overlay.style.display = "flex";
})


close_gfr_main_div.addEventListener('click', ()=>{

    gfr_main_div.style.display = "none";
    gfk_overlay.style.display = "none";
})



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





