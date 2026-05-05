import './StartButton.css';

export default function StartButton({gradient, textcolor}){
    const buttonStyle = {
        background: gradient || 'linear-gradient(153deg,rgb(203, 233, 205) 0%, rgba(182, 203, 185, 0.856) 50%, rgba(186, 200, 188, 0.851) 100%)',
        color: textcolor || '#282621fa'
    };

    return (
        <a href="">
            <button className="header_start_button" style={buttonStyle}>Get started</button>
        </a>
    );
}