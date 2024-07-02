// JS ini buat nyimpen variable collisions ini. biar environment.js dan main.js bisa akses variable collisions ini.

export let importedObjects = [];

export let countObjectToLoad = 0;
export let loadedObjectCounter = 0;

export function incrementLoadedObjectCounter(){
    loadedObjectCounter++;
}

export function incrementCountObjectToLoad(){
    countObjectToLoad++;
}