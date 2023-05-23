<template>
    <dialog class="loginsignupPopup" ref="loginsignupPopupref">
        
        <button class="closeLoginSignupPopupButton material-symbols-outlined" @click="closeLoginSignupPopup">close</button>
        
        <button class="loginwithGithubButton" @click="signInWithGitHubClicked">
            <div>
                <img src="../../assets/github-mark-white.svg" alt="GitHub_logo">
            </div>
            <div>
                <span>Login with GitHub</span>
            </div>
        </button>
    </dialog>
</template>

<script>



export default{
    mounted(){
        this.$refs.loginsignupPopupref.showModal()
        
    },
    
    methods:{
        closeLoginSignupPopup(){
            this.$emit('closeLoginSignupPopupClicked')
            this.$refs.loginsignupPopupref.close()
            
        },
        signInWithGitHubClicked(){
            this.$emit('signInWithGitHubClick')

        }

    }
}
</script>

<style>
.loginsignupPopup::backdrop{
    background-color: rgba(0, 0, 0, 0.45);
}

.loginsignupPopup{
    display: flex;
    border: none;
    background-color: whitesmoke;
    margin:auto;
    padding: 1rem;
    position: relative;
    border-radius: 1rem;
}

.loginwithGithubButton{
margin: 5rem;

    padding: 0.5rem;
    border: none;
    cursor: pointer;
    display: flex;
    width: 15rem;
    border-radius: 1rem;
    background-color: #171515;
    font-family: var(--default-font);
    
    justify-content: center;
    align-items: center;
}   
.loginwithGithubButton:hover{
    background-color: #171515ed;

}
.loginwithGithubButton:active{
    transform: scale(0.95);

}

.loginwithGithubButton div:first-child{
    padding: .5rem;
    width: 30%;
}
.loginwithGithubButton span{
    user-select: none;
    font-size: 1.2rem;
    color: white;
}
.loginwithGithubButton img{
    user-select: none;
    width: 100%;
}


.closeLoginSignupPopupButton{
    position: absolute;
    
    top: 1rem;
    right: 1rem;
    width: 3rem;
    border-radius: 100%;
    user-select: none;
    height: 3rem;
    border: none;
    cursor: pointer;
    background-color: transparent;
}
.closeLoginSignupPopupButton:hover{
    background-color: rgba(0, 0, 0, 0.175);
}
</style>