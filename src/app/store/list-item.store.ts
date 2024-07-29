import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';



export interface ListItemState{
    name : string[];
}


const initialListItemState: ListItemState  ={
 name : []
}

export const ListItemStore = signalStore(
    { providedIn : 'root' },
    withState(initialListItemState),
    withMethods(({ name, ...store }) => ({

        addItem(item : string){
            const updatedList  = [...name(), item] ;
            patchState(store, { name : updatedList });
        },
        removeItem(item : string){
            const updatedList  = name().filter(x => x.toLowerCase() !== item) ;
            patchState(store, { name : updatedList });
        },
    }))
)