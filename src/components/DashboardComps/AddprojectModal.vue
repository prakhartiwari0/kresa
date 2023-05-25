<template>
    <div class="addprojectmodalbackcover">

        <dialog ref="addprojectmodal_ref" class="default_modal addprojectmodal">
            <button 
            @click="$emit('closeAddprojectModalClicked')"
            class="closeaddprojectmodal_button actionbutton material-symbols-outlined">close</button>
            <h2>Enter Project Details</h2>

            <div class="addProjectModal_logo_div">
                
                <label for="project_logo_input" class="material-symbols-outlined">edit</label>
                <img :src="logoSelectedorNot() ? projectInfo.logoURL : '../src/assets/logos/4-blacknwhite.png'" alt="Project Logo" class="addProjectModal_logo_img">
                <input
                id="project_logo_input"
                @change="handleFileSelection"
                accept="image/jpeg"
                ref="project_logo_input"
                type="file"
                name="project_logo_input">
            </div>
            <div class="addpm_eachinputgroup">
                <label for="projectNameInput">Name:</label>
                <input id="projectNameInput"
                    ref="nameinputproject_ref"
                       type="text"
                       v-model="projectInfo.name"
                       class="default_textInput">

            </div>
            <div class="addpm_eachinputgroup">
                <label for="projectURLInput">URL:</label>
                <input id="projectURLInput"
                v-model="projectInfo.url"
                type="text"
                class="default_textInput">

            </div>
            <div class="addpm_eachinputgroup">
                <label for="projectDescriptionInput">Description:</label>
                <textarea
                maxlength="90"
                id="projectDescriptionInput"
                v-model="projectInfo.description"
                          rows="4"
                           class="default_textInput" ></textarea>

            </div>

                <button class="default_button" 
                :disabled="!allProjectInfoEntered"
                @click="submitProject">Add Project</button>


        </dialog>
    </div>
</template>

<script>
import {  collection, addDoc, setDoc, doc, updateDoc  } from "firebase/firestore";
import { db, auth, storage } from "@/firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


export default {
    data(){
        return{

            user: null,
            // project_defaults:{
            //     default_projectLogo: "../src/assets/logos/4-blacknwhite.png",
            // },
            projectInfo:{
                logoURL: null,
                logo: null,
                name: "",
                url: "",
                description: "",
            },
        }
    },
    mounted() {
      this.$refs.addprojectmodal_ref.showModal()
      this.$refs.nameinputproject_ref.focus()

        //   Retrieve the user data
        // auth.onAuthStateChanged((user) => {
        //     if (user) {
        //         this.user = user;
        //         console.log(this.user);
        //     }
        // });
  },
    computed: {
        allProjectInfoEntered() {
            for (let key in this.projectInfo) {
                if (!this.projectInfo[key]) {
                    return false;
                }
            }
            return (true)
        }
    },
    methods:{
        logoSelectedorNot(){
            if (this.projectInfo.logo) {
                return true
            }
            else{
                return false
            }
        },

        handleFileSelection(event) {
            const file = event.target.files[0];
            const maxSizeKB = 1024; // Maximum allowed file size in kilobytes

            if (file && file.size > maxSizeKB * 1024) {
                // File size exceeds the limit
                alert(`File size exceeds the limit of ${maxSizeKB} KB`);
                // this.$refs.project_logo_input.value = null; // Clear the file input field
                return;
            }

            // Check the file type and extension
            if (file && file.type !== "image/jpeg" && !file.name.toLowerCase().endsWith(".jpg")) {
                // Invalid file type or extension
                alert("Only JPG images are allowed");
                // this.$refs.project_logo_input.value = null; // Clear the file input field
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
                            // this.$refs.project_logo_input.value = null; // Clear the file input field
                            return;
                        }
                        
                        this.projectInfo.logoURL = reader.result;
                        this.projectInfo.logo = file;
                    };
                    img.src = reader.result;
                };
                reader.readAsDataURL(file);
            }
        },
        
        async submitProject() {
            // Get the input values
            let projectLogo = "";
            let projectLogoFile = this.projectInfo.logo;
            let dataAttributeProjectId = null;    

            const projectName = this.projectInfo.name;
            const projectUrl = this.projectInfo.url;
            const projectDescription = this.projectInfo.description;    

            const projectKIsettings = {
                colorTheme: "hsl(203, 81%, 32%)",
                customRequestMsg: "",
                customThanksMsg: "",
                customRateIcon: "",
                specificQuestions: {
                    question1:"",
                    question2:"",
                    question3:"",
                    question4:"",
                    question5:"",
                },

            }
            let projectDetails = {
                dataAttributeProjectId,
                projectLogo,
                projectName,
                projectUrl,
                projectDescription,
                projectKIsettings
            }

            const userID = auth.currentUser.uid;

            const newProjectRef = collection(db,"users",userID,"projects");

            // Add a new document with a generated id.
            const projectRef = await addDoc(newProjectRef, projectDetails);
            let projectID = projectRef.id
            console.log("Document written with ID: ", projectID);
            
            
            
            // Upload the projectLogo and get the URL
            let downloadURL = projectLogoFile;
            const storageRef = ref(storage, `usersAssets/${userID}/projectsAssets/${projectID}/logo.jpg`);
            await uploadBytes(storageRef, projectLogoFile);
            downloadURL = await getDownloadURL(storageRef);
            
            projectLogo = downloadURL;
            dataAttributeProjectId = projectID

            // Update Project Logo value with the Firestore URL             
            const newprojectRef = doc(db, "users", userID, "projects", projectID);
            
            // Set the "capital" field of the city 'DC'
            await updateDoc(newprojectRef, {
                dataAttributeProjectId, projectLogo
            });
            
            this.$emit("projectAdded", projectID)
            this.$emit('closeAddprojectModalClicked')

        },

    },
};

</script>

<style>

.addprojectmodal {
    position: fixed;
    min-width: 40%;
    padding: 1rem;
    overflow-y: hidden;
    
}


.addProjectModal_logo_div {
    width: 7rem;
    position: relative;
}
.addProjectModal_logo_img{
    border-radius: 100%;
    width: 100%;
    padding: .5rem;
}


.addProjectModal_logo_div label {
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 100%;
    cursor: pointer;
    padding: 0.4rem;
    user-select: none;
}
.addProjectModal_logo_div label:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.1);

}
.addProjectModal_logo_div input {
    display: none;
}

.addpm_eachinputgroup{
    padding: .3rem;
    margin-block: .2rem;
    min-width: 60%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    
}

.addpm_eachinputgroup textarea {
    resize: none;
    /* padding: .5rem; */

}


.closeaddprojectmodal_button {
    top: 1rem;
    right: 1rem;
}

</style>