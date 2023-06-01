<template>
    <dialog ref="projectSettingsModal_ref"
            class="projectSettingsModal default_modal">

        <button @click="$emit('closeprojectSettingsModalClicked')"
                class="closeprojectSettingsModal_button actionbutton material-symbols-outlined">close
        </button>

        <div class="projS-top_div">
            <div class="projS-rate_icon_div">
                <div class="projS-rate_icon_heading_imgs">
                    <span class="projS-settingHeadings" data-tooltip="Icon that will be used for giving Rating (Upload an 45x45 SVG)">Rate Icon</span>
                    <div class="projS-stars_div">
                        <img v-for="(n, index) in 5"
                             :key="index"
                             :id="n"
                             @click="colorTillhere(n)"
                             ref="star"
                             :src="editedProjectSettings.customRateIcon"
                             alt="userProfilePic"
                             class="projectRateIcon_Img">
                    </div>

                    <input @change="handleFileSelection"
                           accept="image/svg+xml"
                           ref="projectRateIconInput_ref"
                           type="file"
                           name="projectRateIcon"
                           id="projectRateIcon">
                    <label for="projectRateIcon"
                           class="material-symbols-outlined">edit</label>
                </div>

            </div>
        </div>


        <div class="projS-mid_div">
            <div class="projS-left_div">
                <span class="projS-settingHeadings" data-tooltip="Specific Things you want to get ratings for (max 5 questions)">
                    Specific Questions
                </span>
                <div class="projS-specific_questions_div">

                    <template v-if="editedProjectSettings.specificQuestions.length === 0">
                        <span class="nothingHereText">No Specific Questions Added</span>
                    </template>



                    <div class="specificQuestions_editor_div">
                        <div class="specificQuestion_div"
                             v-for="(question, index) in editedProjectSettings.specificQuestions">
                            <input type="text"
                            maxlength="50"
                                   :value="question"
                                   class="default_textInput"
                                   :class="allowQuestionEditing[index] ? '' : 'disabled-input'"
                                   ref="question">
                            <button @click="allowQuestionEditing[index] ? questionEdited(index) : this.allowQuestionEditing[index] = true"
                                    class="material-symbols-outlined questionEditButton default_button">

                                <span class="material-symbols-outlined">{{ allowQuestionEditing[index] ? 'done' : 'edit'
                                }}</span>


                            </button>

                            <button @click="deleteQuestionClicked(index)"
                                    class="material-symbols-outlined questionDeleteButton default_button"><span
                                      class="material-symbols-outlined">delete</span></button>
                        </div>
                    </div>



                </div>
                <button class="default_button addSpecificQuestionButton"
                        @click="addSpecificQuestionButtonClicked"
                        :disabled="editedProjectSettings.specificQuestions.length == 5">
                    <span class="material-symbols-outlined">add</span></button>
            </div>

            <div class="projS-right_div">

                <div class="projS-themColor_div">
                    <span class="projS-settingHeadings" data-tooltip="Enter Hex Value of color">
                        Color Theme
                    </span>

                    <div class="colorInputPreviewDiv">
                        <div class="themeColorPreviewDiv" 
                             :style="{ backgroundColor: editedProjectSettings.colorTheme }"></div>
                        <input type="text"
                        maxlength="7"
                        name="colorTheme"
                        placeholder="#hexvalue"
                        id="colorTheme"
                        ref="colorTheme"
                        :class="validColorCode() ? '' : 'invalidInput'"
                        data-invalidInputText="The hex code is Invalid"
                        class="default_textInput"
                        v-model="editedProjectSettings.colorTheme">
                    </div>
                </div>


                <div class="projS-customMsgs_div">
                    <div class="projS-customRequestMsg_div">
                        <span class="projS-settingHeadings" data-tooltip="First Message to appear which requests the visitor to rate your website & share feedback">
                            Request Message
                        </span>
                        <input type="text"
                               maxlength="100"
                               name="customRequestMsg"
                               id="customRequestMsg"
                               class="default_textInput"
                               v-model="editedProjectSettings.customRequestMsg">
                               
                            </div>
                    <div class="projS-customThanksMsg_div">
                        <span class="projS-settingHeadings" data-tooltip="Ending Message which Thanks the visitor for rating & sharing feedback">
                            Thanks Message
                        </span>
                        <input type="text"
                        maxlength="100"
                               name="customThanksMsg"
                               id="customThanksMsg"
                               class="default_textInput"
                               v-model="editedProjectSettings.customThanksMsg">
                    </div>
                </div>
            </div>

        </div>

        <div class="projS-bottom_div">
            <button class="default_button" @click="saveSettingsButtonClicked" :disabled="!settingsEditedorNot">Save Settings</button>

            <button class="default_button" @click="popupPreviewButtonClicked" >Popup Preview</button>
        </div>

        <template v-if="showConfirmationPopup">

            <ConfirmationPopup :msg="confirmationMsg" @noClicked="showConfirmationPopup=false"/>

        </template>

        <template v-if="showKiPopup">
            <KiPopup :projectKIsettings="editedProjectSettings" @closeKiPopupButtonClicked="showKiPopup = false"/>
        </template>


    </dialog>
</template>



<script>
import ConfirmationPopup from "./confirmationPopup.vue"
import KiPopup from "./KiPopup.vue"


// other data properties


export default {
    components:{ KiPopup, ConfirmationPopup},
    
    props: {
        projectData: { type: Object, required: true }
    },
    data() {
        return {
            editedProjectSettings: JSON.parse(JSON.stringify(this.projectData.projectKIsettings)),
            allowQuestionEditing: [false, false, false, false, false],

            showConfirmationPopup: false,
            confirmationMsg:"Are you Sure?",

            showKiPopup: false,
        }
    },
    mounted() {
        this.$refs.projectSettingsModal_ref.showModal()       
    },
    beforeUnmount() {
        this.$refs.projectSettingsModal_ref.close()
    },
    computed:{
        settingsEditedorNot(){
            let editedData = this.editedProjectSettings;
            let originalData = this.projectData.projectKIsettings;
            let settingsEdited = false;
    
            for (const key in editedData) {
                    let editedDataValue = editedData[key];
                    let originalDataValue = originalData[key];
    
                    // Check for questions
                    if(key == "specificQuestions"){
                        // console.log(key);
                        if (editedDataValue.length!==originalDataValue.length) {
                            settingsEdited = true
                        }
                        for (let index = 0; index < editedDataValue.length; index++) {
                            const editedQuestion = editedDataValue[index];
                            const originalQuestion = originalDataValue[index];
                            if (editedQuestion!==originalQuestion) {
                                settingsEdited = true
                                // console.log(settingsEdited);
                                // return settingsEdited
                            }
                        }
                    }
                    else if (editedDataValue!==originalDataValue) {
                        settingsEdited = true
                    }
                }
                // console.log(settingsEdited);
            return settingsEdited
        }
        
    },
    methods: {
        colorTillhere(starID) {
            for (let i = 1; i <= starID; i++) {
                this.$refs.star[i - 1].style.filter = 'grayscale(0%)';
                this.$refs.star[i - 1].style.opacity = '1';
            }
            for (let i = 5; i > starID; i--) {
                this.$refs.star[i - 1].style.filter = 'grayscale(100%)';
                this.$refs.star[i - 1].style.opacity = '.7';
            }
        },

        handleFileSelection(event) {
            const file = event.target.files[0];
            const maxSizeKB = 1024; // Maximum allowed file size in kilobytes

            if (file && file.size > maxSizeKB * 1024) {
                // File size exceeds the limit
                alert(`File size exceeds the limit of ${maxSizeKB} KB`);
                // this.$refs.userProfilePic.value = null; // Clear the file input field
                return;
            }

            // Check the file type and extension
            if (file && file.type !== "image/jpeg" && !file.name.toLowerCase().endsWith(".svg")) {
                // Invalid file type or extension
                alert("Only SVGs are allowed");
                // this.$refs.userProfilePic.value = null; // Clear the file input field
                return;
            }

            // Continue with file processing and uploading
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    const img = new Image();
                    img.onload = () => {
                        const width = img.width;
                        const height = img.height;
                        const targetDimension = width; // Target dimension for width and height
                        if (width !== targetDimension || height !== targetDimension) {
                            alert("Image must be in square ratio, where width and height are same");
                            // this.$refs.userProfilePic.value = null; // Clear the file input field
                            return;
                        }

                        this.editedProjectSettings.customRateIcon = reader.result;
                        // this.editedUserDetails.userProfilePic = file;
                    };
                    img.src = reader.result;
                };
                reader.readAsDataURL(file);
            }
        },
        addSpecificQuestionButtonClicked() {
            // console.log("Add question");
            this.editedProjectSettings.specificQuestions.push('')
        },
        deleteQuestionClicked(index) {
            let arr = this.editedProjectSettings.specificQuestions
            arr.splice(index, 1)
        },
        questionEdited(index) {
            let arr = this.editedProjectSettings.specificQuestions
            let newQuestion = this.$refs.question[index].value
            arr.splice(index, 1, newQuestion)
            this.allowQuestionEditing[index] = false

        },
        validColorCode() {
            const hexCodeRegex = /^#([0-9A-Fa-f]{3}){1,2}$/;
            return hexCodeRegex.test(this.editedProjectSettings.colorTheme);
        },
        saveSettingsButtonClicked(){
            this.confirmationMsg = `Are you sure to Edit the Settings of ${this.projectData.projectName}?`
            this.showConfirmationPopup = true
        },
        popupPreviewButtonClicked(){
            this.showKiPopup = true
        },
        saveEditedSettings(){
            // FIREBASE SHIT HERE
        },
    }
}
</script>

<style>
/* CLOSE BUTTON  */
.closeprojectSettingsModal_button {
    right: .5rem;
    top: .5rem;
}

/* WHOLE MODAL  */
.projectSettingsModal {
    min-width: 90%;
}

.projectSettingsModal div {
    width: 100%;
    display: flex;
}

.nothingHereText {
    opacity: .7;
    margin: 1rem;
    text-align: center;
    user-select: none;
}

.projS-settingHeadings {
    color: var(--darkest-k-blue);
    font-weight: 700;
    padding: .3rem;
    font-size: 1.1rem;
    position: relative;
    width: fit-content;

}

.projS-settingHeadings::after {
    display: flex;
    align-items: center;
    justify-content: center;
    content: 'i';
    position: absolute;
    top: 50%;
    right: -.9rem;
    transform: translateY(-50%);
    width: .6rem;
    height: .6rem;
    padding: .1rem;
    border-radius: 100%;
    background-color:transparent;
    border: .1rem var(--darker-k-blue) solid;
    /* Circular background color */
    color: var(--darker-k-blue);
    font-size: .6em;
    cursor: pointer;
}

.projS-settingHeadings::before {
    z-index: 10;
    content: attr(data-tooltip);
    position: absolute;
    top: 100%;
    right: -90%;
    width: fit-content;
    background-color: var(--lightest-lavender);
    color: var(--darker-k-blue);
    font-size: .7rem;
    padding: .5rem;
    border-radius: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
}

.projS-settingHeadings:hover::before {
    opacity: 1;
    visibility: visible;
}

.invalidInput{
    border: red 2px solid;
}
.invalidInput:focus{
    outline: none;    
}

/* ---------- TOP PART ---------- */
.projS-top_div {
    margin-block: 1rem;
}

.projS-rate_icon_div {
    justify-content: center;
    flex-direction: column;
    align-items: center;
}

.projS-rate_icon_div label {
    color: var(--darkest-k-blue);
    position: absolute;
    cursor: pointer;
    border-radius: 100%;
    padding: .3rem;
    user-select: none;
    right: 10%;
    top: 0;
    font-size: 1.3rem;
}

.projS-rate_icon_div label:hover {
    background-color: rgba(0, 0, 0, 0.1);

}

.projS-rate_icon_heading_imgs span {
    width: fit-content;

}

.projS-rate_icon_heading_imgs {
    max-width: fit-content;
    flex-direction: column;
    align-items: center;
    position: relative;

}

.projectRateIcon_Img {
    filter: grayscale(100%);
    opacity: .7;
    cursor: pointer;
}

.projS-stars_div {
    width: 5px;
    justify-content: center;

}

input#projectRateIcon {
    display: none;
}


/* ---------- MIDDLE PART ----------  */
.projS-mid_div {
    margin-bottom: 1rem;
    padding: .3rem;   
}
.projS-mid_div > div{
    margin-inline: 2rem;
}

/* -- MIDDLE LEFT PART --  */
.projS-left_div {
    flex-direction: column;
}
.projS-specific_questions_div {
    flex-direction: column;
    --projS-red: rgb(174, 21, 21);
}
.specificQuestions_editor_div {
    flex-direction: column;
}
.specificQuestion_div {
    margin-block: .1rem;
    min-height: 2.5rem;
    max-height: 2.5rem;
}

.specificQuestion_div input {
    width: 100%;
}

.disabled-input {
    /* Disable editing */
    pointer-events: none;
    /* Enable scrolling */
    overflow-x: scroll;
}

.projS-specific_questions_div button {
    padding: 0.5rem;
    margin: .1rem;
    transition: none;
}

.questionEditButton {
    background-color: transparent;
    color: var(--darkest-k-blue);
    border: var(--darkest-k-blue) 2px solid;
}

.questionEditButton:hover {
    color: white;
    background-color: var(--darkest-k-blue);
}

.questionDeleteButton {
    background-color: transparent;
    color: var(--projS-red);
    border: var(--projS-red) 2px solid;
}

.questionDeleteButton:hover {
    color: white;
    background-color: var(--projS-red);
}

.addSpecificQuestionButton {
    margin-top: .5rem;
    transition: none;
}

.addSpecificQuestionButton:focus {
    outline: none;
}


/* -- MIDDLE RIGHT PART --  */
.projS-right_div {
    flex-direction: column;
}

.projS-right_div>div {
    flex-direction: column;
}

.projS-themColor_div {
    display: flex;
}

.colorInputPreviewDiv {
    display: flex;
}

.themeColorPreviewDiv {
    min-width: 3rem;
    max-width: 3.5rem;
    border-radius: 1rem;
    margin-right: .3rem;
}

#colorTheme {
    flex: 1;
}
.projS-customMsgs_div > div {
    flex-direction: column;
    margin-block: .5rem;
}

/* ---------- BOTTOM PART ----------  */
.projS-bottom_div {
    padding: 1rem;
    align-items: center;
    justify-content: center;
}

.projS-bottom_div button {
    margin-inline: 1rem;
}

</style>



