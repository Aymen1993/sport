import { splitClasses } from "@angular/compiler";

export function generateId(T: any) {
    let max;
    if (T.length == 0) {
        max = 0;
    } else {
        max = T[0].id;
        for (let i = 1; i < T.length; i++) {
            if (T[i].id > max) {
                max = T[i].id
            }
        }
    }

    return max + 1;
}
export function addObject(obj:any,key:any,objects:any) {
    obj.id=generateId(objects);
    objects.push(obj);
    localStorage.setItem(key,JSON.stringify(objects));
}
export function getObjectFromLocalStorage(key:string) {
    return JSON.parse(localStorage.getItem(key)||"[]");
}
export function deleteObject(id:number,tab:any,key:any) {
    for (let i = 0; i < tab.length; i++) {
        if (tab[i].id==id) {
            tab.splice(i,1);
            break;
        }
    }
    localStorage.setItem(key,JSON.stringify(tab));
}
