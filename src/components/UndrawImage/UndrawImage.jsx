import React from 'react';
import Cancel from '../../images/undraw_cancel.svg';
import Confirmation from '../../images/undraw_confirmation.svg';
import Filler from '../../images/undraw_filler.svg';
import Info from '../../images/undraw_info.svg';
import Request from '../../images/undraw_request.svg';

function getSVG(name) {
    switch(name) {
        case 'cancel': return Cancel;
        case 'confirmation': return Confirmation;
        case 'filler': return Filler;
        case 'info': return Info;
        case 'request': return Request;
        default: return null;
    }
}

export const UndrawImage = (props) => {
    return (
        <img src={getSVG(props.name)} alt="" style={{ width: props.width, height: props.height, ...props.style }} />
    );
}

export default UndrawImage;