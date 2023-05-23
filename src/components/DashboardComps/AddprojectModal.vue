<template>
    <div class="addprojectmodalbackcover">

        <dialog ref="addprojectmodal_ref" class="default_modal addprojectmodal">
            <button 
            @click="$emit('closeAddprojectModalClicked')"
            class="closeaddprojectmodal_button actionbutton material-symbols-outlined">close</button>
            <h2>Enter project Details</h2>
            <div class="eachinputgroup">
                <label for="project-logo">Logo:</label>
                <input id="project-logo"
                       type="file"
                       accept="image/*">
                
            </div>
            <div class="eachinputgroup">
                <label for="project-name">Name:</label>
                <input id="project-name"
                    ref="nameinputproject_ref"
                       type="text"
                       class="default_textInput">

            </div>
            <div class="eachinputgroup">
                <label for="project-url">URL:</label>
                <input id="project-url"
                       type="text"
                           class="default_textInput">

            </div>
            <div class="eachinputgroup">
                <label for="project-description">Description:</label>
                <textarea id="project-description"
                          rows="4"
                           class="default_textInput" ></textarea>

            </div>

            <button class="default_button">Submit</button>


        </dialog>
    </div>
</template>

<script>
export default {
    date(){

    },
    mounted() {
      this.$refs.addprojectmodal_ref.showModal()
      this.$refs.nameinputproject_ref.focus()
  },
    methods:{

    }

}
</script>

<style>
.addprojectmodal::backdrop {
}


.addprojectmodal {
    min-width: 40%;
    padding: 1rem;
    
}


.eachinputgroup{
    padding: .5rem;
    margin-block: .5rem;
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    
}
.eachinputgroup label{
    margin-inline: 0.5rem;
}
.eachinputgroup input[type="text"],.eachinputgroup textarea {
    font-size: 1rem;
}
.eachinputgroup textarea {
    resize: none;
    padding: .5rem;

}


.closeaddprojectmodal_button {
    top: 1rem;
    right: 1rem;
}

</style>