document.body.addEventListener('touchmove',

    function ( event ) {

        if( event._isScroller ) return;

        event.preventDefault();
    }, 
    
    { passive: false }

);