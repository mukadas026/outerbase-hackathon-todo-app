//@ts-nocheck
export const useViewTransition = (callback : Function) => {
    if(document.startViewTransition){
        const transition : ViewTransition = document.startViewTransition(callback)
    }else{
        callback()
    }
    
}