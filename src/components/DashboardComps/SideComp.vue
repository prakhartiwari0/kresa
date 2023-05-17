<template>
    <div class="maindiv basic_flexbox" :style="{ width: sideBarwidth + 'px' }">
        <div class="pfp_div basic_flexbox">
<img :src="imageurl" alt="Your Profile Picture" class="pfpimg">
        </div>
        <div class="profile_info_div basic_flexbox">
            fff
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
    /* width: 30%; */
    /* height: 100vh; */
    /* position: fixed; */
      /* width: 300px; */
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
}

.pfp_div{
    padding: 1rem;
}
.pfpimg{
    border-radius: 100%;
    width: 100%;
}

.profile_info_div{

}



</style>