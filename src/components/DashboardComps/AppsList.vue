<template>
    <div class="appslistdiv">

        <div class="appdiv"
             v-for="(app, index) in apps">
            <img :src="app.appiconurl"
                 :alt="app.appname">
            <span>{{ app.appname }}</span>
        </div>
        <div class="addappbuttondiv">
            <button class="addappbutton material-symbols-outlined">add</button>

        </div>




    </div>
</template>

<script>
export default {
    data() {
        return {
            apps: [
                {
                    appname: "Arito",
                    appiconurl: "../../../src/assets/examplefiles/Arito_icon.png",
                },
                {
                    appname: "Arito",
                    appiconurl: "../../../src/assets/examplefiles/Arito_icon.png",
                },
                {
                    appname: "Arito",
                    appiconurl: "../../../src/assets/examplefiles/Arito_icon.png",
                },
                {
                    appname: "Arito",
                    appiconurl: "../../../src/assets/examplefiles/Arito_icon.png",
                },
                {
                    appname: "Arito",
                    appiconurl: "../../../src/assets/examplefiles/Arito_icon.png",
                },
            ]
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

}

.appdiv:hover {
    transform: scale(1.1);
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
    bottom: 1rem;
    right: 1rem;

}

.addappbutton {
    background-color: var(--k-blue);
    color: white;
    outline: none;
    border: none;
    user-select: none;
    cursor: pointer;
    border-radius: 100%;
    width: 100%;
    height: 100%;
}

.addappbutton:hover {
    background-color: var(--lavender);
    color: var(--k-blue);


}
</style>