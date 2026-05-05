import './Header.css';
import StartButton from '../../../../components/StartButton/StartButton'; 

export default function Header(){
    return (
        <header className="header">
            <h1><i className="fa-solid fa-gift"></i> WishSpace</h1>
            <nav className="header_navbar">
                <a href=""><button className="header_login_button">Login</button></a>
                <StartButton />
            </nav>
        </header>
    );
}