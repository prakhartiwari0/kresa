<template>
    <div class="appslistdiv">

        
        <div class="appdiv"
        @click="openAppStats(app.appname)"
             v-for="(app, index) in apps">
            <img :src="app.appiconurl"
                 :alt="app.appname">
            <span>{{ app.appname }}</span>
    </div>
        <div class="addappbuttondiv">
            <button 
            @click="openAddAppModal"
            class="addappbutton material-symbols-outlined">add</button>
        </div>
        <AddAppModal v-if="showAddAppModal" @closeAddAppModal1="closeAddAppModal2($event)"/>  
    </div>
</template>

<script>
import AddAppModal from './AddAppModal.vue';

export default {
    components: { AddAppModal },
    data() {
        return {
            showAddAppModal: false,

            apps: [
                {
                    appname: "Arito",
                    appiconurl: "../../../src/assets/examplefiles/Arito_icon.png",
                },
            ]
        }
    },
    methods: {
        openAppStats(appName) {
            this.$emit('openAppStats1', appName);
        },
        openAddAppModal(){
            this.showAddAppModal = true
        },
        closeAddAppModal2() {
            this.showAddAppModal = false,
                console.log(this.showAppStats);
        }
    }


}

</script>

<style>
.appslistdiv {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(7rem, 1fr));
    grid-gap: 1rem;
    padding: 1em;
    position: relative;
    justify-items: center;
    align-items: center;
    flex-grow: 1;

}

.appdiv {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 5rem;
    margin-inline: 2rem;
    transition: 0.2s ease-in-out;

    padding: 0.7rem;
    border-radius: 1rem;

}

.appdiv:hover {
    transform: scale(1.1);
    background-color: rgba(0, 0, 0, 0.252);
}

.appdiv img {
    width: 100%;
}



.addappbuttondiv {
    
    display: flex;
    width: 3rem;
    height: 3rem;
    border-radius: 100%;
    position: absolute;
    bottom: 0rem;
    right: 0rem;
    margin: 1rem;
}

.addappbutton {

    background-color: var(--lavender);
    color: var(--k-blue);
    outline: none;
    border: none;
    user-select: none;
    cursor: pointer;
    border-radius: 100%;
    width: 100%;
    height: 100%;
    border: 2px solid var(--k-blue);
    transition: 0.2s ease;
}

.addappbutton:hover {
    border: 2px solid var(--k-blue);
    background-color: var(--k-blue);
    color: white;


}
</style>