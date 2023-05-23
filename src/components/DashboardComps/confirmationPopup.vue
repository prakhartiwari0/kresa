<template>
    <dialog ref="confirmationPopup" class="confirmationPopupDialog default_modal">
        <span>{{ msg }}</span>
        <div class="yesnobuttonsdiv">
            <button class="yesbutton default_button" @click="$emit('yesClicked')">Yes</button>
            <button class="nobutton default_button" @click="$emit('noClicked')">No</button>

        </div>
    </dialog>
</template>

<script>
export default{
    data(){
        return{

        }
    },
    mounted(){
        this.$refs.confirmationPopup.showModal()
    },
    props:{
            msg: {
            type: String,
            required: true,
        },
    }
}

</script>

<style>
.confirmationPopupDialog::backdrop{
    /* background-color: rgba(0, 0, 0, 0.5); */
}
.confirmationPopupDialog{
/* display: flex;
flex-direction: column;
border: none;
padding: 1rem;
margin: auto;

border-radius: 1rem; */
}



.yesnobuttonsdiv{
    margin: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
}
.yesnobuttonsdiv button{
    font-size: 1.2rem;
    min-width: 5rem;
    margin-inline: 1rem;
}

.yesbutton{
    color: white;
    border: red solid 2px;
    background-color: red;
}
.yesbutton:hover{
    color: red;
    background-color: transparent;

}
.nobutton{
    color: white;
    border: green solid 2px;
    background-color: green;
}
.nobutton:hover{
    color: green;
    background-color: transparent;

}


</style>