<template>
            <div class="first_section ">
        
                <h2 id="tagline">Get Feedback and Ratings of your Web Projects</h2>
        <iframe id="frontyoutubevideo" src="https://www.youtube.com/embed/k1rwmHFkTeo?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
</template>

<script>

export default{
    
}

</script>

<style>


/* FIRST SECTION  */
.first_section{
display: flex;
flex-direction: column;
position: relative;
align-items: center;
height: 100vh;
padding: 1rem;
}

h2#tagline{
    font-family: Ysabeau;
    font-size: 3.5rem ;
    text-shadow: 12px 12x 12px black;
    text-align: center;
    width: 50%;
}

#frontyoutubevideo{
    margin: 1rem;
    border-radius: 1rem;
    /* width:560px;
    height:315px;  */
    width: 55%;
    border: var(--k-blue) 10px solid;
    flex: 1;
}

</style>