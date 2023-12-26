const Button = (props)=>{
    return <button type={props.type || 'button'} disabled={props.disabled || false} onClick={props.onClick}>
        {props.children}
    </button>
}

export default Button;