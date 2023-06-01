<template>
    <dialog class="default_modal Kipopup" ref="Kipopup_ref">
        Popup
        
        <button class="actionbutton material-symbols-outlined closeKiPopupButton" @click="$emit('closeKiPopupButtonClicked')">close</button>
    </dialog>
</template>

<script>
export default{
    
    props: {
        projectKIsettings: { type: Object, required: true }
    },

    mounted() {
        this.$refs.Kipopup_ref.showModal()
        console.log(this.projectKIsettings);
    },
    beforeUnmount() {
        this.$refs.Kipopup_ref.close()
    },

}
</script>

<style>
.closeKiPopupButton{
    top: 1rem;
    right: 1rem;
}
.Kipopup{
    background-color: var(--lightest-lavender);
}

</style>


