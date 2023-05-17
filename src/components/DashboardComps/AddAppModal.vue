<template>
    <div class="addappmodalbackcover">

        <button 
        @click="closeAddAppModal"
        class="closeaddappmodal_button  material-symbols-outlined">close</button>
        <dialog class="addappmodal">
            <h2>Enter App Details</h2>
            <div class="eachinputgroup">
                <label for="app-logo">Logo:</label>
                <input id="app-logo"
                       type="file"
                       accept="image/*">
                
            </div>
            <div class="eachinputgroup">
                <label for="app-name">Name:</label>
                <input id="app-name"
                       type="text">

            </div>
            <div class="eachinputgroup">
                <label for="app-url">URL:</label>
                <input id="app-url"
                       type="text">

            </div>
            <div class="eachinputgroup">
                <label for="app-description">Description:</label>
                <textarea id="app-description"
                          rows="4" ></textarea>

            </div>

            <button class="default_button">Submit</button>


        </dialog>
    </div>
</template>

<script>
export default {
    date(){

    },
    methods:{
        
        closeAddAppModal() {
            this.$emit('closeAddAppModal1');
        },

    }

}
</script>

<style>
.addappmodalbackcover {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.331);
    z-index: 5;
    display: flex;
    justify-content: center;
    align-items: center;
}


.addappmodal {
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: whitesmoke;
    border: none;
    border-radius: 2rem;
    padding: 1rem;

    margin: auto;
}


.eachinputgroup{
    margin-block: 1rem;
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    
}
.eachinputgroup label{
    margin-block: 0.2rem;
    margin-inline: 0.5rem;
}
.eachinputgroup input[type="text"],.eachinputgroup textarea {
    width: 100%;
    border-radius: 1rem;
    padding: 0.5rem;
    border: rgba(128, 128, 128, 0.55) 2px solid;
}
.eachinputgroup textarea {
    resize: none;
    padding: 1rem;

}
.eachinputgroup input[type="text"]:focus{
    outline: none;
}

.closeaddappmodal_button {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    position: absolute;
    top: 1rem;
    right: 1rem;
    background-color: transparent;
    border: none;
    font-size: 2rem;
    border-radius: 100%;
    height: 3rem;
    width: 3rem;
}

.closeaddappmodal_button:hover {
    background-color: rgba(0, 0, 0, 0.472);
}
</style>