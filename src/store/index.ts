import { defaultGameConfig } from "@/core/gameConfig";
import { defineStore } from "pinia";

export const useglobalStore = defineStore("global",{
    state: () => ({
        customConfig: {...defaultGameConfig},
        gameConfig: {...defaultGameConfig}
    }),
    getters: {},
    // 持久化
    persist:{
        key: 'global',
        storage: localStorage,
        beforeRestore(ctx){
            console.log("load globalStore data start");
        },
        afterRestore(ctx){
            console.log("load globalStore data end");
        }
        
    },
    actions: {
        setGameConfig(gameConfig: GameConfigType){
            this.gameConfig = gameConfig;
        },
        setCustomConfig(gameConfig: GameConfigType){
            this.customConfig = gameConfig;
        },
        reset(){
            this.$reset();
        }
    }
})