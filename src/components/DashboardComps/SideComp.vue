<template>
    <div class="maindiv basic_flexbox" :style="{ width: sideBarwidth + 'px' }">
        <div class="pfp_div basic_flexbox">
<img :src="imageurl" alt="Your Profile Picture" class="pfpimg">
        </div>
        <div class="profile_info_div basic_flexbox">
            <span>Prakhar tiwari</span>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            imageurl:"../../../src/assets/examplefiles/pfp.png",
        }
        
    },
      props: {
        sideBarwidth: {
            type: Number,
            required: true,
        }
    }
}

</script>

<style>


.maindiv{
  border: 2px solid black;
  position: sticky;
  top: 1rem;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: var(--k-blue);
  border-radius: 2rem;
  height: 90vh;
  /* margin: 1rem; */

}

.pfp_div{
    padding: 1rem;
}
.pfpimg{
    border-radius: 100%;
    width: 100%;
}

.profile_info_div{
    display: flex;  
    flex-direction: column;
    color: white;
    padding: 0.8rem;
}



</style>