const backgrounds = document.querySelectorAll( 'main > .form_section' );

const inputs = document.querySelectorAll( 'input' );

inputs.forEach( 

    element => {

        element.addEventListener('focus', 

            ( ) => { 

                backgrounds.forEach( bg => {

                    bg.style.backdropFilter = 'blur(10px)'; 

                })
                
            }

        );

        element.addEventListener('blur', 

            ( ) => { 

                backgrounds.forEach( bg => {

                    bg.style.backdropFilter = 'blur(0px)'; 

                })

            }

        );

    }

);