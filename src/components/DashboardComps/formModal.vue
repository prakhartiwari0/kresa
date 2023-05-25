<template>
    <dialog class="">
        
<div class="labelInputGroupDivs"  v-for="(labelInput, index) in formElements.labelInputs" >

    <label :for="formElements.labelInputs[index].forid" :class="formElements.labelInputs[index].labelClasses"
    :ref="formElements.labelInputs[index].labelRef">

    {{ formElements.labelInputs[index].labelText }}

    </label>

    <input 
    class="default_textInput"
    :ref="formElements.labelInputs[index].inputRef" 
    :type="formElements.labelInputs[index].inputType" 
    :id="formElements.labelInputs[index].forid" 
    :value="formElements.labelInputs[index].inputValue"
    :name="formElements.labelInputs[index].inputName"
    @input.prevent="formElements.labelInputs[index].atInput"
    :v-model="formElements.labelInputs[index].vModel">

</div>

    <button 
    class="default_button" 
    :class="formElements.submitButtonProperties.buttonClasses" 
    :disabled="formElements.submitButtonProperties.disableCondition"
    @click.prevent="formElements.submitButtonProperties.clickEvent">

        {{ formElements.submitButtonProperties.buttonText }}

    </button>


    </dialog>
</template>

<script>
export default{
    data(){
        return{
            formElements: {
                labelInputs: [
                    {
                        forid: "",
                        labelClasses: [],
                        labelRef: "",
                        labelText: "",
                        inputName: "",
                        inputRef: "",
                        inputClasses: [],
                        inputValue: "",
                        inputType: "",
                        atInput: "",
                        vModel: ""
                    },
                    {
                        labelClasses: [],
                        inputClasses: [],
                        inputName: "",
                        labelText: "",
                        forid: "",
                        ref: "",
                        inputType: "",
                        value: "",
                        atInput: "",
                        vModel: ""
                    },
                    // Add more objects with the same structure as needed
                ],
                submitButtonProperties: {
                    buttonText: "",
                    buttonClasses: [],
                    clickEvent: "",
                    disableCondition: ""
                }
            }
        };
    },
    props:{
        formElements:{
            type: Object,
            required: true,
        }

        /*

        
         */
    },


}

</script>

<style>

</style>