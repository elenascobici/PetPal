
const MessageBox = ({ className, content }) => {
    return (
        <div className={`${className}-message`}>
            <p className={`msg-text-${className}`}> 
                {content}
            </p>
        </div>
    )
}

export default MessageBox;