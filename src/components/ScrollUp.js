import React, { useEffect , useState} from "react";


export const ScrollUp = () =>{
    const [visible, setVisible] = useState('invisible');
    const scrollHandler = (e) =>{
        const elem = document.getElementById('root').getBoundingClientRect().top;
        (elem < -200) ? setVisible('visible'):setVisible('invisible');        
    }
    const clickHandler = (e) =>{
        window.scrollTo(0,0);
    }
    useEffect(()=>{
        document.addEventListener('scroll', scrollHandler);
        return function(){
            document.removeEventListener('scroll', scrollHandler);
        }
    }, [visible])
    return (
        <div id='scrollup' className={`position-fixed border rounded-circle border-primary bg-secondary ${visible}`} 
            onClick={clickHandler}>
            <span className='fs-1  p-0 text-dark' >&#94;</span>
        </div>
    )
}